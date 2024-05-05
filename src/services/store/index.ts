//store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevToolsEnhancerOptions, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['CategoriesReducer'], // Specify which slices to persist (optional)
};

const getEnhancers = () => {
  if (process.env.NODE_ENV === 'development') {
    const reactotron = require('../../../ReactotronConfig').default;
    return [reactotron.createEnhancer()];
  }
  return [];
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: (getDefaultEnhancers: () => DevToolsEnhancerOptions[]) => {
    return getDefaultEnhancers().concat(getEnhancers());
  },
});

const persistor = persistStore(store);

const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export { store, persistor, useAppDispatch };
