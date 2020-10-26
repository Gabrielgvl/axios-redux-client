import { useDispatch } from '../store';
import useAxiosContext from '../context/useAxiosContext';

const useWriteCache = (entity) => {
  const { slices } = useAxiosContext();
  const dispatch = useDispatch();

  const addOne = (data) => {
    if (entity in slices) {
      dispatch(slices[entity].actions.addOne(data));
    }
  };

  const addMany = (data) => {
    if (entity in slices) {
      dispatch(slices[entity].actions.addMany(data));
    }
  };

  const setAll = (data) => {
    if (entity in slices) {
      dispatch(slices[entity].actions.setAll(data));
    }
  };

  const upsertOne = (data) => {
    if (entity in slices) {
      dispatch(slices[entity].actions.upsertOne(data));
    }
  };

  const upsertMany = (data) => {
    if (entity in slices) {
      dispatch(slices[entity].actions.upsertMany(data));
    }
  };

  return {
    addOne, addMany, setAll, upsertOne, upsertMany,
  };
};

export default useWriteCache;
