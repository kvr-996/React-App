import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/books/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedBooksList = books.filter(book => book.id !== id);
      setBooks(updatedBooksList);
    })
    .catch(err => console.error(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooksList = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="books">
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredBooksList.map(book => (
        <div key={book.id} className="book-preview">
          <Link to={`/home/books/${book.id}`}>
            <h2>{book.title}</h2>
          </Link>
          <p>Author: {book.author}</p>
          <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      ))}
      <Link to="/home/create/books" className="new-link">
        New Story
      </Link>
    </div>
  );
};

export default Books;
