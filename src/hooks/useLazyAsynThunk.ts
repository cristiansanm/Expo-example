import { REQUEST_STATUS } from '@assets/constants';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '@services/store';
import { RootState } from '@services/store/Types';
import { useSelector } from 'react-redux';

type AsyncThunkConfig<T, Args> = {
  asyncThunk: AsyncThunk<T, Args, any>;
  dataSelector: (state: RootState) => T;
  statusSelector: (state: RootState) => REQUEST_STATUS;
  errorSelector: (state: RootState) => T;
};

export function useLazyAsyncThunk<T, Args>(
  args: any,
  {
    asyncThunk,
    dataSelector,
    statusSelector,
    errorSelector,
  }: AsyncThunkConfig<T, Args>,
) {
  const dispatch = useAppDispatch();
  const data = useSelector(dataSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);

  const isUninitialized = status === REQUEST_STATUS.IDLE;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const isError = status === REQUEST_STATUS.FAILED;
  const isSuccess = status === REQUEST_STATUS.FULFILLED;

  const thunkDispatch = () => {
    dispatch(asyncThunk(args));
  };

  return [
    thunkDispatch,
    { data, isUninitialized, isLoading, isError, isSuccess, error },
  ];
}
