import { useCallback, useEffect, Dispatch, SetStateAction, FC } from 'react';

import styles from './Modal.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../types/entities/Category';

interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  ChildComponent: any;
  childProps: Category | {};
  zIndex?: number;
}

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export const Modal: FC<ModalProps> = ({
  active,
  setActive,
  ChildComponent,
  childProps,
  zIndex,
}) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        setActive(false);
      }
    },
    [setActive],
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey]);

  return (
    <div
      style={{ zIndex }}
      role="dialog-wrapper"
      className={`${active ? styles.modalActive : undefined} ${styles.modal}`}
    >
      <div
        role="dialog"
        data-testid="modal-content"
        className={`${active ? styles.modalContentActive : undefined} ${
          styles.modalContent
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon
          data-testid="modal-close-button"
          icon={faCircleXmark}
          className={styles.close}
          onClick={() => setActive(false)}
        />
        <ChildComponent toggleActive={setActive} childProps={childProps} />
      </div>
    </div>
  );
};
