import { ConfigInterface } from 'swr/dist/types';

export const configDefault = {
  queries: {},
  cruds: {},
  baseURL: '/',
};

export const defaultSWRConfig: ConfigInterface = {
  suspense: true,

};
