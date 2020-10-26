import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const usePost = (queryName: string, props: UseQueryInterface) => {
  const { config } = useAxiosContext();
  const { cruds } = config;
  const crud = cruds[queryName];
  return queryMaker({
    url: crud.postUrl || crud.url,
    queryName,
    method: 'POST',
    idProperty: crud.idProperty,
  })(props);
};

export default usePost;
