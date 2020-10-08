import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";

class AllPatients extends React.Component {
  constructor(props) {
    super(props);
    //const token = localStorage.getItem("token")

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
      .get("http://localhost:4300/v1/admin/patients/", {
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
      <div className="center">No Hospital</div>
    );

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div className="allpatients" key={post._id}>
            <div className="patientsinvoice">
              <p>
                <b>Mobile No- </b> {post.mobile}
              </p>
              <h3>25 JUNE 2020</h3>
            </div>

            <div className="alltransation">
              <div>
                <p>
                  <b>Patient Name</b>
                </p>
                <p>{post.patient_name}</p>
              </div>

              <div>
                <p>
                  <b>Doctor Name</b>
                </p>
                <p>Dr.Rahul Kumar</p>
              </div>

              <div>
                <p>
                  <b>Symptom</b>
                </p>
                <p>Fever and Cough</p>
              </div>

              <div>
                <p>
                  <b>Amount</b>
                </p>
                <p>Rs. 2000</p>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div className="dashboard_wrap">
        <select
          id="hospital"
          className="ChooseDoctor"
          onChange={this.handleOnChange}
        >
          {hospitallist}
        </select>
        <div className="headerNew">
          {/* {this.state.hospitalcode} */}
          {postList}
        </div>
      </div>
    );
  }
}
export default AllPatients;
