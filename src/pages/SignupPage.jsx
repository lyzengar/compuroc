import React from 'react';
import './SignupPage.css';
import  SignupForm from '../components/SignupForm/SignupForm';

const SignupPage = (props) => {
    return props.showSignup ? (
        <div className="Modal">
            <SignupForm
                {...this.props}
                handleSignup={props.handleSignup}
            />
        </div>
    ) : null;
};

export default SignupPage;