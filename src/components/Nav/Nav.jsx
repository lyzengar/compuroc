import React from 'react';
import logo from './rocket_icon.png';
import './Nav.css';

const NavBar = (props) => {
    let nav = props.user ?
      <div>
        <a className='NavBar-link' onClick={props.handleLogout} >LOG OUT</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span className='NavBar-welcome'>WELCOME, {props.user.username}</span>
      </div>
      :
      <div>
        <a onClick={props.openLogin} className='NavBar-link'>LOG IN</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a onClick={props.openSignup} className='NavBar-link'>SIGN UP</a>
      </div>;
  
    return (
      <div className='NavBar'>
        {nav}
        <h1>compuRoc</h1>
        <div className='logo-div'><img src={logo} alt=""/></div>
      </div>
    );
  };
  
export default NavBar;