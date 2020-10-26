import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "./img/logo.png";

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
      usernameError: "",
      passwordError: ""
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
          if (response.data.code == 200) {
            const data = response.data.data.token;
            localStorage.setItem("token", data);
            this.setState({
              token: localStorage.getItem("token"),
            });

          } else {
            alert(response.data.message)
            console.log(response.data.message);
          }
        })
        .catch((Error) => {
          alert("Invalid User Name Or Password")
          console.log(Error + " internal server error");
        });
    }
  };
  render() {
    if (this.state.token !== "") {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <section className="login">
        <img src={logo} alt="logo" />
        <h2>WELCOME TO VRCure!</h2>
        <form autocomplete="off" onSubmit={this.submitForm}>
          <div className="loginbox">
            <i className="fas fa-user"></i>
            <div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.usernameError}
              </div>
              <input
                placeholder="Your User Name"
                type="text"
                id="User name"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              ></input>
            </div>
          </div>
          <div className="loginbox">
            <i className="fas fa-lock"></i>
            <div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </div>
              <input
                placeholder="Your Password"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              ></input>
            </div>
            <a href="confirm" className="forgotpass">
              Forgot Password ?
            </a>
          </div>
          <div>
            <button id="submit">Login</button>
          </div>
        </form>
      </section>
    );
  }
}
export default Login;
