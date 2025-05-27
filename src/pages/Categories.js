import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {
  const books = useSelector((state) => state.books);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(books.map((book) => book.category))];

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  return (
    <div className="container">
      <h2>Categories</h2>
      <select 
        className="form-select mb-3" 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <div className="list-group">
        {filteredBooks.map((book, index) => (
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

export default Categories;
