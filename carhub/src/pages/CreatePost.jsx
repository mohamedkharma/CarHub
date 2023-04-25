import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
        window.location = "/";
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
        <div className="Crewmate">
            <h1>Create a new Crewmate!</h1>
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
                <br/>
                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )

}
export default CreatePost;