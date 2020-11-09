import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useDelete = (queryName: string, props?: UseQueryInterface) => {
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
