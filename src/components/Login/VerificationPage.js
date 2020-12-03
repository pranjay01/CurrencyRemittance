import React, { Component } from 'react';

class VerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Please verify your email, from the verification link sent to you on you Email to proceed
          </h1>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
