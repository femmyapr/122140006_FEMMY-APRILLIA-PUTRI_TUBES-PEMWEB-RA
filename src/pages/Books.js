import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../redux/booksSlice';
import axios from 'axios';

const Books = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    
    axios.get('/api/books')  
      .then((response) => {
        dispatch(setBooks(response.data));
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Books List</h2>
      <div className="list-group">
        {books.map((book, index) => (
          <div className="list-group-item" key={index}>
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <p>{book.category}</p>
            <p>{book.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
