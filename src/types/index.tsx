import { AxiosRequestConfig } from 'axios';
import React from 'react';

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

export interface Config {
    queries: Queries,
    cruds: Cruds,
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
    queryName: string,
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
