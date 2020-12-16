import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import cookie from 'react-cookies';
// import { updateHomeProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
// import { updateSnackbarData } from '../../../constants/action-types';
// import { updateRestaurant } from '../../../mutations/UpdateProfile';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';

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
          submitErrorBlock: '',
          submitError: false,
          Account: { ...this.state.Account, [e.target.name]: e.target.value },
        });
      }
    } else if (e.target.value && e.target.name === 'country') {
      const index = this.props.ConversionRateStore.conversionRates.findIndex(
        (x) => x.country === e.target.value
      );
      this.setState({
        submitErrorBlock: '',
        submitError: false,
        Account: {
          ...this.state.Account,
          [e.target.name]: this.props.ConversionRateStore.conversionRates[index].country,
          primaryCurrency: this.props.ConversionRateStore.conversionRates[index].currencyType,
        },
      });
    } else {
      this.setState({
        submitErrorBlock: '',
        submitError: false,
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
      this.setState({
        tmpEditProfile: null,
        isFormDisable: !this.state.isFormDisable,
        Account: {
          bankName: '',
          country: '',
          accountNumber: '',
          owner: '',
          address: '',
          primaryCurrency: '',
          accountType: '',
        },
        submitError: false,
      });
    }
  };

  onSubmitUpdateProfile = (event) => {
    event.preventDefault();
    const data = {
      userId: Number(localStorage.getItem('userId')),
      ...this.state.Account,
    };
    console.log(data);

    axios
      .post(serverUrl + 'account', null, {
        params: {
          userId: parseInt(localStorage.getItem('userId')),
          // userId: 12345,
          ...this.state.Account,
          accountNumber: this.state.Account.accountNumber,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          this.editProfile();
          notification['success']({
            message: 'Success!!',
            description: 'Account Saved!!',
            duration: 3,
          });
        },
        (error) => {
          if (error.response.status === 400) {
            notification['error']({
              message: 'ERROR!',
              description: 'Save Failed, Account No. already exists!',
              duration: 4,
            });
          } else {
            notification['error']({
              message: 'ERROR!',
              description: 'Account Save Failed!',
              duration: 3,
            });
          }
        }
      );
  };

  render(/**<fieldset disabled> */) {
    if (!localStorage.getItem('token')) {
      return (
        <Redirect
          to={{
            pathname: '/Login',
          }}
        />
      );
    }
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
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '100%', flex: 'auto' }}>
                  <label className="placeholder-sub">Primary Currency :</label>
                  <input
                    style={{ marginLeft: '8%', height: '35px' }}
                    id="email"
                    name="country"
                    placeholder="Auto update "
                    required="required"
                    type="text"
                    // onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.primaryCurrency}
                    disabled="diabled"
                  />
                </li>
              </ul>{' '}
            </div>
            <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '30%', flex: 'auto' }}>
                  <label className="placeholder-sub">Account Country</label>
                  <select
                    placeholder="Gender"
                    className="form-control"
                    name="country"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.Account.country}
                    required
                  >
                    <option className="Dropdown-menu" key="" value="">
                      Country
                    </option>
                    {this.props.ConversionRateStore.conversionRates.map((currency) => (
                      <option
                        className="Dropdown-menu"
                        key={currency.country}
                        value={currency.country}
                      >
                        {currency.country}
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
  const { ConversionRateStore } = state.ConversionRateReducer;
  //   const { masterData } = state.masterDataReducer;
  return {
    ConversionRateStore,
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
