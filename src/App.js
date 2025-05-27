import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Register from './pages/Register';  // Impor halaman Register
import Navbar from './pages/Navbar';  // Impor Navbar
import Home from './pages/Home';  // Halaman Beranda
import AddBook from './pages/AddBook';  // Halaman untuk menambahkan buku
import Books from './pages/Books';  // Halaman daftar buku
import Categories from './pages/Categories';  // Halaman kategori buku
import Login from './pages/Login';  // Halaman login

const App = () => {
  return (
    <Provider store={store}>  {/* Provider Redux untuk state management */}
      <Router>
        <Navbar />  {/* Navbar ditampilkan di setiap halaman */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Halaman Beranda */}
          <Route path="/books" element={<Books />} />  {/* Halaman Buku */}
          <Route path="/add-book" element={<AddBook />} />  {/* Halaman tambah buku */}
          <Route path="/categories" element={<Categories />} />  {/* Halaman kategori */}
          <Route path="/login" element={<Login />} />  {/* Halaman Login */}
          <Route path="/register" element={<Register />} />  {/* Halaman Register */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
