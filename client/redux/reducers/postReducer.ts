import {createReducer, createSlice} from '@reduxjs/toolkit';

const intialState = {
  posts: [],
  post: {},
  error: null,
  isLoading: true,
  isSuccess: false,
};

export const postReducer = createReducer({intialState}, builder => {
  builder.addCase('postCreateRequest', (state, action) => {
    state.isLoading = true;
    state.isSuccess = false;
  });
  builder.addCase('postCreateSuccess', (state, action) => {
    state.isLoading = false;
    state.post = action.payload;
    state.isSuccess = true;
  });
  builder.addCase('postCreateFailed', (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSuccess = false;
  });
  builder.addCase('getAllPostRequest', (state, action) => {
    state.isLoading = true;
  });
  builder.addCase('getAllPostSuccess', (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
  });
  builder.addCase('getAllPostFailed', (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  builder.addCase('clearErrors', (state, action) => {
    state.error = null;
    state.isSuccess = false;
  });
});
