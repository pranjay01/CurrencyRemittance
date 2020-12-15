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
import CounterOfferCard from './CounterOfferCard';

class CounterOffers extends Component {
  constructor(props) {
    super(props);
    this.state = { counterOffers: [], PageNo: 0, TotalCount: 0, PageCount: 0 };
  }

  commonFetch = (PageNo = 0) => {
    axios
      .get(serverUrl + 'searchCounterOffers', {
        params: {
          OfferID: this.props.location.state.offerId,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          const counterOffers = response.data;
          console.log('Cuter offers:', response.data);
          this.setState({
            counterOffers,
            TotalCount: response.data.length,
            PageCount: response.data.length / 1,
          });
          if (response.data.length > 0) {
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
    if (this.props.location.state && this.props.location.state.openCounterOffers) {
      this.commonFetch();
    }
  }

  handlePageClick = (e) => {
    this.setState({
      PageNo: e.selected,
    });
  };

  AcceptOffer = (Event, id) => {
    Event.preventDefault();
    const offerId1 = null;
    axios
      .post(serverUrl + 'acceptCounterOffer', null, {
        params: {
          offerId: this.props.location.state.offerId,
          id,
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
          this.commonFetch();
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

  render() {
    const size = 1;

    let counteroffers = this.state.counterOffers
      .slice(this.state.PageNo * size, this.state.PageNo * size + size)
      .map((counteroffer) => {
        return (
          <CounterOfferCard
            key={counteroffer._id}
            offer={counteroffer}
            AcceptOffer={(event) => this.AcceptOffer(event, counteroffer.id)}

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
    if (!this.props.location.state || this.props.location.state.openCounterOffers === false) {
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
                    {counteroffers}
                    {/*this.state.counterOffers.map((counteroffer) => (
                      <CounterOfferCard
                        key={counteroffer._id}
                        offer={counteroffer}
                        AcceptOffer={(event) => this.AcceptOffer(event, counteroffer.id)}

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
                    pageCount={this.state.PageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.state.PageNo}
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
