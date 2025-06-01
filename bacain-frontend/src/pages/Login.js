import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      alert('Email dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      // Request POST ke backend login API
      const response = await axios.post('http://localhost:6543/api/login', {
        email,
        password,
      });

      // Jika berhasil, backend biasanya mengirim pesan sukses
      alert(response.data.message || 'Login berhasil!');

      // Simpan token atau data user jika backend mengirim (opsional)
      // localStorage.setItem('token', response.data.token);

      navigate('/'); // arahkan ke halaman home
    } catch (error) {
      // Jika error (401, 400, dll) tampilkan pesan dari backend atau default
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Login gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Masuk ke Bacain</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
};

export default Login;
