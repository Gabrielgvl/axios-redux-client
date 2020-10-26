import useAxios from '../hooks/useAxios';
import { UseAxiosInterface, UseQueryInterface } from '../types';

const queryMaker = ({
  url,
  queryName,
  method,
  idProperty,
}: UseAxiosInterface) => ({ manual, options, params }: UseQueryInterface) => useAxios({
  url, idProperty, method, queryName, manual, options, params,
});

export default queryMaker;
