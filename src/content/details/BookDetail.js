import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/books/${id}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, [id]);
  
  if (!books) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <h2>{books.title}</h2>
      <Link to = {`/books/${books.author}`}>
      <p style={{textDecoration:"none"}}>Author: {books.author}</p>
      </Link>
      <p>Description: {books.body}</p>
    
    </div>
  );
}

export default BookDetail;
