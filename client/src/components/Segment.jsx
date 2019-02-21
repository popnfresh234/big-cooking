import React, { Component } from 'react';

class Segment extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    console.log( this.props.padded || 1 );
    const modifier = this.props.padded && `-${this.props.padded}`;
    return (
      <div className={`padded${this.props.padded ? `-${this.props.padded}` : ''} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
