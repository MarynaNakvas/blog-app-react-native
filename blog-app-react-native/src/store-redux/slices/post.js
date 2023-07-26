import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, addPost, removePost, toggleBooked } from '../thunks/post';

const initialState = {
  user: null,
  allPosts: [],
  bookedPosts: [],
  loading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload || [];
      state.bookedPosts = action.payload ? action.payload.filter((post) => post.booked) : [];
      state.loading = false;
    })
    builder.addCase(fetchPosts.rejected, state => {
      state.loading = false;
    })
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.allPosts = [{...action.payload}, ...state.allPosts];
    })
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.allPosts = state.allPosts.filter((post) => post.id !== action.payload);
      state.bookedPosts = state.bookedPosts.filter((post) => post.id !== action.payload);
    })
    builder.addCase(toggleBooked.fulfilled, (state, action) => {
      const allPosts = state.allPosts.map((post) => {
          if (post.id === action.payload) {
              post.booked = !post.booked
          }
          return post
      });
      state.allPosts = allPosts;
      state.bookedPosts = allPosts.filter((post) => post.booked);
    })
  },
})

export const { setUser } = postSlice.actions;
export default postSlice.reducer;
