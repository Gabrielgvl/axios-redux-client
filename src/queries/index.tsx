import useAxios from '../hooks/useAxios';
import { QueryEntity, UseAxiosInterface } from '../types';

const queryMaker = ({
  url,
  queryName,
  method,
  idProperty,
}: QueryEntity) => ({ manual, options, params }: UseAxiosInterface) => useAxios({
  url, idProperty, method, queryName, manual, options, params,
});

export default queryMaker;
