import React from 'react';

import { getAxiosContext } from './AxiosContext';
import { Config } from '../types';
import entityGenerator, { EntityGenerated } from '../entity/entityGenerator';

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
        if (config && context.config !== config) {
          newContext = { ...context, config: { ...newContext.config, ...config } };
          const { queries, cruds } = config;
          const queryList = Object.entries(queries || {});
          const crudsList = Object.entries(cruds || {});

          const entities = queryList.concat(crudsList)
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entityGenerator({
                queryName, idProperty: entity.idProperty, sortComparer: entity.sortComparer, isCrud: entity.method,
              }),
            }), {});

          const entityEntries = Object.entries<EntityGenerated>(entities);

          // map queries to an object with key = queryName and value = queryReducer
          const reducers = entityEntries
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entity.slice.reducer,
            }), {});

          // map queries to an object with key = queryName and value = querySlice
          const slices = entityEntries
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entity.slice,
            }), {});

          // map queries to an object with key = queryName and value = queryAdapter
          const adapters = entityEntries
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entity.adapter,
            }), {});
          newContext = {
            slices, adapters, reducers, ...newContext,
          };
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
