import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'; 
import Login from './Login';
import UserRegistration from './UserRegistration';
import Anime from './content/Anime';
import Create from './content/Create';
import AnimeDetail from './content/details/AnimeDetail';
import PrivateRoute from './PrivateRoute';
import Books from './content/Books';
import BookDetail from'./content/details/BookDetail';
import Cartoons from './content/Cartoons';
import CartoonDetail from'./content/details/CartoonDetail';
import Comics from './content/Comics';
import ComicDetail from './content/details/ComicDetail';
import Games from './content/Games';
import GameDetail from'./content/details/GameDetail'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name,setName] = useState("anime")
  const login = () => {
    setIsLoggedIn(true);
    return <Navigate to="/home"/>
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} logout={logout} />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/userreg" element={<UserRegistration />} />
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />} path="/home">
            <Route path="/home" element={<Home />} />
            <Route path="/home/anime" element={<Anime />} />
            <Route path="/home/anime/:id" element={<AnimeDetail />} />
            <Route path="/home/books" element={<Books />} />
            <Route path="/home/books/:id" element={<BookDetail />} />
            <Route path="/home/cartoons" element={<Cartoons />} />
            <Route path="/home/cartoons/:id" element={<CartoonDetail />} />
            <Route path="/home/comics" element={<Comics />} />
            <Route path="/home/comics/:id" element={<ComicDetail />} />
            <Route path="/home/games" element={<Games />} />
            <Route path="/home/games/:id" element={<GameDetail />} />
            <Route path="/home/create/:name" element={<Create/>} /> 
          </Route>
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
