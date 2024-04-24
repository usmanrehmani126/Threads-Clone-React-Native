import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  error: null,
  users: [],
  isLoading: false,
};

export const userReducer = createReducer({initialState}, builder => {
  builder.addCase('userRegisterRequest', (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  });
  builder.addCase('userRegisterSuccess', (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  });
  builder.addCase('userRegisterFailed', (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase('userLoadRequest', (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  });
  builder.addCase('userLoadSuccess', (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  });
  builder.addCase('userLoadFailed', (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });
  builder.addCase('userLoginRequest', (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  });
  builder.addCase('userLoginSuccess', (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  });
  builder.addCase('userLoginFailed', (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = {};
  });

  builder.addCase('userLogoutRequest', (state, action) => {
    state.loading = true;
  });
  builder.addCase('userLogoutSuccess', (state, act1ion) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = {};
  });
  builder.addCase('userlogoutFailed', (state, action) => {
    state.loading = false;
  });

  builder.addCase('getUsersRequest', (state, action) => {
    state.isLoading = true;
  });
  builder.addCase('getUsersSuccess', (state, action) => {
    state.isLoading = false;
    state.users = action.payload;
  });
  builder.addCase('getUsersFailed', (state, action) => {
    state.isLoading = false;
  });

  builder.addCase('clearErrors', (state, action) => {
    state.error = null;
    state.isAuthenticated = false;
  });
});

// { builder.addCase('userRegisterRequest', (state, action) => {
//   state.loading = true;
//   state.isAuthenticated = false;
// });
// builder.addCase('userRegisterSuccess', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = true;
//   state.user = action.payload;
// });
// builder.addCase('userRegisterFailed', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = false;
//   state.error = action.payload;
// });

// builder.addCase('userLoadRequest', (state, action) => {
//   state.loading = true;
//   state.isAuthenticated = false;
// });
// builder.addCase('userLoadSuccess', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = true;
//   state.user = action.payload.user;
//   // state.token = action.payload.token;
// });
// builder.addCase('userLoadFailed', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = false;
// });
// builder.addCase('userLoginRequest', (state, action) => {
//   state.loading = true;
//   state.isAuthenticated = false;
// });
// builder.addCase('userLoginSuccess', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = true;
//   state.user = action.payload;
// });
// builder.addCase('userLoginFailed', (state, action) => {
//   state.loading = false;
//   state.isAuthenticated = false;
//   state.user = {};
//   state.error = action.payload;
// });

// builder.addCase('userLogoutRequest', (state, action) => {
//   state.loading = true;
// });
// builder.addCase('userLogoutSuccess', (state, act1ion) => {
//   state.loading = false;
//   state.isAuthenticated = false;
//   state.user = {};
// });
// builder.addCase('userlogoutFailed', (state, action) => {
//   state.loading = false;
// });
// builder.addCase('getUsersRequest', (state, action) => {
//   state.isLoading = true;
// });
// builder.addCase('getUserSuccess', (state, action) => {
//   state.isLoading = false;
//   state.users = action.payload;
// });
// builder.addCase('getUsersFailed', (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// });
// builder.addCase('clearErrors', (state, action) => {
//   state.error = null;
//   state.isAuthenticated = false;
// });}
