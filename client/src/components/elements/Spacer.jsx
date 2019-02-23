import React, { Component } from 'react';

class Spacer extends Component {
  render() {
    const size = this.props.size ? ` size-${this.props.size}` : '';
    return (
      <div className={`spacer${size}`} />
    );
  }
}

export default Spacer;
