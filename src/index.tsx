import React from 'react';
import { JwtAuthProvider } from '@gabrielgvl/jwt_auth_react';
import ClientProvider from './store';
import { AxiosClientInterface } from './types';
import { AxiosProvider } from './context';

const AxiosClient: React.FC<AxiosClientInterface> = ({ config, children }) => (
  <JwtAuthProvider keyPrefix="axios-client">
    <AxiosProvider config={config}>
      <ClientProvider>
        {children}
      </ClientProvider>
    </AxiosProvider>
  </JwtAuthProvider>
);

export * from './hooks';

export * from './types';

export default AxiosClient;
