import React, { useMemo } from 'react';
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook, TypedUseSelectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import entityGenerator from '../entity/entityGenerator';
import { AxiosClientState } from '../types';
import { createEmptyReducer } from './utils';

const initialState: AxiosClientState = {
  _slices: {},
  _adapters: {},
  _config: {
    queries: [],
    cruds: [],
    baseUrl: '/',
    auth: 'jwt',
  },
};

const ClientContext = React.createContext<Partial<AxiosClientState>>(initialState);

// Export custom hooks
// @ts-ignore
export const useStore = createStoreHook(ClientContext);
// @ts-ignore
export const useDispatch = createDispatchHook(ClientContext);
// @ts-ignore
export const useSelector: TypedUseSelectorHook<AxiosClientState> = createSelectorHook(ClientContext);

const ClientProvider = ({ config, children }) => {
  const clientStore = useMemo(() => {
    const fullConfig = { ...initialState._config, ...config };
    const { queries, cruds } = fullConfig;
    // map queries to an object with key = queryName and value = queryReducer
    const reducers = queries.concat(cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice.reducer }), {});
    // map queries to an object with key = queryName and value = querySlice
    const slices = queries.concat(cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice }), {});
    // map queries to an object with key = queryName and value = queryAdapter
    const adapters = queries.concat(cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).adapter }), {});

    return configureStore({
      reducer: combineReducers({
        ...reducers, _slices: createEmptyReducer(slices), _adapters: createEmptyReducer(adapters), _config: createEmptyReducer(fullConfig),
      }),
    });
  }, [config]);

  return (
  // @ts-ignore
    <Provider context={ClientContext} store={clientStore}>
      {children}
    </Provider>
  );
};

export default ClientProvider;
