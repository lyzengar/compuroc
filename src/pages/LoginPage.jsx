import React from 'react';
import './LoginPage.css';
import LoginForm from '../components/LoginForm/LoginForm'

const LoginPage = (props) => {
    return props.showLogin ? (
        <div className="Modal">
            <LoginForm
                {...this.props}
                //updateMessage={this.updateMessage}
                handleLogin={props.handleLogin}
            />
        </div>
    ) : null;
}

export default LoginPage;