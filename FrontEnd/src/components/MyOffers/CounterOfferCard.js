import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';

class CounterOfferCard extends Component {
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

  sendMessage = (Event) => {
    Event.preventDefault();
    const offerId1 = null;
    axios
      .post(serverUrl + 'sendOffer', null, {
        params: {
          senderId: localStorage.getItem('userId'),
          receiverId: this.props.offer.user.id,
          mailText: this.state.message,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          this.setState({
            showMessageArea: false,
            message: '',
          });
          notification['success']({
            message: 'Success!!',
            description: 'Message Sent!!',
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

  exactMath = () => {
    const index = this.props.ConversionRateStore.conversionRates.findIndex(
      (x) => x.currencyType === localStorage.getItem('OfferToMatchCurr')
    );
    const sourceUSDValue = Number(
      localStorage.getItem('OfferToMatchAmt') *
        this.props.ConversionRateStore.conversionRates[index].usdConversionRate
    );
    index = this.props.ConversionRateStore.conversionRates.findIndex(
      (x) => x.currencyType === this.props.offer.sourceCurrency
    );
    const destinationUSDValue = Number(
      this.props.offer.sourceAmount *
        this.props.ConversionRateStore.conversionRates[index].usdConversionRate
    );
    return sourceUSDValue === destinationUSDValue;
    return true;
  };

  render() {
    const offer = this.props.offer;

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
                    <strong> Counter Offer Status :</strong>{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.accepted === 0
                      ? 'Pending'
                      : offer.accepted === 1
                      ? 'Accepted'
                      : 'Expired'}
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
                    <strong> Proposed Amount </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.counterProposedAmount}
                  </span>
                </div>
              </div>
            </div>

            {offer.accepted === 0 ? (
              <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
                <form
                  onSubmit={(event) => this.props.AcceptOffer(event)}
                  className="yform signup-form  city-hidden"
                  id="signup-form"
                >
                  <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
                    <ul style={{ display: 'flex', paddingLeft: '0px' }}>
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
                                    Accept Counter Offer
                                  </span>
                                </span>
                              </div>
                            </button>
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            ) : (
              ''
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CounterOfferCard);
