// 📁 File: src/redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Utilitas localStorage
const saveToLocalStorage = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('books');
  return data ? JSON.parse(data) : [];
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: loadFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.items.push(action.payload);
      saveToLocalStorage(state.items);
    },
    deleteBook: (state, action) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    editBook: (state, action) => {
      const { id, updatedBook } = action.payload;
      const index = state.items.findIndex((book) => book.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedBook };
        saveToLocalStorage(state.items);
      }
    },
  },
});

export const { addBook, deleteBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;