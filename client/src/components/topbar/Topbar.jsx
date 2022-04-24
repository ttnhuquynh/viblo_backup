import "./topbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [Posts, setPosts] = useState([]);
  const showBookmark = async () => {
    let User = await axios.get("/users/" + user._id);
    let bookmarks = User.data.bookmarks;
    setPosts(bookmarks);
  };

  return (
    <div className="topbarContainer">
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              className="bannerIcon"
              src="https://viblo.asia/logo_full.svg"
            ></img>
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Bài Viết
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Thảo Luận
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Hỏi Đáp
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Tìm kiếm trên Viblo"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-blue my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          {user?  <span className=" badge badge-pill badge-primary">
            {user.username}
          </span>:<></> }
         
          <a
            href="#"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Đăng xuất
          </a>
        </nav>
      </div>

      <img
        className="banner"
        src="https://images.viblo.asia/full/bf6fd90b-e818-4cb4-a025-0ffe3f915ef0.png"
      ></img>

      <div className="banner-list">
        <ul className="banner-lists">
          <li className="banner-item banner-item1 ">ĐANG THEO DÕI</li>
          <li className="banner-item">MỚI NHẤT</li>
          <li className="banner-item">SERIES</li>
          <li className="banner-item">EDITOR'CHOICES</li>
          <li className="banner-item">TRENDING</li>
          <li className="banner-item">VIDEOS</li>
          <a href="/bookmarks">
            <li className="banner-item">BOOKMARKS CỦA TÔI</li>
          </a>
          <a href="/creat_posts">
          <li className="banner-item-last">
            <button type="button" class="btn btn-posts">
              Viết bài
            </button>
          </li>
          </a>
        </ul>
      </div>

     
    </div>
  );
}
