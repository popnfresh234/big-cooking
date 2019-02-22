import React, { Component } from 'react';

class Segment extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className={
        `segment 
        ${this.props.color ? this.props.color : ''} 
        ${this.props.className ? this.props.className : ''} 
        ${this.props.type} ${this.props.padded ? `padded-${this.props.padded}` : ''}`
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
