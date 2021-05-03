import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterQueryReducer from "@redux-reducers/filter-query";

export const store = configureStore({
  reducer: {
    filterQuery: filterQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
