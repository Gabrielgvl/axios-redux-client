import useAxios from '../hooks/useAxios';
import { QueryEntity, UseQueryInterface } from '../types';

const queryMaker = ({
  url,
  queryName,
  method,
  idProperty,
}: QueryEntity) => ({ manual, options, params }: UseQueryInterface) => useAxios({
  url, idProperty, method, queryName, manual, options, params,
});

export default queryMaker;
