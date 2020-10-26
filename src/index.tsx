import React from 'react';
import { JwtAuthProvider } from '@gabrielgvl/jwt_auth_react';
import ClientProvider from './store';
import { AxiosClientInterface } from './types';

const AxiosClient: React.FC<AxiosClientInterface> = ({ config, children }) => (
  <JwtAuthProvider keyPrefix="axios-client">
    <ClientProvider config={config}>
      {children}
    </ClientProvider>
  </JwtAuthProvider>
);

// export {
//   useDelete, useEdit, useGet, useList, usePost, useReadCache, useWriteCache, useQuery,
// };

export * from './hooks';

export * from './types';

export default AxiosClient;
