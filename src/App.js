import React from 'react';
import Header from './components/Header';
import BestBooks from './components/BestBooks';
import Login from './components/Login.js';
import IsLoadingAndError from './components/IsLoadingAndError';
import Footer from './components/Footer';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  serverRequest = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {
      headers: {'Authorization' : `Bearer ${jwt}`}
    };

    const requestToken = await axios.get('localhost:3001/test',config);

    console.log(requestToken);
  };
  render() {
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path='/'>
                {isAuthenticated ? <BestBooks/> : <Login/>}
              </Route>
              <Route exact path='/profile'>
                {isAuthenticated ? <Profile request={this.serverRequest}/> : ''}
              </Route>
            </Switch>
            <Footer/>
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
