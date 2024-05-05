import { REQUEST_STATUS } from '@assets/constants/Types';

import { CategoriesState } from './categories.types';

export const CategoriesActions = {
  setToUpperCase(state: CategoriesState) {
    const todos = state.data;
    state.data = todos?.map(category => category.toUpperCase());
  },
  setRequestStatus(
    state: CategoriesState,
    action: { type?: any; payload: REQUEST_STATUS },
  ) {
    state.requestStatus = action.payload;
  },
};
