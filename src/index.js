import React from 'react';
import useJwtAuth, { JwtAuthProvider } from '@gabrielgvl/jwt_auth_react';
import ClientProvider from './store';
import hooks from './hooks';

const test = {
  queries: [
    {
      url: '/test',
      queryName: 'teste',
      method: 'get',
      idProperty: 'id',
      sortComparer: () => {},
    },
  ],
  cruds: [
    {
      url: '/test',
      queryName: 'testeCrud',
      idProperty: 'id',
      sortComparer: () => {},
      // getUrl: '',
      // listUrl: '',
      // postUrl: '',
      // deleteUrl: '',
      // putUrl: null,
    },
  ],
  baseUrl: '/',
  notificationHandler: (response) => {},
};

const AxiosClient = ({ config, children }) => (
  <JwtAuthProvider keyPrefix="axios-client">
    <ClientProvider config={test}>
      {children}
    </ClientProvider>
  </JwtAuthProvider>
);

export { useJwtAuth };

export default AxiosClient;
