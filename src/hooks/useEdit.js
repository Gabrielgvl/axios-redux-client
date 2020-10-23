import queryMaker from '../queries';
import { useSelector } from '../store';

const useEdit = (queryName, props) => {
  const queries = useSelector((state) => state.cruds);
  const crud = queries[queryName];
  return queryMaker({ url: crud.putUrl || crud.url, queryName, method: 'PUT' })(props);
};

export default useEdit;
