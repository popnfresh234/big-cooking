import React, { Component } from 'react';

class TitleBox extends Component {
  render() {
    return (
      <div>
        <div>
          <img className="logo" src="/assets/img/logo.png" alt="logo" />
          <h1 className="title-header">BIG COOKIN'</h1>
        </div>
        <h4 className="title-sub-header">Sharing recipes for a better world</h4>
      </div>
    );
  }
}

export default TitleBox;
