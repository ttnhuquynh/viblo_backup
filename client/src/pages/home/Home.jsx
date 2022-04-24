import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css"

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <Feed/>
      </div>
    </>
  );
}
