import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import {postReducer} from './reducers/postReducer';
import {notificationReducer} from './reducers/notificationReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default store;
