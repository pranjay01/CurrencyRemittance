import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../config';
import { notification } from 'antd';
import 'antd/dist/antd.css';

class MyTransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showMessageArea: false, message: '', recieverId: '' };
  }

  openReviewForm = (recieverId) => {
    this.setState({
      showMessageArea: !this.state.showMessageArea,
      message: '',
      recieverId,
      //RegisteredCustomerList: [],
    });
  };

  onChangeMessageHandler = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  sendMessage = (Event) => {
    Event.preventDefault();
    const offerId1 = null;
    axios
      .post(serverUrl + 'sendOffer', null, {
        params: {
          senderId: localStorage.getItem('userId'),
          receiverId: this.state.recieverId,
          mailText: this.state.message,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);
          this.setState({
            showMessageArea: false,
            message: '',
          });
          notification['success']({
            message: 'Success!!',
            description: 'Message Sent!!',
            duration: 4,
          });
        },
        (error) => {
          notification['error']({
            message: 'ERROR!',
            description: error.response.data,
            duration: 4,
          });
        }
      );
  };

  sendMoney = (Event) => {
    Event.preventDefault();
    const offerId1 = null;
    axios
      .post(serverUrl + 'offer' + this.props.transaction.offerID + 'sendMoney', null, {
        params: {},
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log(response.data);

          notification['success']({
            message: 'Success!!',
            description: 'Money Sent, sit back and wait for other parties to complete transaction.',
            duration: 4,
          });
        },
        (error) => {
          notification['error']({
            message: 'ERROR!',
            // description: error.response.data,
            duration: 4,
          });
        }
      );
  };

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
                    <strong> Transaction Status :</strong>{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {transaction.transactionStatus}
                  </span>
                </div>
                {transaction.transactionStatus === 'Completed' ? (
                  <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      <strong> Service Fee Charged </strong>:{' '}
                    </span>
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      {transaction.receivedAmount * 0.005} {transaction.sourceCurrency}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {transaction.transactionStatus === 'Completed' ? (
              <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
                <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                  <div
                    style={{ width: '50%' }}
                    className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                  >
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      <strong> Aomount Sent :</strong>{' '}
                    </span>
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      {transaction.receivedAmount} {transaction.sourceCurrency}
                    </span>
                  </div>
                  <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      <strong> Aomount Recieved </strong>:{' '}
                    </span>
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      {transaction.transferredAmount} {transaction.destinationCurrency}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
                <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                  <div
                    style={{ width: '50%' }}
                    className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                  >
                    <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                      <button
                        style={{
                          marginLeft: '15px',
                          color: '#222222',
                          width: '148px',
                          height: '24px',
                          backgroundColor: '##ffffff',
                          borderRadius: '9px',
                          borderColor: '#9d9d9d',
                          backgroundColor: 'white',
                        }}
                        className="link__06b83__343sR"
                        aria-label="Toggle Menu"
                        aria-haspopup="menu"
                        aria-controls="header-dropdown-menu"
                        aria-expanded="false"
                        type="button"
                        onClick={this.sendMoney}
                      >
                        <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                          <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                            <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                              Send Money
                            </span>
                          </span>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <h2 className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                  <strong> Other Involved Parties</strong>
                </span>
              </h2>
            </div>
            {transaction.receivingParties.map((other) => (
              <div className="lemon--div__373c0__1mboc margin-t1__373c0__oLmO6 margin-b1__373c0__1khoT border-color--default__373c0__3-ifU">
                <div className="lemon--div__373c0__1mboc arrange__373c0__2C9bH gutter-1__373c0__2l5bx vertical-align-middle__373c0__1SDTo border-color--default__373c0__3-ifU">
                  <div
                    style={{ width: '50%' }}
                    className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU"
                  >
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      <strong> Name </strong>:{' '}
                    </span>
                    <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                      {other.user.nickname}
                    </span>
                    {this.state.showMessageArea ? (
                      ''
                    ) : (
                      <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                        <button
                          style={{
                            marginLeft: '15px',
                            color: '#222222',
                            width: '148px',
                            height: '24px',
                            backgroundColor: '##ffffff',
                            borderRadius: '9px',
                            borderColor: '#9d9d9d',
                            backgroundColor: 'white',
                          }}
                          className="link__06b83__343sR"
                          aria-label="Toggle Menu"
                          aria-haspopup="menu"
                          aria-controls="header-dropdown-menu"
                          aria-expanded="false"
                          type="button"
                          onClick={(event) => this.openReviewForm(other.user.id)}
                        >
                          <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                            <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                              <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                Send Message
                              </span>
                            </span>
                          </div>
                        </button>
                      </span>
                    )}
                  </div>
                  {this.state.showMessageArea ? (
                    <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
                      <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                        <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                          <form
                            onSubmit={(event) => this.sendMessage(event)}
                            className="profile-bio yform yform-vertical-spacing"
                          >
                            <ul style={{ display: 'flex' }}>
                              <li style={{ width: '45%' }}>
                                <textarea
                                  style={{ marginLeft: '25px', width: '90%' }}
                                  id="review"
                                  maxlength="1000"
                                  name="message"
                                  size="30"
                                  type="text"
                                  value={this.state.message}
                                  onChange={this.onChangeMessageHandler}
                                ></textarea>
                              </li>

                              <li style={{ flexDirection: 'row' }}>
                                <button
                                  style={{ display: 'flex' }}
                                  type="submit"
                                  value="submit"
                                  class="ybtn ybtn--primary ybtn-full-responsive-small"
                                >
                                  <span>Submit Message</span>
                                </button>
                                <button
                                  style={{ marginLeft: '27%', marginTop: '4%' }}
                                  type="button"
                                  value="submit"
                                  class="ybtn ybtn--primary ybtn-full-responsive-small"
                                  onClick={(event) => this.openReviewForm('')}
                                >
                                  <span>Cancel</span>
                                </button>
                              </li>

                              <li style={{ width: '5%' }}></li>
                            </ul>
                          </form>
                        </span>
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </li>
    );
  }
}

export default MyTransactionCard;
