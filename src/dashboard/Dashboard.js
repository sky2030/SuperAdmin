import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard.css';
import bgimg from './img/bgimg.jpg';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
    render() {
        return (

            <div className="dashboard_wrap">
                <div className="dashboard_maincontent">
                    <img src={bgimg} alt="doctor-img" />
                    <div className="dashboard_icons">
                        <ul>

                            <li><Link to='/Allhospitals'><i className="fas fa-hospital"></i>All Hospitals</Link></li>
                            <li><Link to='/Alldoctors'><i className="fas fa-user-md"></i>All Doctors</Link></li>
                            <li><Link to='/Allpatients'><i className="fas fa-procedures"></i>All Patients</Link></li>
                            <li><Link to='/Contact'><i className="fas fa-phone-alt"></i>Contact</Link></li>

                        </ul>
                    </div>
                </div>
            </div>



        )
    }
}
export default Dashboard;