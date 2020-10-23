import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseAxiosInterface } from '../types';

const usePost = (queryName: string, props: UseAxiosInterface) => {
  const queries = useSelector((state) => state.config.cruds);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.postUrl || crud.url,
    queryName,
    method: 'POST',
    idProperty: crud.idProperty,
  })(props);
};

export default usePost;
