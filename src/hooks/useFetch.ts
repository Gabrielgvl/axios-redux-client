import useSWR, { ConfigInterface } from 'swr';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { requestLogger, responseLogger } from '../utils/logger';
import useClientConfig from './useClientConfig';

const api = axios.create();
api.interceptors.request.use(requestLogger);
api.interceptors.response.use(responseLogger);

const urlRegexp = /&{(\w+)}/g;

const replaceUrl = (url, params) => {
  const matches = [...url.matchAll(urlRegexp)];
  let newUrl = url;
  // replace first group (${ATTR}) with params[second group] (params[ATTR])
  matches.forEach((match) => {
    newUrl = url.replace(match[0], params[match[1]]);
  });
  return newUrl;
};

export function useFetch<Data = any, Error = any>(queryName: string,
  config?: ConfigInterface<Data, Error>, params?: {}, manual?) {
  const [shouldFetch, setShouldFetch] = useState(!manual);
  const {
    baseURL, responseHandler, getRequestConfig, queries,
  } = useClientConfig();

  const { url, method } = queries[queryName];

  const requestConfig = useMemo(() => {
    const defaultRequestConfig: AxiosRequestConfig = {
      url: replaceUrl(url, params),
      baseURL,
      method,
    };
    if (getRequestConfig) {
      return getRequestConfig(defaultRequestConfig);
    }
    return defaultRequestConfig;
  }, [baseURL, getRequestConfig, method, params, url]);

  const {
    data, error, mutate, isValidating, revalidate,
  } = useSWR<Data, Error>(shouldFetch ? queries[queryName] : null, async () => {
    const response = await api.request(requestConfig);
    if (responseHandler) {
      responseHandler({ response, queryName });
    }
    return response.data;
  }, config);

  const refetch = useCallback(async () => {
    setShouldFetch(true);
    await revalidate();
  }, [revalidate]);

  return [{
    data, error, mutate, isValidating,
  }, refetch];
}

export default useFetch;
