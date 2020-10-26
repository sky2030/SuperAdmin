import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import addicon from "./img/doctor.png";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Doctorprofile from "./img/doctor-icon.jpg";
import Nav from "./Nav";
//import Spinner from "./img/Spinner.gif";
//import Spinner from "./img/Magnify.gif";
import Spinner from "./img/Spinnergrey.gif";
import Pagination from "react-js-pagination";
//import("bootstrap/less/bootstrap.less");

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
      alldoctors: [],
      hospitals: [],
      hospitalcode: "",
      activePage: 6
    };
  }

  handleOnChange = (e) => {
    this.setState({
      hospitalcode: e.target.value,
    });



    console.log("this is hospital code : ", e.target.value);
    let dup_post = [...this.state.alldoctors];
    if (e.target.value == "drhospitalcode") {
      this.setState({
        posts: dup_post,
      });
      return;
    }

    console.log(dup_post);
    dup_post = dup_post.filter((item) => {
      console.log("Hospital code : ", item.hospitalcode);
      if (item.hospitalcode == e.target.value) {
        return item;
      }
    });

    this.setState({
      posts: dup_post,
    });
  };

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }



  fetchAll = () => {
    //console.log(`this is hospital code ${this.state.hospitalcode}`);
    let URL = `https://stage.mconnecthealth.com/v1/admin/doctors`;
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
        this.setState({ alldoctors: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  componentDidMount = () => {
    // console.log(`this is hospital code ${this.state.hospitalcode}`);
    this.getHospital();
    this.fetchAll();
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
    let alldoctorjson = [
      {
        _id: "alldoctor",
        hospitalcode: "drhospitalcode",
        hospitalname: "All Doctors",
      },
    ];

    alldoctorjson = alldoctorjson.concat([...hospitals]);
    //  hospitals = [...alldoctorjson];
    const hospitallist = alldoctorjson.length ? (
      alldoctorjson.map((item) => {
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <select
              id="hospital"
              className="ChooseDoctor"
              onChange={this.handleOnChange}
            >
              {hospitallist}
            </select>
            {/* <div className="ChooseDoctor">All Doctor's</div> */}
          </div>

          <div className="flex-container">
            {/* {this.state.hospitalcode} */}

            {postList}
          </div >
          {/* <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
          }}>
            <Pagination
              hideDisabled
              firstPageText={<i className='glyphicon glyphicon-chevron-left' />}
              lastPageText={<i className='glyphicon glyphicon-chevron-right' />}
              prevPageText={<i className='glyphicon glyphicon-menu-left' />}
              nextPageText={<i className='glyphicon glyphicon-menu-right' />}
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={10}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}

            /></div> */}
        </div>
      </div>
    );
  }
}
export default Alldoctors;
