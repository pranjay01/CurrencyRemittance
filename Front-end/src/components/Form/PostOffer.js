import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import cookie from 'react-cookies';
// import { updateHomeProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
// import { updateSnackbarData } from '../../../constants/action-types';
// import { updateRestaurant } from '../../../mutations/UpdateProfile';

class PostOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: [],
      States: [],
      isFormDisable: true,
      submitError: false,
      submitErrorBlock: '',
      tmpEditProfile: null,
      NewOffer: {
        sourceCountry: '',
        sourceCurrency: '',
        sourceAmount: '',
        destinationCountry: '',
        destinationCurrency: '',
        currentExchangeRate: '',
        customExchangeRate: '',
        expirationDate: '',
        allowCounterOffers: true,
        splitExchange: true,
      },
    };
  }

  componentDidMount() {}

  onCOmmonChangeHandler = (e) => {
    // const data = { [e.target.name]: e.target.value };
    if (e.target.name === 'sourceCountry') {
      this.setState({
        submitErrorBlock: '',
        submitError: false,
        NewOffer: { ...this.state.NewOffer, [e.target.name]: e.target.value },
      });
    } else if (e.target.name === 'destinationCurrency') {
      this.setState({
        submitErrorBlock: '',
        submitError: false,
        NewOffer: { ...this.state.NewOffer, [e.target.name]: e.target.value },
      });
    } else {
      this.setState({
        submitErrorBlock: '',
        submitError: false,
        NewOffer: { ...this.state.NewOffer, [e.target.name]: e.target.value },
      });
    }
  };

  onChangeDate = (e) => {
    // let errors = {};
    const today = new Date();
    const inputDate = new Date(e.target.value);
    if (today <= inputDate) {
      this.setState({
        NewOffer: { ...this.state.NewOffer, expirationDate: e.target.value },
        submitErrorBlock: '',
        submitError: false,
      });
    } else {
      //   errors['dateError'] = 'Select future Date!';
      this.setState({
        submitErrorBlock: 'Select future Date!',
        submitError: true,
      });
    }
  };

  onChangeHandlerSplitExchange = (e) => {
    this.setState({
      NewOffer: { ...this.state.NewOffer, splitExchange: !this.state.NewOffer.splitExchange },
      submitErrorBlock: '',
      submitError: false,
    });
  };

  onChangeHandlerAllowCounterOffers = (e) => {
    this.setState({
      NewOffer: {
        ...this.state.NewOffer,
        allowCounterOffers: !this.state.NewOffer.allowCounterOffers,
      },
      submitErrorBlock: '',
      submitError: false,
    });
  };

  /*
  editProfile = () => {
    if (this.state.isFormDisable) {
      let tmpEditProfile = {
        ...this.state.NewOffer,
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
*/
  /*
  onSubmitUpdateProfile = (e) => {
    e.preventDefault();
    const validateCheck = this.ValidityUpdateProfile();
    if (validateCheck === 'Correct') {
      //prevent page from refresh

      const data = {
        ...this.state.NewOffer,
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
            Name: this.state.NewOffer.Name,
            CountryName: this.state.NewOffer.CountryName,
            StateName: this.state.NewOffer.StateName,
            City: this.state.NewOffer.City,
            Zip: Number(this.state.NewOffer.Zip),
            Street: this.state.NewOffer.Street,
            PhoneNo: Number(this.state.NewOffer.PhoneNo),
            CountryCode: Number(this.state.NewOffer.CountryCode),
            OpeningTime: this.state.NewOffer.OpeningTime,
            ClosingTime: this.state.NewOffer.ClosingTime,
            ImageURL: this.state.NewOffer.ImageURL,
            CurbsidePickup: this.state.NewOffer.CurbsidePickup,
            DineIn: this.state.NewOffer.DineIn,
            YelpDelivery: this.state.NewOffer.YelpDelivery,
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
        <div className="alert alert-error ">
          <p style={{ textAlign: 'center' }} className="alert-message">
            {this.state.submitErrorBlock}
          </p>
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
          <fieldset style={{ width: '560px' }}>
            <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
              <ul style={{ display: 'flex' }}>
                <li style={{ flex: 'auto' }}>
                  <label className="placeholder-sub">Ammount to transfer : </label>
                  <input
                    style={{ marginLeft: '27%', height: '35px', width: '225px' }}
                    id="first_name"
                    name="sourceAmount"
                    placeholder="Ammount to transfer in source currency"
                    required="required"
                    type="number"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.sourceAmount}
                  />
                </li>
              </ul>
            </div>
            <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '45%', flex: 'auto' }}>
                  <label className="placeholder-sub">Source Country</label>
                  <select
                    placeholder="Gender"
                    className="form-control"
                    name="sourceCountry"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.sourceCountry}
                    required
                  >
                    <option className="Dropdown-menu" key="" value="">
                      Country
                    </option>
                    {this.state.Countries.map((country) => (
                      <option className="Dropdown-menu" key={country.key} value={country.value}>
                        {country.value}
                      </option>
                    ))}
                  </select>
                </li>
                <li style={{ width: '10%', flex: 'auto' }}></li>
                <li style={{ width: '45%', flex: 'auto' }}>
                  <label className="placeholder-sub">Source Currency : </label>
                  <input
                    style={{ marginLeft: '0%', height: '35px', width: '225px' }}
                    id="first_name"
                    name="owner"
                    placeholder="Source Currency"
                    disabled
                    type="text"
                    // onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.sourceCurrency}
                  />
                </li>
              </ul>
            </div>
            <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
              <ul style={{ display: 'flex' }} className="inline-layout clearfix">
                <li style={{ width: '45%', flex: 'auto' }}>
                  <label className="placeholder-sub">Destination Country</label>
                  <select
                    placeholder="Gender"
                    className="form-control"
                    name="destinationCountry"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.destinationCountry}
                    required
                  >
                    <option className="Dropdown-menu" key="" value="">
                      Country
                    </option>
                    {this.state.Countries.map((country) => (
                      <option className="Dropdown-menu" key={country.key} value={country.value}>
                        {country.value}
                      </option>
                    ))}
                  </select>
                </li>
                <li style={{ width: '10%', flex: 'auto' }}></li>
                <li style={{ width: '45%', flex: 'auto' }}>
                  <label className="placeholder-sub">Destination Currency : </label>
                  <input
                    style={{ marginLeft: '0%', height: '35px', width: '225px' }}
                    id="first_name"
                    name="destinationCurrency"
                    placeholder="Destination Currency"
                    required="required"
                    type="text"
                    disabled
                    // onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.destinationCurrency}
                  />
                </li>
              </ul>
            </div>

            <div style={{ flexDirection: 'column' }} className="js-password-meter-container">
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '40%', flex: 'auto' }}>
                  <label className="placeholder-sub">Current Exchange Rate : </label>
                  <input
                    // style={{ marginLeft: '20%' }}
                    style={{ marginLeft: '4%', height: '35px', width: '60px' }}
                    id="first_name"
                    name="currentExchangeRate"
                    placeholder=""
                    required="required"
                    type="text"
                    disabled
                    // onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.currentExchangeRate}
                  />
                </li>
                <li style={{ width: '4%', flex: 'auto' }}></li>
                <li style={{ width: '40%', flex: 'auto' }}>
                  <label className="placeholder-sub">Custom Exchange Rate : </label>
                  <input
                    // style={{ marginLeft: '20%' }}
                    style={{ height: '35px', width: '60px' }}
                    id="first_name"
                    name="customExchangeRate"
                    placeholder=""
                    required="required"
                    type="number"
                    onChange={this.onCOmmonChangeHandler}
                    value={this.state.NewOffer.customExchangeRate}
                  />
                </li>
              </ul>
              <ul
                //className="inline-layout clearfix"
                style={{ display: 'flex' }}
              >
                <li style={{ width: '50%' }}>
                  <label className="placeholder-sub">Allow Counter Offers :</label>
                  <input
                    style={{ marginLeft: '27%', width: '20px', height: '20px' }}
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.NewOffer.allowCounterOffers}
                    onChange={this.onChangeHandlerAllowCounterOffers}
                  />
                </li>
                <li style={{ width: '10%' }}></li>
                <li style={{ width: '50%' }}>
                  <label className="placeholder-sub">Accepting Spit Offers :</label>
                  <input
                    style={{ marginLeft: '24%', width: '20px', height: '20px' }}
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.NewOffer.splitExchange}
                    onChange={this.onChangeHandlerSplitExchange}
                  />
                </li>
              </ul>
              <ul style={{ display: 'flex' }}>
                <li style={{ width: '100%' }}>
                  <label className="placeholder-sub">Event Date :</label>
                  <input
                    type="date"
                    style={{ marginLeft: '39%', height: '35px' }}
                    // className="form-control"
                    placeholder="Time"
                    onChange={this.onChangeDate}
                    value={this.state.NewOffer.expirationDate}
                  />
                </li>
              </ul>
            </div>

            <div>
              {
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
              }

              {/*<button
                className="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                style={{
                  marginTop: '2%',
                  marginLeft: '2%',
                }}
                onClick={this.editProfile}
              >
                <span>Cancel</span>
            </button>*/}
            </div>
          </fieldset>
        </form>
        {/*this.state.isFormDisable && (
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
        )*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostOffer);

// export default Profile;
// export default compose(
//   withApollo,
//   graphql(updateRestaurant, { name: 'updateRestaurant' }),
//   // graphql(loginUser, { name: 'loginUser' }),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Profile);
