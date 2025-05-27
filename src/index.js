// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Mengimpor store Redux
import App from './App';
import './index.css'; // Pastikan file index.css diimpor di sini

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // Harus mencocokkan ID dari element 'root' di index.html
);
