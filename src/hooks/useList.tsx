import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useList = (queryName: string, props?: UseQueryInterface) => {
  const { cruds } = useClientConfig();
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.listUrl || crud.url,
    queryName,
    method: 'GET',
    idProperty: crud.idProperty,
  })(props);
};

export default useList;
