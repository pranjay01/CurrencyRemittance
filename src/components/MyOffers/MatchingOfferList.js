import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';
// import './Offerist.css';
import { connect } from 'react-redux';
import {
  getOfferLists,
  updateFocusOffer,
  updateConversionRates,
  getSplitOfferLists,
} from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';
import MatchingOfferCard from './MatchingOfferCard';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import MatchingOfferCardSplit from './MatchingOfferCardSplit';

class MatchingOfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      includeSplitOffers: 'yes',
      returnToMyOffers: false,
      openCounterOffers: false,
      offerId: '',
    };
  }

  onCOmmonChangeHandler = (e) => {
    this.setState({
      includeSplitOffers: e.target.value,
    });
    if (e.target.value === 'yes') {
      this.commonFetchSingleOffers();
      // this.commonFetchSplitOffers();
    } else {
      this.commonFetchSingleOffers();
    }
  };

  handlePageClickSingle = (e) => {
    // this.commonFetchSingleOffers(e.selected);
    const payload = {
      PageNo: e.selected,
    };
    this.props.getOfferLists(payload);
  };

  handlePageClickSplitOffers = (e) => {
    // this.commonFetchSplitOffers(e.selected);
    const payload = {
      PageNo: e.selected,
    };
    this.props.getSplitOfferLists(payload);
  };

  commonFetchSingleOffers = (PageNo = 0) => {
    axios
      .get(
        serverUrl +
          'getSingleOffers/' +
          localStorage.getItem('userId') +
          '/' +
          (PageNo + 1) +
          '/' +
          10,
        {
          params: {
            OfferId: this.props.location.state.offerId,
          },
          withCredentials: true,
        }
      )
      .then(
        (response) => {
          console.log('Matching offers', response.data);
          const offerLists = response.data.list;
          const payload = {
            offerLists,
            TotalCount: offerLists.length,
            PageCount: offerLists.length / 10,
            PageNo,
          };
          this.props.getOfferLists(payload);
          if (response.data.list.length > 0) {
          } else {
            notification.open({
              message: 'Opp! No single matching offers found',
              description: 'Seems there are no matching offers',
              duration: 4,
            });
          }
        },
        (error) => {
          console.log('error', error);
          notification['error']({
            message: 'ERROR!',
            description: error.response.data,
            duration: 4,
          });
        }
      );
  };

  commonFetchSplitOffers = (PageNo = 0) => {
    axios
      .get(
        serverUrl +
          'getSplitOffers/' +
          localStorage.getItem('userId') +
          '/' +
          (PageNo + 1) +
          '/' +
          10,
        {
          params: {
            OfferId: this.props.location.state.offerId,
          },
          withCredentials: true,
        }
      )
      .then(
        (response) => {
          console.log('Matching split offers', response.data);
          const offerLists = response.data.list;
          const payload = {
            offerLists,
            TotalCount: offerLists.length,
            PageCount: offerLists.length / 10,
            PageNo,
          };
          this.props.getSplitOfferLists(payload);
          if (response.data.list.length > 0) {
          } else {
            notification.open({
              message: 'Opp! No split matching offers found',
              description: 'Seems there are no matching offers',
              duration: 4,
            });
          }
        },
        (error) => {
          console.log('error', error);
          notification['error']({
            message: 'ERROR!',
            description: error.response.data,
            duration: 4,
          });
        }
      );
  };

  componentDidMount() {
    // axios.get(serverUrl + 'getConversionRate').then((response) => {
    //   console.log(response.data);
    //   const conversionRates = response.data;
    //   const payload = {
    //     conversionRates,
    //   };
    //   this.props.updateConversionRates(payload);

    // });
    if (this.props.location.state && this.props.location.state.openMatchingOffersPage) {
      this.commonFetchSingleOffers();
      this.commonFetchSplitOffers();
    }
  }

  AcceptSplitOffer = (
    event,
    offerB_sourceCountry,
    offerB_offerID,
    offerC_sourceCountry,
    offerC_offerID
  ) => {
    event.preventDefault();
    let offerId1;
    let offerId2;
    let offerId3;
    if (offerB_sourceCountry === offerC_sourceCountry) {
      offerId1 = parseInt(localStorage.getItem('offerId'));
      offerId2 = offerB_offerID;
      offerId3 = offerC_offerID;
    } else if (offerB_sourceCountry === this.props.location.state.userSourceCountry) {
      offerId2 = parseInt(localStorage.getItem('offerId'));
      offerId3 = offerB_offerID;
      offerId1 = offerC_offerID;
    } else {
      offerId2 = parseInt(localStorage.getItem('offerId'));
      offerId3 = offerC_offerID;
      offerId1 = offerB_offerID;
    }
    axios
      .post(serverUrl + 'acceptOffer', null, {
        params: {
          offerId1: parseInt(localStorage.getItem('offerId')),
          offerId2,
          offerId3,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          notification['success']({
            message: 'Success!!',
            description: 'Transaction Initiated, please send mony within 10 minutes',
            duration: 6,
          });
          this.setState({
            returnToMyOffers: true,
          });
        },
        (error) => {
          console.log(error.response);
          notification['error']({
            message: 'ERROR!',
            description: error.response.data.error + '. Offer accept failed',
            duration: 4,
          });
        }
      );
  };

  AcceptOffer = (Event, offerId2, offerId3 = null) => {
    Event.preventDefault();
    const offerId1 = null;
    axios
      .post(serverUrl + 'acceptOffer', null, {
        params: {
          offerId1: parseInt(localStorage.getItem('offerId')),
          offerId2,
          offerId3,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          notification['success']({
            message: 'Success!!',
            description: 'Transaction Initiated, please send mony within 10 minutes',
            duration: 6,
          });
          this.setState({
            returnToMyOffers: true,
          });
        },
        (error) => {
          console.log(error.response);
          notification['error']({
            message: 'ERROR!',
            description: error.response.data.error + '. Offer accept failed',
            duration: 4,
          });
        }
      );
  };

  CreateCounterOffer = (
    event,
    proposedOnOfferID,
    counterProposedAmount,
    sourceOfferID = null,
    split1OfferID = null,
    split2OfferID = null
  ) => {
    event.preventDefault();

    // Event.preventDefault();
    // const offerId1 = null;
    axios
      .post(serverUrl + 'createCounterOffer', null, {
        params: {
          // matching one id
          proposedOnOfferID,
          counterProposedAmount: Number(counterProposedAmount),
          userID: localStorage.getItem('userId'),
          counterOfferID: this.props.location.state.offerId,
          sourceOfferID,
          split1OfferID,
          split2OfferID,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          notification['success']({
            message: 'Success!!',
            description: 'COunter Offer Placed Successfully',
            duration: 6,
          });
          this.setState({
            returnToMyOffers: true,
          });
        },
        (error) => {
          console.log(error.response);
          notification['error']({
            message: 'ERROR!',
            description: error.response.data.error + '. Offer accept failed',
            duration: 4,
          });
        }
      );
  };

  createSplitCounterOffer = (
    event,
    counterProposedAmount,
    offerB_sourceCountry,
    offerB_sourceAmount,
    offerB_offerID,
    offerC_sourceCountry,
    offerC_sourceAmount,
    offerC_offerID
  ) => {
    let proposedOnOfferID = null;
    let sourceOfferID = null;
    let split1OfferID = null;
    let split2OfferID = null;
    if (offerB_sourceCountry === offerC_sourceCountry) {
      if (offerB_sourceAmount > offerC_sourceAmount) {
        sourceOfferID = this.props.location.state.offerId;
        proposedOnOfferID = offerB_offerID;
        split1OfferID = offerC_offerID;
        split2OfferID = offerB_offerID;
      } else {
        sourceOfferID = this.props.location.state.offerId;
        proposedOnOfferID = offerC_offerID;
        split1OfferID = offerC_offerID;
        split2OfferID = offerB_offerID;
      }
    } else {
      if (offerB_sourceCountry === this.props.location.state.userSourceCountry) {
        proposedOnOfferID = offerC_offerID;
        sourceOfferID = offerC_offerID;
        split1OfferID = this.props.location.state.offerId;
        split2OfferID = offerB_offerID;
      } else {
        proposedOnOfferID = offerB_offerID;
        sourceOfferID = offerB_offerID;
        split1OfferID = this.props.location.state.offerId;
        split2OfferID = offerC_offerID;
      }
    }

    this.CreateCounterOffer(
      event,
      proposedOnOfferID,
      counterProposedAmount,
      sourceOfferID,
      split1OfferID,
      split2OfferID
    );
  };

  render() {
    const size = 10;
    let MatchingOfferCards = this.props.OfferListStore.offerLists
      .slice(
        this.props.OfferListStore.PageNo * size,
        this.props.OfferListStore.PageNo * size + size
      )
      .map((offer) => {
        return (
          <MatchingOfferCard
            key={offer.row_num}
            offer={offer}
            sourceCountry={this.props.location.state.userDestinationCountry}
            destinationCountry={this.props.location.state.userSourceCountry}
            AcceptOffer={(event, offerId2) => this.AcceptOffer(event, offerId2)}
            CreateCounterOffer={(event, counterProposedAmount) =>
              this.CreateCounterOffer(event, offer.matchingOfferId, counterProposedAmount)
            }

            //   conditional cards will come here, remove down card while integration
          />
        );
      });

    let SplitMatchingOfferCards = this.props.SplitOfferListStore.offerLists
      .slice(
        this.props.SplitOfferListStore.PageNo * size,
        this.props.SplitOfferListStore.PageNo * size + size
      )
      .map((offer) => {
        return (
          <MatchingOfferCardSplit
            key={offer.row_num}
            offer={offer}
            sourceCountry={this.props.location.state.userDestinationCountry}
            destinationCountry={this.props.location.state.userSourceCountry}
            AcceptOffer={(event) =>
              this.AcceptSplitOffer(
                event,
                offer.matchingSourceCountry1,
                offer.matchingSourceAmount1,
                offer.matchingOfferId1,
                offer.matchingSourceCountry2,
                offer.matchingSourceAmount2,
                offer.matchingOfferId2
              )
            }
            createSplitCounterOffer={(event, counterProposedAmount) =>
              this.createSplitCounterOffer(
                event,
                counterProposedAmount,
                offer.matchingSourceCountry1,
                offer.matchingSourceAmount1,
                offer.matchingOfferId1,
                offer.matchingSourceCountry2,
                offer.matchingSourceAmount2,
                offer.matchingOfferId2
              )
            }
            //   conditional cards will come here, remove down card while integration
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
    if (!this.props.location.state || this.props.location.state.openMatchingOffersPage === false) {
      return (
        <Redirect
          to={{
            pathname: '/MyOffers',
            // state: { openDetailPage: this.state.openDetailPage, offerId: this.state.offerId },
          }}
        />
      );
    }
    let redirectVar = null;
    if (this.state.openDetailPage) {
      redirectVar = <Redirect to="OfferDetailPage" />;
    }
    if (this.state.returnToMyOffers) {
      redirectVar = <Redirect to="MyOffers" />;
    }
    return (
      <div className="lemon--div__06b83__1mboc responsive responsive-biz border-color--default__06b83__3-ifU">
        {redirectVar}
        <div
          style={{ marginBottom: '40px' }}
          className="lemon--div__06b83__1mboc component__06b83__mFK-M border-color--default__06b83__3-ifU"
        >
          <div className="lemon--div__06b83__1mboc header-container__06b83__bjkGB border-color--default__06b83__3-ifU">
            <div className="lemon--div__06b83__1mboc header-nav-container__06b83__euina border-color--default__06b83__3-ifU">
              <div className="lemon--div__06b83__1mboc fs-block border-color--default__06b83__3-ifU">
                <div className="lemon--div__06b83__1mboc border-color--default__06b83__3-ifU">
                  <div className="lemon--div__06b83__1mboc tooltipContainer__06b83__2PjJt auth-tooltip-container__06b83__e-34S display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                    <div className="lemon--div__06b83__1mboc notification-wrapper__06b83__RCXT7 display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                      <div className="lemon--div__06b83__1mboc inline__06b83__2fx1q">
                        <div
                          className="lemon--div__06b83__1mboc dropdown__06b83__2flBr"
                          role="presentation"
                        >
                          <form
                            style={{
                              display: 'flex',

                              flexDirection: 'row',

                              justifyContent: 'center',
                            }}
                            onSubmit={this.getOffers}
                            className="yform signup-form  city-hidden"
                            id="signup-form"
                          >
                            {' '}
                            <div
                              style={{ flexDirection: 'column', minWidth: '200px' }}
                              className="js-password-meter-container"
                            >
                              <ul style={{ display: 'flex' }}>
                                <li style={{ width: '100%', flex: 'auto' }}>
                                  <label className="placeholder-sub">Include Split Offers</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCurrency"
                                    onChange={this.onCOmmonChangeHandler}
                                    value={this.state.includeSplitOffers}
                                  >
                                    <option className="Dropdown-menu" key="" value="Yes">
                                      Yes
                                    </option>
                                    <option className="Dropdown-menu" key="" value="No">
                                      No
                                    </option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </form>

                          {/*menu*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ marginBottom: '40px' }}
          className="lemon--div__06b83__1mboc component__06b83__mFK-M border-color--default__06b83__3-ifU"
        >
          <div className="lemon--div__06b83__1mboc header-container__06b83__bjkGB border-color--default__06b83__3-ifU">
            <div className="lemon--div__06b83__1mboc header-nav-container__06b83__euina border-color--default__06b83__3-ifU">
              <div className="lemon--div__06b83__1mboc fs-block border-color--default__06b83__3-ifU">
                <div className="lemon--div__06b83__1mboc border-color--default__06b83__3-ifU">
                  <div className="lemon--div__06b83__1mboc tooltipContainer__06b83__2PjJt auth-tooltip-container__06b83__e-34S display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                    <div className="lemon--div__06b83__1mboc notification-wrapper__06b83__RCXT7 display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                      <div className="lemon--div__06b83__1mboc inline__06b83__2fx1q">
                        <div
                          className="lemon--div__06b83__1mboc dropdown__06b83__2flBr"
                          role="presentation"
                        >
                          <form
                            style={{
                              display: 'flex',

                              flexDirection: 'row',

                              justifyContent: 'center',
                            }}
                            onSubmit={this.getOffers}
                            className="yform signup-form  city-hidden"
                            id="signup-form"
                          >
                            {' '}
                            <div
                              style={{ flexDirection: 'column', minWidth: '200px' }}
                              className="js-password-meter-container"
                            >
                              <ul style={{ display: 'flex' }}>
                                <li style={{ width: '100%', flex: 'auto' }}>
                                  <label className="placeholder-sub">Direct Matches</label>
                                </li>
                              </ul>
                            </div>
                          </form>

                          {/*menu*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lemon--div__06b83__1mboc biz-container__06b83__3snKt border-color--default__06b83__3-ifU">
          {/*<LeftPannel profileInfo={this.state} onTabChangeHandler={this.onTabChangeHandler} />*/}
          <div className="lemon--div__06b83__1mboc container-default__06b83__1Sj3L content-container__06b83__2gSeg border-color--default__06b83__3-ifU">
            <div className="lemon--div__06b83__1mboc grid__06b83__15mIv border-color--default__06b83__3-ifU">
              <div
                className="lemon--div__06b83__1mboc grid-column__06b83__3ZRhU border-color--default__06b83__3-ifU"
                style={{ width: '66.66666666666666%', marginLeft: '25%' }}
              >
                <div>
                  {/*<ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {this.props.OfferListStore.offerLists.map((offer) => (
                      <MatchingOfferCard
                        key={offer._id}
                        offer={offer}
                        AcceptOffer={(event, offerId2) => this.AcceptOffer(event, offerId2)}

                        //   conditional cards will come here, remove down card while integration
                      />
                    ))}
                    </ul>*/}
                  <ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {MatchingOfferCards}
                    {/*this.props.OfferListStore.offerLists.map((offer) => (
                      <MatchingOfferCard
                        key={offer.row_num}
                        offer={offer}
                        sourceCountry={this.props.location.state.userDestinationCountry}
                        destinationCountry={this.props.location.state.userSourceCountry}
                        AcceptOffer={(event, offerId2) => this.AcceptOffer(event, offerId2)}
                        CreateCounterOffer={(event, counterProposedAmount) =>
                          this.CreateCounterOffer(
                            event,
                            offer.matchingOfferId,
                            counterProposedAmount
                          )
                        }

                        //   conditional cards will come here, remove down card while integration
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
                    onPageChange={this.handlePageClickSingle}
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
        {this.state.includeSplitOffers === 'yes' ? (
          <div
            style={{ marginBottom: '40px' }}
            className="lemon--div__06b83__1mboc component__06b83__mFK-M border-color--default__06b83__3-ifU"
          >
            <div className="lemon--div__06b83__1mboc header-container__06b83__bjkGB border-color--default__06b83__3-ifU">
              <div className="lemon--div__06b83__1mboc header-nav-container__06b83__euina border-color--default__06b83__3-ifU">
                <div className="lemon--div__06b83__1mboc fs-block border-color--default__06b83__3-ifU">
                  <div className="lemon--div__06b83__1mboc border-color--default__06b83__3-ifU">
                    <div className="lemon--div__06b83__1mboc tooltipContainer__06b83__2PjJt auth-tooltip-container__06b83__e-34S display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                      <div className="lemon--div__06b83__1mboc notification-wrapper__06b83__RCXT7 display--inline-block__06b83__1ZKqC border-color--default__06b83__3-ifU">
                        <div className="lemon--div__06b83__1mboc inline__06b83__2fx1q">
                          <div
                            className="lemon--div__06b83__1mboc dropdown__06b83__2flBr"
                            role="presentation"
                          >
                            <form
                              style={{
                                display: 'flex',

                                flexDirection: 'row',

                                justifyContent: 'center',
                              }}
                              onSubmit={this.getOffers}
                              className="yform signup-form  city-hidden"
                              id="signup-form"
                            >
                              {' '}
                              <div
                                style={{ flexDirection: 'column', minWidth: '200px' }}
                                className="js-password-meter-container"
                              >
                                <ul style={{ display: 'flex' }}>
                                  <li style={{ width: '100%', flex: 'auto' }}>
                                    <label className="placeholder-sub">Split Matches</label>
                                  </li>
                                </ul>
                              </div>
                            </form>

                            {/*menu*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.state.includeSplitOffers === 'yes' ? (
          <div className="lemon--div__06b83__1mboc biz-container__06b83__3snKt border-color--default__06b83__3-ifU">
            {/*<LeftPannel profileInfo={this.state} onTabChangeHandler={this.onTabChangeHandler} />*/}
            <div className="lemon--div__06b83__1mboc container-default__06b83__1Sj3L content-container__06b83__2gSeg border-color--default__06b83__3-ifU">
              <div className="lemon--div__06b83__1mboc grid__06b83__15mIv border-color--default__06b83__3-ifU">
                <div
                  className="lemon--div__06b83__1mboc grid-column__06b83__3ZRhU border-color--default__06b83__3-ifU"
                  style={{ width: '66.66666666666666%', marginLeft: '25%' }}
                >
                  <div>
                    {/*<ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {this.props.OfferListStore.offerLists.map((offer) => (
                      <MatchingOfferCard
                        key={offer._id}
                        offer={offer}
                        AcceptOffer={(event, offerId2) => this.AcceptOffer(event, offerId2)}

                        //   conditional cards will come here, remove down card while integration
                      />
                    ))}
                    </ul>*/}
                    <ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                      {SplitMatchingOfferCards}
                      {/*this.props.SplitOfferListStore.offerLists.map((offer) => (
                        <MatchingOfferCardSplit
                          key={offer.row_num}
                          offer={offer}
                          sourceCountry={this.props.location.state.userDestinationCountry}
                          destinationCountry={this.props.location.state.userSourceCountry}
                          AcceptOffer={(event) =>
                            this.AcceptSplitOffer(
                              event,
                              offer.matchingSourceCountry1,
                              offer.matchingSourceAmount1,
                              offer.matchingOfferId1,
                              offer.matchingSourceCountry2,
                              offer.matchingSourceAmount2,
                              offer.matchingOfferId2
                            )
                          }
                          createSplitCounterOffer={(event, counterProposedAmount) =>
                            this.createSplitCounterOffer(
                              event,
                              counterProposedAmount,
                              offer.matchingSourceCountry1,
                              offer.matchingSourceAmount1,
                              offer.matchingOfferId1,
                              offer.matchingSourceCountry2,
                              offer.matchingSourceAmount2,
                              offer.matchingOfferId2
                            )
                          }
                          //   conditional cards will come here, remove down card while integration
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
                      pageCount={this.props.SplitOfferListStore.PageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={this.handlePageClickSplitOffers}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                      forcePage={this.props.SplitOfferListStore.PageNo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

// export default MatchingOfferList;

// export default OfferList;
const mapStateToProps = (state) => {
  const { ConversionRateStore } = state.ConversionRateReducer;
  const { OfferListStore, SplitOfferListStore } = state.OfferListReducer;
  return {
    ConversionRateStore,
    OfferListStore,
    SplitOfferListStore,
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
    getSplitOfferLists: (payload) => {
      dispatch({
        type: getSplitOfferLists,
        payload,
      });
    },
    updateFocusOffer: (payload) => {
      dispatch({
        type: updateFocusOffer,
        payload,
      });
    },
    updateConversionRates: (payload) => {
      dispatch({
        type: updateConversionRates,
        payload,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MatchingOfferList);
