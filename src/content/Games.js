import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/games/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Update games state after deletion
      const updatedGamesList = games.filter(game => game.id !== id);
      setGames(updatedGamesList);
    })
    .catch(err => console.error(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGamesList = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="games">
      <h2>Games</h2>
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredGamesList.map(game => (
        <div key={game.id} className="game-preview">
          <Link to={`/home/games/${game.id}`}>
            <h2>{game.title}</h2>
          </Link>
          <p>Author: {game.author}</p>
          <button className="delete-button" onClick={() => handleDelete(game.id)}>Delete</button>
        </div>
      ))}
      <Link to="/home/create/games" className="new-link">
        New Story
      </Link>
    </div>
  );
}

export default Games;
