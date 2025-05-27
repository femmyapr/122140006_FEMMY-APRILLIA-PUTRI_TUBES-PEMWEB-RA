// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import categoriesReducer from './categoriesSlice'; // Perhatikan penamaan file (pastikan file ini ada)

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
  },
});

export default store;