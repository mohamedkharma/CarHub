import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom"; 
import ViewPost from './pages/ViewPost.jsx'
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from './pages/EditPost.jsx'
import NavBar from './components/NavBar.jsx'
import PostInfo from './components/PostInfo.jsx'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient.js'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]); 
  
  useEffect(()=> {
      const fetchData = async () => {
          const { data } = await supabase
          .from("posts")
          .select()
          .order("created_at", { ascending: true });

      setPosts(data);
      };
      fetchData();
      }, [])


  // Sets up routes
  let elements = useRoutes([
    {
      path: "/",
      element: <div className='App'>
              <h1>Welcome to the CarHub!</h1>
              <h3>Here you can post about your Car</h3>
              </div>
    },
    {
      path: "/new-post",
      element: <CreatePost /> 
    },
    {
      path: "/posts",
      element: <ViewPost data={posts}/>
    },
    {
    path:"posts/edit/:id",
    element: <EditPost data={posts} />
    },
    {
      path: "posts/post/:id",
      element: <PostInfo data={posts}/>
    },
    {
      path: "posts/post/:id/edit/:id",
      element: <EditPost allPosts={posts} /> 
    }
  ]);

  return (
    <div className="App">
      <NavBar />
      {elements}
    </div>
  )
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;

