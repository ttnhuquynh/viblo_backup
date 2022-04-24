import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/Comments";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const [state, setState] = useState(post.likes.length - post.dislikes.length);
  const likeHandler = async () => {
    const updatedPost = await axios.put("/posts/" + post._id + "/like", {
      userId: currentUser._id,
    });
    // console.log(updatedPost.data);
    setState(updatedPost.data.likes.length - updatedPost.data.dislikes.length);
  };

  const dislikeHandler = async () => {
    const updatedPost = await axios.put("/posts/" + post._id + "/dislike", {
      userId: currentUser._id,
    });
    // console.log(updatedPost.data);
    setState(updatedPost.data.likes.length - updatedPost.data.dislikes.length);
  };

  //Bookmark function

  const handerBookmark = async () => {
    const x = await axios.put("/users/" + currentUser._id + "/bookmarks", {
      post: post,
    });
  };

  return (
    <div className="post">
      <a className="bookmark" onClick={handerBookmark}>
        Bookmark
      </a>
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
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <a className="voteUp" onClick={likeHandler} style={{color:'blue'}} >
              Vote up
            </a>
            <span className="postLikeCounter">{state}</span>
            <a className="voteDown" onClick={dislikeHandler} style={{color: '#132'}}>
              Vote down
            </a>
          </div>
        </div>
      </div>
      <Comments username={post.username} postId={post._id} />
    </div>
  );
}
