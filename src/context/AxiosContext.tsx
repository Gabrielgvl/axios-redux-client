import React from 'react';
import { EntityAdapter, Slice, ReducersMapObject } from '@reduxjs/toolkit';
import { BaseEntity, UseConfigInterface } from '../types';
import { configDefault } from '../utils/constants';

interface AdaptersInterface {
    [queryName: string]: EntityAdapter<BaseEntity>
}

interface SlicesInterface {
    [queryName: string]: Slice
}

export interface AxiosContextInterface {
    useConfiguration: () => UseConfigInterface;
    slices?: SlicesInterface,
    adapters?: AdaptersInterface,
    reducers?: ReducersMapObject,
    renderPromises?: Record<any, any>;
}

const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__AXIOS_CONTEXT__')
  : '__AXIOS_CONTEXT__';

export function resetAxiosContext() {
  Object.defineProperty(React, contextSymbol, {
    value: React.createContext<AxiosContextInterface>({ useConfiguration: () => configDefault }),
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

export function getAxiosContext() {
  if (!(React as any)[contextSymbol]) {
    resetAxiosContext();
  }
  return (React as any)[contextSymbol] as React.Context<AxiosContextInterface>;
}
