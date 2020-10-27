import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const useEdit = (queryName: string, props: UseQueryInterface) => {
  const { config } = useAxiosContext();
  const { cruds } = config;
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.putUrl || `${crud.url}/&{${crud.idProperty}}`,
    queryName,
    method: 'PUT',
    idProperty: crud.idProperty,
  })(props);
};

export default useEdit;
