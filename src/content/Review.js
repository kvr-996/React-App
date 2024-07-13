import React, { useState, useEffect } from "react";

const Review = () => {
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('anime');
  const [reviews, setReviews] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8001/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = { body, category };
    setIsPending(true);
    fetch(`http://localhost:8001/reviews`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    }).then(() => {
      console.log('New review added');
      setIsPending(false);
      setBody('');
      fetch(`http://localhost:8001/reviews`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error('Error fetching reviews:', err));
    }).catch(error => {
      console.error('Error adding review:', error);
      setIsPending(false);
    });
  };

  return (
    <div className="create">
      <h2>Add a new review</h2>
      <form onSubmit={handleSubmit}>
        <label>Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
ō
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="books">Books</option>
          <option value="cartoon">Cartoon</option>
          <option value="comics">Comics</option>
          <option value="games">Games</option>
        </select>

        {!isPending && <button type="submit">Add review</button>}
        {isPending && <button disabled>Adding review...</button>}
      </form>

      <div className="review-list">
        <h2>Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review.body}</p>
            <p>Category: {review.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
