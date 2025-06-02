import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); 

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/">
          📚 <span className="ms-2">Bacain</span>
        </NavLink>

        <ul className="navbar-nav d-flex flex-row gap-3 align-items-center mb-0">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-dark fw-semibold text-decoration-underline" : "text-dark text-decoration-none"}>
              Beranda
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/books" className={({ isActive }) =>
              isActive ? "text-dark fw-semibold text-decoration-underline" : "text-dark text-decoration-none"}>
              Buku
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categories" className={({ isActive }) =>
              isActive ? "text-dark fw-semibold text-decoration-underline" : "text-dark text-decoration-none"}>
              Kategori
            </NavLink>
          </li>

          {/* Jika pengguna sudah login, tampilkan nama pengguna dan tombol logout */}
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-dark fw-semibold">{user.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-dark fw-semibold" onClick={handleLogout}>
                  Keluar
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Jika pengguna belum login, tampilkan tombol login dan register */}
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) =>
                  isActive ? "text-dark fw-semibold text-decoration-underline" : "text-dark text-decoration-none"}>
                  Masuk
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className={({ isActive }) =>
                  isActive ? "text-dark fw-semibold text-decoration-underline" : "text-dark text-decoration-none"}>
                  Daftar
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
