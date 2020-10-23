import queryMaker from '../queries';
import { useSelector } from '../store';

const usePost = (queryName, props) => {
  const queries = useSelector((state) => state.cruds);
  const crud = queries[queryName];
  return queryMaker({ url: crud.postUrl || crud.url, queryName, method: 'POST' })(props);
};

export default usePost;
