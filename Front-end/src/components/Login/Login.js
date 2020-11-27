import React, { Component } from 'react';
import LoginHeader from './LoginHeader';
import LoginBody from './LoginBody';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <body className="main flex flex-wide loggedOut lang-en en-US gdGrid lockedHome _initOk noTouch desktop">
        <div className="pageContentWrapper ">
          <div id="PageContent">
            <div id="PageBodyContents" className=" meat">
              <div className="pageInsideContent cf">
                <div id="Home" className="gdGrid">
                  <div id="NonMemberHome">
                    <article id="mainCol" className="mainCol">
                      {<LoginHeader />}
                      {<LoginBody />}
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
