import React, {Component} from 'react';
import userService from '../../utils/userService';

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
    }
  
    handleChange = (field, e) => {
      this.setState({
        [field]: e.target.value
      });
    }
  
    handleSubmit = (e) => {
      let errors = document.getElementById('errors');
      e.preventDefault();
      userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
      })
      .catch(err => errors.innerText=err);
    }
  
    render() {
      return (
        <div>
          <header className="header-footer">Log In</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={(e) => this.handleChange('username', e)} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </form>
        </div>
      );
    }
  };
  
  export default LoginForm;