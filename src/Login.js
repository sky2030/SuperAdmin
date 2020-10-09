import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      token: "",
      LoggedIn,
    };
  }

  validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username) {
      usernameError = "****User Name cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "****password cannot be blank";
    }

    if (usernameError || passwordError) {
      this.setState({ usernameError, passwordError });
      return false;
    }

    return true;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        username,
        password,
      };

      axios({
        url: "https://stage.mconnecthealth.com/v1/admin/login",
        method: "POST",
        data: payload,
      })
        .then((response) => {
          const data = response.data.data.token;
          // console.log(response.data.token)
          try {
            localStorage.setItem("token", data);
            this.setState({
              token: localStorage.getItem("token"),
            });
          } catch (e) {
            console.log("Something went wrong with sky's Code", e);
          }
        })
        .catch(() => {
          console.log("internal server error");
        });
    }
  };
  render() {
    if (this.state.token !== "") {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <section className="login">
        <h2>WELCOME TO VRCure!</h2>
        <form autocomplete="off" onSubmit={this.submitForm}>
          <div className="loginbox">
            <i className="fas fa-user"></i>
            <input
              placeholder="Your User Name"
              type="text"
              id="User name"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="loginbox">
            <i className="fas fa-lock"></i>
            <input
              placeholder="Your Password"
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            ></input>
            <a href="confirm" className="forgotpass">
              Forgot Password ?
            </a>
          </div>
          <div style={{ marginLeft: "4em" }}>
            <input type="submit" className="button" />
            {/* <button id="submit">Login</button> */}
          </div>
        </form>
      </section>
    );
  }
}
export default Login;
