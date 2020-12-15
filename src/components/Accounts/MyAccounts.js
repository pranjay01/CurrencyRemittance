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
import { size } from 'lodash';

class MyAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = { accounts: [], PageNo: 0, TotalCount: 0, PageCount: 0 };
  }

  componentDidMount() {
    axios
      .get(serverUrl + 'getAllAccounts', {
        params: {
          userId: localStorage.getItem('userId'),
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          accounts: response.data,
          TotalCount: response.data.length,
          PageCount: response.data.length / 1,
        });
        if (response.data.length > 0) {
        } else {
          this.setState({
            accounts: [],
          });
          notification.open({
            message: 'Opp!.',
            description: 'You haven"t created any account yet!',
            duration: 6,
          });
        }
      });
  }

  handlePageClick = (e) => {
    this.setState({
      PageNo: e.selected,
    });
  };

  render() {
    const size = 1;

    let accounts = this.state.accounts
      .slice(this.state.PageNo * size, this.state.PageNo * size + size)
      .map((account) => {
        return (
          <MyAccountCard
            key={account.offerId}
            // editOffer={() => this.editOffer(offer.offerId)}
            account={account}

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
                    {accounts}
                    {/*this.state.accounts.map((account) => (
                      <MyAccountCard
                        key={account.offerId}
                        // editOffer={() => this.editOffer(offer.offerId)}
                        account={account}

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
