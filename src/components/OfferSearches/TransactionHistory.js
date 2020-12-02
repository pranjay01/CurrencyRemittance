import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import TransactionCard from './TransactionCard';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [{ otherUsers: [1, 1] }] };
  }
  render() {
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
                    {this.state.transactions.map((transaction) => (
                      <TransactionCard
                        key={transaction._id}
                        // openStaticProfile={(event) =>
                        //   this.openStaticProfile(event, review.CustomerID)
                        // }
                        transaction={transaction}

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

export default TransactionHistory;
