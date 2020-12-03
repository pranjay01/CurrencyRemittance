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
import { notification } from 'antd';
import 'antd/dist/antd.css';

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
      errorBlock: 'error',
      inputBlockHighlight: null,
      errorFlag: 1,
      fName: '',
      lName: '',
      email: '',
      signupPassword: '',
      sigupSuccessful: false,
      genders: [],
      gender: null,
      authProviders: '',
      googleAuth: false,
      pathname: this.props.location?(this.props.location.pathname ? this.props.location.pathname: ""):"",
    };
    //Bind the handlers to this className
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }

  checkUserExistsOrNot = (email, callback) => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(serverUrl + 'userEmail/'+email)
      .then(
        (res) => {
          console.log('Status Code : ', res.status);
          if (res.status === 200) {
            callback(null, true, res.data);
          } else {
            callback(null, false, res.data);
          }
        },
        (error) => {
          callback(error, false, null);
        }
      );
  };

  responseFacebook = (response) => {
    this.checkUserExistsOrNot(response.email, (error, isExists, data) => {
      if (error) {
        notification['error']({
          message: 'Error!!',
          description: 'Facebook Login Failed!! Try Again.',
          duration: 2,
        });
        console.log(error.response.data);
        this.setState({
          errorBlock: error.response.data,
          sigupSuccessful: false,
        });
      } else if (isExists) {
        localStorage.setItem('token', data.password);
        localStorage.setItem('userrole', data.id);
        localStorage.setItem('status', data.status);
        cookie.save('token', data.password);
        cookie.save('userId', data.id);
        cookie.save('status', data.status);
      } else {
        this.setState({
          fName: response.email,
          username: response.email,
          authProviders: 'FACEBOOK',
        });
      }
    });
  };

  responseGoogleFailure = (response) => {
    notification['error']({
      message: 'Error!!',
      description: 'Google Login Failed!! Try Again.',
      duration: 2,
    });
  };

  responseGoogle = (response) => {
    console.log(response);
    this.checkUserExistsOrNot(response.wt.cu, (error, isExists, data) => {
      if (error) {
        notification['error']({
          message: 'Error!!',
          description: 'Google Login Failed!! Try Again.',
          duration: 2,
        });
      } else if (isExists) {
        // Add data from user to localstorage
        localStorage.setItem('token', data.password);
        localStorage.setItem('userrole', data.id);
        localStorage.setItem('status', data.status);
        cookie.save('token', data.password);
        cookie.save('userId', data.id);
        cookie.save('status', data.status);
      } else {
        this.setState({
          fName: response.wt.cu,
          username: response.wt.cu,
          authProviders: 'GOOGLE',
        });
      }
    });
  };
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

  onSubmitSignUp = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post(serverUrl + 'user', null, {
        params: {
          userName: this.state.username,
          nickname: this.state.fName,
          password: this.state.signupPassword,
        },
      })
      .then(
        (response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            console.log(response.data);
            this.setState({
              pathname: "/Login"
            })
          } else {
            console.log(response.data);
            notification['error']({
              message: 'Error!!',
              description: 'Signup Failed!! Try Again.',
              duration: 2,
            });
          }
        },
        (error) => {
          notification['error']({
            message: 'Error!!',
            description: 'Signup Failed!! Try Again.',
            duration: 2,
          });
          console.log(error.response.data);
          this.setState({
            errorBlock: error.response.data,
            sigupSuccessful: false,
          });
        }
      );
  };
  removeError = (e) => {
    this.setState({
      errorBlock: null,
      sigupSuccessful: false,
    });
  };
  onChangeHandlerUsername = (e) => {
    this.setState({
      username: e.target.value,
      errorBlock: null,
      inputBlockHighlight: null,
      // errorFlag: 1,
    });
  };
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
    console.log('login clicked');
    e.preventDefault();
    // notification['success']({
    //   message: 'Success!!',
    //   description: 'Product Deleted',
    //   duration: 2,
    // });
    // notification['error']({
    //   message: 'Warning!',
    //   description: 'Product Deletion Cancelled',
    //   duration: 2,
    // });
    // notification.open({
    //   message: 'Opp! Something went wrong.',
    //   description: 'This feature has been updated later!',
    //   duration: 5,
    // });
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(serverUrl + 'login', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          //Store cookie and set redirect to Home
          localStorage.setItem('token', response.data.password);
          localStorage.setItem('userrole', response.data.id);
          localStorage.setItem('status', response.data.status);
          cookie.save('token', response.data.password);
          cookie.save('userId', response.data.id);
          cookie.save('status', response.data.status);

          this.setState({
            authFlag: true,
          });
        } else {
          // this.setState({
          //   authFlag: false,
          // });
          notification['error']({
            message: 'Error!!',
            description: 'Login Failed!! Try Again.',
            duration: 2,
          });
        }
      },
      (error) => {
        // this.setState({
        //   errorBlock: error.response.data,
        //   inputBlockHighlight: 'errorBlock',
        // });
        notification['error']({
          message: 'Error!!',
          description: 'Login Failed!! Try Again.',
          duration: 2,
        });
      }
    );
  };

  // checkSnackbar = () => {
  //   let payload = {
  //     success: true,
  //     message: 'Account Created Successfully!',
  //   };
  //   this.props.updateSnackbarData(payload);
  // };
  render() {
    let redirectVar = null;
    if (cookie.load('token')) {
      redirectVar = <Redirect to="/OfferList" />;
      // if (cookie.load('userrole') === 'Restaurant') {
      //   console.log('redirect to restaurant home page');
      //   redirectVar = <Redirect to="/restaurantHome" />;
      // } else if (cookie.load('userrole') === 'Customer') {
      //   console.log('redirect to custome home page');
      //   redirectVar = <Redirect to="/home" />;
      // }
    }

    let signupOrLogin = null;
    // console.log(history.location);
    if (this.props.location.pathname === '/Signup' || this.state.pathname === '/Signup') {
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
                <FacebookLogin
                  appId="673806016835125"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                />
              </p>
              <p class="google-start">
                <GoogleLogin
                  clientId="193224160021-l84huj79hc912hrn1a2itds827iemm57.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                />
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
              Already a member?{' '}
              <Link class="login-link" to="/Login">
                Log in
              </Link>
            </small>
          </div>
        </div>
      );
    } else if (this.props.location.pathname === '/Login' || this.state.pathname === '/Login') {
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
                <FacebookLogin
                  appId="673806016835125"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                />
              </li>

              <li class="js-google-login" data-component-bound="true">
                <GoogleLogin
                  clientId="193224160021-l84huj79hc912hrn1a2itds827iemm57.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                />
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
                <div
                  style={{
                    marginLeft: '370px',
                    backgroundColor: '#ca2626',
                    color: 'white',
                    width: '225px',
                    borderRadius: '5px',
                  }}
                  id="alert-container"
                >
                  <div class={errorClass}>
                    <a onClick={this.removeError} class="js-alert-dismiss dismiss-link" href="#">
                      <h2 style={{ margin: '0%' }}> ×</h2>
                    </a>
                    <p class="alert-message">
                      <ul>{errorBlock}</ul>
                    </p>
                  </div>
                  <div class={successClass}>
                    <a
                      style={{ fontSize: 'xx-large' }}
                      onClick={this.removeError}
                      class="js-alert-dismiss dismiss-link"
                      href="#"
                    >
                      ×
                    </a>
                    <h4 class="alert-message">
                      <ul>{successBlock}</ul>
                    </h4>
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
