// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import authReducer from './authSlice'; // 👈 Directly importing the reducer

const persistConfig = {
  key: 'auth',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'strongsecretkey',
      onError: (err) => {
        console.error('Encryption error:', err);
      },
    }),
  ],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
