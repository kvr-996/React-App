import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to="/home">
    <div className='content'>
      <h2 style={{textDecoration:"none"}}>Welcome to Fan-Fiction Platform</h2>
      <Link to='/home/anime'>Anime</Link>
      <Link to='/home/books'>Books</Link>
      <Link to='/home/cartoons'>Cartoons</Link>
      <Link to='/home/comics'>Comics</Link>
      <Link to='/home/games'>Games</Link>
    </div>
    </Link>
  );
}

export default Home;
