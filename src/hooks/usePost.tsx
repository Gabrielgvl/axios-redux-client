import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const usePost = (queryName: string, props: UseQueryInterface) => {
  const queries = useSelector((state) => state._config.cruds);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.postUrl || crud.url,
    queryName,
    method: 'POST',
    idProperty: crud.idProperty,
  })(props);
};

export default usePost;
