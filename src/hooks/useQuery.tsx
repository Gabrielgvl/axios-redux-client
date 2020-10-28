import queryMaker from '../queries';
import { UseQueryInterface } from '../types';
import useAxiosContext from '../context/useAxiosContext';

const useQuery = (queryName: string, props?: UseQueryInterface) => {
  const { config } = useAxiosContext();
  const { queries } = config;
  return queryMaker({ queryName, ...queries[queryName] })(props);
};

export default useQuery;
