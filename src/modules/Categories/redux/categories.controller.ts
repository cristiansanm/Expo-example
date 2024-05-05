import { Callbacks } from '@assets/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@services/api/axiosInstance';

import { ROUTES, TAG } from './categories.types';

export const getAllCategories = createAsyncThunk(
  TAG.GET_CATEGORIES,
  async (
    { callbackError, callbackSuccess }: Callbacks,
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(ROUTES.GET_CATEGORIES);
      callbackSuccess && callbackSuccess(TAG.GET_CATEGORIES, response);
      return response.data;
    } catch (error: any) {
      callbackError && callbackError(TAG.GET_CATEGORIES, error);
      return rejectWithValue({
        message: error?.message || '',
        status: error?.response?.status || '',
      });
    }
  },
);
