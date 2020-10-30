import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const useList = (queryName: string, props?: UseQueryInterface) => {
  const { config } = useAxiosContext();
  const { cruds } = config;
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.listUrl || crud.url,
    queryName,
    method: 'GET',
    idProperty: crud.idProperty,
  })(props);
};

export default useList;
