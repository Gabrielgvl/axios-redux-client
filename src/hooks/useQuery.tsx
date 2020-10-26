import queryMaker from '../queries';
import { useSelector } from '../store';
import { UseQueryInterface } from '../types';

const useQuery = (queryName: string, props: UseQueryInterface) => {
  const queries = useSelector((state) => state._config.queries);
  return queryMaker({ queryName, ...queries[queryName] })(props);
};

export default useQuery;
