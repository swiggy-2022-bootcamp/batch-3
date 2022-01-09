import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "../src/services/auth-service";

import Login from "../src/components/login";
import Register from "../src/components/register";
import Home from "../src/components/home";
import Profile from "../src/components/profile";
import BoardUser from "../src/components/board-user";
import BoardModerator from "../src/components/board-mod";
import BoardAdmin from "../src/components/board-admin";
import menu from "../src/components/restaurant-menu";
import Welcome from "../src/components/welcome"
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul class="navbar-nav">
            {currentUser ? (
              <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                  <Link to={"/home"} className="navbar-brand">
                    Swiggy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">


                <li className="nav-item">
                  <Link to={"/"} className="navbar-brand">
                    Swiggy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
              </ul>
            )}


            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </ul>

          {currentUser ? (
            <ul className="navbar-nav ml-auto" >
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>



            </ul>
          )
          }
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={Welcome} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/menu/:id" component={menu} />
          </Switch>
        </div>
      </div >
    );
  }
}

export default App;