import { RequestStatus } from "@constants/Types";

export interface CategoriesState {
  data: string[];
  requestStatus: RequestStatus;
  error?: unknown;
}

export const INIT_STATE: CategoriesState = {
  data: [],
  requestStatus: "idle",
  error: null,
};

export enum TAG {
  GET_CATEGORIES = "GET_CATEGPRIES",
}

export enum ROUTES {
  GET_CATEGORIES = "/products/categories",
}
