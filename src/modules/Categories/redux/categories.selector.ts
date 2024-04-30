import { RootState } from "@services/store/Types";

export const selectStatus = (state: RootState) =>
  state.CategoriesReducer.requestStatus;
export const selectData = (state: RootState) => state.CategoriesReducer.data;
