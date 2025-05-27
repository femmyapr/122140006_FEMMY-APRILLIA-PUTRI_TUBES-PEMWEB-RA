import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-primary bg-opacity-25 text-center py-5">
      <h1 className="fw-bold text-primary">Selamat Datang di Bacain</h1>
      <p className="fs-5 text-secondary">
        Kelola koleksi bacaanmu dan simpan buku favoritmu dalam satu aplikasi digital
      </p>
      <Link to="/login" className="btn btn-warning px-4 py-2 fw-semibold mt-3">
        Mulai Sekarang
      </Link>
    </div>
  );
};

export default Home;