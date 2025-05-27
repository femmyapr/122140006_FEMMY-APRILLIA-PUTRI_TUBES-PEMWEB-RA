import React from 'react';
import BookItem from './BookItem';  // Mengimpor BookItem

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))
      ) : (
        <p>No books available</p>  // Menampilkan pesan jika tidak ada buku
      )}
    </div>
  );
};

export default BookList;
