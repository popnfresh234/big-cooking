import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.handleLogout = this.handleLogout.bind( this );
  }
  handleLogout( e ) {
    e.preventDefault();
    this.props.handleLoading();
    axios.post( '/api/logout' )
      .then( ( ) => {
        this.props.handleLoading();
        this.props.handleAuthState( false, null, null );
        this.props.history.push( '/' );
      } ).catch( ( err ) => {
        this.props.handleLoading();
        console.log( err );
      } );
  }

  render() {
    return (
      <div className="content">
        <div className="nav row">
          <div className="col-xs-12 col-md-1"><NavLink exact to="/"><div className="nav-item">Home</div></NavLink></div>
          <div className="col-xs-12 col-md-1"><NavLink to="/recipes"><div className="nav-item">All Recipes</div></NavLink></div>
          <div className="col-xs-12 col-md-1"><NavLink to="/myrecipes"><div className="nav-item">My Recipes</div></NavLink></div>
          <div className="col-xs"><div className="nav-item nav-item-spacer" /></div>
          <div className="col-xs-12 col-md-2"><div className="nav-item"><input className="input-search" placeholder="Search..." /></div></div>
          {this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink to="#"onClick={this.handleLogout}><div className="nav-item ">Logout</div></NavLink></div>}
          {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink to="/login"><div className="nav-item ">Login</div></NavLink></div>}
          {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink to="/register"><div className="nav-item ">Register</div></NavLink></div>}
        </div>
      </div>
    );
  }
}

export default withRouter( Navbar );
