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
  const { reducers } = useAxiosContext();
  const clientStore = useMemo(() => configureStore({
    reducer: combineReducers(reducers || {}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  }), [reducers]);

  return (
    <Provider context={ClientContext} store={clientStore}>
      {children}
    </Provider>
  );
};

export default ClientProvider;
