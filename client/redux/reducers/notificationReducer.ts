import {createReducer} from '@reduxjs/toolkit';
const initialState = {
  isLoading: true,
  error: null,
  notifications: [],
};

export const notificationReducer = createReducer({initialState}, builder => {
  builder.addCase('getNotificationRequest', (state, actions) => {
    state.isLoading = true;
  }),
    builder.addCase('getNotificationSuccess', (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload;
    }),
    builder.addCase('getNotificationFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
    builder.addCase('clearError', (state, action) => {
      state.error = null;
    });
});
