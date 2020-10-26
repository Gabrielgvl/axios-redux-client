import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const useEdit = (queryName: string, props: UseQueryInterface) => {
  const queries = useSelector((state) => state.config.cruds);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.putUrl || crud.url,
    queryName,
    method: 'PUT',
    idProperty: crud.idProperty,
  })(props);
};

export default useEdit;
