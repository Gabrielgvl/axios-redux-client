import React from 'react';
import ClientProvider from './store';
import { AxiosClientInterface } from './types';
import { AxiosProvider } from './context';

const AxiosClient: React.FC<AxiosClientInterface> = ({ useConfiguration, children }) => (
  <AxiosProvider useConfiguration={useConfiguration}>
    <ClientProvider>
      {children}
    </ClientProvider>
  </AxiosProvider>
);

export * from './hooks';

export * from './types';

export default AxiosClient;
