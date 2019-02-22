import React, { Component } from 'react';

class Segment extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const modifier = this.props.padded && `-${this.props.padded}`;
    return (
      <div className={`segment padded${this.props.padded ? `-${this.props.padded}` : ''} ${this.props.color} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
