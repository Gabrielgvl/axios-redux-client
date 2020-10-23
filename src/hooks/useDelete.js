import queryMaker from '../queries';
import { useSelector } from '../store';

const useDelete = (queryName, props) => {
  const queries = useSelector((state) => state.cruds);
  const crud = queries[queryName];
  return queryMaker({ url: crud.deleteUrl || crud.url, queryName, method: 'DELETE' })(props);
};

export default useDelete;
