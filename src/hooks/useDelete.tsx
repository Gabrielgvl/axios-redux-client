import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const useDelete = (queryName: string, props?: UseQueryInterface) => {
  const { config } = useAxiosContext();
  const { cruds } = config;
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.deleteUrl || `${crud.url}/&{${crud.idProperty}}`,
    queryName,
    method: 'DELETE',
    idProperty: crud.idProperty,
  })(props);
};

export default useDelete;
