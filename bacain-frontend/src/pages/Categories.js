// 📁 File: src/pages/Categories.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Categories = () => {
  const { items: books } = useSelector((state) => state.books);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Tetapkan kategori tetap (fixed)
  const categories = ['Fiksi', 'Non Fiksi', 'Pengembangan Diri'];

  // Filter berdasarkan kategori
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 Kategori Buku</h2>

      <select
        className="form-select mb-4"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Semua Kategori</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4 mb-3" key={book.id}>
              <div className="card h-100 shadow-sm p-3">
                <h5>{book.title}</h5>
                <p className="text-muted">oleh {book.author}</p>
                <p><strong>Kategori:</strong> {book.category}</p>
                <p>{book.note}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Tidak ada buku dalam kategori ini.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;