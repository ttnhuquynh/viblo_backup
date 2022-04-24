import React from 'react'
import { useParams } from 'react-router'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Post from '../post/Post'
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/Comments";

const Detail_post = () => {
     const postId = useParams().postId;
     const [post, setPost] = useState({});
     useEffect(() => {
          const fetchPost = async () => {
               const res = await axios.get(`/posts/${postId}`);
               setPost(res.data)
          }
          fetchPost()
          
     },["posts"] )

  return (
    <div>
         <div className="post">
      
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <h5>{post.title}</h5>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Detail_post