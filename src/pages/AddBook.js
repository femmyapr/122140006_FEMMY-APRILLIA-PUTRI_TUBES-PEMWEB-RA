import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';
import { useHistory } from 'react-router-dom'; 

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const dispatch = useDispatch();
  const history = useHistory(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, category, note };
    dispatch(addBook(newBook));
    history.push('/books'); 
  };

  return (
    <div className="container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
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
          <label htmlFor="author" className="form-label">Author</label>
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
          <label htmlFor="category" className="form-label">Category</label>
          <input 
            type="text" 
            className="form-control" 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">Notes</label>
          <textarea 
            className="form-control" 
            id="note" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            rows="3" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
