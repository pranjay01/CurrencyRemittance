import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../config';
import './Login.css';
// import { history } from '../../App';
import { updateLoginSuccess } from '../../constants/action-types';
import { connect } from 'react-redux';
import { updateSnackbarData } from '../../constants/action-types';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super className i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: null,
      password: null,
      authFlag: false,
      errorBlock: null,
      inputBlockHighlight: null,
      errorFlag: 1,
      fName: '',
      lName: '',
      email: '',
      signupPassword: '',
      sigupSuccessful: false,
      genders: [],
      gender: null,
      authProviders: ''
    };
    //Bind the handlers to this className
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log(response);
    debugger;
    this.setState({
      fName: response.wt.cu,
      username: response.wt.cu,
      authProviders: 'GOOGLE',
    })
  }
  componentWillMount() {
    if (this.props.location.pathname === '/Signup') {
      console.log('inside Signup');
      axios.get(serverUrl + 'static/signupMasterDataCustomer').then((response) => {
        console.log(response.data);
        let allGenders = response.data[0].map((gender) => {
          return { key: gender.ID, value: gender.Gender };
        });

        this.setState({
          genders: this.state.genders.concat(allGenders),
        });
      });
    }
    this.setState({
      authFlag: false,
    });
  }

  /**Signup Block */
  onChangeHandlerFname = (e) => {
    this.setState({
      fName: e.target.value,
    });
  };
  onChangeHandlerLname = (e) => {
    this.setState({
      lName: e.target.value,
    });
  };
  onChangeHandlerEmail = (e) => {
    this.setState({
      email: e.target.value,
      errorBlock: null,
    });
  };

  onChangeHandlerPasswordSignup = (e) => {
    this.setState({
      signupPassword: e.target.value,
    });
  };

  onChangeHandlerGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  onSubmitSignUp = (e) => {
    //prevent page from refresh
    e.preventDefault();
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(serverUrl + 'user',
     null,
     { params: {
      userName : this.state.username,
      nickname : this.state.fName,
      password : this.state.signupPassword,
    }}).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      },
      (error) => {
        // console.log('Status Code : ', error.status);
        // console.log('Status Code : ', error.response);
        console.log(error.response.data);
        this.setState({
          errorBlock: error.response.data,
          sigupSuccessful: false,
        });
      }
    );
  };
  /**Login Block */
  removeError = (e) => {
    this.setState({
      errorBlock: null,
      sigupSuccessful: false,
    });
  };
  //username change handler to update state variable with the text entered by the user
  onChangeHandlerUsername = (e) => {
    this.setState({
      username: e.target.value,
      errorBlock: null,
      inputBlockHighlight: null,
      // errorFlag: 1,
    });
  };
  //password change handler to update state variable with the text entered by the user
  onChangeHandlerPassword = (e) => {
    this.setState({
      password: e.target.value,
      errorBlock: null,
      inputBlockHighlight: null,
      // errorFlag: 1,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      Email: this.state.username,
      Password: this.state.password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(serverUrl + 'customer/login', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          localStorage.setItem('token', cookie.load('cookie'));
          localStorage.setItem('userrole', cookie.load('userrole'));
          console.log('cookie: ', cookie.load('cookie'));
          console.log('role: ', cookie.load('userrole'));
          let payload = {
            userEmail: this.state.username,
            role: cookie.load('userrole'),
            loginStatus: true,
          };
          this.props.updateLoginSuccess(payload);
          this.setState({
            authFlag: true,
          });
        } else {
          this.setState({
            authFlag: false,
          });
        }
      },
      (error) => {
        // console.log('Status Code : ', error.status);
        // console.log('Status Code : ', error.response);
        this.setState({
          errorBlock: error.response.data,
          inputBlockHighlight: 'errorBlock',
        });
      }
    );
  };

  checkSnackbar = () => {
    let payload = {
      success: true,
      message: 'Account Created Successfully!',
    };
    this.props.updateSnackbarData(payload);
  };
  render() {
    let redirectVar = null;
    // if (cookie.load('cookie')) {
    //   if (cookie.load('userrole') === 'Restaurant') {
    //     console.log('redirect to restaurant home page');
    //     redirectVar = <Redirect to="/restaurantHome" />;
    //   } else if (cookie.load('userrole') === 'Customer') {
    //     console.log('redirect to custome home page');
    //     redirectVar = <Redirect to="/home" />;
    //   }
    // }

    let signupOrLogin = null;
    // console.log(history.location);
    if (this.props.location.pathname === '/Signup') {
      // if (history.location.pathname === '/Signup') {
      signupOrLogin = (
        <div class="flow-start">
          <div class="signup-form-container">
            <div class="header">
              <h2>Sign Up for Yelp</h2>
              <p class="subheading">Connect with great local businesses</p>
              <p class="legal-copy">
                By continuing, you agree to Yelp’s{' '}
                <Link class="legal-link" href="#">
                  Terms of Service
                </Link>{' '}
                and acknowledge Yelp’s{' '}
                <Link class="legal-link" href="#">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div>
              <p class="fb-start">
                {/* <button
                  type="submit"
                  value="submit"
                  class="ybtn ybtn--social ybtn--facebook ybtn-full"
                >
                  <span>
                    <div class="u-text-centered">
                      <span
                        aria-hidden="true"
                        style={{ width: '24px', height: '24px' }}
                        class="icon icon--24-facebook icon--size-24 icon--currentColor"
                      >
                        <svg role="img" class="icon_svg"></svg>
                      </span>{' '}
                      Continue with Facebook
                    </div>
                  </span>
                </button> */}
                <FacebookLogin
                  appId="673806016835125"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook} />
              </p>
              <p class="google-start">
                {/* <button
                  type="submit"
                  value="submit"
                  class="ybtn ybtn--social ybtn--google ybtn-full"
                >
                  <span>
                    <div class="u-text-centered">
                      <span class="icon--png">
                        <img
                          height="24"
                          width="24"
                          src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/cae242fd3929/assets/img/structural/24x24_google_rainbow.png"
                          srcset="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c193df424e16/assets/img/structural/24x24_google_rainbow@2x.png 2x"
                        />
                      </span>{' '}
                      Continue with Google
                    </div>
                  </span>
                </button> */}
                 <GoogleLogin
                  clientId="193224160021-l84huj79hc912hrn1a2itds827iemm57.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'} />

              </p>
              <p class="legal-copy">Don't worry, we never post without your permission.</p>
              <fieldset class="hr-line">
                <legend align="center">OR</legend>
              </fieldset>
            </div>
            <form
              onSubmit={this.onSubmitSignUp}
              class="yform signup-form  city-hidden"
              id="signup-form"
            >
              <div class="js-password-meter-container">
                <ul class="inline-layout clearfix">
                  <li>
                    <label class="placeholder-sub">Nick Name</label>
                    <input
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      required="required"
                      type="text"
                      onChange={this.onChangeHandlerFname}
                      value={this.state.fName}
                    />
                  </li>

                  {/* <li>
                    <label class="placeholder-sub">Last Name</label>
                    <input
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      required="required"
                      type="text"
                      onChange={this.onChangeHandlerLname}
                    />
                  </li> */}
                </ul>

                <div>
                  <label class="placeholder-sub">Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    required="required"
                    type="email"
                    onChange={this.onChangeHandlerEmail}
                    value={this.state.username}
                  />

                  <label class="placeholder-sub">Password</label>
                  <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    required="required"
                    type="password"
                    onChange={this.onChangeHandlerPasswordSignup}
                  />

                  <div class="js-password-meter-wrapper password-meter-wrapper u-hidden">
                    <div class="progress-bar-container--minimal">
                      <h4 class="progress-bar-text"></h4>
                      <div class="progress-bar new js-progress-bar">
                        <div
                          class="progress-bar_fill js-progress-bar_fill new"
                          role="presentation"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="signup-button"
                type="submit"
                class="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
              >
                <span>Sign Up</span>
              </button>
            </form>
          </div>
          <div class="sub-text-box">
            <small class="subtle-text" style={{ textAlign: 'left', paddingRight: '21px' }}>
              Restaurant Signup{' '}
              <Link class="login-link" to="/restaurantSignup">
                Sign Up
              </Link>
            </small>
            <small class="subtle-text">
              Already on Yelp?{' '}
              <Link class="login-link" to="/Login">
                Log in
              </Link>
            </small>
          </div>
        </div>
      );
    } else if (this.props.location.pathname === '/Login') {
      // } else if (history.location.pathname === '/Login') {
      signupOrLogin = (
        <div class="login">
          <div class="signup-form-container">
            <div class="header">
              <h2>Sign in to Direct Exchange</h2>
              <p class="subheading">
                New to Direct Exchange?{' '}
                <Link class="signup-link " to="/Signup">
                  Sign up
                </Link>
              </p>
              <p class="legal-copy">
                By logging in, you agree to Yelp’s{' '}
                <Link class="legal-link" to="#">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link class="legal-link" to="#">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <ul class="ylist">
              <li class="js-apple-login">
                <div
                  id="appleid-signin"
                  role="button"
                  class="apple-login-button u-cursor-pointer"
                  data-color="black"
                  data-type="sign in"
                  data-border-radius="8%"
                ></div>
              </li>

              <li class="js-fb-login">
                <button
                  type="submit"
                  value="submit"
                  class="ybtn ybtn--social ybtn--facebook ybtn-full"
                >
                  <span>
                    <div class="u-text-centered">
                      <span
                        aria-hidden="true"
                        style={{ width: '24px', height: '24px' }}
                        class="icon icon--24-facebook icon--size-24 icon--currentColor"
                      >
                        <svg role="img" class="icon_svg"></svg>
                      </span>{' '}
                      Sign in with Facebook
                    </div>
                  </span>
                </button>
              </li>

              <li class="js-google-login" data-component-bound="true">
                <button
                  type="submit"
                  value="submit"
                  class="ybtn ybtn--social ybtn--google ybtn-full"
                >
                  <span>
                    <div class="u-text-centered">
                      <span class="icon--png">
                        <img
                          height="24"
                          width="24"
                          src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/cae242fd3929/assets/img/structural/24x24_google_rainbow.png"
                          srcset="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c193df424e16/assets/img/structural/24x24_google_rainbow@2x.png 2x"
                        />
                      </span>{' '}
                      Sign in with Google
                    </div>
                  </span>
                </button>
              </li>
            </ul>
            <fieldset class="login-separator hr-line">
              <legend align="center">OR</legend>
            </fieldset>
            <form class="yform" onSubmit={this.submitLogin}>
              <label class="placeholder-sub">Email</label>
              <input
                id="email"
                name="email"
                placeholder="Email"
                required="required"
                type="email"
                onChange={this.onChangeHandlerUsername}
                class={this.state.inputBlockHighlight}
              />
              <label class="placeholder-sub">Password</label>
              <input
                onChange={this.onChangeHandlerPassword}
                id="password"
                name="password"
                placeholder="Password"
                required="required"
                type="password"
                class={this.state.inputBlockHighlight}
              />
              <button type="submit" class="ybtn ybtn--primary ybtn--big submit ybtn-full">
                <span>Sign in</span>
              </button>
            </form>
          </div>
          <div class="sub-text-box">
            <small class="subtle-text">
              Restaurant Login{' '}
              <Link
                class="signup-link"
                to="/restaurantLogin"
                style={{ textAlign: 'left', paddingRight: '55px' }}
              >
                Log In
              </Link>
            </small>
            <small class="subtle-text">
              New to Yelp?{' '}
              <Link class="signup-link" to="/Signup">
                Sign up
              </Link>
            </small>
          </div>
        </div>
      );
    } else {
    }
    let errorBlock = this.state.errorBlock;
    // let signupErrorBlock = this.state.signupErrorBlock;
    let errorClass = 'alert alert-error ';
    if (!errorBlock) {
      errorClass += 'hidden';
    }
    let successClass = 'alert alert-error ';
    if (!this.state.sigupSuccessful) {
      successClass += 'hidden';
    }
    let successBlock = null;
    if (this.state.sigupSuccessful) {
      successBlock = 'Account Created!! Login to Continue.';
    }
    return (
      <div>
        {redirectVar}
        {/*this.props.snackbarData != null && <SnackBar />*/}

        <div>
          <div>
            <div className="main-content-wrap main-content-wrap--full">
              <div id="super-container" className="content-container">
                <div id="alert-container">
                  <div class={errorClass}>
                    <a onClick={this.removeError} class="js-alert-dismiss dismiss-link" href="#">
                      ×
                    </a>
                    <p class="alert-message">
                      <ul>{errorBlock}</ul>
                    </p>
                  </div>
                  <div class={successClass}>
                    <a onClick={this.removeError} class="js-alert-dismiss dismiss-link" href="#">
                      ×
                    </a>
                    <p class="alert-message">
                      <ul>{successBlock}</ul>
                    </p>
                  </div>
                </div>

                <div className="clearfix layout-block layout-h row--responsive">
                  <div className="column column-alpha column--responsive">
                    <div className="signup-wrapper">
                      <div class="signup-flow on-flow-start">{signupOrLogin}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component

// export default CustomerLogin;
const mapStateToProps = (state) => {
  const snackbarData = state.snackBarReducer;
  return {
    snackbarData: snackbarData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateLoginSuccess: (payload) => {
    //   dispatch({
    //     type: updateLoginSuccess,
    //     payload,
    //   });
    // },
    // updateSnackbarData: (payload) => {
    //   dispatch({
    //     type: updateSnackbarData,
    //     payload,
    //   });
    // },
  };
};

export default connect(null, mapDispatchToProps)(Login);
