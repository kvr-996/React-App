import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/anime/${id}`)
      .then(res => res.json())
      .then(data => setAnime(data))
      .catch(err => console.error(err));
  }, [id]);
  
  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="anime-detail">
      <h2>{anime.title}</h2>
      <Link to = {`/anime/${anime.author}`}>
      <p style={{textDecoration:"none"}}>Author: {anime.author}</p>
      </Link>
      <p>Description: {anime.body}</p>
      
    </div>
  );
}

export default AnimeDetail;
