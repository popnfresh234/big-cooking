import React, { Component } from 'react';

class NewRecipeIngredient extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateIngredient = this.onUpdateIngredient.bind( this );
    this.ingredient = {
      id: this.props.id,
      quantity: this.props.quantity,
      units: this.props.units,
      name: this.props.name,
    };
    this.state = {
      quantity: this.props.quantity,
      units: this.props.units,
      name: this.props.name,
    };
  }

  onUpdateIngredient( e ) {
    this.ingredient[e.target.name] = e.target.value;
    this.setState( {
      [e.target.name]: e.target.value,
    } );
    this.props.updateIngredient( this.ingredient, this.props.position );
  }

  render() {
    return (
      <div className="row row-new-item">
        <div className="col-xs-3"><input name="quantity" type="number" value={this.state.quantity} onChange={this.onUpdateIngredient} /></div>
        <div className="col-xs-3"><input name="units" value={this.state.units} onChange={this.onUpdateIngredient} /></div>
        <div className="col-xs-6"><input name="name" value={this.state.name} onChange={this.onUpdateIngredient} /></div>
      </div>
    );
  }
}

export default NewRecipeIngredient;
