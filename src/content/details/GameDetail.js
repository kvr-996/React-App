import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GameDetail = () => {
    const {id} = useParams()
    const [games,setGames] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:8000/games/${id}`)
        .then(res=>res.json())
        .then(data=>setGames(data))
        .catch(err=>console.error(err))
    },[id])
    if(!games){
        return <div>Loading....</div>
    }
    return ( 
        <div className="game-detail">
            <h2>{games.title}</h2>
            <p>Author:{games.author}</p>
            <p>Description:{games.body}</p>
        </div>
     );
}
 
export default GameDetail;