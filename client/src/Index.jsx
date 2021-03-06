import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

require( './styles/main.scss' );

ReactDOM.render( <Router><App /></Router>, document.getElementById( 'react-root' ) );
