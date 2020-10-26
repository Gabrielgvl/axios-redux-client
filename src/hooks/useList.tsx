import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const useList = (queryName: string, props: UseQueryInterface) => {
  const queries = useSelector((state) => state);
  console.log(queries);
  const crud = queries[queryName];
  return queryMaker({
    url: crud.listUrl || crud.url,
    queryName,
    method: 'GET',
    idProperty: crud.idProperty,
  })(props);
};

export default useList;
