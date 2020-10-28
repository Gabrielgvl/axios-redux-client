import { AxiosRequestConfig, AxiosResponse } from 'axios';
import log from 'loglevel';

const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

export function requestLogger(request: AxiosRequestConfig): AxiosRequestConfig {
  const {
    common, delete: del, get, head, patch, post, put, ...others
  } = request.headers;
  const logObject = {
    data: request.data, headers: others,
  };
  log.info(`[REQUEST] - ${getCurrentTime()} - ${request.method} - ${request.url}`, logObject);
  return request;
}

export function responseLogger(response: AxiosResponse): AxiosResponse {
  const logObject = {
    data: response.data, headers: response.headers, statusText: response.statusText,
  };
  log.info(`[RESPONSE] - ${getCurrentTime()}  - ${response.config.method} - ${response.status} - ${response.config.url}`, logObject);
  return response;
}
