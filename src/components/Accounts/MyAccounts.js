import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';
import '../OfferSearches/Offerist.css';
import { connect } from 'react-redux';
import { getOfferLists } from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import MyAccountCard from './MyAccountCard';

class MyAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = { accounts: [1, 2] };
  }

  componentDidMount() {
    axios
      .get(serverUrl + 'user/' + localStorage.getItem('userId') + '/offers', {
        params: {
          sourceCurrency: this.state.sourceCurrency,
          sourceAmount: this.state.sourceAmount ? parseFloat(this.state.sourceAmount) : '',
          destinationCurrency: this.state.destinationCurrency,
          destinationAmount: this.state.destinationAmount
            ? parseFloat(this.state.destinationAmount)
            : '',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          const offerLists = response.data;
          const payload = {
            offerLists,
          };
          this.props.getOfferLists(payload);
        } else {
          notification.open({
            message: 'Opp!.',
            description: 'You haven"t posted any offer yet!',
            duration: 6,
          });
        }
      });
  }

  showMatchingOffers = (event, Offer) => {
    event.preventDefault();
    localStorage.setItem('OpenOffer', Offer.offerId);
    const payload = {
      Offer,
    };
    this.props.updateFocusOffer(payload);
    this.setState({
      openDetailPage: true,
    });
  };

  editOffer = (offerId) => {
    this.setState({ offerId, editOffer: true });
  };

  render() {
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
                    {this.props.OfferListStore.offerLists.map((account) => (
                      <MyAccountCard
                        key={account.offerId}
                        // editOffer={() => this.editOffer(offer.offerId)}
                        account={account}

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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccounts);
