import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';
// import './Offerist.css';
import { connect } from 'react-redux';
import { getOfferLists, updateFocusOffer } from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';
import MatchingOfferCard from './MatchingOfferCard';
import { notification } from 'antd';
import 'antd/dist/antd.css';

class CounterOffers extends Component {
  constructor(props) {
    super(props);
    this.state = { includeSplitOffers: 'yes', returnToMyOffers: false };
  }

  onCOmmonChangeHandler = (e) => {
    this.setState({
      includeSplitOffers: e.target.value,
    });
    this.commonFetch();
  };

  commonFetch = (PageNo = 0) => {
    axios
      .get(serverUrl + 'searchOffers', {
        params: {
          sourceCurrency: this.state.sourceCurrency ? this.state.sourceCurrency : null,
          sourceAmount: this.state.sourceAmount ? parseFloat(this.state.sourceAmount) : null,
          destinationCurrency: this.state.destinationCurrency
            ? this.state.destinationCurrency
            : null,
          destinationAmount: this.state.destinationAmount
            ? parseFloat(this.state.destinationAmount)
            : null,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          const offerLists = response.data;
          if (response.data.length > 0) {
            const payload = {
              offerLists,
              PageNo,
              TotalCount: 0,
            };
            this.props.getOfferLists(payload);
          } else {
            notification.open({
              message: 'Opp! No matching offers found',
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
    this.commonFetch();
  }

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
            description: error.response.data.error + ". Offer didn't get accepted",
            duration: 4,
          });
        }
      );
  };

  render() {
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
                    {this.props.OfferListStore.offerLists.map((counteroffer) => (
                      <MatchingOfferCard
                        key={counteroffer._id}
                        offer={counteroffer}
                        AcceptOffer={(event, offerId2) => this.AcceptOffer(event, offerId2)}

                        //   }
                      />
                    ))}
                  </ul>
                </div>
                <div style={{ left: '50%', bottom: '3%', right: '0' }}>
                  <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={5}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
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

// export default MatchingOfferList;

// export default OfferList;
const mapStateToProps = (state) => {
  const { ConversionRateStore } = state.ConversionRateReducer;
  const { OfferListStore } = state.OfferListReducer;
  return {
    ConversionRateStore,
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
    updateFocusOffer: (payload) => {
      dispatch({
        type: updateFocusOffer,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterOffers);
