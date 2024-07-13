import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Create from "./Create";
const Anime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/anime')
      .then(res => res.json())
      .then(data => setAnimeList(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/anime/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedAnimeList = animeList.filter(anime => anime.id !== id);
      setAnimeList(updatedAnimeList);
    })
    .catch(err => console.error(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAnimeList = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className='anime'>
      <h2>Anime</h2>
      <input
        type="text"
        placeholder="Search anime..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredAnimeList.map(anime => (
        <div key={anime.id} className='anime-preview'>
          <Link to={`/home/anime/${anime.id}`}>
            <h2>{anime.title}</h2>
          </Link>
          <p>Author: {anime.author}</p>
          <button className="delete-button" onClick={() => handleDelete(anime.id)}>Delete</button>
        </div>
      ))}
      <Link to="/home/create/anime" className="new-link">
        NewStory
      </Link>
    </div>
  );
}

export default Anime;
