import queryMaker from '../queries';
import { useSelector } from '../store';

const useList = (queryName, props) => {
  const queries = useSelector((state) => state.cruds);
  const crud = queries[queryName];
  return queryMaker({ url: crud.listUrl || crud.url, queryName, method: 'GET' })(props);
};

export default useList;
