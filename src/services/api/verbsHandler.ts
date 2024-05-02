import { AxiosResponse } from 'axios';
import { AxiosSwitch, ModulesResponse, VERBS } from './Types';
import { axiosInstance } from './axiosInstance';

export async function axiosInstaceSwitch<T>({
  verb,
  endpointReference,
  params,
  requestConfig,
  httpClient = axiosInstance,
}: AxiosSwitch): Promise<AxiosResponse<any, any>> {
  switch (verb) {
    case VERBS.DELETE: {
      try {
        const response = await httpClient.delete(
          endpointReference,
          requestConfig,
        );
        return response;
      } catch (error: any) {
        return error ?? error?.response;
      }
    }

    case VERBS.GET: {
      try {
        const response = await httpClient.get(endpointReference, requestConfig);

        return response;
      } catch (error: any) {
        return error ?? error?.response;
      }
    }

    case VERBS.POST: {
      try {
        const response = await httpClient.post(
          endpointReference,
          params,
          requestConfig,
        );

        return response;
      } catch (error: any) {
        return error ?? error?.response;
      }
    }

    case VERBS.PUT: {
      try {
        const response = await httpClient.put(
          endpointReference,
          params,
          requestConfig,
        );

        return response;
      } catch (error: any) {
        return error ?? error?.response;
      }
    }

    case VERBS.PATCH: {
      try {
        const response = await httpClient.patch(
          endpointReference,
          params,
          requestConfig,
        );

        return response;
      } catch (error: any) {
        return error ?? error?.response;
      }
    }
    default: {
      return Promise.resolve({
        data: null,
        status: 500,
        statusText: 'No fetched data | URI not found | Wrong endpoint',
        headers: {},
        config: {},
      });
    }
  }
}
