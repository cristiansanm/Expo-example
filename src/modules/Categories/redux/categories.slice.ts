import { REQUEST_STATUS } from "@constants/Types";
import { createSlice } from "@reduxjs/toolkit";

import { CategoriesActions } from "./categories.actions";
import { getAllCategories } from "./categories.api";
import { INIT_STATE } from "./categories.types";

const categoriesSlice = createSlice({
  name: "CategoriesReducer",
  initialState: INIT_STATE,
  reducers: CategoriesActions,
  extraReducers: (builder) => {
    // When our request is pending:
    // - store the 'pending' state as the status for the corresponding pokemon name
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.requestStatus = REQUEST_STATUS.LOADING;
    });
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.data = action.payload;
    });
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.requestStatus = REQUEST_STATUS.FAILED;
    });
  },
});

export const { setToUpperCase } = categoriesSlice.actions;

export default categoriesSlice;
