import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userAuth from '../slice/userSlices';
import ownerSlices from '../slice/ownerSlices';
import adminSlices from '../slice/adminSlices';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userAuth,
  owner: ownerSlices,
  admin: adminSlices,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

// Exporting only the store
export default store;

// Exporting the RootState type
export type RootState = ReturnType<typeof store.getState>;
