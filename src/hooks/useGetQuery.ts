import { REQUEST_STATUS } from '@assets/constants';
import { useAppDispatch } from '@services/store';
import { RootState } from '@services/store/Types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type GetQueryOptions = {
  selectStatus: (state: RootState) => REQUEST_STATUS;
  selectData: (state: RootState) => any;
  selectError: (state: RootState) => any;
  getAsynFn: Function;
  statusSetter: Function;
  runOnMount?: boolean;
};

export const useGetQuery = ({
  selectStatus,
  selectData,
  selectError,
  getAsynFn,
  statusSetter,
  runOnMount = true,
}: GetQueryOptions) => {
  const dispatch = useAppDispatch();
  // select the current status from the store state for the provided name
  const status = useSelector(selectStatus);
  // select the current data from the store state for the provided name
  const data = useSelector(selectData);

  // select current error
  const error = useSelector(selectError);

  useEffect(() => {
    if (runOnMount) {
      if (status === REQUEST_STATUS.IDLE) {
        dispatch(getAsynFn());
      }
    }
  }, [status, dispatch, getAsynFn, runOnMount]);

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
};