import { API_URI } from "@constants/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROUTES, TAG } from "./categories.types";

export const getAllCategories = createAsyncThunk(
  TAG.GET_CATEGORIES,
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${API_URI}${ROUTES.GET_CATEGORIES}`);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);
