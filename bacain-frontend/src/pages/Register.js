import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!email || !password || !confirmPassword) {
      alert('Semua kolom harus diisi!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }

    if (password.length < 6) {
      alert('Password harus memiliki minimal 6 karakter!');
      return;
    }

    setLoading(true);
    try {
      // Kirim data pendaftaran ke backend
      const response = await axios.post('http://localhost:6543/api/register', {
        email,
        password,
        username: email.split('@')[0], // contoh buat username dari email
      });

      alert(response.data.message || 'Pendaftaran berhasil!');
      navigate('/login'); // arahkan ke halaman login setelah berhasil daftar
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Pendaftaran gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
