import { useRef, FC, FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectUserProfile } from '../../../../redux/slices/profile/selectors';
import { changeAvatar } from '../../../../redux/slices/profile/thunk';

import styles from './Avatar.module.scss';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { avatarsEffectsList } from '../../ChangeEvatarEffect/ChangeAvatarEffect';

const avatarEffect = (
  avatarsEffectsList[Math.floor(Math.random() * avatarsEffectsList.length)] ||
  avatarsEffectsList[0]
).animation;

const Avatar: FC = () => {
  const dispatch = useAppDispatch();

  const [effectUrl, setEffectUrl] = useState(avatarsEffectsList[0].animation);

  useEffect(() => {
    const avatarEffect = (
      avatarsEffectsList[
        Math.floor(Math.random() * avatarsEffectsList.length)
      ] || avatarsEffectsList[0]
    ).animation;
    setEffectUrl(avatarEffect);
  }, []);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const profile = useAppSelector(selectUserProfile) || {
    avatar: null,
  };
  const { avatar } = profile;

  const handleChangeFile = async (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      return toast.error('File type should be image, png, jpg or jpeg');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      await dispatch(changeAvatar({ image: formData }));
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  return (
    <div className={styles.avatar} data-testid="avatar-container">
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        data-testid="file-input-component"
      />
      <img src={effectUrl} className={styles.avatarEffect} alt="effect" />
      {avatar ? (
        <img src={avatar.url} alt="logo" />
      ) : (
        <img
          src={
            'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
          }
          alt="default"
        />
      )}

      <div
        className={styles.addPhoto}
        onClick={() => inputFileRef.current?.click()}
        data-testid="add-photo-component"
      >
        <FontAwesomeIcon
          className={styles.camera}
          icon={faCirclePlus}
          data-testid="camera-icon-component"
        />
      </div>
    </div>
  );
};

export default Avatar;
