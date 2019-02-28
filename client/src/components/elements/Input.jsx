import React, { Component } from 'react';


class Input extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const className = !this.props.filled ? 'input-error' : null;

    const typeLookup = {
      input: () => <input className={className} {...this.props} />,
      textarea: () => <textarea input className={className} {...this.props} />,
    };

    const fn = typeLookup[this.props.type];
    if ( fn ) return fn();
    return <input className={className} {...this.props} />;
  }
}

export default Input;
