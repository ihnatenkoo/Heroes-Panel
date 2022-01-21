import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  activeFilter: 'all',
  filters: [],
  filterLoadingStatus: 'idle',
}

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/filters")
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    onFilterChange: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFilters.pending, state => {state.filterLoadingStatus = 'loading'})
    .addCase(fetchFilters.fulfilled, (state,action) => {
      state.filterLoadingStatus = 'idle';
      state.filters = action.payload;
    })
    .addCase(fetchFilters.rejected, state => {state.filterLoadingStatus = 'error'})
    .addDefaultCase(() => {})
   }
})


const {actions, reducer} = filtersSlice;

export default reducer;
export const {onFilterChange, getAllFilters} = actions;