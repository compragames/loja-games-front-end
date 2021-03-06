import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'compregames.com',
      storage,
      whitelist: ['auth', 'user', 'cart'],
    },
    reducers
  );

  return persistedReducers;
};
