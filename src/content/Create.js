import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('anime');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const categories = {
        anime :"anime",
        books :"books",
        cartoons :"cartoons",
        comics : "comics",
        games : "games"  
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author, category };
        setIsPending(true);
        fetch(`http://localhost:8000/${category}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New blog added');
            setIsPending(false);
            setTitle('');
            setBody('');
            setAuthor('');
        }).catch(error => {
            console.error('Error adding blog:', error);
            setIsPending(false);
        });
        navigate(`/home/${category}`)
    };

    return (
        <div className="create">
            <h2>Add a new story</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                
                <label>Body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)} />

                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="anime">Anime</option>
                    <option value="books">Books</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="comics">Comics</option>
                    <option value="games">Games</option>
                </select>

                {!isPending && <button type="submit">Add story</button>}
                {isPending && <button disabled>Adding story...</button>}
            </form>
        </div>
    );
};

export default Create;
