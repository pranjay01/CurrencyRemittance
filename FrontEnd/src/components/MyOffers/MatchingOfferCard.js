import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';

class MatchingOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = { counterOffer: '', showMessageArea: false, message: '' };
  }

  onCOmmonChangeHandler = (e) => {
    this.setState({
      counterOffer: e.target.value,
    });
  };

  openReviewForm = () => {
    this.setState({
      showMessageArea: !this.state.showMessageArea,
      message: '',
      //RegisteredCustomerList: [],
    });
  };

  onChangeMessageHandler = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  render() {
    const offer = this.props.offer;
    const sourceCountry = this.props.sourceCountry;
    const destinationCountry = this.props.destinationCountry;
    return (
      <li
        style={{ borderBottom: '10px solid #484848' }}
        className="lemon--li__373c0__1r9wz margin-b3__373c0__q1DuY padding-b3__373c0__342DA border--bottom__373c0__3qNtD border-color--default__373c0__3-ifU"
      >
        <div className="lemon--div__373c0__1mboc review__373c0__13kpL sidebarActionsHoverTarget__373c0__2kfhE arrange__373c0__2C9bH gutter-2__373c0__1DiLQ grid__373c0__1Pz7f layout-stack-small__373c0__27wVp border-color--default__373c0__3-ifU">
          <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-grid-column--8__373c0__2dUx_ border-color--default__373c0__3-ifU">
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> {offer.nickname}</strong>{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU"></span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Transaction Amount </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.matchingSourceAmount}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Source Country </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {sourceCountry}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Source Currency </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.destinationCurrency}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Destination Country </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {destinationCountry}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong>Destination Currency </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.sourceCurrency}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Accepting CounterOffers </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.allowCounterOffers === 1 ? 'Accepting' : 'Not Accepting'}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"></div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Asked Exchange Rate </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.exchangeRate}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Offer Expiring on </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.expirationDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                  {/*this.props.review.Description*/}
                  {/*La Foret did a fantastic job accommodating their restaurant for Covid times. We
                  visited them last night, &nbsp;The ambience, Food and service were fabulous, Happy
                  to see this SJ landmarks &nbsp;back in business. Thank you!*/}
                </span>
              </p>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <form
                onSubmit={(event) => this.props.CreateCounterOffer(event, this.state.counterOffer)}
                className="yform signup-form  city-hidden"
                id="signup-form"
              >
                <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
                  <ul style={{ display: 'flex', paddingLeft: '0px' }}>
                    {offer.allowCounterOffers !== 0 ? (
                      <li>
                        <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                          <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                            <button
                              style={{
                                marginLeft: '2%',
                                color: 'white',
                                width: '160px',
                                height: '35px',
                                backgroundColor: '#060505a6',
                                borderRadius: '7%',
                              }}
                              className="link__06b83__343sR"
                              aria-label="Toggle Menu"
                              aria-haspopup="menu"
                              aria-controls="header-dropdown-menu"
                              aria-expanded="false"
                              type="submit"
                            >
                              <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                                <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                  <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                    Place Counter Offer
                                  </span>
                                </span>
                              </div>
                            </button>
                          </span>
                        </p>
                      </li>
                    ) : (
                      ''
                    )}
                    {offer.allowCounterOffers !== 0 ? (
                      <li>
                        <input
                          style={{ marginLeft: '12%', height: '35px', width: '225px' }}
                          id="first_name"
                          min={0.9 * offer.matchingSourceAmount}
                          max={1.1 * offer.matchingSourceAmount}
                          name="counterOffer"
                          placeholder="Counter Offer"
                          required="required"
                          type="number"
                          onChange={this.onCOmmonChangeHandler}
                          value={this.state.counterOffer}
                          step=".01"
                        />
                      </li>
                    ) : (
                      ''
                    )}

                    {offer.difference === 0 ? (
                      <li>
                        <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                          <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                            <button
                              style={{
                                marginLeft: '29%',
                                color: 'white',
                                width: '160px',
                                height: '35px',
                                backgroundColor: '#060505a6',
                                borderRadius: '7%',
                              }}
                              className="link__06b83__343sR"
                              aria-label="Toggle Menu"
                              aria-haspopup="menu"
                              aria-controls="header-dropdown-menu"
                              aria-expanded="false"
                              type="button"
                              onClick={(event) =>
                                this.props.AcceptOffer(event, offer.matchingOfferId)
                              }
                            >
                              <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                                <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                  <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                    Accept Orignal Offer
                                  </span>
                                </span>
                              </div>
                            </button>
                          </span>
                        </p>
                      </li>
                    ) : (
                      ''
                    )}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// export default MatchingOfferCard;

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

export default connect(mapStateToProps, mapDispatchToProps)(MatchingOfferCard);
