import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import OfferCard from './OfferCard';
import { Link, Redirect } from 'react-router-dom';
import './Offerist.css';
import { connect } from 'react-redux';
import { getOfferLists, updateFocusOffer } from '../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../config';

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceCurrency: '',
      sourceAmount: '',
      destinationCurrency: '',
      destinationAmount: '',
      openDetailPage: false,
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + 'searchOffers', {
        params: {
          sourceCurrency: this.state.sourceCurrency ? this.state.sourceCurrency : null,
          sourceAmount: this.state.sourceAmount ? parseFloat(this.state.sourceAmount) : null,
          destinationCurrency: this.state.destinationCurrency
            ? this.state.destinationCurrency
            : null,
          destinationAmount: this.state.destinationAmount
            ? parseFloat(this.state.destinationAmount)
            : null,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        const offerLists = response.data;
        const payload = {
          offerLists,
        };
        this.props.getOfferLists(payload);
      });
  }

  onCOmmonChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getOffers = (event) => {
    event.preventDefault();
    axios
      .get(serverUrl + 'searchOffers', {
        params: {
          sourceCurrency: this.state.sourceCurrency ? this.state.sourceCurrency : null,
          sourceAmount: this.state.sourceAmount ? parseFloat(this.state.sourceAmount) : null,
          destinationCurrency: this.state.destinationCurrency
            ? this.state.destinationCurrency
            : null,
          destinationAmount: this.state.destinationAmount
            ? parseFloat(this.state.destinationAmount)
            : null,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        const offerLists = response.data;
        const payload = {
          offerLists,
        };
        this.props.getOfferLists(payload);
      });
  };

  openDetailsPage = (event, Offer) => {
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

  render() {
    let redirectVar = null;
    if (this.state.openDetailPage) {
      redirectVar = <Redirect to="OfferDetailPage" />;
    }
    return (
      <div className="lemon--div__06b83__1mboc responsive responsive-biz border-color--default__06b83__3-ifU">
        {redirectVar}
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
                                  <label className="placeholder-sub">Source Currency</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCurrency"
                                    onChange={this.onCOmmonChangeHandler}
                                    value={this.state.sourceCurrency}
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      currency
                                    </option>
                                    {this.props.ConversionRateStore.conversionRates.map(
                                      (currency) => (
                                        <option
                                          className="Dropdown-menu"
                                          key={currency.country}
                                          value={currency.currencyType}
                                        >
                                          {currency.currencyType}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </li>

                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Source Amount</label>
                                  <input
                                    style={{ marginLeft: '0%', height: '35px', width: '225px' }}
                                    id="first_name"
                                    name="sourceAmount"
                                    placeholder="Destination Currency"
                                    type="number"
                                    onChange={this.onCOmmonChangeHandler}
                                    value={this.state.sourceAmount}
                                  />
                                </li>

                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Destinatoin Currency</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="destinationCurrency"
                                    onChange={this.onCOmmonChangeHandler}
                                    value={this.state.destinationCurrency}
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      currency
                                    </option>
                                    {this.props.ConversionRateStore.conversionRates.map(
                                      (currency) => (
                                        <option
                                          className="Dropdown-menu"
                                          key={currency.country}
                                          value={currency.currencyType}
                                        >
                                          {currency.currencyType}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </li>

                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Destination Ammount</label>
                                  <input
                                    style={{ marginLeft: '0%', height: '35px', width: '225px' }}
                                    id="first_name"
                                    name="destinationAmount"
                                    placeholder="Destination Currency"
                                    type="number"
                                    onChange={this.onCOmmonChangeHandler}
                                    value={this.state.destinationAmount}
                                  />
                                </li>

                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <button
                                    style={{
                                      color: 'white',
                                      width: '100px',
                                      marginTop: '21px',
                                      height: '35px',
                                      backgroundColor: 'black',
                                      borderRadius: '66%',
                                    }}
                                    className="link__06b83__343sR"
                                    aria-label="Toggle Menu"
                                    aria-haspopup="menu"
                                    aria-controls="header-dropdown-menu"
                                    aria-expanded="false"
                                    type="submit"
                                    onClick={this.showMenu}
                                  >
                                    <div className="lemon--div__06b83__1mboc button-content__06b83__1QNtB border-color--default__06b83mousedown-x__3-ifU">
                                      <span className="lemon--span__06b83__3997G text__06b83__2Kxyz button-content-text__06b83__Z-7FO text-color--blue-dark__06b83__1jX7S text-align--center__06b83__3VrfZ text-size--large__06b83__3t60B text--truncated__06b83__3sLaf">
                                        <span className="lemon--span__06b83__3997G display--inline__06b83__3JqBP border-color--default__06b83__3-ifU">
                                          Search
                                        </span>
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
                    {this.props.OfferListStore.offerLists.map((offer) => (
                      <OfferCard
                        key={offer._id}
                        openDetailsPage={(event) => this.openDetailsPage(event, offer)}
                        offer={offer}

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

export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
