import React, { Component } from 'react';
import './App.css';
import userService from '../src/utils/userService'
import NavBar from './components/Nav/Nav';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
const parseString = require('xml2js').parseString;

class App extends Component {
  constructor() {
    super();
    this.state = {
      diameter: 0,
      mass: 0,
      dragCoef: 0,
      motorManu: "",
      motorLetter: [],
      motorClass: [],
      avgThrust: "",
      burnTime: "",
      totalWeight: "",
      propWeight: "",
      maxAlt: "",
      maxVel: "",
      timeToApogee: "",
      showSignup: false,
      showLogin: false
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
    });
  }

  handleManSelected = (e) => {
    var postData = `<search-request><manufacturer>${e.target.value}</manufacturer></search-request>`;
      fetch('http://www.thrustcurve.org/servlets/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: postData
      }).then(res => res.text())
        .then(xml => parseString(xml, function(err, data) {
          let apiResults = data["search-response"].results[0].result
          let impulseClasses = new Set();
          apiResults.forEach(item => impulseClasses.add(item["impulse-class"][0]));
          
          console.dir([...impulseClasses]);
        }))  
  }

  calcLaunch = () => {
    var W = ((this.state.mass + this.state.totalWeight)/1000) * 9.8;
    var a = (this.state.avgThrust / W * 9.8) - 1;
    var A = Math.pow((Math.PI * this.state.diameter), 2) / 4
    var beta = W / (this.state.dragCoef * A);
    var g = 9.8;
    var rho = 1.225;
    var Sburnout = (2 * beta / g * rho) * Math.log(Math.cosh(Math.sqrt((a * rho) / (2 * beta)) * g * this.state.burnTime));
    var Vburnout = Math.sqrt((2 * beta * a) / rho) * Math.tanh(Math.sqrt((a * rho) / (2 * beta)) * g * this.state.burnTime); //maxVel
    var newW = ((this.state.mass + this.state.totalWeight - this.state.propWeight)/1000) * 9.8;
    var newa = (this.state.avgThrust / newW * 9.8) - 1;
    var newBeta = newW / (this.state.dragCoef * A);
    var Scoast = (newBeta / g * rho) * Math.log(1 + (rho / 2 * newBeta) * Math.pow(Vburnout, 2));
    var tCoast = (Math.sqrt(2 * newBeta / rho) / g) * Math.atan(Math.sqrt(rho / 2 * newBeta) * Vburnout);
    var maxAltitude = Sburnout + Scoast;
    var tTA = this.state.burnTime + tCoast; //timeToApogee
  }

  // graphLaunch = () => {
  //   var graphData = [{x: 0, y: 0}];
  //   for(var t = tTA - tCoast; t < tTA; t + 0.1) {

  //   }
  // }

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
          getMotorInfo={this.getMotorInfo}
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
