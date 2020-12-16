import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class VerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (localStorage.getItem('token') && localStorage.getItem('status') === 'Verified') {
      return (
        <Redirect
          to={{
            pathname: '/Home',
          }}
        />
      );
    } else if (!localStorage.getItem('token')) {
      return (
        <Redirect
          to={{
            pathname: '/Login',
          }}
        />
      );
    }
    return (
      <div>
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Please verify your email, from the verification link sent to you on you Email to proceed
            and re-login
          </h1>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
