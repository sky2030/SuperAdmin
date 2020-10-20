import React from "react";
import "./Global";
//import Nav from "./Nav";
import Footer from "./Footer";
import Myhospital from "./Myhospital";

import Alldoctors from "./Alldoctors";
import Dashboard from "./dashboard/Dashboard";
import Allhospitals from "./Allhospitals";
import Contact from "./Contact";
import Login from "./Login";
import Allpatients from "./Allpatients";
import Splash from "./Splash";

import Addhospital from "./Addhospital";
import Transaction from './Transaction'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Alldoctors" component={Alldoctors} />
          <Route path="/Allhospitals" component={Allhospitals} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Login" component={Login} />
          <Route path="/Addhospital" component={Addhospital} />
          <Route path="/Allpatients" component={Allpatients} />
          <Route path="/Splash" component={Splash} />
          <Route path="/Myhospital/:id" component={Myhospital} />
          <Route path="/Transaction" component={Transaction} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
