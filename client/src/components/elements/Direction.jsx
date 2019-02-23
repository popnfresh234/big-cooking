import React, { Component } from 'react';


class Direction extends Component {
  render() {
    return (
      <div className="row underlined left-align">
        <div className="col-xs-mini"><div className="recipe-item direction-item">{`${this.props.index}.`}</div></div>
        <div className="col-xs"><div className="recipe-item direction-item">{this.props.description}</div></div>
      </div>
    );
  }
}

export default Direction;
