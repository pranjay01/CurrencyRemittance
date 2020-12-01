import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import OfferCard from './OfferCard';
import { Link } from 'react-router-dom';
import './Offerist.css';

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = { Offers: [1, 1, 1, 1, 1, 1, 1, 1, 1], Countries: [] };
  }
  render() {
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
                            onSubmit={this.onSubmitUpdateProfile}
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
                                  <label className="placeholder-sub">Source Country</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCountry"
                                    onChange={this.onCOmmonChangeHandler}
                                    value="{this.state.NewOffer.sourceCountry}"
                                    required
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      Country
                                    </option>
                                    {this.state.Countries.map((country) => (
                                      <option
                                        className="Dropdown-menu"
                                        key={country.key}
                                        value={country.value}
                                      >
                                        {country.value}
                                      </option>
                                    ))}
                                  </select>
                                </li>

                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Source Country</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCountry"
                                    onChange={this.onCOmmonChangeHandler}
                                    value="{this.state.NewOffer.sourceCountry}"
                                    required
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      Country
                                    </option>
                                    {this.state.Countries.map((country) => (
                                      <option
                                        className="Dropdown-menu"
                                        key={country.key}
                                        value={country.value}
                                      >
                                        {country.value}
                                      </option>
                                    ))}
                                  </select>
                                </li>
                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Source Country</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCountry"
                                    onChange={this.onCOmmonChangeHandler}
                                    value="{this.state.NewOffer.sourceCountry}"
                                    required
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      Country
                                    </option>
                                    {this.state.Countries.map((country) => (
                                      <option
                                        className="Dropdown-menu"
                                        key={country.key}
                                        value={country.value}
                                      >
                                        {country.value}
                                      </option>
                                    ))}
                                  </select>
                                </li>
                                <li style={{ width: '100%', flex: 'auto', marginLeft: '2%' }}>
                                  <label className="placeholder-sub">Source Country</label>
                                  <select
                                    placeholder="Gender"
                                    className="form-control"
                                    name="sourceCountry"
                                    onChange={this.onCOmmonChangeHandler}
                                    value="{this.state.NewOffer.sourceCountry}"
                                    required
                                  >
                                    <option className="Dropdown-menu" key="" value="">
                                      Country
                                    </option>
                                    {this.state.Countries.map((country) => (
                                      <option
                                        className="Dropdown-menu"
                                        key={country.key}
                                        value={country.value}
                                      >
                                        {country.value}
                                      </option>
                                    ))}
                                  </select>
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
                    {this.state.Offers.map((offer) => (
                      <OfferCard
                        key={offer._id}
                        // openStaticProfile={(event) =>
                        //   this.openStaticProfile(event, review.CustomerID)
                        // }
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

export default OfferList;
