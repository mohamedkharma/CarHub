import React, { useState } from "react";
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import { supabase } from "../supabaseClient";

// import "./CrewmateInfo.css"; 

const PostInfo = (props) => {

    const [comments, setComments] = useState([])

    const { id } = useParams(); 
    const postData = props.data;
    const newData = postData.filter((post) => {
        return post.id === Number(id)
    })

    const hour = newData[0].created_at.slice(1, 2); // Extract the hour from created_at string
  
    const updateComment = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('posts')
        .update({ comment: comments})
        .eq('id', newData[0].id);
    
        alert("Post has been comment"); 
        // window.location = "/posts/post/id";
    };


    return (
        <div className="detailed-view">
            <h3>Posted {hour} hours ago</h3>
            <h1>Title: {newData[0].title}</h1>
            <h2>Id: {newData[0].id}</h2>
            <h2>Description: {newData[0].author} mph</h2>
            <h2>By: {newData[0].description}</h2>
            <h2>{newData[0].upVote} upvotes</h2>
                        
            <br />
            {/* {newData[0].speed > 100 ?
                <h2>Wow, very fast!</h2> :
                <h2>Ugh, slow and needs to get faster...</h2>
            } */}
            <form onSubmit={updateComment}>
                <label>
                    Add Comment:
                    <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
                </label>
                <button type="submit">Comment</button>
            </form>
            <br />
            <Link to={"edit/" + newData[0].id}><button>Wanna Edit the information?</button></Link>
        </div>
    );
};

export default PostInfo; 