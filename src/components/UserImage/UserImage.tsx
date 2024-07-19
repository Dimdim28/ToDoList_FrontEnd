import { FC, useEffect, useState } from 'react';

import { avatarsEffectsList } from '../../pages/Profile/ChangeEvatarEffect/ChangeAvatarEffect';
import { User } from '../../types/shared';

import styles from './UserImage.module.scss';

type Size = 'medium' | 'large';

interface UserImageProps {
  user: User;
  size?: Size;
  additionalClassname?: string;
  onAvatarClick?: (user: User) => void;
}

const UserImage: FC<UserImageProps> = ({
  user,
  size = 'medium',
  additionalClassname,
  onAvatarClick,
}) => {
  const [effectUrl, setEffectUrl] = useState(avatarsEffectsList[0].animation);

  useEffect(() => {
    const avatarEffect = (
      avatarsEffectsList[
        Math.floor(Math.random() * avatarsEffectsList.length)
      ] || avatarsEffectsList[0]
    ).animation;
    setEffectUrl(avatarEffect);
  }, []);

  return (
    <div
      className={`${styles.userImageWrapper} ${
        size === 'medium' ? styles.medium : styles.large
      } ${additionalClassname ?? ''}`}
    >
      <img
        onClick={(e) => {
          if (onAvatarClick) {
            e.stopPropagation();
            onAvatarClick(user);
          }
        }}
        className={`${styles.avatarImage} ${
          onAvatarClick ? styles.clickable : ''
        }`}
        src={
          user?.avatar ||
          'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
        }
        alt={user?.username || 'User'}
      />
      <img src={effectUrl} className={styles.avatarEffect} alt="effect" />
    </div>
  );
};

export default UserImage;
