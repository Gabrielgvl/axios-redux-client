import { AxiosRequestConfig } from 'axios';
import React from 'react';

export interface BaseEntity {
    idProperty: string | number,
}

export interface BaseQuery {
    url: string,
    queryName: string,
    method: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE',
}

export interface QueryEntity extends BaseQuery, BaseEntity{
    sortComparer?: (a, b) => number,
}

export interface CrudQuery extends QueryEntity {
    method: never,
    getUrl?: string,
    listUrl?: string,
    postUrl?: string,
    deleteUrl?: string,
    putUrl?: string,
}

export interface Config {
    queries: Array<QueryEntity>,
    cruds: Array<CrudQuery>,
    baseUrl?: string,
    notificationHandler?: (response) => {},
    auth: 'jwt' | null,
}

export interface UseQueryInterface {
    manual?: boolean,
    options?: AxiosRequestConfig,
    params?: Object,
}

export interface UseAxiosInterface extends BaseQuery, BaseEntity, UseQueryInterface {
}

export interface AxiosClientInterface {
    config: Config,
    children: React.ReactNode
}

export interface AxiosClientState {
    _slices: any,
    _adapters: any,
    _config: Config,
}
