import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Menggunakan useNavigate untuk pengalihan halaman

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Validasi input email dan password
    if (!email || !password) {
      alert("Email dan password harus diisi");
      return;
    }

    try {
      // Memanggil API login
      const response = await loginUser(email, password);
      console.log('Response login:', response);  // Log respons dari server untuk debugging

      if (response.success) {
        // Redirect ke halaman home jika login berhasil
        navigate('/home');
      } else {
        // Menampilkan pesan jika login gagal
        alert('Login gagal, coba lagi: ' + response.message); // Menampilkan pesan error lebih jelas
      }
    } catch (error) {
      console.error('Error during login:', error); // Menangani error pada saat proses login
      alert('Terjadi kesalahan, coba lagi');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Masuk ke Bacain</h2>
      <form onSubmit={handleLogin}> {/* Menambahkan onSubmit untuk menangani form submission */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email} // Mengikat nilai email ke state
            onChange={(e) => setEmail(e.target.value)} // Mengupdate state email
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Kata Sandi</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password} // Mengikat nilai password ke state
            onChange={(e) => setPassword(e.target.value)} // Mengupdate state password
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Masuk</button>
      </form>
    </div>
  );
};

// Fungsi loginUser untuk melakukan autentikasi
const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://api.bacain.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Cek apakah status respons API berhasil
    if (!response.ok) {
      console.error('HTTP Error:', response.status);  // Log status error jika respons tidak ok
      throw new Error('Gagal menghubungi server');
    }

    const data = await response.json();
    console.log('Server Response:', data);  // Log server response untuk debugging

    // Menangani respons dari server
    if (data.success) {
      return { success: true };
    } else {
      return { success: false, message: data.message }; // Mengembalikan pesan jika login gagal
    }
  } catch (error) {
    console.error('Error during login:', error); // Menangani error dari server
    return { success: false, message: 'Terjadi kesalahan, coba lagi.' };
  }
};

export default Login;
