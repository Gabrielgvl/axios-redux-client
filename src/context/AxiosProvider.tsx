import React from 'react';

import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { getAxiosContext } from './AxiosContext';
import { QueryEntity, UseConfigInterface } from '../types';
import entityGenerator, { EntityGenerated } from '../entity/entityGenerator';
import { configDefault } from '../utils/constants';
import { requestLogger, responseLogger } from '../utils/logger';

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
          const {
            queries, cruds, responseHandler, baseUrl, getRequestConfig,
          } = fullConfig;
          const queryList = Object.entries<QueryEntity>(queries);
          const crudsList = Object.entries<QueryEntity>(cruds);

          const entities = queryList.concat(crudsList).filter(([, entity]) => entity.idProperty)
            .reduce((obj, [queryName, entity]) => ({
              ...obj,
              [queryName]: entityGenerator({
                queryName, idProperty: entity.idProperty!, sortComparer: entity.sortComparer,
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

          const axiosInstance = axios.create({
            baseURL: baseUrl,
          });
          axiosInstance.interceptors.request.use((request) => {
            let newRequest = request;
            if (getRequestConfig) {
              newRequest = getRequestConfig(newRequest);
            }
            return requestLogger(newRequest);
          });
          axiosInstance.interceptors.response.use((response) => {
            if (responseHandler) {
              responseHandler({ response, url: response.config.url });
            }
            return responseLogger(response);
          });

          const useAxiosHook = makeUseAxios({
            axios: axiosInstance,
          });

          newContext = {
            slices, adapters, reducers, useConfiguration, useAxiosHook,
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
