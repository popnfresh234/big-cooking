import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class PrivateRoute extends Component {
  render() {
    const { component: Component, isLoggedIn } = this.props;
    return (
      ( isLoggedIn ) ? <Component {...this.props} /> : <Redirect to="/login" /> );
  }
}
export default PrivateRoute;
