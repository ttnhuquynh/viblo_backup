import React from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


const BookmarkAction = ({post}) => {
  const { user: currentUser } = useContext(AuthContext);

  const handerBookmark = async () => {
    const x = await axios.put("/users/" + currentUser._id + "/bookmarks", {
      post: post,
    });
  };
  return (
    <div>
      <h2 onClick={handerBookmark}>Bookmark</h2>
    </div>
  );
};

export default BookmarkAction;
