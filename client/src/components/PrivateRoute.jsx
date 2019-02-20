import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class PrivateRoute extends Component {
  render() {
    const { component: Component, isLoggedIn, ...rest } = this.props;
    return (
      ( isLoggedIn ) ? <Component {...rest} /> : <Redirect to="/login" /> );
  }
}
export default PrivateRoute;
