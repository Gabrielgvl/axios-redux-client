import React from 'react';

import { getAxiosContext } from './AxiosContext';
import { QueryEntity, UseConfigInterface } from '../types';
import entityGenerator, { EntityGenerated } from '../entity/entityGenerator';
import { configDefault } from '../utils/constants';

export interface AxiosProviderProps {
    useConfiguration: () => UseConfigInterface,
    children: React.ReactNode | React.ReactNode[] | null;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  useConfiguration,
  children,
}) => {
  const AxiosContext = getAxiosContext();
  const config = useConfiguration();
  return (
    <AxiosContext.Consumer>
      {(context: any = {}) => {
        let newContext = context;
        if (config && context.config !== config) {
          const fullConfig = { ...configDefault, ...config };
          const { queries, cruds } = fullConfig;
          const queryList = Object.entries<QueryEntity>(queries);
          const crudsList = Object.entries<QueryEntity>(cruds);

          const entities = queryList.concat(crudsList).filter(([, entity]) => entity.idProperty)
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entityGenerator({
                queryName, idProperty: entity.idProperty, sortComparer: entity.sortComparer,
              }),
            }), { _notification: entityGenerator({ queryName: '_notification', idProperty: 'id' }) });

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
            slices, adapters, reducers, useConfiguration,
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
