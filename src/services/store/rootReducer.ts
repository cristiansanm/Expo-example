import categoriesSlice from '@modules/Categories/redux/categories.slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  CategoriesReducer: categoriesSlice.reducer,
});

export default rootReducer;
