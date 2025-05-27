import React from 'react';
import { useHistory } from 'react-router-dom';  // Mengimpor useHistory untuk navigasi

const AddBookButton = () => {
  const history = useHistory();

  const handleAddBook = () => {
    // Navigasi ke halaman AddBook
    history.push('/add-book');
  };

  return (
    <button onClick={handleAddBook} className="btn btn-primary">
      Tambah Buku +
    </button>
  );
};

export default AddBookButton;
