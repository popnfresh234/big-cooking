import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="content">
        <div className="nav row">
          <div className="col-xs-12 col-md-1"><div className="nav-item">Home</div></div>
          <div className="col-xs-12 col-md-1"><div className="nav-item">All Recipes</div></div>
          <div className="col-xs-12 col-md-1"><div className="nav-item">My Recipes</div></div>
          <div className="col-xs"><div className="nav-item nav-item-spacer" /></div>
          <div className="col-xs-12 col-md-2"><div className="nav-item"><input className="input-search" /></div></div>
          <div className="col-xs-12 col-md-1 nav-login"><div className="nav-item ">Login</div></div>
          <div className="col-xs-12 col-md-1 nav-login"><div className="nav-item ">Register</div></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
