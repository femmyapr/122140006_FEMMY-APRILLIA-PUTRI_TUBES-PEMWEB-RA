// 📁 File: src/pages/Books.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, editBook } from '../redux/booksSlice';
import { Link } from 'react-router-dom';

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      dispatch(deleteBook(id));
    }
  };

  const handleEdit = (book) => {
    const newTitle = prompt('Edit judul:', book.title);
    const newAuthor = prompt('Edit penulis:', book.author);
    if (newTitle && newAuthor) {
      dispatch(editBook({ id: book.id, updatedBook: { title: newTitle, author: newAuthor } }));
    }
  };

  const handleStatusChange = (id, status) => {
    dispatch(editBook({ id, updatedBook: { status } }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📘 Daftar Buku</h2>

      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card shadow-sm h-100 p-3">
              <h5>{book.title}</h5>
              <p className="text-muted"><em>oleh {book.author}</em></p>
              <select
                className="form-select mb-2"
                value={book.status}
                onChange={(e) => handleStatusChange(book.id, e.target.value)}
              >
                <option>Ingin dibaca</option>
                <option>Sedang dibaca</option>
                <option>Selesai dibaca</option>
              </select>
              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end mt-3">
        <Link to="/add-book" className="btn btn-primary">Tambah Buku +</Link>
      </div>
    </div>
  );
};

export default Books;