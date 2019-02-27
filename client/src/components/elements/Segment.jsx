import React, { Component } from 'react';

class Segment extends Component {
  render() {
    const padded = this.props.padded ? `padded-${this.props.padded}` : '';
    return (
      <div
        ref={this.props.reactRef}
        className={
        `segment 
        ${this.props.color ? this.props.color : ''} 
        ${this.props.className ? this.props.className : ''} 
        ${this.props.type} 
        ${padded}`
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default Segment;
