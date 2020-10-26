import React from 'react';
import { AuthType, Config } from '../types';

export interface AxiosContextInterface {
    config: Config;
    slices?: any,
    adapters?: any,
    renderPromises?: Record<any, any>;
}

const configDefault = {
  queries: {},
  cruds: {},
  baseUrl: '/',
  auth: 'jwt' as AuthType,
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
