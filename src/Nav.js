import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import logo from './img/logo.png';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="logo">
                        <Link to='/Dashboard'> <img src={logo} alt="logo" />  </Link>
                    </div>
                    <ul>
                        <li><Link to='/Dashboard'><i className="fas fa-home"></i>Dashboard</Link></li>
                        <li><Link to='/Allhospitals'><i className="far fa-hospital"></i>Hospitals</Link></li>
                        <li><Link to='/Alldoctors'><i className="fas fa-user-md"></i>Doctors</Link></li>
                        <li><Link to='/AllPatients'><i className="fas fa-procedures"></i>Patients</Link></li>
                        <li><Link to='/Contact'><i className="fas fa-phone-alt"></i>Contact</Link></li>
                        {/* <li><Link to='/Login'><i className="fas fa-user-lock"></i>Login</Link></li> */}
                        <li><Link to='/splash'><i className="fas fa-user-lock"></i>logout</Link></li>
                    </ul>
                </div>

            </header>
        )
    }

}
export default Nav;


