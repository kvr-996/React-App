import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cartoons = () => {
  const [cartoons, setCartoons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/cartoons')
      .then(res => res.json())
      .then(data => setCartoons(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/cartoons/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedCartoonList = cartoons.filter(cartoon => cartoon.id !== id);
      setCartoons(updatedCartoonList);
    })
    .catch(err => console.error(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCartoonsList = cartoons.filter(cartoon =>
    cartoon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <div className="cartoons">
      <h2>Cartoons</h2>
      <input
        type="text"
        placeholder="Search cartoons..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredCartoonsList.map(cartoon => (
        <div key={cartoon.id} className="cartoon-preview">
          <Link to={`/home/cartoons/${cartoon.id}`}>
            <h2>{cartoon.title}</h2>
          </Link>
          <p>Author: {cartoon.author}</p>
          <button className="delete-button" onClick={() => handleDelete(cartoon.id)}>Delete</button>
        </div>
      ))}
      <Link to="/home/create/cartoons" className="new-link">
        New Story
      </Link>
    </div>
  );
}

export default Cartoons;
