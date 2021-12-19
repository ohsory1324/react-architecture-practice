import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IComment } from '../models/comment';
import { IPost } from '../models/post';

export interface DataState {
  comments: IComment[];
  posts: IPost[];
};

const initialState: DataState = {
  comments: [],
  posts: [],
};

const commentReducers = {
  addComment: (state: DataState, action: PayloadAction<IComment>) => {
    state.comments.push(action.payload);
  },
  removeComment: (state: DataState, action: PayloadAction<number>) => {
    state.comments = state.comments.filter((comment) => comment.id !== action.payload);
  },
  replaceComments: (state: DataState, action: PayloadAction<IComment[]>) => {
    state.comments = action.payload;
  },
  replaceComment: (state: DataState, action: PayloadAction<{ index: number, comment: IComment}>) => {
    state.comments[action.payload.index] = action.payload.comment;
  },
};

const postReducers = {
  addPost: (state: DataState, action: PayloadAction<IPost>) => {
    state.posts.push(action.payload);
  },
  removePost: (state: DataState, action: PayloadAction<number>) => {
    state.posts = state.posts.filter((post) => post.id !== action.payload);
  },
  replacePosts: (state: DataState, action: PayloadAction<IPost[]>) => {
    state.posts = action.payload;
  },
  replacePost: (state: DataState, action: PayloadAction<{ index: number, post: IPost}>) => {
    state.posts[action.payload.index] = action.payload.post;
  },
};

export const dataSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    ...commentReducers,
    ...postReducers,
  },
});

export const {
  addComment,
  removeComment,
  replaceComments,
  replaceComment,
  addPost,
  removePost,
  replacePosts,
  replacePost,
} = dataSlice.actions;

export default dataSlice.reducer;
