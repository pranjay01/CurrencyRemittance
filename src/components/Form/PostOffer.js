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
        sourceExchangeRate: 0,
        destinationExchangeRate: 0,
      },
    };
  }

  getCurrentExchangeRate = (sourceCountry, destinationCountry) => {
    const index1 = this.props.ConversionRateStore.conversionRates.findIndex(
      (x) => x.country === sourceCountry
    );
    console.log('index1', index1);
    const source = this.props.ConversionRateStore.conversionRates[index1].usdConversionRate;
    const index2 = this.props.ConversionRateStore.conversionRates.findIndex(
      (x) => x.country === destinationCountry
    );
    const destination = this.props.ConversionRateStore.conversionRates[index2].usdConversionRate;
    const currentExchangeRate = (Number(source) / Number(destination)).toFixed(3);
    return currentExchangeRate;
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editOffer) {
      console.log('property_id', this.props.location.state.offerId);
      axios
        .get(serverUrl + 'offer/' + this.props.location.state.offerId, {
          params: {},
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            console.log('data to deit offer', response.data);
            this.setState({
              NewOffer: {
                ...response.data,
                currentExchangeRate: this.getCurrentExchangeRate(
                  response.data.sourceCountry,
                  response.data.destinationCountry
                ),
                customExchangeRate: response.data.exchangeRate,
              },
            });
          } else {
            notification.error({
              message: 'ERROR!.',
              description: 'Wrong Offer',
              duration: 6,
            });
          }
        });
    }
  }

  updateConversionRate = () => {
    if (this.state.NewOffer.sourceCurrency && this.state.NewOffer.destinationCurrency) {
      console.log('this.state.sourceCurrency', this.state.NewOffer.sourceCurrency);
      console.log('this.state.destinationCurrency', this.state.NewOffer.destinationCurrency);

      const currentExchangeRate = (
        Number(this.state.NewOffer.sourceExchangeRate) /
        Number(this.state.NewOffer.destinationExchangeRate)
      ).toFixed(3);

      this.setState({
        submitErrorBlock: '',
        submitError: false,
        NewOffer: {
          ...this.state.NewOffer,
          currentExchangeRate,
        },
      });
    }
  };

  onCOmmonChangeHandler = (e) => {
    // const data = { [e.target.name]: e.target.value };
    if (e.target.value && e.target.name === 'sourceCountry') {
      const index = this.props.ConversionRateStore.conversionRates.findIndex(
        (x) => x.country === e.target.value
      );
      this.setState(
        {
          submitErrorBlock: '',
          submitError: false,
          NewOffer: {
            ...this.state.NewOffer,
            [e.target.name]: this.props.ConversionRateStore.conversionRates[index].country,
            sourceCurrency: this.props.ConversionRateStore.conversionRates[index].currencyType,
            sourceExchangeRate: this.props.ConversionRateStore.conversionRates[index]
              .usdConversionRate,
          },
        },
        function () {
          this.updateConversionRate();
        }
      );
    } else if (e.target.value && e.target.name === 'destinationCountry') {
      const index = this.props.ConversionRateStore.conversionRates.findIndex(
        (x) => x.country === e.target.value
      );
      this.setState(
        {
          submitErrorBlock: '',
          submitError: false,
          NewOffer: {
            ...this.state.NewOffer,
            [e.target.name]: this.props.ConversionRateStore.conversionRates[index].country,
            destinationCurrency: this.props.ConversionRateStore.conversionRates[index].currencyType,
            destinationExchangeRate: this.props.ConversionRateStore.conversionRates[index]
              .usdConversionRate,
          },
        },
        function () {
          this.updateConversionRate();
        }
      );
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

  onSubmitPostOffer = (event) => {
    event.preventDefault();
    axios
      .post(serverUrl + 'offer', null, {
        params: {
          userId: parseInt(localStorage.getItem('userId')),
          // userId: 12345,
          ...this.state.NewOffer,
          exchangeRate:
            this.state.NewOffer.customExchangeRate !== ''
              ? Number(this.state.NewOffer.customExchangeRate)
              : Number(this.state.NewOffer.currentExchangeRate),
          allowCounterOffers: this.state.NewOffer.allowCounterOffers ? 1 : 0,
          splitExchange: this.state.NewOffer.splitExchange ? 1 : 0,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          this.setState({
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
              sourceExchangeRate: 0,
              destinationExchangeRate: 0,
            },
          });
          notification['success']({
            message: 'Success!!',
            description: 'Offer Posted Successfully!!',
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
          onSubmit={this.onSubmitPostOffer}
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
                  <label className="placeholder-sub">Offer Valid till :</label>
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
              {this.props.location.state && this.props.location.state.editOffer ? (
                <button
                  id="signup-button"
                  type="button"
                  className="ybtn ybtn--primary ybtn--big disable-on-submit submit signup-button"
                  style={{
                    marginTop: '2%',
                    marginLeft: '40%',
                  }}
                >
                  <span>Edit and Save</span>
                </button>
              ) : (
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
              )}

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
  const { ConversionRateStore } = state.ConversionRateReducer;
  //   const { masterData } = state.masterDataReducer;
  return {
    ConversionRateStore, // masterData,
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
