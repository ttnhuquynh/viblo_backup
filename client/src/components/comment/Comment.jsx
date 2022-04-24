import "./comment.css";
import { useState} from "react"
import axios from "axios"
const Comment = ({comment}) => {

     const [voteComment, setVoteComment] = useState(comment.likes.length - comment.dislikes.length);
     const likeHandler = async () => {
       const updatedComment = await axios.put("/comments/" + comment._id + "/like", {
         username: comment.username,
       });
       // console.log(updatedPost.data);
       setVoteComment(updatedComment.data.likes.length - updatedComment.data.dislikes.length);
     };
   
     const dislikeHandler = async () => {
       const updatedComment = await axios.put("/comments/" + comment._id + "/dislike", {
          username: comment.username,
       });
       // console.log(updatedPost.data);
       setVoteComment(updatedComment.data.likes.length - updatedComment.data.dislikes.length);
     };



  return (
    <div>
      <div className="commentBody">
        <span className="userComment">{comment.username}</span>
        <span className="comment" key={comment._id} post={comment}>
          {comment.desc}
        </span>
       
        <a className="voteUpComment" onClick={likeHandler}>Vote up</a>
        <a className="voteComment">{voteComment}</a>
        <a className="voteDownComment" onClick={dislikeHandler}>Vote down</a>
        <hr />
      </div>
    </div>
  );
};

export default Comment;
