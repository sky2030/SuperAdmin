import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
//import docicon from './img/doctor-icon.jpg';
import maxhosp from './img/maxhospital.jpg';
import { Link } from 'react-router-dom';
import Nav from "./Nav";

class Updatehospitaldetails extends React.Component {
	render() {
		return (
			<div className='Appcontainer'>
				<Nav />
				<div className="dashboard_wrap">
					<div className="banner-text">
						<img style={{ width: "100%" }} src={maxhosp} alt="hospital_img" />
					</div>

					<div className="adddept">
						<div className="backarrow"> <Link to='/Myhospital'><i className="fas fa-arrow-left"></i></Link></div>
						<h2>Add Doctor</h2>

						<form action="#">
							<div className="row">
								<input type="text" placeholder="maxsupport@maxsuper.org" />
								<input type="text" placeholder="120-34232334" />
								<input type="password" placeholder="password" />
								<input type="text" placeholder="Emergency Contact No" />
								<textarea placeholder="Emergency Detail"></textarea>
							</div>


							<div className="btncontainer">
								<button><i className="fas fa-check"></i>Upload Image </button>
								<button><i className="fas fa-save"></i>Update Details</button>
							</div>
						</form>
					</div>

				</div>
			</div>


		)
	}
}
export default Updatehospitaldetails;
