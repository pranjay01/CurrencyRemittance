import React, { Component } from 'react';

class TransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const transaction = this.props.transaction;
    return (
      <li
        style={{ borderBottom: '10px solid #eeeeef' }}
        className="lemon--li__373c0__1r9wz margin-b3__373c0__q1DuY padding-b3__373c0__342DA border--bottom__373c0__3qNtD border-color--default__373c0__3-ifU"
      >
        <div className="lemon--div__373c0__1mboc review__373c0__13kpL sidebarActionsHoverTarget__373c0__2kfhE arrange__373c0__2C9bH gutter-2__373c0__1DiLQ grid__373c0__1Pz7f layout-stack-small__373c0__27wVp border-color--default__373c0__3-ifU">
          <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT arrange-unit-grid-column--8__373c0__2dUx_ border-color--default__373c0__3-ifU">
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    Transaction Status{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {transaction.status}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    Transaction Amount :{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    Amount
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
              <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                <div
                  style={{ width: '50%' }}
                  className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                >
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    Transaction Exchange Rate :{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {transaction.exchangeRate}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <h2 className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                  Other Involved Parties
                </span>
              </h2>
            </div>
            {transaction.otherUsers.map((other) => (
              <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
                <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                  <div
                    style={{ width: '50%' }}
                    className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                  >
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      Name :{' '}
                    </span>
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      {other.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </li>
    );
  }
}

export default TransactionCard;
