import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  count: 0,
};

// Create a slice of the state
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice;

// Create the Redux store
const store = configureStore({
  reducer: {
    counter: reducer,
  },
});

// Export the actions and the store
export const { increment, decrement } = actions;
export default store;
