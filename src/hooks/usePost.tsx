import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const usePost = (queryName: string, props?: UseQueryInterface) => {
  const { cruds } = useClientConfig();
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.postUrl || crud.url,
    queryName,
    method: 'POST',
    idProperty: crud.idProperty,
  })(props);
};

export default usePost;
