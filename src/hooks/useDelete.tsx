import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseAxiosInterface } from '../types';

const useDelete = (queryName: string, props: UseAxiosInterface) => {
  const queries = useSelector((state) => state.config.cruds);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.deleteUrl || crud.url,
    queryName,
    method: 'DELETE',
    idProperty: crud.idProperty,
  })(props);
};

export default useDelete;
