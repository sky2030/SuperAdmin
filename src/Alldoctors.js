import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Doctorprofile from "./img/doctor-icon.jpg";

class Alldoctors extends React.Component {
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
      hospitals: [],
      hospitalcode: "",
    };
  }
  // componentWillMount = () => {
  //   console.log(`this is hospital code ${this.state.hospitalcode}`);
  //   this.getDoctors();
  //   this.getHospital();
  // };

  // componentDidUpdate(prevState) {
  //   //Typical usage, don't forget to compare the props
  //   if (this.state.hospitalcode !== prevState.hospitalcode) {
  //     this.getDoctors(this.state.hospitalcode);
  //   }
  // }

  handleOnChange = (e) => {
    this.setState({
      hospitalcode: e.target.value,
    });
  };

  componentDidMount = () => {
    // console.log(`this is hospital code ${this.state.hospitalcode}`);
    this.getHospital();
    this.getDoctors();
  };
  // componentWillUpdate = () => {
  //   this.getDoctors();
  // };
  getDoctors = () => {
    //console.log(`this is hospital code ${this.state.hospitalcode}`);
    let URL = `http://localhost:4300/v1/admin/doctors?hospitalcode=${this.state.hospitalcode}`;
    console.log(URL);
    axios
      .get(URL, {
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
        this.setState({ hospitals: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };
  render() {
    const { hospitals, posts } = this.state;
    const hospitallist = hospitals.length ? (
      hospitals.map((item) => {
        return (
          <option key={item._id} value={item.hospitalcode}>
            {item.hospitalname}
          </option>
        );
      })
    ) : (
      <div className="center">No Doctor</div>
    );

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div key={post._id} className="doctor-card col">
            {/* <Link to={'/Doctorprofile/' + post._id}> */}
            <h3 style={{ color: "white" }}>
              Dr. {post.first_name} {post.last_name}
            </h3>
            <div className="doctor-card1">
              <div className="doctorpic">
                <img
                  src={post.picture === "" ? Doctorprofile : post.picture}
                  alt="doctors"
                />
              </div>
              <div className="doctordetails">
                <p>
                  <b>{post.department}</b> | {post.degree}
                </p>

                <p>
                  {" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                </p>
                <p>Rs. {post.consultation}</p>
                <p>{post.designation}</p>
              </div>
            </div>
            {/* </Link> */}
          </div>
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
        <select
          id="hospital"
          className="ChooseDoctor"
          onChange={this.handleOnChange}
        >
          {hospitallist}
        </select>
        <div className="flex-container">
          {/* {this.state.hospitalcode} */}

          {postList}
        </div>
      </div>
    );
  }
}
export default Alldoctors;