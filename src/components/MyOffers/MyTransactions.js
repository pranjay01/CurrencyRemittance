import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import MyTransactionCard from './MyTransactionCard';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { getTransactionList } from '../../constants/action-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class MyTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonSelected: 'old' };
  }

  componentDidMount() {
    axios
      .get(serverUrl + 'user/' + localStorage.getItem('userId') + '/transactionHistory', {
        params: {},
        withCredentials: true,
      })
      .then((response) => {
        console.log('Transactions ', response.data);
        const oldTransactions = [];
        const currentTransactions = [];
        for (const transaction of response.data) {
          if (transaction.transactionStatus === 'Pending') {
            currentTransactions.push(transaction);
          } else {
            oldTransactions.push(transaction);
          }
        }
        const TransactionList = oldTransactions;
        const payload = {
          oldTransactions,
          currentTransactions,
          TransactionList,
          TotalCount: TransactionList.length,
          PageCount: TransactionList.length / 1,
        };
        this.props.getTransactionList(payload);
        if (response.data.length > 0) {
        } else {
          notification.open({
            message: 'Opp!.',
            description: 'You haven"t done any transactions yet!',
            duration: 4,
          });
        }
      });
  }

  handlePageClick = (e) => {
    const payload = {
      PageNo: e.selected,
    };
    this.props.getTransactionList(payload);
  };

  switchTab = (event, tab) => {
    event.preventDefault();
    this.setState({
      buttonSelected: tab,
    });
    let TransactionList = [];
    if (tab === 'current') {
      TransactionList = this.props.TransactionListStore.currentTransactions;
    } else {
      TransactionList = this.props.TransactionListStore.oldTransactions;
    }
    const payload = {
      TransactionList,
      TotalCount: TransactionList.length,
      PageCount: TransactionList.length / 1,
      PageNo: 0,
    };
    this.props.getTransactionList(payload);
  };

  render() {
    const styleactive = {
      color: 'white',
      width: '180px',
      marginTop: '21px',
      height: '50px',
      backgroundColor: 'black',
    };

    const styleinactive = {
      color: 'black',
      width: '180px',
      marginTop: '21px',
      height: '50px',
      backgroundColor: 'white',
    };

    const size = 1;
    let transactions = this.props.TransactionListStore.TransactionList.slice(
      this.props.TransactionListStore.PageNo * size,
      this.props.TransactionListStore.PageNo * size + size
    ).map((transaction) => {
      return (
        <MyTransactionCard
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
    return (
      <div className="lemon--div__06b83__1mboc responsive responsive-biz border-color--default__06b83__3-ifU">
        {/*redirectVar*/}
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
                              style={{ flexDirection: 'column', minWidth: '700px' }}
                              className="js-password-meter-container"
                            >
                              <ul style={{ display: 'flex' }}>
                                <li style={{ width: '4%', flex: 'auto', marginLeft: '22%' }}>
                                  <button
                                    style={
                                      this.state.buttonSelected === 'old'
                                        ? styleactive
                                        : styleinactive
                                    }
                                    className="link__06b83__343sR"
                                    aria-label="Toggle Menu"
                                    aria-haspopup="menu"
                                    aria-controls="header-dropdown-menu"
                                    aria-expanded="false"
                                    type="button"
                                    onClick={(event) => this.switchTab(event, 'old')}
                                  >
                                    <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                                      <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                        <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                          Old Transactions
                                        </span>
                                      </span>
                                    </div>
                                  </button>
                                </li>
                                <li style={{ width: 'auto', flex: 'auto' }}>
                                  <button
                                    style={
                                      this.state.buttonSelected === 'current'
                                        ? styleactive
                                        : styleinactive
                                    }
                                    className="link__06b83__343sR"
                                    aria-label="Toggle Menu"
                                    aria-haspopup="menu"
                                    aria-controls="header-dropdown-menu"
                                    aria-expanded="false"
                                    type="button"
                                    onClick={(event) => this.switchTab(event, 'current')}
                                  >
                                    <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                                      <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                        <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU"></span>
                                        Current Transactions
                                      </span>
                                    </div>
                                  </button>
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
                  <ul className="lemon--ul__373c0__1_cxs undefined list__373c0__2G8oH">
                    {transactions}
                    {/*this.props.TransactionListStore.TransactionList.map((transaction) => (
                      <MyTransactionCard
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

// export default MyTransactions;
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTransactions);
