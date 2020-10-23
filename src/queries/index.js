import useAxios from '../hooks/useAxios';

const queryMaker = ({
  url,
  queryName,
  method,
}) => ({ manual = method.toLowerCase() !== 'get', options = {}, params = {} }) => useAxios({
  url, method, queryName, manual, options, params,
});

export default queryMaker;
