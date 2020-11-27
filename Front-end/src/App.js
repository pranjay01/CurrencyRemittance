import React, { Component } from 'react';
import './App.css';
// import {BrowserRouter} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
});

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      // Use Browser Router to route to different pages
      <BrowserRouter history={history}>
        {/*<div>*/}
        {/* App Component Has a Child Component called Main */}
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
        {/*</div>*/}
      </BrowserRouter>
    );
  }
}

export default App;
