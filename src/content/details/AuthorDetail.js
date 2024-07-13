import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorDetail = () => {
    const { name } = useParams();
    const [author, setAuthors] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/anime/${name}`) 
            .then(res => res.json())
            .then(data => setAuthors(data))
            .catch(err => console.error(err));
    }, [name]); 

    if (!author) {
        return <div>Loading...</div>; 
    }

    return ( 
        <div className="author-detail">
            <h2>About: {author.name}</h2>
            <p>{author.about}</p>
        </div>
     );
}
 
export default AuthorDetail;
