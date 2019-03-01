import React, { Component } from 'react';
import Spacer from './Spacer.jsx';

class TitleBox extends Component {
  render() {
    return (
      <div>
        <div>
          <img className="logo" src="/assets/img/logo.png" alt="logo" />
          <h1 className="title-header">BIG COOKIN'</h1>
        </div>
        <h4 className="title-sub-header">Sharing recipes for a better world</h4>
        <Spacer size="desktop-l" />
      </div>
    );
  }
}

export default TitleBox;
