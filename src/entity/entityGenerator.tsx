import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { BaseEntity } from '../types';

const entityGenerator = ({ queryName, idProperty, sortComparer }) => {
  const entityAdapter = createEntityAdapter<BaseEntity>({
    selectId: (entity) => entity[idProperty],
    sortComparer,
  });

  const entitySlice = createSlice({
    name: queryName,
    initialState: entityAdapter.getInitialState(),
    reducers: {
      addOne: entityAdapter.addOne,
      addMany: entityAdapter.addMany,
      setAll: entityAdapter.setAll,
      updateOne: entityAdapter.updateOne,
      updateMany: entityAdapter.updateMany,
      upsertOne: entityAdapter.upsertOne,
      upsertMany: entityAdapter.upsertMany,
    },
  });

  return { adapter: entityAdapter, slice: entitySlice };
};

export default entityGenerator;
