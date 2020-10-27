import { shallowEqual } from 'react-redux';
import { useSelector } from '../store';
import useAxiosContext from '../context/useAxiosContext';

const useReadCache = (entity: string, id?: string | number) => {
  const { adapters } = useAxiosContext();

  const entityAdapter = adapters ? adapters[entity] : null;

  const selectedAll = useSelector((state) => {
    if (!entityAdapter) return null;
    return entityAdapter.getSelectors().selectAll(state[entity]);
  },
  shallowEqual);

  const selectedById = useSelector((state) => {
    if (!entityAdapter || !id) return null;
    return entityAdapter.getSelectors().selectById(state[entity], id);
  },
  shallowEqual);

  return { selectedAll, selectedById };
};

export default useReadCache;
