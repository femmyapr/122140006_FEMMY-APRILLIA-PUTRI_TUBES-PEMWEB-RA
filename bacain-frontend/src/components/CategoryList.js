// src/components/CategoryList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../redux/categoriesSlice';  // Mengimpor setCategories

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);  // Mengambil data kategori dari Redux

  useEffect(() => {
    // Ambil kategori dari API dan dispatch ke Redux
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => dispatch(setCategories(data)));  // Dispatch kategori ke Redux
  }, [dispatch]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))
        ) : (
          <p>No categories available</p>  // Menampilkan pesan jika tidak ada kategori
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
