import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import cookie from 'react-cookies';
// import { updateHomeProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
import { UpdateUserProfile } from '../../constants/action-types';
// import { updateRestaurant } from '../../../mutations/UpdateProfile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormDisable: true,
      submitError: false,
      submitErrorBlock: '',
      tmpEditProfile: null,
    };
  }

  componentDidMount() {}

  editProfile = () => {
    if (this.state.isFormDisable) {
      let tmpEditProfile = {
        ...this.props.restaurantProfile,
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

  onChangeHandlerName = (e) => {
    let payload = {
      UserProfile: { Nickname: e.target.value },
    };
    this.props.UpdateUserProfile(payload);
    this.setState({
      submitError: false,
    });
  };

  /*
  onSubmitUpdateProfile = (e) => {
    e.preventDefault();
    const validateCheck = this.ValidityUpdateProfile();
    if (validateCheck === 'Correct') {
      //prevent page from refresh

      const data = {
        ...this.props.restaurantProfile,
        RestaurantID: localStorage.getItem('userId'),
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      // axios.post(serverUrl + 'biz/updateRestaurantProfile', data)

      //make a post request with the user data
      this.props.client
        .mutate({
          mutation: updateRestaurant,
          variables: {
            RestaurantID: localStorage.getItem('userId'),
            Name: this.props.restaurantProfile.Name,
            CountryName: this.props.restaurantProfile.CountryName,
            StateName: this.props.restaurantProfile.StateName,
            City: this.props.restaurantProfile.City,
            Zip: Number(this.props.restaurantProfile.Zip),
            Street: this.props.restaurantProfile.Street,
            PhoneNo: Number(this.props.restaurantProfile.PhoneNo),
            CountryCode: Number(this.props.restaurantProfile.CountryCode),
            OpeningTime: this.props.restaurantProfile.OpeningTime,
            ClosingTime: this.props.restaurantProfile.ClosingTime,
            ImageURL: this.props.restaurantProfile.ImageURL,
            CurbsidePickup: this.props.restaurantProfile.CurbsidePickup,
            DineIn: this.props.restaurantProfile.DineIn,
            YelpDelivery: this.props.restaurantProfile.YelpDelivery,
          },
        })
        .then(
          (response) => {
            console.log('Status Code : ', response.status);
            if (response.data.updateRestaurant.Result === 'Profile Updated Successfully') {
              console.log('Profile Updated');
              const payload = {
                success: true,
                message: response.data.updateRestaurant.Result,
              };
              this.props.updateSnackbarData(payload);
              this.setState({
                isFormDisable: true,
                submitError: false,
                tmpEditProfile: null,
              });
            } else if (response.data.updateRestaurant.Result === 'Network Error') {
              this.setState({
                submitErrorBlock: response.data.updateRestaurant.Result,
                submitError: false,
              });
            }
          },
          (error) => {
            // console.log(error);
            this.setState({
              submitError: false,
            });
          }
        );
    } else {
      this.setState({
        submitErrorBlock: validateCheck,
        submitError: true,
      });
    }
  };
*/
  render(/**<fieldset disabled> */) {
    const defaultImage =
      'https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png';

    let errorClass = 'alert alert-error ';
    if (!this.state.submitError) {
      errorClass += 'hidden';
    }
    return (
      <div style={{ marginTop: '3%' }}>
        <div className={errorClass}>
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
                    // onChange={this.onChangeHandlerName}
                    value={this.props.UserInfoStore.UserProfile.UserName}
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
                    value={this.props.UserInfoStore.UserProfile.Nickname}
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
