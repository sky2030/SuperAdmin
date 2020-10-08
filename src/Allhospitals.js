import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AllHospital extends Component {
  //const Allhospitals = (props) => {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      posts: [],
    };
  }
  componentDidMount = () => {
    this.getHospital();
  };

  getHospital = () => {
    axios
      .get("http://localhost:4300/v1/admin/hospitals/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };
  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <Link
            to={"/Myhospital/" + post.hospitalcode}
            className="hospital-card col bg_white"
          >
            <h3>{post.hospitalname}</h3>
            <div className="doctor-card1">
              <div className="hospitalimg">
                <img src={post.picture} alt="Hospital" />
              </div>
              <div className="doctordetails">
                <h5> {post.place}</h5>
                <p>
                  {post.landmark} {post.district}
                </p>

                <p>
                  {" "}
                  {post.state} {post.pincode}{" "}
                </p>
              </div>
            </div>
          </Link>
        );
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className="dashboard_wrap">
        <div className="flex-container">{postList}</div>
        <div className="add_departmet">
          <Link to="/Addhospital">
            <i className="fas fa-plus"></i> Add Hospital{" "}
          </Link>
        </div>
      </div>
    );
  }
}
export default AllHospital;
