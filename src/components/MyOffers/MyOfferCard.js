import React, { Component } from 'react';

class MyOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const offer = this.props.offer;

    let rating = { backgroundPosition: '0 -320px' };
    switch (2) {
      case 1:
        rating = { backgroundPosition: '0 -360px' };
        break;
      case 2:
        rating = { backgroundPosition: '0 -400px' };
        break;
      case 3:
        rating = { backgroundPosition: '0 -440px' };
        break;
      case 4:
        rating = { backgroundPosition: '0 -480px' };
        break;
      case 5:
        rating = { backgroundPosition: '0 -500px' };
        break;
      default:
        break;
    }

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
                    <strong> Offer Status </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.offerStatus}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Amount to Remit </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.sourceAmount}
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
                    <strong> Source Country </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.sourceCountry}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Source Currency </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.sourceCurrency}
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
                    <strong> Destination Country </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.destinationCountry}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Destination Currency </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.destinationCurrency}
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
                    <strong>Accepting CounterOffers </strong> :{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.allowCounterOffers === 1 ? 'Accepting' : 'Not Accepting'}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Accepting Spilt Offers </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.splitExchange === 1 ? 'Accepting' : 'Not Accepting'}
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
                    <strong> Asked Exchange Rate </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.exchangeRate}
                  </span>
                </div>
                <div className="lemon--div__373c0__1mboc arrange-unit__373c0__o3tjT border-color--default__373c0__3-ifU">
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    <strong> Offer Expiring on </strong>:{' '}
                  </span>
                  <span className="lemon--span__373c0__3997G display--inline__373c0__3JqBP border-color--default__373c0__3-ifU">
                    {offer.expirationDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                  {/*this.props.review.Description*/}
                  {/*La Foret did a fantastic job accommodating their restaurant for Covid times. We
                  visited them last night, &nbsp;The ambience, Food and service were fabulous, Happy
                  to see this SJ landmarks &nbsp;back in business. Thank you!*/}
                </span>
              </p>
            </div>
            <div className="lemon--div__373c0__1mboc margin-b2__373c0__abANL border-color--default__373c0__3-ifU">
              <div style={{ flexDirection: 'column' }} className="js-more-fields more-fields">
                <ul style={{ display: 'flex', paddingLeft: '0px' }}>
                  <li>
                    {' '}
                    <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                      <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                        <button
                          style={{
                            marginLeft: '29%',
                            color: '#222222',
                            width: '157px',
                            height: '35px',
                            borderRadius: '7%',
                            borderColor: '#9d9d9d',
                            backgroundColor: 'white',
                          }}
                          className="link__06b83__343sR"
                          aria-label="Toggle Menu"
                          aria-haspopup="menu"
                          aria-controls="header-dropdown-menu"
                          aria-expanded="false"
                          type="button"
                          onClick={(event) => this.props.showMatchingOffers(event)}
                        >
                          <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                            <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                              <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                Show Matching Offers
                              </span>
                            </span>
                          </div>
                        </button>
                      </span>
                    </p>
                  </li>
                  {offer.allowCounterOffers !== 0 ? (
                    <li style={{ marginLeft: '10%' }}>
                      {' '}
                      <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                        <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                          <button
                            style={{
                              marginLeft: '29%',
                              color: '#222222',
                              width: '157px',
                              height: '35px',
                              backgroundColor: '##ffffff',
                              borderRadius: '7%',
                              borderColor: '#9d9d9d',
                              backgroundColor: 'white',
                            }}
                            className="link__06b83__343sR"
                            aria-label="Toggle Menu"
                            aria-haspopup="menu"
                            aria-controls="header-dropdown-menu"
                            aria-expanded="false"
                            type="button"
                            onClick={(event) => this.props.openCounterOffer(event)}
                          >
                            <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                              <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                  Show Counter Offers
                                </span>
                              </span>
                            </div>
                          </button>
                        </span>
                      </p>
                    </li>
                  ) : (
                    ''
                  )}
                  <li style={{ marginLeft: '10%' }}>
                    {' '}
                    <p className="lemon--p__373c0__3Qnnj text__373c0__2Kxyz comment__373c0__3EKjH text-color--normal__373c0__3xep9 text-align--left__373c0__2XGa-">
                      <span className="lemon--span__373c0__3997G raw__373c0__3rKqk" lang="en">
                        <button
                          style={{
                            marginLeft: '29%',
                            color: '#222222',
                            width: '157px',
                            height: '35px',
                            backgroundColor: '##ffffff',
                            borderRadius: '7%',
                            borderColor: '#9d9d9d',
                            backgroundColor: 'white',
                          }}
                          className="link__06b83__343sR"
                          aria-label="Toggle Menu"
                          aria-haspopup="menu"
                          aria-controls="header-dropdown-menu"
                          aria-expanded="false"
                          type="button"
                          onClick={(event) => this.props.editOffer(event)}
                        >
                          <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                            <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                              <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                Edit Offer
                              </span>
                            </span>
                          </div>
                        </button>
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default MyOfferCard;
