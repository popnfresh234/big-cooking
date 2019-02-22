import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
  constructor( props ) {
    super( props );
    this.handleLogout = this.handleLogout.bind( this );
    this.handleLogout = this.handleLogout.bind( this );
    this.onSearchChange = this.onSearchChange.bind( this );
    this.onKeyPress = this.onKeyPress.bind( this );
  }

  onSearchChange( e ) {
    this.setState( {
      [e.target.name]: e.target.value,
    } );
  }

  onKeyPress( e ) {
    if ( e.key === 'Enter' && this.state.searchTerm ) {
      const redirect = `/search?q=${this.state.searchTerm}`;
      this.props.history.push( redirect );
      // axios.get( `/api/recipes/search?q=${this.state.searchTerm}` )
      //   .then( ( results ) => {
      //     console.log( results.data );
      //   } ).catch( ( err ) => {
      //     console.log( err );
      //   } );
    }
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

      <div className="nav row">
        <div className="col-xs-12 col-md-1">
          <NavLink activeClassName="navlink-active" exact to="/" ><div className="nav-item">Home</div></NavLink>
        </div>
        <div className="col-xs-12 col-md-1">
          <NavLink activeClassName="navlink-active" to="/recipes"><div className="nav-item">All Recipes</div></NavLink>
        </div>
        <div className="col-xs-12 col-md-1">
          <NavLink activeClassName="navlink-active" to="/myrecipes"><div className="nav-item">My Recipes</div></NavLink>
        </div>
        <div className="col-xs"><div className="nav-item nav-item-spacer" /></div>
        <div className="col-xs-12 col-md-2">
          <div className="nav-item">
            <input
              name="searchTerm"
              className="input-search"
              placeholder="Search..."
              onChange={this.onSearchChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
        </div>
        {this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink activeClassName="navlink-active" to="#"onClick={this.handleLogout}><div className="nav-item ">Logout</div></NavLink></div>}
        {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink activeClassName="navlink-active" to="/login"><div className="nav-item ">Login</div></NavLink></div>}
        {!this.props.isLoggedIn && <div className="col-xs-12 col-md-1 nav-login"><NavLink activeClassName="navlink-active" to="/register"><div className="nav-item ">Register</div></NavLink></div>}
      </div>

    );
  }
}

export default withRouter( Navbar );
