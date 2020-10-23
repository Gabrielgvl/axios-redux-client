import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseAxiosInterface } from '../types';

const useEdit = (queryName: string, props: UseAxiosInterface) => {
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
