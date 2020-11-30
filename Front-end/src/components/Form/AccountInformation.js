import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import cookie from 'react-cookies';
// import { updateHomeProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
// import { updateSnackbarData } from '../../../constants/action-types';
// import { updateRestaurant } from '../../../mutations/UpdateProfile';

class AccountInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: [],
      States: [],
      isFormDisable: true,
      submitError: false,
      submitErrorBlock: '',
      tmpEditProfile: null,
      Account: {
        bankName: '',
        country: '',
        accountNumber: '',
        owner: '',
        address: '',
        primaryCurrency: '',
        accountType: '',
      },
    };
  }

  componentDidMount() {}

  onCOmmonChangeHandler = (e) => {
    // const data = { [e.target.name]: e.target.value };
    if (e.target.name === 'accountNumber') {
      if (/^(\s*|\d+)$/.test(e.target.value)) {
        this.setState({
          Account: { ...this.state.Account, [e.target.name]: e.target.value },
        });
      }
    } else {
      this.setState({
        Account: { ...this.state.Account, [e.target.name]: e.target.value },
      });
    }
  };

  editProfile = () => {
    if (this.state.isFormDisable) {
      let tmpEditProfile = {
        ...this.state.Account,
      };
      this.setState({
        isFormDisable: !this.state.isFormDisable,
        tmpEditProfile,
        submitError: false,
      });
    } else {
      let orignalData = this.state.tmpEditProfile;

      let payload = {
        ...orignalData,
      };
      this.props.updateHomeProfile(payload);

      this.setState({
        tmpEditProfile: null,
        isFormDisable: !this.state.isFormDisable,

        submitError: false,
      });
    }
  };

  /*
  onSubmitUpdateProfile = (e) => {
    e.preventDefault();
    const validateCheck = this.ValidityUpdateProfile();
    if (validateCheck === 'Correct') {
      //prevent page from refresh

      const data = {
        ...this.state.Account,
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
            Name: this.state.Account.Name,
            CountryName: this.state.Account.CountryName,
            StateName: this.state.Account.StateName,
            City: this.state.Account.City,
            Zip: Number(this.state.Account.Zip),
            Street: this.state.Account.Street,
            PhoneNo: Number(this.state.Account.PhoneNo),
            CountryCode: Number(this.state.Account.CountryCode),
            OpeningTime: this.state.Account.OpeningTime,
            ClosingTime: this.state.Account.ClosingTime,
            ImageURL: this.state.Account.ImageURL,
            CurbsidePickup: this.state.Account.CurbsidePickup,
            DineIn: this.state.Account.DineIn,
            YelpDelivery: this.state.Account.YelpDelivery,
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
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Account Holder Name : </label>
                  <input
                    style={{ marginLeft: '0%', height: '35px' }}
                    id="first_name"
                    name="owner"
                    placeholder="Account Holder Name"
                    required="required"
                    type="text"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.owner}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Bank Name : </label>
                  <input
                    style={{ marginLeft: '20%', height: '35px' }}
                    id="first_name"
                    name="bankName"
                    placeholder="Bank Name"
                    required="required"
                    type="text"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.bankName}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Account Number : </label>
                  <input
                    style={{ marginLeft: '9%', height: '35px' }}
                    id="first_name"
                    name="accountNumber"
                    placeholder="Account Number"
                    required="required"
                    type="text"
                    min="0"
                    minLength="16"
                    maxLength="16"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.accountNumber}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Account Country :</label>
                  <input
                    style={{ marginLeft: '9%', height: '35px' }}
                    id="email"
                    name="country"
                    placeholder="country"
                    required="required"
                    type="text"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.country}
                    disabled="disabled"
                  />
                </li>
              </ul>{' '}
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Address :</label>
                  <input
                    style={{ marginLeft: '26%', height: '35px' }}
                    id="phoneNo"
                    name="address"
                    placeholder="Address"
                    required="required"
                    type="text"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.address}
                    minLength="10"
                    maxLength="10"
                  />
                </li>
              </ul>
            </div>
            <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '30%', flex: 'auto' }}>
                  <label className="placeholder-sub">Primary Currency</label>
                  <select
                    placeholder="Gender"
                    className="form-control"
                    name="primaryCurrency"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.primaryCurrency}
                    required
                  >
                    <option className="Dropdown-menu" key="" value="">
                      Currency
                    </option>
                    {this.state.Countries.map((currency) => (
                      <option className="Dropdown-menu" key={currency.key} value={currency.value}>
                        {currency.value}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>{' '}
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Account Type</label>
                  <select
                    name="currency"
                    placeholder="Account Type"
                    className="form-control"
                    name="accountType"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.accountType}
                    required
                  >
                    <option className="Dropdown-menu" key="" value="">
                      Account Type
                    </option>
                    <option className="Dropdown-menu" key="sending" value="sending">
                      Sending Type
                    </option>
                    <option className="Dropdown-menu" key="receiving" value="receiving">
                      Receiving Type
                    </option>
                    <option className="Dropdown-menu" key="both" value="both">
                      Do Both
                    </option>
                  </select>
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
  //   const { restaurantHome } = state.restaurantHomePageReducer;
  //   const { masterData } = state.masterDataReducer;
  return {
    // restaurantProfile: restaurantHome,
    // masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateHomeProfile: (payload) => {
    //   dispatch({
    //     type: updateHomeProfile,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation);

// export default Profile;
// export default compose(
//   withApollo,
//   graphql(updateRestaurant, { name: 'updateRestaurant' }),
//   // graphql(loginUser, { name: 'loginUser' }),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Profile);
