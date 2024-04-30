import { CategoriesState } from "./categories.types";

export const CategoriesActions = {
  setToUpperCase(state: CategoriesState) {
    const todos = state.data;
    state.data = todos?.map((category) => category.toUpperCase());
  },
};
