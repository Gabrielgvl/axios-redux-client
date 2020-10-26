import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const useQuery = (queryName: string, props: UseQueryInterface) => {
  const queries = useSelector((state) => state._config.queries);
  console.log(queries, queryName);
  return queryMaker(queries[queryName])(props);
};

export default useQuery;
