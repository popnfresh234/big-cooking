/* eslint class-methods-use-this: 0 */ // --> OFF
import axios from 'axios';
import React, { Component } from 'react';

class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      id: '',
      error: '',
      emailLabel: 'Email',
    };
    this.onChange = this.onChange.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }
  onChange( e ) {
    this.setState( {
      [e.target.name]: e.target.value,
    } );
  }

  onSubmit( e ) {
    e.preventDefault();
    this.props.handleLoading();
    axios.post( '/api/login', this.state )
      .then( ( loginResponse ) => {
        this.props.handleLoading();
        this.props.handleAuthState( true, loginResponse.data.id, loginResponse.data.name );
        this.props.history.push( '/recipes' );
      } ).catch( ( err ) => {
        console.log( err.message );
        this.props.handleLoading();
        this.setState( { error: 'Credentials incorrect' } );
      } );
  }

  render() {
    return (
      <div className="login-container">
        <h1 className="login-h1">BIG COOKIN' </h1>
        <h1>Sharing recipes for a better world</h1>
        <div className="login-details padded-segment" >
          <form onSubmit={this.onSubmit}>
            {this.state.error && <p>{this.state.error}</p>}
            <div className="login-input">
              <label htmlFor="email">
                <span>Email <span className="required">*</span></span>
                <input placeholder="Email" name="email" type="email" onChange={this.onChange} required />
              </label>
            </div>
            <div className="login-input">

              <label htmlFor="password">
                <span>Password <span className="required">*</span></span>
                <input placeholder="Password" name="password" type="password" onChange={this.onChange} required />
              </label>
            </div>
            <div className="login-button-div">
              <button type="submit">Sign in!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
