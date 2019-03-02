import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class PrivateRoute extends Component {
  render() {
    axios.get( '/api/login/check' )
      .then( ( result ) => {
        if ( result.status !== 200 ) {
          this.props.handleAuthState( false, '', '' );
        }
      } );
    const { component: Component, isLoggedIn } = this.props;
    return (
      ( isLoggedIn ) ? <Component {...this.props} /> : <Redirect to="/login" /> );
  }
}
export default PrivateRoute;
