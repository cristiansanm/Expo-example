import { REQUEST_STATUS } from '@assets/constants';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '@services/store';
import { RootState } from '@services/store/Types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type GetQueryOptions<T, Args> = {
  selectStatus: (state: RootState) => REQUEST_STATUS;
  selectData: (state: RootState) => any;
  selectError: (state: RootState) => any;
  getAsynFn: AsyncThunk<T, Args, any>;
  statusSetter: Function;
  skip?: boolean;
  refetchOnMountOrArgChange?: boolean;
};

export function useMountedAsynThunk<T, Args>(
  args: any | undefined,
  {
    selectStatus,
    selectData,
    selectError,
    getAsynFn,
    statusSetter,
    skip = false,
    refetchOnMountOrArgChange = false,
  }: GetQueryOptions<T, Args>,
) {
  const dispatch = useAppDispatch();
  // select the current status from the store state for the provided name
  const status = useSelector(selectStatus);
  // select the current data from the store state for the provided name
  const data = useSelector(selectData);

  // select current error
  const error = useSelector(selectError);

  const refrehsOnArgChange = refetchOnMountOrArgChange && args ? args : null;

  useEffect(() => {
    if (!skip) {
      const shouldFetch =
        status === REQUEST_STATUS.IDLE || refetchOnMountOrArgChange;
      if (shouldFetch) {
        dispatch(getAsynFn(args));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    skip,
    status,
    dispatch,
    getAsynFn,
    refetchOnMountOrArgChange,
    refrehsOnArgChange,
  ]);

  const refetch = () => {
    dispatch(statusSetter(REQUEST_STATUS.IDLE));
  };

  // derive status booleans for ease of use
  const isUninitialized = status === REQUEST_STATUS.IDLE;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const isError = status === REQUEST_STATUS.FAILED;
  const isSuccess = status === REQUEST_STATUS.FULFILLED;

  // return the import data for the caller of the hook to use
  return {
    data,
    error,
    isUninitialized,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
}
