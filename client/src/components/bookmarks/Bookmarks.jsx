import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState, useContext , useEffect} from "react";
import "./bookmarks.css"

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [Posts, setPosts] = useState([]);
  useEffect(async () => {
    let User = await axios.get("/users/" + user._id);
    let bookmarks = User.data.bookmarks;
    setPosts(bookmarks);
  }, ["input"]);

  return (
    <div>
      {Posts.map((p) => (
        <div className ="bookmarks">

        <a href={`/posts/${p._id}`} className="bookmarksTitle" key={p._id}>{p.title}</a>
        <hr />
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
