import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Category.module.scss";
import { Category as TaskCategory, getTask } from "../../../../../api/taskAPI";
export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  isForTask?: boolean;
  setCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryInfo: React.Dispatch<React.SetStateAction<{}>>;
  setActiveCategories: React.Dispatch<React.SetStateAction<TaskCategory[]>>;
  isActive: boolean;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
}

const Category: React.FC<CategoryProps> = ({
  setCategoryInfo,
  setCategoryDeleting,
  setCategoryEditing,
  setActiveCategories,
  isForTask,
  isActive,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      data-testid="category-element"
      onClick={() => {
        if (isActive) {
          setActiveCategories((prev) =>
            prev.filter((el) => el._id !== props._id)
          );
        } else {
          setActiveCategories((prev) => [
            ...prev,
            { _id: props._id, title: props.title, color: props.color },
          ]);
        }
      }}
      className={isForTask ? styles.tasksFormCategory : styles.category}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ borderColor: hover || isActive ? "#f97316" : props.color }}
    >
      <span className={isActive ? styles.activeTitle : styles.title}>
        {props.title}
      </span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="pencil-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setCategoryInfo(props);
            setCategoryEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          data-testid="trash-icon"
          color="black"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setCategoryInfo(props);
            setCategoryDeleting(true);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default Category;
