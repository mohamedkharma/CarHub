import React, { useState } from "react";
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import { supabase } from "../supabaseClient";
import "./PostInfo.css"

const PostInfo = (props) => {

    const [comments, setComments] = useState([])

    const { id } = useParams(); 
    const postData = props.data;
    const newData = postData.filter((post) => {
        return post.id === Number(id)
    })

    const hour = newData[0].created_at.slice(0, 5); // Extract the hour from created_at string
  
    const updateComment = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('posts')
        .update({ comment: comments})
        .eq('id', newData[0].id);
    
        alert("Post has been comment"); 
        window.location = "/posts";
    };


    return (
        <div className="container"> 
            <div className="detailed-view">
                <h3 className="date">Posted at {hour} O'Clock</h3>
                <h2>Post Id: {newData[0].id}</h2>
                <h1>Title: {newData[0].title}</h1>
                <h2>By: {newData[0].author} mph</h2>
                <h2>Description: {newData[0].description}</h2>
                <h2>{newData[0].upVote} upvotes</h2>      
                <br />
                <form onSubmit={updateComment}>
                    <label>
                        Add Comment:
                        <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
                    </label>
                    <button type="submit">Comment</button>
                </form>
                <br />
                <Link to={"edit/" + newData[0].id}><button className="my-button">Wanna Edit the information?</button></Link>
            </div>
            <div className="comments-section">
                <h2>Comments Section: {newData[0].comment}</h2>
            </div>
        </div>
    );
};

export default PostInfo; 