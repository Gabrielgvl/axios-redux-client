import {
  useEffect, useMemo,
} from 'react';
import { ResponseValues } from 'axios-hooks';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import useWriteCache from './useWriteCache';
import useReadCache from './useReadCache';
import { AxiosRefetch, UseAxiosInterface } from '../types';
import useClientConfig from './useClientConfig';

const urlRegexp = /&{(\w+)}/g;

const replaceUrl = (url, params) => {
  if (!params) return url;
  const matches = [...url.matchAll(urlRegexp)];
  let newUrl = url;
  // replace first group (${ATTR}) with params[second group] (params[ATTR])
  matches.forEach((match) => {
    newUrl = url.replace(match[0], params[match[1]]);
  });
  return newUrl;
};

const useAxios = (
  {
    queryName,
    url,
    idProperty,
    method,
    manual = method.toLowerCase() !== 'get',
    options = {},
    params = {},
  } : UseAxiosInterface,
): [ResponseValues<any>, (fetchProps?: AxiosRefetch
) => AxiosPromise ] => {
  const { baseUrl, useAxiosHook, getRequestConfig } = useClientConfig();
  const {
    setAll, addOne, upsertOne,
  } = useWriteCache(queryName);
  const { selectedAll, selectedById } = useReadCache(queryName, params[idProperty]);

  const requestConfig = useMemo(() => {
    const defaultRequestConfig: AxiosRequestConfig = {
      url: baseUrl + replaceUrl(url, params),
      method,
      validateStatus(status) {
        return status >= 200;
      },
      ...options,
    };
    if (getRequestConfig) {
      return getRequestConfig(defaultRequestConfig);
    }
    return defaultRequestConfig;
  }, [baseUrl, getRequestConfig, method, options, params, url]);

  const [{
    response, error, data, loading,
  }, execute] = useAxiosHook(requestConfig, { manual });

  const refetch = (fetchProps: AxiosRefetch): AxiosPromise => {
    const { params: innerParams, ...props } = fetchProps;
    return execute({ url: baseUrl + replaceUrl(url, { ...params, ...innerParams }), ...props });
  };

  useEffect(() => {
    if (!response || !response.config) return;
    if (response.status < 400 && upsertOne && setAll && addOne) {
      switch (response.config.method) {
        case 'get':
          if (idProperty in params) {
            upsertOne(data);
          } else {
            setAll(data);
          }
          break;
        case 'post':
          addOne(data);
          break;
        case 'put':
        case 'delete':
          upsertOne(data);
          break;
        default:
          console.log('Not Implemented');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return [{
    response, error, data: selectedById || selectedAll || data, loading,
  }, refetch];
};

export default useAxios;
