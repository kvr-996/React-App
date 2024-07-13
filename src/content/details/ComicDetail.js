import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ComicDetail = () => {
    const {id} = useParams()
    const [comic,setComics] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:8000/comics/${id}`)
        .then(res=>res.json())
        .then(data=>setComics(data))
        .catch(err=>console.error(err))
    })
    if(!comic){
        return <div>Loading....</div>
    }
    return ( 
        <div className="comic-detail">
            <h2>{comic.title}</h2>
            <p>Author:{comic.author}</p>
            <p>Description:{comic.body}</p>
        </div>
     );
}
 
export default ComicDetail
