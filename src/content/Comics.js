import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/comics')
      .then(res => res.json())
      .then(data => setComics(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/comics/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Update comics state after deletion
      const updatedComicsList = comics.filter(comic => comic.id !== id);
      setComics(updatedComicsList);
    })
    .catch(err => console.error(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredComicsList = comics.filter(comic =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="comics">
      <h2>Comics</h2>
      <input
        type="text"
        placeholder="Search comics..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredComicsList.map(comic => (
        <div key={comic.id} className="comic-preview">
          <Link to={`/home/comics/${comic.id}`}>
            <h2>{comic.title}</h2>
          </Link>
          <p>Author: {comic.author}</p>
          <button className="delete-button" onClick={() => handleDelete(comic.id)}>Delete</button>
        </div>
      ))}
      <Link to="/home/create/comics" className="new-link">
        New Story
      </Link>
    </div>
  );
}

export default Comics;
