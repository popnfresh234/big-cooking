import React, { Component } from 'react';


class Input extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const className = !this.props.filled ? 'input-error' : null;
    return <input className={className} {...this.props} />;
  }
}

export default Input;
