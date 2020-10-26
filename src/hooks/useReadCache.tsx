import { shallowEqual } from 'react-redux';
import { useSelector } from '../store';
import useAxiosContext from '../context/useAxiosContext';

const useReadCache = (entity, id) => {
  const { adapters } = useAxiosContext();
  const selectors = adapters[entity].getSelectors();

  const selectedAll = useSelector((state) => selectors.selectAll(state[entity]),
    shallowEqual);
  const selectedById = useSelector((state) => selectors.selectById(state[entity], id),
    shallowEqual);

  return { selectedAll, selectedById };
};

export default useReadCache;
