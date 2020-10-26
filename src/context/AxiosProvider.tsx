import React from 'react';

import { getAxiosContext } from './AxiosContext';
import { Config } from '../types';
import entityGenerator from '../entity/entityGenerator';

export interface AxiosProviderProps {
    config: Config;
    children: React.ReactNode | React.ReactNode[] | null;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  config,
  children,
}) => {
  const AxiosContext = getAxiosContext();
  return (
    <AxiosContext.Consumer>
      {(context: any = {}) => {
        let newContext = context;
        if (config && context.client !== config) {
          newContext = { ...context, config: { ...newContext.config, ...config } };
          const { queries, cruds } = config;
          const queryList = Object.entries(queries || {});
          const crudsList = Object.entries(cruds || {});

          // map queries to an object with key = queryName and value = querySlice
          const slices = queryList.concat(crudsList)
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entityGenerator({ queryName, idProperty: entity.idProperty, sortComparer: entity.sortComparer }).slice,
            }), {});

          // map queries to an object with key = queryName and value = queryAdapter
          const adapters = queryList.concat(crudsList)
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entityGenerator({ queryName, idProperty: entity.idProperty, sortComparer: entity.sortComparer }).adapter,
            }), {});
          newContext = { slices, adapters, ...newContext };
        }
        return (
          <AxiosContext.Provider value={newContext}>
            {children}
          </AxiosContext.Provider>
        );
      }}
    </AxiosContext.Consumer>
  );
};
