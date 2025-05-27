// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Gunakan Switch di versi 5
import Home from './pages/Home';
import Books from './pages/Books';
import Categories from './pages/Categories';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Router>
      <Switch>  {/* Gunakan Switch di sini */}
        <Route exact path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/categories" component={Categories} />
        <Route path="/add-book" component={AddBook} />
      </Switch>
    </Router>
  );
}

export default App;
