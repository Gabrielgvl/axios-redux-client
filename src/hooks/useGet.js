import queryMaker from '../queries';
import { useSelector } from '../store';

const useGet = (queryName, props) => {
  const queries = useSelector((state) => state.cruds);
  const crud = queries[queryName];
  return queryMaker({ url: crud.getUrl || crud.url, queryName, method: 'GET' })(props);
};

export default useGet;
