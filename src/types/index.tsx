import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import { History } from 'history';
import { UseJwtAuthReturn } from '@gabrielgvl/jwt_auth_react';

export interface BaseEntity {
    idProperty: string | number,
}

export interface BaseQuery {
    url: string,
    method: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE',
}

export interface QueryEntity extends BaseQuery, BaseEntity{
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

export type AuthType = 'jwt' | null

export interface ErrorHandler {
    message: string
    type?: 'success' | 'error' | 'info' | 'warning'
}

export interface ResponseHandlerParams {
    response: AxiosResponse,
    queryName: string,
    history: History,
    jwtAuth: UseJwtAuthReturn,
}

export interface Config {
    queries: Queries,
    cruds: Cruds,
    baseUrl?: string,
    responseHandler?: (response) => ErrorHandler,
    auth: AuthType,
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
    config: Config,
    children: React.ReactNode
}

export interface AxiosClientState {
    renderPromises?: Record<any, any>;
}
