import React from 'react';
import { EntityAdapter, Slice, ReducersMapObject } from '@reduxjs/toolkit';
import { BaseEntity, Config } from '../types';

interface AdaptersInterface {
    [queryName: string]: EntityAdapter<BaseEntity>
}

interface SlicesInterface {
    [queryName: string]: Slice
}

export interface AxiosContextInterface {
    config: Config;
    slices?: SlicesInterface,
    adapters?: AdaptersInterface,
    reducers?: ReducersMapObject,
    renderPromises?: Record<any, any>;
}

const configDefault = {
  queries: {},
  cruds: {},
  baseUrl: '/',
};

const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__AXIOS_CONTEXT__')
  : '__AXIOS_CONTEXT__';

export function resetApolloContext() {
  Object.defineProperty(React, contextSymbol, {
    value: React.createContext<AxiosContextInterface>({ config: configDefault }),
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

export function getAxiosContext() {
  if (!(React as any)[contextSymbol]) {
    resetApolloContext();
  }
  return (React as any)[contextSymbol] as React.Context<AxiosContextInterface>;
}
