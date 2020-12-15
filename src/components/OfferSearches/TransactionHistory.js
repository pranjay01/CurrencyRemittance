import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import TransactionCard from './TransactionCard';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { getTransactionList } from '../../constants/action-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.openTransactionPage) {
      axios
        .get(serverUrl + 'user/' + this.props.location.state.userId + '/transactionHistory', {
          params: {},
          withCredentials: true,
        })
        .then((response) => {
          console.log('Transactions ', response.data);
          const TransactionList = response.data;
          const payload = {
            TransactionList,
            TotalCount: response.data.length,
            PageCount: response.data.length / 10,
          };
          this.props.getTransactionList(payload);
          if (response.data.length > 0) {
          } else {
            notification.open({
              message: 'Sorry!.',
              description: 'User hasn"t done any transactions yet!',
              duration: 4,
            });
          }
        });
    }
  }

  handlePageClick = (e) => {
    const payload = {
      PageNo: e.selected,
    };
    this.props.getTransactionList(payload);
  };

  render() {
    const size = 10;
    let transactions = this.props.TransactionListStore.TransactionList.slice(
      this.props.TransactionListStore.PageNo * size,
      this.props.TransactionListStore.PageNo * size + size
    ).map((transaction) => {
      return (
        <TransactionCard
          key={transaction._id}
          // openStaticProfile={(event) =>
          //   this.openStaticProfile(event, review.CustomerID)
          // }
          transaction={transaction}

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
    if (!this.props.location.state || this.props.location.state.openTransactionPage === false) {
      return (
        <Redirect
          to={{
            pathname: '/OfferList',
            // state: { openDetailPage: this.state.openDetailPage, offerId: this.state.offerId },
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
                    {transactions}
                    {/*this.props.TransactionListStore.TransactionList.map((transaction) => (
                      <TransactionCard
                        key={transaction._id}
                        // openStaticProfile={(event) =>
                        //   this.openStaticProfile(event, review.CustomerID)
                        // }
                        transaction={transaction}

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
                    pageCount={this.props.TransactionListStore.PageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.props.TransactionListStore.PageNo}
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

// export default TransactionHistory;
const mapStateToProps = (state) => {
  const { TransactionListStore } = state.TransactionReducer;
  return {
    TransactionListStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionList: (payload) => {
      dispatch({
        type: getTransactionList,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
