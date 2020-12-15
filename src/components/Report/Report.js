import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { getTransactionList } from '../../constants/action-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReportCard from './ReportCard';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {},
      monthSelected: 'December',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  }

  commonFetch = (monthSelected) => {};

  componentDidMount() {
    this.commonFetch(this.state.monthSelected);
    /*
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
    */
  }

  // handlePageClick = (e) => {
  //   const payload = {
  //     PageNo: e.selected,
  //   };
  //   this.props.getTransactionList(payload);
  // };

  switchTab = (event, monthSelected) => {
    event.preventDefault();
    this.commonFetch(monthSelected);
  };

  render() {
    // const styleactive = {
    //   color: 'white',
    //   width: '180px',
    //   marginTop: '21px',
    //   height: '50px',
    //   backgroundColor: 'black',
    // };

    // const styleinactive = {
    //   color: 'black',
    //   width: '180px',
    //   marginTop: '21px',
    //   height: '50px',
    //   backgroundColor: 'white',
    // };

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
                                <li style={{ width: '100%', flex: 'auto' }}>
                                  <label className="placeholder-sub">
                                    Select month to see report
                                  </label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCurrency"
                                    onChange={this.switchTab}
                                    value={this.state.monthSelected}
                                  >
                                    {this.state.months.map((month) => (
                                      <option className="Dropdown-menu" key={month} value={month}>
                                        {month}
                                      </option>
                                    ))}
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
                    <ReportCard
                      // key={transaction._id}
                      // openStaticProfile={(event) =>
                      //   this.openStaticProfile(event, review.CustomerID)
                      // }
                      report={this.state.report}

                      //   }
                    />
                  </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Report);
