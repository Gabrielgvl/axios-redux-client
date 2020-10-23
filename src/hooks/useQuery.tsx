import queryMaker from '../queries';
import { useSelector } from '../store';

const useQuery = (queryName, props) => {
  const queries = useSelector((state) => state.config.queries);
  return queryMaker(queries[queryName])(props);
};

export default useQuery;
