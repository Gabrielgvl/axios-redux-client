import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useGet = (queryName: string, props?: UseQueryInterface) => {
  const { cruds } = useClientConfig();
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.getUrl || `${crud.url}/&{${crud.idProperty}}`,
    queryName,
    method: 'GET',
    idProperty: crud.idProperty,
  })(props);
};

export default useGet;
