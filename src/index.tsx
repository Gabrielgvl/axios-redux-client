import React from 'react';
import ClientProvider from './store';
import { AxiosClientInterface } from './types';
import { AxiosProvider } from './context';

const AxiosClient: React.FC<AxiosClientInterface> = ({ config, children }) => (
  <AxiosProvider config={config}>
    <ClientProvider>
      {children}
    </ClientProvider>
  </AxiosProvider>
);

export * from './hooks';

export * from './types';

export default AxiosClient;
