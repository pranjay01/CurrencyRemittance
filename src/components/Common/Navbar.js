import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../config';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetAllTransactions } from '../../constants/action-types';

// create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateNames: [],
      countryNames: [],
      genderNames: [],
    };
    // this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
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
  /*
  handleLogout = () => {
    const data = {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
    };
    let url = '';
    if (data.role === 'Customer') url = serverUrl + 'customer/logoutCustomer';
    else url = serverUrl + 'restaurant/restaurantLogout';
    axios
      .post(url, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: false,
          });

          let payload = {
            emailID: '',
            role: '',
            loginStatus: 'false',
          };
          this.props.updateLoginInfo(payload);
          payload = {
            emailID: '',
            role: '',
            signupStatus: '',
          };
          this.props.updateSignUpInfo(payload);
          payload = {
            Name: '',
          };
          this.props.updateNameInfo(payload);
        } else {
          this.setState({
            authFlag: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorFlag: 1,
        });
      });
    localStorage.clear();
  };
  */

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
            <Link to="/customerLogin">
              <span class="glyphicon glyphicon-log-in"></span> User Login
            </Link>
          </li>

          <li>
            <Link to="/customerSignup">
              <span class="glyphicon glyphicon-log-in"></span>User Signup
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (localStorage.getItem('token') && this.props.location.pathname === '/login') {
      redirectVar = <Redirect to="/home" />;
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
          <li class={this.props.location.pathname === '/restaurantEvents' && 'active'}>
            <Link to="/restaurantEvents">Reviews</Link>
          </li>
        </ul>
      );
    }
    // if (!localStorage.getItem('token')) {
    //   options = (
    //     <ul class="nav navbar-nav">
    //       <li class={this.props.location.pathname === '/search' && 'active'}>
    //         <Link to="/search">Search</Link>
    //       </li>
    //     </ul>
    //   );
    // } else if (localStorage.getItem('token') && localStorage.getItem('role') === 'Restaurant') {
    //   options = (
    //     <ul class="nav navbar-nav">
    //       <li class={this.props.location.pathname === '/restaurantProfile' && 'active'}>
    //         <Link to="/restaurantProfile">Profile</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/restaurantMenu' && 'active'}>
    //         <Link to="/restaurantMenu">Food Menu</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/restaurantOrders' && 'active'}>
    //         <Link to="/restaurantOrders">Orders</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/restaurantReview' && 'active'}>
    //         <Link to="/restaurantReview">Review</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/restaurantEvents' && 'active'}>
    //         <Link to="/restaurantEvents">Events</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/messages' && 'active'}>
    //         <Link to="/messages">Message</Link>
    //       </li>
    //     </ul>
    //   );
    // } else if (localStorage.getItem('token') && localStorage.getItem('role') === 'Customer') {
    //   options = (
    //     <ul class="nav navbar-nav">
    //       <li class={this.props.location.pathname === '/customerProfile' && 'active'}>
    //         <Link to="/customerProfile">Profile</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/customerProfileUpdate' && 'active'}>
    //         <Link to="/customerProfileUpdate">Profile Update</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/customerContactUpdate' && 'active'}>
    //         <Link to="/customerContactUpdate">Contact Info Update</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/search' && 'active'}>
    //         <Link to="/search">Search</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/customerEvents' && 'active'}>
    //         <Link to="/customerEvents">Events</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/orderHistory' && 'active'}>
    //         <Link to="/orderHistory">Order History</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/users' && 'active'}>
    //         <Link to="/users">Yelp Users</Link>
    //       </li>
    //       <li class={this.props.location.pathname === '/messages' && 'active'}>
    //         <Link to="/messages">Message</Link>
    //       </li>
    //     </ul>
    //   );
    // }
    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a className="navbar-brand">
                <Link to="/WebPage">Direct Exchange</Link>
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
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
