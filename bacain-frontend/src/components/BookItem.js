import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook, editBook } from '../redux/booksSlice';

const BookItem = ({ book }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(book.status);

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      dispatch(deleteBook(book.id));
    }
  };

  const handleEdit = () => {
    const newTitle = prompt('Edit judul:', book.title);
    const newAuthor = prompt('Edit penulis:', book.author);
    if (newTitle && newAuthor) {
      dispatch(editBook({
        id: book.id,
        updatedBook: { title: newTitle, author: newAuthor }
      }));
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    dispatch(editBook({
      id: book.id,
      updatedBook: { status: newStatus }
    }));
  };

  return (
    <div className="card p-3 m-2 shadow-sm">
      <h5>{book.title}</h5>
      <p><i>{book.author}</i></p>

      <select className="form-select mb-2" value={status} onChange={handleStatusChange}>
        <option>Ingin dibaca</option>
        <option>Sedang dibaca</option>
        <option>Selesai dibaca</option>
      </select>

      <div className="d-flex gap-2">
        <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Hapus</button>
      </div>
    </div>
  );
};

export default BookItem;