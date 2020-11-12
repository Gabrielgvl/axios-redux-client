import {
  AxiosAdapter,
  AxiosBasicCredentials, AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosTransformer, CancelToken,
  Method,
  ResponseType,
} from 'axios';
import React from 'react';

export interface BaseEntity {
    idProperty: string | number,
}

export interface BaseQuery {
    url: string,
    method: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE',
}

export interface QueryEntity extends BaseQuery {
    idProperty?: string | number,
    sortComparer?: (a, b) => number,
}

export interface Queries {
    [queryName: string]: QueryEntity,
}

export interface CrudQuery extends QueryEntity {
    method: never,
    getUrl?: string,
    listUrl?: string,
    postUrl?: string,
    deleteUrl?: string,
    putUrl?: string,
}

export interface Cruds {
    [queryName: string]: CrudQuery,
}

export interface ErrorHandler {
    message: string
    type?: 'success' | 'error' | 'info' | 'warning'
}

export interface ResponseHandlerParams {
    response: AxiosResponse,
    queryName: string,
}

export interface UseConfigInterface {
    queries?: Queries,
    cruds?: Cruds,
    baseUrl: string,
    responseHandler?: ({ response, queryName: string }) => ErrorHandler,
    getRequestConfig?: (requestConfig: AxiosRequestConfig) => AxiosRequestConfig,
}

export interface UseQueryInterface {
    manual?: boolean,
    options?: AxiosRequestConfig,
    params?: Object,
}

export interface UseAxiosInterface extends BaseQuery, BaseEntity, UseQueryInterface {
    queryName: string,
}

export interface AxiosClientInterface {
    useConfiguration: () => UseConfigInterface,
    children: React.ReactNode
}

export interface AxiosClientState {
    _notifications?: Array<any>;
    renderPromises?: Record<any, any>;
}

export interface AxiosRefetch extends AxiosRequestConfig {
    params?: Record<string, unknown>;
    url?: string;
    method?: Method;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean | null);
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;
}
