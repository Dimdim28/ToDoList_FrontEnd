import instanse from "../axios";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type CategoryResponse = {
  status: number;
  statusText: string;
  data: Category;
};

export type Category = {
  _id: string;
  title: string;
  user: string;
  color: string;
};

export interface Result {
  category: Category | null;
  status: Status;
  message?: string;
}

export const deleteCategory = async (id: string): Promise<Result> => {
  try {
    const response: CategoryResponse = await instanse.delete(`/category/${id}`);
    return { category: response.data, status: Status.SUCCESS };
  } catch (err: any) {
    return {
      message: err.response.data.message,
      status: Status.ERROR,
      category: null,
    };
  }
};