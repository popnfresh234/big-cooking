import React, { Component } from 'react';
import Segment from '../elements/Segment.jsx';
import TitleBox from '../elements/TitleBox.jsx';
import Spacer from '../elements/Spacer.jsx';
import axios from 'axios';

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
    console.log( this.state );
    console.log( this.state.password, this.state.confirmPassword );
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
      <Segment className="main-container">
        <div className="form-container">
          <TitleBox />
          <Segment padded="l" color="grey-darker">
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
                  <span>E-mail <span className="required">*</span></span>
                  <input placeholder="E-mail" name="email" type="email" onChange={this.onChange} required />
                </label>
              </div>

              <div className="form-input">
                <label htmlFor="password">
                  <span>Password <span className="required">*</span></span>
                  <input placeholder="Password" name="password" type="password" onChange={this.onChange} required />
                </label>
              </div>

              <div className="form-input">
                <label htmlFor="confirmPassword">
                  <span>Confirm Password <span className="required">*</span></span>
                  <input placeholder="Password" name="confirmPassword" type="password" onChange={this.onChange} required />
                </label>
              </div>


              <button type="submit">Register!</button>


            </form>
          </Segment>
        </div>
      </Segment>
    );
  }
}

export default Register;
