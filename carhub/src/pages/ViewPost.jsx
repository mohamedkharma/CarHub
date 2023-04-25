import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ViewPost.css'

const ViewPost = (props) => {

    const [posts, setPosts] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('upVote'); // set default sort to upVote

    useEffect(() => {
      setPosts(props.data);
    }, [props]);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function parseDateString(dateString) {
        const [time, milliseconds] = dateString.split('.');
        const [hours, minutes, seconds] = time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        date.setMilliseconds(milliseconds);
        return date;
      }

      
      const sortPosts = (sortType) => {
        let sortedPosts;
        if (sortType === 'upVote') {
          sortedPosts = [...filteredPosts].sort((a, b) => b[sortType] - a[sortType]);
        } else if (sortType === 'newest') {
          sortedPosts = [...filteredPosts].sort((a, b) => {
            const dateA = parseDateString(a.created_at);
            const dateB = parseDateString(b.created_at);
            return dateB.getTime() - dateA.getTime();
          });
        } else {
          sortedPosts = [...filteredPosts].sort((a, b) => a[sortType].localeCompare(b[sortType]));
        }
        setPosts(sortedPosts);
        setSortBy(sortType);
      };
      
      
      
    return (
        <div className="ViewPosts">
            <div className="search-container">
                <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearch}
                />
            </div>
            <div className='buttons-container'>
                <h3>Filter By: </h3>
                <button className="button" onClick={() => sortPosts('newest')}>Newest</button>
                <button className="button" onClick={() => sortPosts('upVote')}>Most Upvoted</button>
            </div>
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    description={post.description}
                    upVote={post.upVote}
                    created_at={post.created_at}
                />
                ))
                ) : (
                <h2>{'No posts yet! 😞'}</h2>
            )}
        </div>  
    )
}

export default ViewPost;
