import React, {useEffect,useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from 'axios';


function Feed({searchTerm}) {

  const [posts , setPosts] = useState([]);
  const [postToShow, setPostToShow] = useState([]);

  useEffect(() => {
    axios.get('/api/questions').then((res)=>{
      console.log(res.data.reverse());
      setPosts(res.data);
      setPostToShow(res.data);
    }).catch((e)=>{
      console.log(e);
    })
  }, [])

  useEffect (()=>{
    const filterData = posts.filter((post) => post.questionName.toLowerCase().includes(searchTerm.toLowerCase()));
    setPostToShow(filterData);
  },[searchTerm])


  return (
    <div className="feed">
      <QuoraBox />
      {postToShow.map( (post, index )=>( <Post key={index} post={post}/> )) }
      
    </div>
  );
}

export default Feed;
