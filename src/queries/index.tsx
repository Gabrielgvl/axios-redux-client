import useAxios from '../hooks/useAxios';
import { UseAxiosInterface, UseQueryInterface } from '../types';

const queryMaker = ({
  url,
  queryName,
  method,
  idProperty,
}: UseAxiosInterface) => {
  if (!url || !method) {
    throw Error(`${queryName} doesn't have url or method!`);
  }
  return ({ manual, options, params }: UseQueryInterface = {}) => useAxios({
    url, idProperty, method, queryName, manual, options, params,
  });
};

export default queryMaker;
