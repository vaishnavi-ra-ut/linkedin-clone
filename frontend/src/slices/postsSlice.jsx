import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await api.get('/posts');
  return res.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (text) => {
  const res = await api.post('/posts', { text });
  return res.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => { state.loading = false; })
      .addCase(createPost.fulfilled, (state, action) => {
        // add new post at top
        state.items.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;
