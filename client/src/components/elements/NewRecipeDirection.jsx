import React, { Component } from 'react';


class NewRecipeDirection extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateDirection = this.onUpdateDirection.bind( this );
    this.direction = {
      id: this.props.id,
      description: this.props.description,
    };
    this.state = {
      description: this.props.description,
    };
  }

  onUpdateDirection( e ) {
    this.direction[e.target.name] = e.target.value;
    this.setState( {
      [e.target.name]: e.target.value,
    } );
    this.props.updateDirection( this.direction, this.props.position );
  }

  render() {
    return (
      <div className="row row-new-item">
        <div className="col-xs col-md-6"><form><textarea value={this.state.description} name="description" onChange={this.onUpdateDirection} /></form></div>
      </div> );
  }
}

export default NewRecipeDirection;

