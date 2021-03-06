/* eslint class-methods-use-this: 0 */ // --> OFF
import axios from 'axios';
import React, { Component } from 'react';
import Segment from '../elements/Segment.jsx';
import TitleBox from '../elements/TitleBox.jsx';
import Spacer from '../elements/Spacer.jsx';
import Input from '../elements/Input.jsx';

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
      <Segment type="main-container">
        <div className="form-container">
          <TitleBox />
          <Segment padded="l" color="grey-darker">
            <form onSubmit={this.onSubmit}>
              {this.state.error && <p>{this.state.error}</p>}
              <div className="form-input">
                <label htmlFor="email">
                  <span>E-mail <span className="required">*</span></span>
                  <input placeholder="E-mail" name="email" type="email" onChange={this.onChange} />
                </label>
              </div>

              <div className="form-input">
                <label htmlFor="password">
                  <span>Password <span className="required">*</span></span>
                  <input placeholder="Password" name="password" type="password" onChange={this.onChange} />
                </label>
              </div>
              <button type="submit">Sign in!</button>
            </form>
          </Segment>
        </div>
      </Segment>
    );
  }
}

export default Login;
