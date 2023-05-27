import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_TWO,
  MOCK_OBJECT_THREE,
} from "../../../mocs/state";

import {
  clearCategories,
  updateCategoryInList,
  addCategoryToList,
  removeCategoryFromList,
  clear,
  homeReducer,
} from "./home";

import { HomeSliceState } from "./types";
import { Status } from "../../../types";

describe("Testing home slice reducers", () => {
  const clearAction = { type: clear.type };
  const clearCategoriesAction = { type: clearCategories.type };

  describe("clear reducer must works currectly", () => {
    it("All slice must be cleared after this reducer calling", () => {
      const firstResult = homeReducer(MOCK_OBJECT_ONE.home, clearAction);
      const secondResult = homeReducer(MOCK_OBJECT_TWO.home, clearAction);
      const thirdResult = homeReducer(MOCK_OBJECT_THREE.home, clearAction);
      const initialState: HomeSliceState = {
        category: {
          categories: [],
          totalPages: 0,
          currentPage: 1,
          status: Status.LOADING,
        },
      };

      expect(firstResult).toEqual(initialState);
      expect(secondResult).toEqual(initialState);
      expect(thirdResult).toEqual(initialState);
    });

    describe("clearCategories reducer must work correctly", () => {
      const firstResult = homeReducer(
        MOCK_OBJECT_ONE.home,
        clearCategoriesAction
      );
      const secondResult = homeReducer(
        MOCK_OBJECT_TWO.home,
        clearCategoriesAction
      );
      const thirdResult = homeReducer(
        MOCK_OBJECT_THREE.home,
        clearCategoriesAction
      );

      it("categories list must be empty", () => {
        expect(firstResult.category.categories).toEqual([]);
        expect(secondResult.category.categories).toEqual([]);
        expect(thirdResult.category.categories).toEqual([]);
      });

      it("totalPages must stay the same", () => {
        expect(firstResult.category.totalPages).toBe(5);
        expect(secondResult.category.totalPages).toBe(0);
        expect(thirdResult.category.totalPages).toBe(0);
      });

      it("currentPage must stay the same", () => {
        expect(firstResult.category.currentPage).toBe(4);
        expect(secondResult.category.currentPage).toBe(1);
        expect(thirdResult.category.currentPage).toBe(1);
      });

      it("status must stay the same", () => {
        expect(firstResult.category.status).toBe(Status.SUCCESS);
        expect(secondResult.category.status).toBe(Status.LOADING);
        expect(thirdResult.category.status).toBe(Status.ERROR);
      });

      it("message must stay the same", () => {
        expect(firstResult.category.message).toBe("");
        expect(secondResult.category.message).toBe("");
        expect(thirdResult.category.message).toBe("Error");
      });
    });
  });
});
