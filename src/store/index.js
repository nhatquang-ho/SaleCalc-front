import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';


// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Export the actions and the store
export default store;
