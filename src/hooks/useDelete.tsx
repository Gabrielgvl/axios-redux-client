import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const useDelete = (queryName: string, props: UseQueryInterface) => {
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
