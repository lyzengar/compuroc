import React, {Component} from 'react';
import userService from '../../utils/userService';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    //this.props.updateMessage('');
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      .then(() => {
        this.props.handleSignup();
      })
      //.catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.username && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={this.state.username} onChange={(e) => this.handleChange('username', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SignupForm;
