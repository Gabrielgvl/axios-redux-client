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

const initialState: AxiosClientState = {
  slices: {},
  adapters: {},
  config: {
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
    // map queries to an object with key = queryName and value = queryReducer
    const reducers = config.queries.concat(config.cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice.reducer }), {});
    // map queries to an object with key = queryName and value = querySlice
    const slices = config.queries.concat(config.cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice }), {});
    // map queries to an object with key = queryName and value = queryAdapter
    const adapters = config.queries.concat(config.cruds)
      .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).adapter }), {});

    return configureStore({
      reducer: combineReducers(reducers),
      preloadedState: { slices, adapters, config },
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
