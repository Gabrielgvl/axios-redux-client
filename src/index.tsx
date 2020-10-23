import React from 'react';
import { JwtAuthProvider } from '@gabrielgvl/jwt_auth_react';
import ClientProvider from './store';
import { AxiosClientInterface } from './types';

// const test = {
//   queries: [
//     {
//       url: '/test',
//       queryName: 'teste',
//       method: 'get',
//       idProperty: 'id',
//       sortComparer: () => {},
//     },
//   ],
//   cruds: [
//     {
//       url: '/test',
//       queryName: 'testeCrud',
//       idProperty: 'id',
//       sortComparer: () => {},
//       // getUrl: '',
//       // listUrl: '',
//       // postUrl: '',
//       // deleteUrl: '',
//       // putUrl: null,
//     },
//   ],
//   baseUrl: '/',
//   notificationHandler: (response) => {},
//   auth: 'jwt',
// };

const AxiosClient: React.FC<AxiosClientInterface> = ({ config, children }) => (
  <JwtAuthProvider keyPrefix="axios-client">
    <ClientProvider config={config}>
      {children}
    </ClientProvider>
  </JwtAuthProvider>
);

export default AxiosClient;
