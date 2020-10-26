import React, { useMemo } from 'react';
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook, TypedUseSelectorHook, ReactReduxContextValue,
} from 'react-redux';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import entityGenerator from '../entity/entityGenerator';
import { AxiosClientState } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const ClientContext = React.createContext(
    {} as ReactReduxContextValue<any, AnyAction>,
);

// Export custom hooks
export const useStore = createStoreHook(ClientContext);
export const useDispatch = createDispatchHook(ClientContext);
export const useSelector: TypedUseSelectorHook<AxiosClientState> = createSelectorHook(ClientContext);

const ClientProvider = ({ children }) => {
  const { config } = useAxiosContext();
  const clientStore = useMemo(() => {
    const { queries, cruds } = config;
    const queryList = Object.entries(queries);
    const crudsList = Object.entries(cruds);

    // map queries to an object with key = queryName and value = queryReducer
    const reducers = queryList.concat(crudsList)
      .reduce((obj, [queryName, entity]) => ({
        ...obj,
        [queryName]: entityGenerator({ queryName, idProperty: entity.idProperty, sortComparer: entity.sortComparer }).slice.reducer,
      }), {});

    return configureStore({
      reducer: combineReducers(reducers),
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });
  }, [config]);

  return (
    <Provider context={ClientContext} store={clientStore}>
      {children}
    </Provider>
  );
};

export default ClientProvider;
