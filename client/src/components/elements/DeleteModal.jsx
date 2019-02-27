import React, { Component } from 'react';
import Segment from './Segment.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.handleDeleteButton = this.handleDeleteButton.bind( this );
  }
  handleDeleteButton() {
    this.props.onDelete();
    this.props.toggleModal();
  }

  render() {
    const showStateClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    const blurClassName = this.props.show ? 'blur display-block' : 'blur display-none';
    return (
      <div>
        <div className={blurClassName} />
        <div className={showStateClassName}>
          <Segment className="modal-container">
            <span><h1>Are you sure?</h1></span>
            <button className="modal-button" onClick={this.props.toggleModal}>BACK</button>
            <button className="modal-button delete" onClick={this.handleDeleteButton}>DELETE</button>
          </Segment>
        </div>
      </div>
    );
  }
}

export default RecipeDetails;
