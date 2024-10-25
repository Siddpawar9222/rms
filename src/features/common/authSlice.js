import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import { PURGE } from 'redux-persist';

const initialState = {
  userName: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userName = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userName = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    
    extraReducers: (builder) => {
      builder.addCase(PURGE, (state) => {
        // Reset auth state when PURGE action is called
        return initialState;
      });
    },
    

  },
});

// Export actions
export const { loginSuccess, logout } = authSlice.actions;

// Persist config for auth slice
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userName', 'role', 'isAuthenticated'],    // Persist these fields
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
export default persistedAuthReducer;
