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
      motorLetter: "",
      motorClass: [],
      selectedMotorClass:"",
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
          console.log(data)
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
          console.log(data)
          let apiResults = data["search-response"].results[0].result[0];
          let averageThrust = apiResults['avg-thrust-n'];
          let burn = apiResults['burn-time-s'];
          let totalW = apiResults['total-weight-g'];
          let propW = apiResults['prop-weight-g'];
          this.setState({avgThrust: averageThrust[0]})
          this.setState({burnTime: burn[0]})
          this.setState({totalWeight: totalW[0]})
          this.setState({propWeight: propW[0]})
        }))
  }

  //manufacturerId=1&designation=&motor=&type=&impulseClass=H&diameter=&certOrgId=&propellant=&availability=regular%2Coccasional%2C+&sortBy=impulse_class

  calcLaunch = () => {
    var W = ((this.state.mass + this.state.totalWeight)/1000) * 9.8;
    var a = (this.state.avgThrust / W * 9.8) - 1;
    var A = Math.pow((Math.PI * this.state.diameter), 2) / 4
    var beta = W / (this.state.dragCoef * A);
    this.g = 9.8;
    this.rho = 1.225;
    var Sburnout = (2 * beta / this.g * this.rho) * Math.log(Math.cosh(Math.sqrt((a * this.rho) / (2 * beta)) * this.g * this.state.burnTime));
    var Vburnout = Math.sqrt((2 * beta * a) / this.rho) * Math.tanh(Math.sqrt((a * this.rho) / (2 * beta)) * this.g * this.state.burnTime); //maxVel
    var newW = ((this.state.mass + this.state.totalWeight - this.state.propWeight)/1000) * 9.8;
    var newa = (this.state.avgThrust / newW * 9.8) - 1;
    this.newBeta = newW / (this.state.dragCoef * A);
    this.Scoast = (this.newBeta / this.g * this.rho) * Math.log(1 + (this.rho / 2 * this.newBeta) * Math.pow(Vburnout, 2));
    this.tCoast = (Math.sqrt(2 * this.newBeta / this.rho) / this.g) * Math.atan(Math.sqrt(this.rho / 2 * this.newBeta) * Vburnout);
    var maxAltitude = Sburnout + this.Scoast;
    this.tTA = this.state.burnTime + this.tCoast; //timeToApogee

    this.graphLaunch();
  }

  graphLaunch = () => {
    var graphData = [{x: 0, y: 0}];
    var t = this.tTA - this.tCoast;
    var graphAlt = () => this.Scoast + (2 * this.newBeta / this.rho * this.g) * Math.log(Math.cos(Math.sqrt(this.rho / 2 * this.newBeta) * this.g * (this.tCoast - t)));
    for(var i = t; i < this.tTA; i + 0.1) {
      graphData.push({x: i, y: graphAlt()})
    }
    console.log(graphData);
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
          getMotorInfo={this.getMotorInfo}
          motorClass={this.state.motorClass}
          handleMotorData={this.handleMotorData}
          calcLaunch={this.calcLaunch}
          graphLaunch={this.graphLaunch}
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
