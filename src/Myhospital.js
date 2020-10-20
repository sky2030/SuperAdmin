import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import maxhosp from './img/maxhospital.jpg';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

class Myhospital extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      hospitals: {},
    };
  }
  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getHospital();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getHospital = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        "https://stage.mconnecthealth.com/v1/admin/hospitals/" +
        this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
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
    const { hospitals } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className='Appcontainer'>
        <Nav />
        <div className="dashboard_wrap1">
          <Link to="/Allhospitals" className="backbtn">
            Back
        </Link>
          <div className="headeralign">
            <div className="banner-text">
              <img
                style={{
                  width: "100%",
                  height: "50vh",
                  borderRadius: "2rem",
                  marginTop: "1.5rem",
                }}
                // className="imgclassName"
                src={hospitals.picture}
                alt="hospital_img"
              />
            </div>
            <div className="flex-container scroll" key={hospitals.code}>
              <div className="col5 box-shad">
                <h3>
                  {hospitals.hospitalname} {hospitals.code}
                </h3>
                <p>
                  <i className="far fa-envelope"></i> {hospitals.email}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i>
                  {hospitals.phone}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i>
                  {hospitals.EmergencyNo}
                </p>
              </div>
              <div className="col5 box-shad">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>Address
              </h3>
                <p>
                  <b>Place:</b>
                  {hospitals.place}
                </p>
                <p>
                  <b>Landmark:</b>
                  {hospitals.landmark}{" "}
                </p>
                <p>
                  <b>District:</b> {hospitals.district}
                </p>
                <p>
                  <b>State:</b> {hospitals.state} <b>Pin Code:</b>{" "}
                  {hospitals.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="add_departmet">
          <Link to='/Addhospital'> <i className="fas fa-plus"></i> Add Hospital </Link>
        </div> */}
        </div>
      </div>
    );
  }
}
export default Myhospital;
