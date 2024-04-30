import { REQUEST_STATUS } from "@constants/Types";
import { useAppDispatch } from "@services/store";
import { RootState } from "@services/store/Types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllCategories } from "../redux/categories.api";
import { selectStatus, selectData } from "../redux/categories.selector";

export function useGetAllCategories() {
  const dispatch = useAppDispatch();
  // select the current status from the store state for the provided name
  const status = useSelector((state: RootState) => selectStatus(state));
  // select the current data from the store state for the provided name
  const data = useSelector((state: RootState) => selectData(state));
  useEffect(() => {
    if (status === REQUEST_STATUS.IDLE) {
      dispatch(getAllCategories()); // Call the thunk directly
    }
  }, [status, dispatch]);

  // derive status booleans for ease of use
  const isUninitialized = status === REQUEST_STATUS.IDLE;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const isError = status === REQUEST_STATUS.FAILED;
  const isSuccess = status === REQUEST_STATUS.FULFILLED;

  // return the import data for the caller of the hook to use
  return { data, isUninitialized, isLoading, isError, isSuccess };
}
