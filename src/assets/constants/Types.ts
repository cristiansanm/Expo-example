import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type RequestStatus = 'idle' | 'loading' | 'fulfilled' | 'failed';

export enum REQUEST_STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  FULFILLED = 'fulfilled',
  FAILED = 'failed',
}

export interface RequestError {
  message?: string;
  code?: string;
  config?: InternalAxiosRequestConfig;
  request?: any;
  response?: AxiosResponse;
}

export type Callbacks = {
  callbackError?: (tag?: string, error?: any) => void;
  callbackSuccess?: (tag?: string, response?: any) => void;
};
