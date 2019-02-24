import React, { Component } from 'react';


class Ingredient extends Component {
  render() {
    return (
      <div className="row underlined">
        <div className="col-xs-2 col-md-1"><div className="flex-center"><input type=" number" onChange={e => this.props.onQuantityChange( this.props.quantity, e )} /></div></div>
        <div className="col-xs-3 col-md-1"><div className="flex-center right-align">{this.props.multipliedQuantity}</div></div>
        <div className="col-xs-3 col-md-2"><div className="flex-center ">{this.props.units}</div></div>
        <div className="col-xs-4 col-md"><div className="flex-center left-align">{this.props.name}</div></div>
      </div>
    );
  }
}

export default Ingredient;

