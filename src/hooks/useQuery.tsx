import { ResponseValues } from 'axios-hooks';
import { AxiosPromise } from 'axios';
import queryMaker from '../queries';
import { AxiosRefetch, UseQueryInterface } from '../types';
import useClientConfig from './useClientConfig';

const useQuery = (queryName: string, props?: UseQueryInterface): [ResponseValues<any>, (fetchProps?: AxiosRefetch) => AxiosPromise ] => {
  const { queries } = useClientConfig();
  return queryMaker({ queryName, ...queries[queryName] })(props);
};

export default useQuery;
