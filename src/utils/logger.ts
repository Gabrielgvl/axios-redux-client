import { AxiosRequestConfig, AxiosResponse } from 'axios';
import log from 'loglevel';

const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

export function requestLogger(request: AxiosRequestConfig): AxiosRequestConfig {
  const {
    common,
    delete: del,
    get,
    head,
    patc,
    post,
    put,
    patch,
    ...rest
  } = request.headers;
  const logObject = {
    data: request.data, headers: rest,
  };
  log.info(`[REQUEST] - ${getCurrentTime()} - ${request.method} - ${request.url}`);
  log.info('[REQUEST] - ', logObject);
  return request;
}

export function responseLogger(response: AxiosResponse): AxiosResponse {
  const logObject = {
    data: response.data, headers: response.headers,
  };
  log.info(`[RESPONSE] - ${getCurrentTime()} - ${response.config.method} - ${response.status} - ${response.config.url}`);
  log.info('[RESPONSE] - ', logObject);
  return response;
}
