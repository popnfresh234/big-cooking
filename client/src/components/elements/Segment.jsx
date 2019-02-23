import React, { Component } from 'react';

class Segment extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const padded = this.props.padded && !this.props.ignoreMobile ? `padded-${this.props.padded}` : '';
    return (
      <div className={
        `segment 
        ${this.props.color ? this.props.color : ''} 
        ${this.props.className ? this.props.className : ''} 
        ${this.props.type} ${padded}`
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
