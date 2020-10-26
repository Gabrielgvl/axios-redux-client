import { shallowEqual } from 'react-redux';
import { useSelector } from '../store';

const useReadCache = (entity, id) => {
  const adapters = useSelector((state) => state._adapters);
  const selectors = adapters[entity].getSelectors();

  const selectedAll = useSelector((state) => selectors.selectAll(state[entity]),
    shallowEqual);
  const selectedById = useSelector((state) => selectors.selectById(state[entity], id),
    shallowEqual);

  return { selectedAll, selectedById };
};

export default useReadCache;
