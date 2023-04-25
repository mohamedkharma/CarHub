import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./CreatePost.css"

function CreatePost() {
    const [post, setPost] = useState({title: "", author: "", description: ""}); 

    const createPost = async (event) => {
        event.preventDefault(); 

        await supabase
        .from("posts")
        .insert({title: post.title, 
                author: post.author, 
                description: post.description, 
        })
        .select(); 

        alert("Post has been created"); 
        window.location = "/posts";
    };

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
          <h1>Create a new Post!</h1>
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
            <input type="submit" value="Submit" onClick={createPost} />
          </form>
        </div>
      )
      

}
export default CreatePost;