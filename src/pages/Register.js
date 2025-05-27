import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi form
    if (!email || !password || !confirmPassword) {
      alert("Semua kolom harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      alert("Password harus memiliki minimal 6 karakter!");
      return;
    }

    // Simulasi penyimpanan data pengguna di localStorage
    const user = {
      email,
      password
    };

    localStorage.setItem('user', JSON.stringify(user));  // Simpan data user ke localStorage
    alert('Pendaftaran berhasil! Silakan login.');
    navigate('/login');  // Arahkan ke halaman login setelah berhasil mendaftar
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Daftar ke Bacain</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Kata Sandi</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Konfirmasi Kata Sandi</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Daftar</button>
      </form>
    </div>
  );
};

export default Register;
