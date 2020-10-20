import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
//import Spinner from "./img/Spinner.gif";
//import Spinner from "./img/Magnify.gif";
import Spinner from "./img/Spinnergrey.gif";

class AllPatients extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    this.state = {
      posts: [],
      hospitals: [],
      hospitalcode: "",
    };
  }
  componentDidMount = () => {
    this.GetPatients();
    this.getHospital();
  };

  handleOnChange = (e) => {
    this.setState({
      hospitalcode: e.target.value,
    });
  };

  GetPatients = () => {
    axios
      .get("https://stage.mconnecthealth.com/v1/admin/patients/", {
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
      .get("https://stage.mconnecthealth.com/v1/admin/hospitals/", {
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
      <div className="center">No Hospital</div>
    );

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div className="allpatients" key={post._id}>
            <div className="patientsinvoice">
              {/* <p>
                <b>Mobile No- </b> {post.mobile}
              </p>
              <p>
                <b>Patient Name- </b> {post.patient_name}
              </p> */}
            </div>

            <div className="alltransation">
              <p style={{ marginLeft: "2em" }}>
                <b>Mobile No- </b> {post.mobile}
              </p>
              <p style={{ marginLeft: "2em" }}>
                <b>Patient Name- </b> {post.patient_name}
              </p>
            </div>
          </div>
        );
      })
    ) : (
      <div
        className="center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          marginBottom: "100px",
        }}
      >
        <img src={Spinner} alt="Loading" />
      </div>
    );
    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }

    return (
      <div className="Appcontainer">
        <Nav />
        <div className="dashboard_wrap">
          {/* <select
          id="hospital"
          className="ChooseDoctor"
          onChange={this.handleOnChange}
        >
          {hospitallist}
        </select> */}
          <div className="headerNew">
            {/* {this.state.hospitalcode} */}
            {postList}
          </div>
        </div>
      </div>
    );
  }
}
export default AllPatients;
