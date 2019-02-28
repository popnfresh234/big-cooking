import React, { Component } from 'react';
import Segment from './Segment.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.handleKeyUp = this.handleKeyUp.bind( this );
    this.handleOutsideClick = this.handleOutsideClick.bind( this );
    this.handleBackButton = this.handleBackButton.bind( this );
    this.handleDeleteButton = this.handleDeleteButton.bind( this );
    this.wrapperRef = React.createRef();
  }

  removeListeners() {
    window.removeEventListener( 'keyup', this.handleKeyUp, false );
    document.removeEventListener( 'click', this.handleOutsideClick, false );
  }

  handleBackButton() {
    this.props.toggleModal();
    this.removeListeners();
  }


  handleDeleteButton() {
    if ( this.props.id ) {
      this.props.handleDelete( this.props.id );
    }
    this.props.toggleModal();
    this.removeListeners();
  }

  handleKeyUp( e ) {
    const keyLookup = {
      27: () => {
        e.preventDefault();
        this.props.toggleModal();
        this.removeListeners();
      },
    };

    if ( keyLookup[e.keyCode] ) {
      keyLookup[e.keyCode]();
    }
  }

  handleOutsideClick( e ) {
    if ( this.wrapperRef.current && !this.wrapperRef.current.contains( e.target ) ) {
      this.props.toggleModal();
      this.removeListeners();
    }
  }

  render() {
    if ( this.props.show ) {
      window.addEventListener( 'keyup', this.handleKeyUp, false );
      document.addEventListener( 'click', this.handleOutsideClick, false );
    }
    const showStateClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div>
        <div className={showStateClassName}>
          <Segment reactRef={this.wrapperRef} className="modal-container">
            <span><h1>Are you sure?</h1></span>
            <button className="modal-button" onClick={this.handleBackButton}>BACK</button>
            <button className="modal-button delete" onClick={this.handleDeleteButton}>DELETE</button>
          </Segment>
        </div>
      </div>
    );
  }
}

export default RecipeDetails;
