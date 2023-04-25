import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./EditPost.css"

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
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="author">Author</label>
              <input type="text" id="author" name="author" value={post.author} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea name="description" rows="5" cols="50" id="description" value={post.description} onChange={handleChange}></textarea>
            </div>
            <button className="update-button" onClick={updatePost}>Update</button>
            <button className="delete-button" onClick={deletePost}>Delete</button>
          </form>
        </div>
    )

}
export default EditPost;