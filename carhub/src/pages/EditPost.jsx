import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditPost = ({data}) => {

    const {id} = useParams();
    // const post = data.filter(item => item.id === id)[0];
    
    const [post, setPost] = useState({title: "", author: "", description: ""})

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('posts')
        .update({title: post.title, 
                author: post.author, 
                description: post.description, 
        })
        .eq('id', id);
    
        alert("Post has been updated"); 
        window.location = "/";
    }

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('posts')
        .delete()
        .eq('id', id); 

        alert("post has been deleted!"); 
        window.location = "/";
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        });
    }


    return (
        <div className="Post">
            <h1>Edit your Post!</h1>
            <form>
                <label htmlFor="name">Title</label> <br />
                <input type="text" id="title" name="title" value ={post.title} onChange={handleChange}/><br />
                <br/>

                <label htmlFor="speed">Author</label><br />
                <input type="text" id="author" name="author" value ={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea name="description" rows="5" cols="50" id="description" value ={post.description} onChange={handleChange}>
                </textarea>
                <br />
                <button className="updateButton" onClick={updatePost}>Update</button>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )

}
export default EditPost;