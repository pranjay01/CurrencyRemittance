import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../config';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetAllTransactions, logOut, UpdateUserProfile } from '../../constants/action-types';

// create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authflag: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    axios.get(serverUrl + 'user/' + localStorage.getItem('userId')).then((response) => {
      console.log(response.data);
      const UserProfile = response.data;
      const payload = {
        UserProfile,
      };
      this.props.UpdateUserProfile(payload);
    });
    axios
      .get(serverUrl + 'user/' + localStorage.getItem('userId') + '/transactionHistory')
      .then((response) => {
        console.log(response.data);
        const TransactionList = response.data;
        const payload = {
          TransactionList,
        };
        this.props.GetAllTransactions(payload);
      });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      authflag: true,
    });
    this.props.logOut();
  };

  render() {
    // if Token is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem('token')) {
      console.log('Able to read token');
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      // Else display login button
      console.log('Not Able to read token');
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/Login">
              <span class="glyphicon glyphicon-log-in"></span> User Login
            </Link>
          </li>

          <li>
            <Link to="/Signup">
              <span class="glyphicon glyphicon-log-in"></span>User Signup
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (
      localStorage.getItem('token') &&
      (this.props.location.pathname === '/login' || this.props.location.pathname === '/')
    ) {
      redirectVar = <Redirect to="/OfferList" />;
    }

    if (localStorage.getItem('token') && localStorage.getItem('status') === 'Pending') {
      redirectVar = <Redirect to="/VerificationPage" />;
    }
    if (!localStorage.getItem('token')) {
      redirectVar = <Redirect to="/Login" />;
    }

    let options = null;
    if (localStorage.getItem('token') && localStorage.getItem('status') === 'Verified') {
      options = (
        <ul class="nav navbar-nav">
          <li class={this.props.location.pathname === '/OfferList' && 'active'}>
            <Link to="/OfferList">Search</Link>
          </li>
          <li class={this.props.location.pathname === '/Profile' && 'active'}>
            <Link to="/Profile">Profile</Link>
          </li>

          <li class={this.props.location.pathname === '/MyAccounts' && 'active'}>
            <Link to="/MyAccounts">My Accounts</Link>
          </li>
          <li class={this.props.location.pathname === '/AccountInformation' && 'active'}>
            <Link to="/AccountInformation">Create Account</Link>
          </li>
          <li class={this.props.location.pathname === '/PostOffer' && 'active'}>
            <Link to="/PostOffer">Post Offer</Link>
          </li>
          <li class={this.props.location.pathname === '/ExchangeRate' && 'active'}>
            <Link to="/ExchangeRate">Current Conversion Rate</Link>
          </li>
          <li class={this.props.location.pathname === '/MyOffers' && 'active'}>
            <Link to="/MyOffers">My Offers</Link>
          </li>
          <li class={this.props.location.pathname === '/MyTransactions' && 'active'}>
            <Link to="/MyTransactions">My Transactions</Link>
          </li>
          <li class={this.props.location.pathname === '/' && 'active'}>
            <Link to="/">Reviews</Link>
          </li>
        </ul>
      );
    }

    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a className="navbar-brand">
                <Link>Direct Exchange</Link>
              </a>
            </div>

            {options}
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllTransactions: (payload) => {
      dispatch({
        type: GetAllTransactions,
        payload,
      });
    },
    logOut: () => {
      dispatch({
        type: logOut,
      });
    },
    UpdateUserProfile: () => {
      dispatch({
        type: UpdateUserProfile,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
