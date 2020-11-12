import { ResponseValues } from 'axios-hooks';
import { AxiosPromise } from 'axios';
import queryMaker from '../queries';
import { AxiosRefetch, UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useDelete = (queryName: string, props?: UseQueryInterface): [ResponseValues<any>, (fetchProps?: AxiosRefetch) => AxiosPromise ] => {
  const { cruds } = useClientConfig();
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.deleteUrl || `${crud.url}/&{${crud.idProperty}}`,
    queryName,
    method: 'DELETE',
    idProperty: crud.idProperty,
  })(props);
};

export default useDelete;
