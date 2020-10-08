import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import contactImg from "./img/contact2.jpg";
//import { Link } from 'react-router-dom';

class Myhospital extends React.Component {
  render() {
    return (
      <div className="dashboard_wrap">
        <div className="flex-container scroll">
          <div className="contact-banner">
            <img
              style={{ width: "100%", borderRadius: "10px" }}
              src={contactImg}
              alt="Contact_img"
            />
          </div>
          <div className="col4 box-shad">
            <h3>Apollo Hospital</h3>
            <p>
              <i className="far fa-envelope"></i> support@apollohospital.com{" "}
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>120-34232334
            </p>
            <h3>Emergency Helpline</h3>
            <p>
              <i className="far fa-envelope"></i> emergency@apollohospital.com{" "}
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>120-34232334
            </p>
            <h3>Application Support</h3>
            <p>
              <i className="far fa-envelope"></i>eopd@smhs.motherson.com
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>120-34232334
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Myhospital;
