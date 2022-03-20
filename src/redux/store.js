import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import messageSlice from './slices/messageSlice';
import userSlice from './slices/userSlice';
import loadStateFromLocalStorage from './preloadedState/loadStateFromLocalStorage';
import localStorageMiddleware from './middlewares/localStorageMiddleware';

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    message: messageSlice.reducer,
    users: userSlice.reducer,
  },
  preloadedState: loadStateFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
