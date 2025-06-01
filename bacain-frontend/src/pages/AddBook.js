import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = ['Fiksi', 'Non Fiksi', 'Pengembangan Diri'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title,
      author,
      category,
      note,
      status: 'Ingin dibaca',
    };
    dispatch(addBook(newBook));
    navigate('/books');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Tambah Buku Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Penulis</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Kategori</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="note" className="form-label">Catatan</label>
          <textarea
            className="form-control"
            id="note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Tambah Buku</button>
      </form>
    </div>
  );
};

export default AddBook;