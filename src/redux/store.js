
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Import your existing slices
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import persistedAuthReducer from '../features/common/authSlice'; // Persisted auth reducer

// Combine your reducers
const rootReducer = combineReducers({
    header: headerSlice,
    modal: modalSlice,
    rightDrawer: rightDrawerSlice,
    auth: persistedAuthReducer, // Use persisted auth reducer
});

// Persist configuration for the store
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Persist only the auth state (you can add more slices if needed)
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create the persistor
export const persistor = persistStore(store);
