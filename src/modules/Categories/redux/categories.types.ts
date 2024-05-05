import { REQUEST_STATUS } from '@assets/constants/Types';

export interface CategoriesState {
  data: string[];
  requestStatus: REQUEST_STATUS;
  error?: any;
}

export const INIT_STATE: CategoriesState = {
  data: [],
  requestStatus: REQUEST_STATUS.IDLE,
  error: null,
};

export enum TAG {
  GET_CATEGORIES = 'GET_CATEGPRIES',
}

export enum ROUTES {
  GET_CATEGORIES = '/products/categories',
}
