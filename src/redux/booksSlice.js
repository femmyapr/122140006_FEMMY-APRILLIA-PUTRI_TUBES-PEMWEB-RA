import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks: (state, action) => {
      return action.payload;
    },
    addBook: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBooks, addBook } = booksSlice.actions;
export default booksSlice.reducer;
