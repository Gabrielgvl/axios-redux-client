import { useEffect } from 'react';
import { makeUseAxios } from 'axios-hooks';
import axios from 'axios';
import useJwtAuth from '@gabrielgvl/jwt_auth_react';
import useWriteCache from './useWriteCache';
import useReadCache from './useReadCache';
import { useSelector } from '../store';

const useAxiosHook = makeUseAxios({
  axios: axios.create({ }),
});

const urlRegexp = /\${(\w+)}/g;

const replaceUrl = (url, params) => {
  const matches = [...url.matchAll(urlRegexp)];

  // replace first group (${ATTR}) with params[second group] (params[ATTR])
  matches.forEach((match) => url.replace(match[0], params[match[1]]));

  return url;
};

const useAxios = (
  {
    queryName,
    url,
    idProperty,
    method,
    manual,
    config = {},
    params,
  },
) => {
  const baseUrl = useSelector((state) => state.baseUrl);
  const notificationHandler = useSelector((state) => state.notificationHandler);
  const { setAll, addOne, upsertOne } = useWriteCache(queryName);
  const { selectedAll, selectedById } = useReadCache(queryName, params[idProperty]);
  const { token } = useJwtAuth();

  const [{
    response, error, data, loading,
  }, execute] = useAxiosHook(
    {
      headers: { Authorization: `Bearer ${token}` },
      url: baseUrl + replaceUrl(url, params),
      method,
      validateStatus(status) {
        return status >= 200 && status < 500;
      },
      ...config,
    },
    {
      manual,
    },
  );

  useEffect(() => {
    if (!response || !response.config) return;
    function handleCache() {
      try {
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
      } catch (e) {
        console.log(e);
      }
    }
    handleCache();
    notificationHandler(response);
  }, [response, loading, error]);

  return [{
    response, error, data: selectedById || selectedAll, loading,
  }, execute];
};

export default useAxios;
