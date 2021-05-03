import { FilterQuery } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux-store";

const initialState: FilterQuery = {
  nameContains: null,
  typeEq: null,
  sizeGt: null,
  sizeLt: null,
};

export const filterQuery = createSlice({
  name: "filterQuery",
  initialState,
  reducers: {
    setNameContains: (state, action: PayloadAction<string | null>) => {
      state.nameContains = action.payload;
    },
    setTypeEq: (state, action: PayloadAction<string | null>) => {
      state.typeEq = action.payload;
    },
    setSizeGt: (state, action: PayloadAction<number | null>) => {
      state.sizeGt = action.payload;
    },
    setSizeLt: (state, action: PayloadAction<number | null>) => {
      state.sizeLt = action.payload;
    },
  },
});

export const {
  setNameContains,
  setTypeEq,
  setSizeGt,
  setSizeLt,
} = filterQuery.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFilterQuery = (state: RootState) => state.filterQuery;

export default filterQuery.reducer;
