import { useDispatch } from '../store';
import useAxiosContext from '../context/useAxiosContext';

const useWriteCache = (entity) => {
  const { slices } = useAxiosContext();
  const dispatch = useDispatch();

  const addOne = (data) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.addOne(data));
    }
  };

  const addMany = (data) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.addMany(data));
    }
  };

  const setAll = (data) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.setAll(data));
    }
  };

  const upsertOne = (data) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.upsertOne(data));
    }
  };

  const upsertMany = (data) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.upsertMany(data));
    }
  };

  const removeOne = (id) => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.removeOne(id));
    }
  };

  const removeAll = () => {
    if (slices && entity in slices) {
      dispatch(slices[entity].actions.removeAll(entity));
    }
  };

  return {
    addOne, addMany, setAll, upsertOne, upsertMany, removeAll, removeOne,
  };
};

export default useWriteCache;
