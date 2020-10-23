import React, { useMemo } from 'react';
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import entityGenerator from '../utils/entityGenerator';

const ClientContext = React.createContext(null);

// Export custom hooks
export const useStore = createStoreHook(ClientContext);
export const useDispatch = createDispatchHook(ClientContext);
export const useSelector = createSelectorHook(ClientContext);

const ClientProvider = ({ config, children }) => {
  const reducers = useMemo(() => config.queries.concat(config.cruds)
    .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice.reducer }), {}), [config]);

  const slices = useMemo(() => config.queries.concat(config.cruds)
    .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).slice }), {}), [config]);

  const adapters = useMemo(() => config.queries.concat(config.cruds)
    .reduce((obj, e) => ({ ...obj, [e.queryName]: entityGenerator(e).adapter }), {}), [config]);

  const clientStore = useMemo(() => configureStore({
    reducer: combineReducers(reducers),
    preloadedState: { ...config, slices, adapters },
  }), [config]);

  return (
    <Provider context={ClientContext} store={clientStore}>
      {children}
    </Provider>
  );
};

export default ClientProvider;
