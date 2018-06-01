import React, { Component } from 'react';
import './App.css';
import userService from '../src/utils/userService'
import NavBar from './components/Nav/Nav';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
const parseString = require('xml2js').parseString;

// Mathematical constants 
const G = 9.8;
const RHO = 1.225;

class App extends Component {
  constructor() {
    super();
    this.state = {
      diameter: 0,
      mass: 0,
      dragCoef: 0,
      motorManu: "",
      motorLetter: "",
      motorClass: [],
      selectedMotorClass:"",
      avgThrust: "",
      burnTime: "",
      totalWeight: "",
      propWeight: "",
      maxAlt: "",
      maxVel: "",
      tTA: "", 
      tCoast: "", 
      Scoast: "", 
      newBeta: "", 
      showSignup: false,
      showLogin: false,
      disableButton: true,
      fillXY: []
    }
  }

  openSignup = () => {
    this.setState({ showSignup: true })
  };

  openLogin = () => {
    this.setState({ showLogin: true })
  };

  handleSignup = () => {
    this.setState({user: userService.getUser(), showSignup: false});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleLogin = () => {
    this.setState({user: userService.getUser(), showLogin: false});
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    }, function() {
      if (field === 'motorLetter' && this.state.motorManu) {
        this.handleManSelected();
      }
    });
  }
  
  handleManSelected = () => {
    var postData = `<search-request><manufacturer>${this.state.motorManu}</manufacturer><impulse-class>${this.state.motorLetter}</impulse-class></search-request>`;
      fetch('http://www.thrustcurve.org/servlets/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: postData
      }).then(res => res.text())
        .then(xml => parseString(xml, (err, data) => {
          let apiResults = data["search-response"].results[0].result
          let commonNames = apiResults.map(result => result['common-name'][0]);
          this.setState({motorClass: commonNames})
        }))  
  }

  handleMotorData = (e) => {
    this.setState({selectedMotorClass: e.target.value})
    var postData = `<search-request><manufacturer>${this.state.motorManu}</manufacturer><impulse-class>${this.state.motorLetter}</impulse-class><common-name>${e.target.value}</common-name></search-request>`;
      fetch('http://www.thrustcurve.org/servlets/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: postData
      }).then(res => res.text())
        .then(xml => parseString(xml, (err, data) => {
          let apiResults = data["search-response"].results[0].result[0];
          let averageThrust = apiResults['avg-thrust-n'];
          let burn = apiResults['burn-time-s'];
          let totalW = apiResults['total-weight-g'];
          let propW = apiResults['prop-weight-g'];
          this.setState({
            avgThrust: averageThrust[0],
            burnTime: burn[0], 
            totalWeight: totalW[0], 
            propWeight: propW[0], 
            disableButton: false
          })
        }))
  }

  postFlightInfo = (data) => {
    fetch('/api/flights', {
      method: 'post',
      body: JSON.stringify(data)
    })
  }

  calcLaunch = () => {
    let W = ((parseFloat(this.state.mass) + parseFloat(this.state.totalWeight))  * 0.0098);
    let a = (this.state.avgThrust / W ) - 1;
    let A = (Math.pow(parseFloat(this.state.diameter), 2) * Math.PI / 4) / 1000000;
    let beta = W / (parseFloat(this.state.dragCoef) * A);
    let Sburnout = (2 * beta / G * RHO) * Math.log(Math.cosh(Math.sqrt((a * RHO) / (2 * beta)) * G * parseFloat(this.state.burnTime)));
    let Vburnout = Math.sqrt((2 * beta * a) / RHO) * Math.tanh(Math.sqrt((a * RHO) / (2 * beta))) * G * parseFloat(this.state.burnTime); //maxVel
    let newW = ((parseFloat(this.state.mass) + (parseFloat(this.state.totalWeight)) - (parseFloat(this.state.propWeight))) * 0.0098);
    let newa = (parseFloat(this.state.avgThrust) / newW) - 1;
    let newBeta = newW / (parseFloat(this.state.dragCoef) * A);
    let Scoast = (newBeta / (G * RHO)) * Math.log(1 + (RHO / (2 * newBeta)) * Math.pow(Vburnout, 2));
    let tCoast = (Math.sqrt(2 * newBeta / RHO) / G) * Math.atan(Math.sqrt(RHO / 2 * newBeta) * Vburnout);
    var maxAltitude = Sburnout + Scoast;
    let tTA = parseFloat(this.state.burnTime) + tCoast; //timeToApogee
    
    this.setState({
      tTA: tTA, tCoast: tCoast, Scoast: Scoast, newBeta: newBeta
    }, function() {
      this.graphLaunch();
    });

  }

  graphLaunch = () => {
    var graphData = [{x: 0, y: 0}];
    var t = parseFloat(this.state.tTA) - parseFloat(this.state.tCoast);
    let graphAlt = (t) =>  parseFloat(this.state.Scoast) + ((2 * parseFloat(this.state.newBeta)) / (RHO * G)) * Math.log(Math.cos(Math.sqrt(RHO / (2 * parseFloat(this.state.newBeta))) * G * ((parseFloat(this.state.tCoast) - t))));
    
    for (let i = t; i < parseFloat(this.state.tTA); i += 0.1) {
      graphData.push({x: i, y: graphAlt(i)})
    }
    this.setState({fillXY: graphData})
  }

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div>
        <NavBar
          openSignup={this.openSignup}
          openLogin={this.openLogin}
          handleLogout={this.handleLogout}
          user={this.state.user}
          />
        <Dashboard
          handleChange={this.handleChange}
          handleManSelected={this.handleManSelected}
          motorClass={this.state.motorClass}
          handleMotorData={this.handleMotorData}
          calcLaunch={this.calcLaunch}
          graphLaunch={this.graphLaunch}
          disableButton={this.state.disableButton}
          maxAlt={this.state.maxAlt}
          maxVel={this.state.maxVel}
          tTA={this.state.tTA}
          fillXY={this.state.fillXY}
        />
        <SignupPage
          showSignup={this.state.showSignup}
          handleSignup={this.handleSignup}
          />
        <LoginPage
          showLogin={this.state.showLogin}
          closeLogin={this.closeLogin}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default App;
