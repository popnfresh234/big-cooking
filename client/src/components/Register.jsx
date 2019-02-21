import React, { Component } from 'react';
import Segment from './Segment.jsx';

class Register extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      error: '',
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
    if ( this.state.password !== this.state.confirmPassword ) {
      this.setState( { error: 'Your passwords don\'t match, please try again.' } );
    } else {
      this.props.handleLoading();
      axios.post( '/api/register', this.state )
        .then( ( registerResponse ) => {
          this.props.handleLoading();
          this.props.handleAuthState( true, registerResponse.data.id, registerResponse.data.name );
          this.props.history.push( '/recipes' );
        } ).catch( ( err ) => {
          this.props.handleLoading();
          console.log( err.response );
          this.setState( {
            error: err.response.data,
          } );
        } );
    }
  }

  render() {
    return (
      <div className="form-container">
        <h1 className="login-h1">BIG COOKIN' </h1>
        <h4>Sharing recipes for a better world</h4>
        <Segment padded="very" className="form-details" >
          <form onSubmit={this.onSubmit}>
            {this.state.error && <p>{this.state.error}</p>}

            <div className="form-input">
              <label htmlFor="name">
                <span>Name <span className="required">*</span></span>
                <input placeholder="Name" name="name" type="text" onChange={this.onChange} required />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="email">
                <span>Email <span className="required">*</span></span>
                <input placeholder="Email" name="email" type="email" onChange={this.onChange} required />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="password">
                <span>Password <span className="required">*</span></span>
                <input placeholder="Password" name="password" type="password" onChange={this.onChange} required />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="confirm-password">
                <span>Confirm Password <span className="required">*</span></span>
                <input placeholder="Password" name="confirm-password" type="password" onChange={this.onChange} required />
              </label>
            </div>


            <button type="submit">Sign in!</button>


          </form>
        </Segment>
      </div>
    );
  }
}

export default Register;
