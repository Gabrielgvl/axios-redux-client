import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useQuery = (queryName: string, props?: UseQueryInterface) => {
  const { queries } = useClientConfig();
  return queryMaker({ queryName, ...queries[queryName] })(props);
};

export default useQuery;
