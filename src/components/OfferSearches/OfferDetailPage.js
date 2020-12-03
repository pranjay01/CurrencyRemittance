import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateFocusOffer } from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';

// import { Link, Redirect } from 'react-router-dom';

class OfferDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { offerDetail: {}, openTransactionPage: false, userId: '' };
  }

  componentDidMount() {
    console.log('this.props.location', this.props.location);
    if (this.props.location.state && this.props.location.state.openDetailPage) {
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
            const payload = {
              Offer: { ...response.data },
            };
            this.props.updateFocusOffer(payload);
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

  showTransactionHistory = (event) => {
    event.preventDefault();
    // localStorage.setItem('OpenOffer', offerId);
    // const payload = {
    //   Offer,
    // };
    // this.props.updateFocusOffer(payload);
    this.setState({
      openTransactionPage: true,
      userId: this.props.onFocusOfferStore.Offer.user.id,
    });
  };

  render() {
     if (!localStorage.getItem('token')) {
       return (
         <Redirect
           to={{
             pathname: '/Login',
           }}
         />
       );
     }
    if (!this.props.location.state || this.props.location.state.openDetailPage === false) {
      return (
        <Redirect
          to={{
            pathname: '/OfferList',
            // state: { openDetailPage: this.state.openDetailPage, offerId: this.state.offerId },
          }}
        />
      );
    }
    if (this.state.openTransactionPage && this.state.userId) {
      return (
        <Redirect
          to={{
            pathname: '/TransactionHistory',
            state: {
              openTransactionPage: this.state.openTransactionPage,
              userId: this.state.userId,
            },
          }}
        />
      );
    }
    let rating = { backgroundPosition: '0 -320px' };
    switch (2) {
      case 1:
        rating = { backgroundPosition: '0 -360px' };
        break;
      case 2:
        rating = { backgroundPosition: '0 -400px' };
        break;
      case 3:
        rating = { backgroundPosition: '0 -440px' };
        break;
      case 4:
        rating = { backgroundPosition: '0 -480px' };
        break;
      case 5:
        rating = { backgroundPosition: '0 -500px' };
        break;
      default:
        break;
    }
    return (
      <div style={{ background: 'white' }}>
        {/*redirectVar*/}
        <span id="page-content" className="offscreen">
          &nbsp;
        </span>
        <div className="main-content-wrap main-content-wrap--full"></div>
        <div
          className="super-container"
          style={{
            paddingTop: '15px',
            paddingBottom: '36px',
            width: '960px',
            margin: '0 auto',
            padding: '0 15px',
          }}
        >
          <div
            style={{ marginTop: '40px' }}
            className="clearfix layout-block layout-n user-details_container"
          >
            <div className="column column-beta ">
              <div className="user-details-overview">
                <div className="user-details-overview_sidebar">
                  <h3>{this.props.onFocusOfferStore.Offer.user.userName}</h3>

                  <br />

                  <div className="ysection">
                    <ul className="ylist">
                      <li>
                        <h4>Reputaion</h4>
                        <a onClick={this.showTransactionHistory}>
                          <div
                            className="lemon--div__373c0__1mboc i-stars__373c0__1T6rz i-stars--regular-5__373c0__N5JxY border-color--default__373c0__3-ifU overflow--hidden__373c0__2y4YK _0Star"
                            aria-label="5 star rating"
                            role="img"
                            style={rating}
                          >
                            <img
                              className="lemon--img__373c0__3GQUb offscreen__373c0__1KofL"
                              src="https://s3-media0.fl.yelpcdn.com/assets/public/stars_v2.yji-52d3d7a328db670d4402843cbddeed89.png"
                              width="132"
                              height="560"
                              alt=""
                            />
                          </div>
                        </a>
                      </li>
                      <li>
                        <h4>Name: {this.props.onFocusOfferStore.Offer.user.nickname}</h4>
                      </li>
                      <li>
                        <h4>Amount ot transfer</h4>

                        <p>{this.props.onFocusOfferStore.Offer.sourceAmount}</p>
                      </li>

                      <li>
                        <h4>Source Country & Currency</h4>

                        <p>
                          {this.props.onFocusOfferStore.Offer.sourceCountry +
                            ', ' +
                            this.props.onFocusOfferStore.Offer.sourceCurrency}
                        </p>
                      </li>

                      <li>
                        <h4>Destination Country & Currency</h4>
                        {this.props.onFocusOfferStore.Offer.destinationCountry +
                          ', ' +
                          this.props.onFocusOfferStore.Offer.destinationCurrency}
                      </li>

                      <li>
                        <h4>Accepting Counter Offers</h4>
                        <p>
                          {this.props.onFocusOfferStore.Offer.allowCounterOffers === 1
                            ? 'YES'
                            : 'NO'}
                        </p>
                      </li>

                      <li>
                        <h4>Accepting Split offers</h4>
                        <p>
                          {this.props.onFocusOfferStore.Offer.splitExchange === 1 ? 'YES' : 'NO'}
                        </p>
                      </li>

                      <li>
                        <h4>Offer Expiring Date</h4>

                        <p>{this.props.onFocusOfferStore.Offer.expirationDate}</p>
                      </li>
                      {/*<li>
                        <button
                          style={{
                            color: 'white',
                            // width: '100px',
                            // marginTop: '21px',
                            height: '35px',
                            backgroundColor: '#000000d4',
                            borderRadius: '10%',
                          }}
                          className="link__06b83__343sR"
                          aria-label="Toggle Menu"
                          aria-haspopup="menu"
                          aria-controls="header-dropdown-menu"
                          aria-expanded="false"
                          type="submit"
                          onClick={this.showMenu}
                        >
                          <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                            <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                              <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                Accept Orignal Offer
                              </span>
                            </span>
                          </div>
                        </button>
                      </li>
                    */}
                    </ul>
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

// export default OfferDetailPage;
const mapStateToProps = (state) => {
  const { onFocusOfferStore } = state.OfferListReducer;
  return {
    onFocusOfferStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFocusOffer: (payload) => {
      dispatch({
        type: updateFocusOffer,
        payload,
      });
    },
    // updateFocusOffer: (payload) => {
    //   dispatch({
    //     type: updateFocusOffer,
    //     payload,
    //   });
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailPage);
