import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from './components/Navbar.jsx';

class App extends Component {
  constructor( props ) {
    super( props );
    this.fetchData.bind( this );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log( 'fetch' );
    Axios.get( '/api/recipes' )
      .then( ( response ) => {
        console.log( response );
      } );
  }

  render() {
    return (
      <Navbar />
    );
  }
}

export default App;
