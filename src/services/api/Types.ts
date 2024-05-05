import { AxiosInstance, AxiosRequestConfig } from 'axios';

export type Verbs = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export enum VERBS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type AxiosSwitch = {
  verb: Verbs;
  httpClient?: AxiosInstance;
  endpointReference: string;
  params?: unknown;
  requestConfig?: AxiosRequestConfig;
  rejectWithValue: (value: unknown) => any;
};
