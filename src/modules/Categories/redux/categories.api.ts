import { API_URI } from "@services/api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROUTES, TAG } from "./categories.types";
import { axiosInstaceSwitch } from "@services/api/verbsHandler";
import { CallBacks, VERBS } from "@services/api";

export const getAllCategories = createAsyncThunk(
  TAG.GET_CATEGORIES,
  async ({callbackError, callbackSuccess}: CallBacks, { rejectWithValue }) => {
    try {
      const response = await axiosInstaceSwitch({ verb: VERBS.GET, endpointReference: ROUTES.GET_CATEGORIES });
      callbackSuccess()
      return response.data;
    } catch (error) {
      callbackError()
      return rejectWithValue(error);
    }
  },
);