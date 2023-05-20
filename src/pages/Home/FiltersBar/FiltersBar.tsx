import React, { useState } from "react";
import styles from "./FiltersBar.module.scss";
import Filters, { Date, IsCompleted } from "./Filters/Filters";
import Categories from "./Categories/Categories";
import { Category, getTask } from "../../../api/taskAPI";

interface FiltersBarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  isCompleted: IsCompleted;
  setIsCompleted: React.Dispatch<React.SetStateAction<IsCompleted>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  date,
  setDate,
  isCompleted,
  setIsCompleted,
  categories,
  setCategories,
  taskFetchingParams,
  fetchTasks,
}) => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);

  return (
    <aside className={styles.filtersWrapper}>
      <Categories
        activeCategories={categories}
        setActiveCategories={setCategories}
        taskFetchingParams={taskFetchingParams}
        fetchTasks={fetchTasks}
      />
      <Filters
        hasDeadline={hasDeadline}
        setHasDeadline={setHasDeadline}
        date={date}
        setDate={setDate}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    </aside>
  );
};

export default FiltersBar;
