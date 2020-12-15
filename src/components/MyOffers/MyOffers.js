import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';
import '../OfferSearches/Offerist.css';
import MyOfferCard from './MyOfferCard';
import { connect } from 'react-redux';
import { getOfferLists } from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';

class MyOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOffer: false,
      offerId: null,
      openCounterOffers: false,
      openMatchingOffersPage: false,
      userSourceCountry: null,
      userDestinationCountry: null,
      userSourceAmount: null,
      userexchangeRate: null,
    };
  }

  commonFetch = (PageNo = 0) => {
    axios
      .get(serverUrl + 'user/' + localStorage.getItem('userId') + '/offers', {
        params: {},
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          const offerLists = response.data;
          const payload = {
            offerLists,
            TotalCount: response.data.length,
            PageCount: response.data.length / 1,
          };
          this.props.getOfferLists(payload);
        } else {
          notification.open({
            message: 'Oops!.',
            description: 'You haven"t posted any offer yet!',
            duration: 6,
          });
        }
      });
  };

  componentDidMount() {
    this.commonFetch();
  }

  showMatchingOffers = (
    event,
    offerId,
    userSourceCountry,
    userDestinationCountry,
    userSourceAmount,
    userexchangeRate
  ) => {
    event.preventDefault();

    this.setState({
      openMatchingOffersPage: true,
      offerId,
      userSourceCountry,
      userDestinationCountry,
      userSourceAmount,
      userexchangeRate,
    });
  };

  editOffer = (offerId) => {
    this.setState({ offerId, editOffer: true });
  };

  openCounterOffer = (event, offerId) => {
    event.preventDefault();

    this.setState({
      openCounterOffers: true,
      offerId,
    });
  };

  handlePageClick = (e) => {
    const payload = {
      PageNo: e.selected,
    };
    this.props.getOfferLists(payload);
  };

  render() {
    const size = 1;
    let myOfferCards = this.props.OfferListStore.offerLists
      .slice(
        this.props.OfferListStore.PageNo * size,
        this.props.OfferListStore.PageNo * size + size
      )
      .map((offer) => {
        return (
          <MyOfferCard
            key={offer.offerId}
            editOffer={() => this.editOffer(offer.offerId)}
            offer={offer}
            openCounterOffer={(event) => this.openCounterOffer(event, offer.offerId)}
            showMatchingOffers={(event) =>
              this.showMatchingOffers(
                event,
                offer.offerId,
                offer.sourceCountry,
                offer.destinationCountry,
                offer.sourceAmount,
                offer.exchangeRate
              )
            }

            //   }
          />
        );
      });

    if (!localStorage.getItem('token')) {
      return (
        <Redirect
          to={{
            pathname: '/Login',
          }}
        />
      );
    }

    if (
      this.state.openMatchingOffersPage &&
      this.state.offerId &&
      this.state.userSourceCountry &&
      this.state.userDestinationCountry &&
      this.state.userSourceAmount &&
      this.state.userexchangeRate
    ) {
      return (
        <Redirect
          to={{
            pathname: '/MatchingOfferList',
            state: {
              openMatchingOffersPage: this.state.openMatchingOffersPage,
              offerId: this.state.offerId,
              userSourceCountry: this.state.userSourceCountry,
              userDestinationCountry: this.state.userDestinationCountry,
              userSourceAmount: this.state.userSourceAmount,
              userexchangeRate: this.state.userexchangeRate,
            },
          }}
        />
      );
    }
    if (this.state.editOffer && this.state.offerId) {
      return (
        <Redirect
          to={{
            pathname: '/PostOffer',
            state: { editOffer: this.state.editOffer, offerId: this.state.offerId },
          }}
        />
      );
    }
    if (this.state.openCounterOffers && this.state.offerId) {
      return (
        <Redirect
          to={{
            pathname: '/CounterOffers',
            state: {
              openCounterOffers: this.state.openCounterOffers,
              offerId: this.state.offerId,
            },
          }}
        />
      );
    }
    return (
      <div className="lemon--div__06b83__1mboc responsive responsive-biz border-color--default__06b83__3-ifU">
        {/*redirectVar*/}
        <div className="lemon--div__06b83__1mboc biz-container__06b83__3snKt border-color--default__06b83__3-ifU">
          {/*<LeftPannel profileInfo={this.state} onTabChangeHandler={this.onTabChangeHandler} />*/}
          <div className="lemon--div__06b83__1mboc container-default__06b83__1Sj3L content-container__06b83__2gSeg border-color--default__06b83__3-ifU">
            <div className="lemon--div__06b83__1mboc grid__06b83__15mIv border-color--default__06b83__3-ifU">
              <div
                className="lemon--div__06b83__1mboc grid-column__06b83__3ZRhU border-color--default__06b83__3-ifU"
                style={{ width: '66.66666666666666%', marginLeft: '25%' }}
              >
                <div>
                  <ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {myOfferCards}
                    {/*this.props.OfferListStore.offerLists.map((offer) => (
                      <MyOfferCard
                        key={offer.offerId}
                        editOffer={() => this.editOffer(offer.offerId)}
                        offer={offer}
                        openCounterOffer={(event) => this.openCounterOffer(event, offer.offerId)}
                        showMatchingOffers={(event) =>
                          this.showMatchingOffers(
                            event,
                            offer.offerId,
                            offer.sourceCountry,
                            offer.destinationCountry,
                            offer.sourceAmount,
                            offer.exchangeRate
                          )
                        }

                        //   }
                      />
                      ))*/}
                  </ul>
                </div>
                <div style={{ left: '50%', bottom: '3%', right: '0' }}>
                  <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.OfferListStore.PageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.props.OfferListStore.PageNo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default MyOffers;
const mapStateToProps = (state) => {
  const { OfferListStore } = state.OfferListReducer;
  return {
    OfferListStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOfferLists: (payload) => {
      dispatch({
        type: getOfferLists,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
