import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./comments.css";
import Comment from "../comment/Comment"

const Comments = ({ username, postId }) => {
  const comment = useRef();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      username: username,
      desc: comment.current.value,
      postId: postId,
    };

    try {
      await axios.post("/comments", newComment);
      window.location.reload();
    } catch (err) {}
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/comments/" + postId);
      setComments(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, ["comments"]);

  return (
    <>
      <form class="input-group mb-3" onSubmit={handlerSubmit}>
        <input
          type="text"
          class="form-control"
          placeholder="Viết bình luận"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          ref={comment}
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">
            Bình Luận
          </button>
        </div>
      </form>
      {comments.map((p) => (
        <Comment comment={p}/>
        
      ))}
    </>
  );
};

export default Comments;
