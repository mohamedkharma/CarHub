import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Card.css"; 
import { Link } from "react-router-dom"; 
import { supabase } from "../supabaseClient";


const Card = (props) =>  {
  
    // const [count, setCount] = useState("")
    const hour = props.created_at.slice(0, 5); // Extract the hour from created_at string

    const updateCount = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('posts')
        .update({ upVote: props.upVote + 1 })
        .eq('id', props.id);
    
        alert("Post has been upvoted"); 
        window.location = "/posts";
    };
    
    return (
        <div className="Card">
        <Link to={"post/" + props.id}>
            <h3 className="date">Posted at {hour} O'Clock</h3>
            <h2 className="title">{"Title " + props.title}</h2>
            <h3 className="author">{"By: " + props.author}</h3>
            {/* <h3 className="description">{"Decription " + props.description}</h3> */}
            <h3 className="upvote">{props.upVote} upvotes</h3>
            <br />
        </Link>
        <Link to={"edit/" + props.id}><button>Edit me</button></Link>
        <button className="upvote" onClick={updateCount}> upvote</button>

        </div>
    );
  };
  
  export default Card;
