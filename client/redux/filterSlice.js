import { createSlice } from '@reduxjs/toolkit';

// how to apply both filter?
//product slice - no - BE - add in BE - add filters to be passed as QUery params 

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
  price: 0,
  category: []
},
  reducers: {
    setPriceFilter: (state, action) => {
      state.price = Math.max(0, action.payload);
    },
    setCategoryFilter: (state, action) => {
        state.category.push(action.payload)
    },
  },
});

export const filterReducer =  filterSlice.reducer;
export const { setCategoryFilter, setPriceFilter } = filterSlice.actions;


