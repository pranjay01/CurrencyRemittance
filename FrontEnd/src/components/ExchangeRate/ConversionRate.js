import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios';
import serverUrl from '../../config';
import { connect } from 'react-redux';
import { updateConversionRates } from '../../constants/action-types';
import { Redirect } from 'react-router-dom';

class ExchangeRate extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get(serverUrl + 'getConversionRate').then((response) => {
      console.log(response.data);
      const conversionRates = response.data;
      const payload = {
        conversionRates,
      };
      this.props.updateConversionRates(payload);
      this.setState({
        values: conversionRates,
      });
      console.log(this.state.values);
    });
  }

  render() {
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
      <div>
        <ReactBootStrap.Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Name</th> */}
              {this.state.values.map((value) => (
                <th>{value.country}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.values.map((value) => (
              <tr>
                <th>{value.country}</th>
                {this.state.values.map((value1) => (
                  <td>{(value.usdConversionRate / value1.usdConversionRate).toFixed(3)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const conversionRates = state.ConversionRateReducer;
  return {
    conversionRates: conversionRates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateConversionRates: (payload) => {
      dispatch({
        type: updateConversionRates,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);
