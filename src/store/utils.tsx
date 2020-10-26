import { createReducer } from '@reduxjs/toolkit';

export const createEmptyReducer = (initialState) => createReducer(initialState, ((builder) => {
  builder.addDefaultCase(() => {});
}));
