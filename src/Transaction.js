import React from "react";
import "./dashboard/dashboard.css";
import Navigation from "./Nav";
import moment from "moment-timezone";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Spinner from "./img/Spinnergrey.gif";

class Transation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      dup_post:[],
      hospital: [],
    };
  }

  componentDidMount = () => {
    this.setState({ hospital: [] })
    this.GetTransactions();
  };

  GetTransactions = () => {
    //console.log("message added")
    axios
      .get(`https://stage.mconnecthealth.com/v1/admin/orders`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
             let dup_hospitals = [
             JSON.stringify({      
            _id: "allhospital",
            name: "All Hospital",
      })];
          
                 
          response.data.data.map(item => {
            let jsonOBJ = {
              _id: item.hospital_id,
              name:item.hospital_name
            }
            let objString = JSON.stringify(jsonOBJ)
            let index = dup_hospitals.indexOf(objString)            
           
              if (index === -1) {
                  console.log("Push :",index)
              dup_hospitals.push(objString)
            }
            
            
         })
          this.setState({
           hospital: dup_hospitals,           
           posts: data,
           dup_post: data})
     //   console.log("Data has been received!!" + data);
        } else {
          this.setState({ 
          posts: [],
          dup_post: [],
          hospital: [],
           
        });
        }
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

   handleStatus = (e) => {
    console.log("This is status: ", e.target.value);
      if (e.target.value === "status") {
    this.setState({
      posts:this.state.dup_post
    }) 
      } else {
        let filterList = this.state.dup_post.filter(item => {
          if (item.status === e.target.value) {
            return item
          }
        })
        this.setState({posts:filterList})   
    }
    
  } 
    handleOnChange = (e) => { 
   console.log("This is hospital ID : ", e.target.value);
      if (e.target.value === "allhospital") {
    this.setState({
      posts:this.state.dup_post
    }) 
      } else {
        let filterList = this.state.dup_post.filter(item => {
          if (item.hospital_id === e.target.value) {
            return item
          }
        })
        this.setState({posts:filterList})   
    }
  
  }; 
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    const { posts,hospital } = this.state;

     const HospitalList = hospital.length ? (
      hospital.map((item) => {
      let item_copy = JSON.parse(item)
        return (
          <option key={item_copy._id} value={item_copy._id} >
           {item_copy.name}
          </option>
        ); 
      })
    ) : (
      <div className="center">No Doctor</div>
    );

    const TransactionsList = posts.length ? (
      posts.map((post) => {
        return (
          <div className="maintrans" key={post.invoice}>
            <div className="alltransation">
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{post.invoice}</p>
              </div>
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{post.hospital_name}</p>
              </div>
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{moment(post.date).format("ll")}</p>
              </div>
              <div>
                <p>Dr. {post.doctor_name}</p>
              </div>
              <div>
                <p>{post.patient_name}</p>
              </div>
              <div>
                <p>
                  {" "}
                  {post.amount} {post.currency}
                </p>
              </div>
              <div>
                <p>{post.status} </p>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div
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
    return (
      <div className="Appcontainer">
        <Navigation />

        <div className="transactioncard pb15">
          <div className="backarrow">
            {" "}
            <Link to="/Dashboard">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Transactions</h2>

          <div className="maintrans">
            <div className="alltransation">
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>
                  <b>Invoice No</b>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>
                  <select
                    id="doctors"
                    onChange={this.handleOnChange}
                    className="transdoctor"
            >
              {HospitalList}
            </select>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>
                  <b>Date</b>
                </p>
              </div>
              {/* <div>
                                <p><b>Patient</b></p>
                                <p>Avneet Dixit</p>
                            </div> */}
              <div>
                <p>
                  <b>Doctor Name</b>
                </p>
              </div>
              <div>
                <p>
                  <b>Patient Name</b>
                </p>
              </div>
              <div>
                <p>
                  <b>Amount</b>
                </p>
              </div>
              <div>
                <p>
                  <select
              id="doctors"
                    onChange={this.handleStatus}
                    className="transdoctor"
            >
                    <option value="status">Status</option>
                    <option value="initiated">INITIATED</option>
                    <option value="paid">PAID</option>
            </select>
                </p>
              </div>
            </div>
          </div>

          {TransactionsList}
        </div>
      </div>
    );
  }
}
export default Transation;
