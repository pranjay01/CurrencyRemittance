import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import cookie from 'react-cookies';
// import { updateHomeProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
import { UpdateUserProfile } from '../../constants/action-types';
// import { updateRestaurant } from '../../../mutations/UpdateProfile';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormDisable: true,
      submitError: false,
      submitErrorBlock: '',
      tmpEditProfile: null,
      password: '',
    };
  }

  componentDidMount() {}

  editProfile = () => {
    if (this.state.isFormDisable) {
      let tmpEditProfile = {
        ...this.props.UserInfoStore.UserProfile,
      };
      this.setState({
        isFormDisable: !this.state.isFormDisable,
        tmpEditProfile,
        submitError: false,
      });
    } else {
      let UserProfile = this.state.tmpEditProfile;

      let payload = {
        ...UserProfile,
      };
      this.props.UpdateUserProfile(payload);

      this.setState({
        tmpEditProfile: null,
        isFormDisable: !this.state.isFormDisable,

        submitError: false,
      });
    }
  };

  onSubmitUpdateProfile = (event) => {
    event.preventDefault();

    axios
      .post(serverUrl + 'user' + '/' + localStorage.getItem('userId'), null, {
        params: {
          userId: parseInt(localStorage.getItem('userId')),
          // userId: 12345,
          nickname: this.props.UserInfoStore.UserProfile.nickname,
          password: this.state.password,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          this.setState({
            isFormDisable: true,
          });
          notification['success']({
            message: 'Success!!',
            description: 'Profile Updated Successfully!!',
            duration: 4,
          });
        },
        (error) => {
          notification['error']({
            message: 'ERROR!',
            description: error.response.data,
            duration: 4,
          });
        }
      );
  };

  onChangeHandlerName = (e) => {
    let payload = {
      UserProfile: { nickname: e.target.value },
    };
    this.props.UpdateUserProfile(payload);
    this.setState({
      submitError: false,
    });
  };
  onChangePasswordHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render(/**<fieldset disabled> */) {
    let errorClass = 'alert alert-error ';
    if (!this.state.submitError) {
      errorClass += 'hidden';
    }
    if (!localStorage.getItem('token')) {
      return (
        <Redirect
          to={{
            pathname: '/Login',
          }}
        />
      );
    }
    return (
      <div style={{ marginTop: '3%' }}>
        <div style={{ color: 'red' }} className={errorClass}>
          <p className="alert-message">{this.state.submitErrorBlock}</p>
        </div>
        <form
          style={{
            display: 'flex',

            flexDirection: 'row',

            justifyContent: 'center',
          }}
          onSubmit={this.onSubmitUpdateProfile}
          className="yform signup-form  city-hidden"
          id="signup-form"
        >
          <div className="photo-box pb-m"></div>
          <br />
          <fieldset disabled={this.state.isFormDisable && 'disabled'}>
            <div style={{ flexDirection: 'column' }} className="js-password-meter-container">
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '40%', flex: 'auto' }}>
                  <label className="placeholder-sub">User Name: </label>
                  <input
                    style={{ height: '35px' }}
                    id="first_name"
                    name="first_name"
                    placeholder="Name"
                    required="required"
                    type="text"
                    disabled="disabled"
                    // onChange={this.onChangeHandlerName}
                    value={this.props.UserInfoStore.UserProfile.userName}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '40%', flex: 'auto' }}>
                  <label className="placeholder-sub">NickName: </label>
                  <input
                    style={{ height: '35px' }}
                    id="first_name"
                    name="Nickname"
                    placeholder="Name"
                    required="required"
                    type="text"
                    onChange={this.onChangeHandlerName}
                    value={this.props.UserInfoStore.UserProfile.nickname}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '40%', flex: 'auto' }}>
                  <label className="placeholder-sub">NickName: </label>
                  <input
                    style={{ height: '35px' }}
                    id="first_name"
                    name="password"
                    placeholder="Password"
                    required="required"
                    type="password"
                    onChange={this.onChangePasswordHandler}
                    value={this.state.password}
                  />
                </li>
              </ul>
            </div>
            {!this.state.isFormDisable && (
              <div>
                <button
                  id="signup-button"
                  type="submit"
                  className="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                  style={{
                    marginTop: '2%',
                    marginLeft: '40%',
                  }}
                >
                  <span>Save</span>
                </button>

                <button
                  className="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                  style={{
                    marginTop: '2%',
                    marginLeft: '2%',
                  }}
                  onClick={this.editProfile}
                >
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </fieldset>
        </form>
        {this.state.isFormDisable && (
          <button
            className="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
            style={{
              marginTop: '2%',
              marginLeft: '45%',
            }}
            onClick={this.editProfile}
          >
            <span>Edit</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { UserInfoStore } = state.ProfileReducer;
  return {
    UserInfoStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateUserProfile: (payload) => {
      dispatch({
        type: UpdateUserProfile,
        payload,
      });
    },
    // updateSnackbarData: (payload) => {
    //   dispatch({
    //     type: updateSnackbarData,
    //     payload,
    //   });
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;
// export default compose(
//   withApollo,
//   graphql(updateRestaurant, { name: 'updateRestaurant' }),
//   // graphql(loginUser, { name: 'loginUser' }),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Profile);
