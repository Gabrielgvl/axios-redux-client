import {
  createEntityAdapter,
  createSlice, EntityAdapter, Slice,
} from '@reduxjs/toolkit';
import { BaseEntity } from '../types';

export interface EntityGenerated {
  adapter: EntityAdapter<BaseEntity>,
  slice: Slice,
}

const entityGenerator = ({
  queryName, idProperty, sortComparer,
}): EntityGenerated => {
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
