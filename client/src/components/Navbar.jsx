import React, { Component } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="content">
        <div className="nav row">
          <div className="col-xs-12 col-md-1"><NavLink exact to="/"><div className="nav-item">Home</div></NavLink></div>
          <div className="col-xs-12 col-md-1"><NavLink to="/recipes"><div className="nav-item">All Recipes</div></NavLink></div>
          <div className="col-xs-12 col-md-1"><NavLink to="/myrecipes"><div className="nav-item">My Recipes</div></NavLink></div>
          <div className="col-xs"><div className="nav-item nav-item-spacer" /></div>
          <div className="col-xs-12 col-md-2"><div className="nav-item"><input className="input-search" placeholder="Search..." /></div></div>
          {this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><a href=""onClick={this.handleLogout}><div className="nav-item ">Logout</div></a></div>}
          {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink to="/login"><div className="nav-item ">Login</div></NavLink></div>}
          {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink to="/register"><div className="nav-item ">Register</div></NavLink></div>}
        </div>
      </div>
    );
  }
}

export default Navbar;
