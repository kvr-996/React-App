import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CartoonDetail = () => {
    const{id} = useParams()
    const [cartoons,setCartoons] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:8000/cartoons/${id}`)
            .then(res=>res.json())
            .then(data=>setCartoons(data))
            .catch(err=>console.error(err))
    })
    if(!cartoons){
        return <div>Loading....</div>
    }
    return ( 
        <div className="cartoon-detail">
            <h2>{cartoons.title}</h2>
            <p>Author:{cartoons.author}</p>
            <p>Description:{cartoons.body}</p>
        </div>
     );
}
 
export default CartoonDetail;