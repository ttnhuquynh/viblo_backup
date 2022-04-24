import "./share.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const title = useRef();
  const [activeShare, setActiveShare] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      title: title.current.value,
      username: user.username,
    };

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    };

   
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form >
          <div class="form-group">
            <label for="exampleFormControlInput1">Tiêu đề</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              ref={title}
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Mô tả</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              ref={desc}
            ></textarea>
          </div>
          <button className="shareButton" type="submit" onClick={submitHandler}>
            Đăng bài
          </button>
        </form>
      </div>
    </div>
  );
}
