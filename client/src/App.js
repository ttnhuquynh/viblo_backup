import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Share from "./components/share/Share";
import Topbar from "./components/topbar/Topbar";
import Bookmarks from "./components/bookmarks/Bookmarks";
import Detail_post from "./components/detail_post/Detail_post";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? (
            <>
              {" "}
              <Topbar /> <Home />
            </>
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
       
        <Route path="/share">
          <Topbar />
          {user ? <Share /> : <Login />}
        </Route>
        <Route path="/bookmarks">
          <Topbar />
          <Bookmarks />
        </Route>

        <Route path="/creat_posts">
          <Topbar />
          <Share />
        </Route>

        <Route path="/posts/:postId">
          <Topbar />
          <Detail_post />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
