import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseAxiosInterface } from '../types';

const useList = (queryName: string, props: UseAxiosInterface) => {
  const queries = useSelector((state) => state.config.cruds);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.listUrl || crud.url,
    queryName,
    method: 'GET',
    idProperty: crud.idProperty,
  })(props);
};

export default useList;
