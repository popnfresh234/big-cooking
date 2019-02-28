import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import axios from 'axios';
import Segment from '../elements/Segment.jsx';
import Spacer from '../elements/Spacer.jsx';
import TitleBox from '../elements/TitleBox.jsx';
import ImageUpload from '../elements/ImageUpload.jsx';
import NewRecipeIngredient from '../elements/NewRecipeIngredient.jsx';
import NewRecipeDirection from '../elements/NewRecipeDirection.jsx';

class NewRecipe extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      currentIngredient: {},
      currentDirection: {},
      recipe: {
        name: '',
        author: this.props.userName,
        category: '',
        description: '',
        image_url: 'https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/place-holder.png',
        duration: '',
        note: '',
        ingredients: [],
        directions: [],

      },
      quantity: '',
      units: '',
      name: '',
      note: '',
      description: '',
      error: '',
      submitted: false,
      image: '',
      editing: false,
      imageUrl: 'https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/place-holder.png',
    };

    this.onIngredientChange = this.onIngredientChange.bind( this );
    this.onDirectionChange = this.onDirectionChange.bind( this );
    this.onNoteChange = this.onNoteChange.bind( this );
    this.addIngredient = this.addIngredient.bind( this );
    this.addDirection = this.addDirection.bind( this );
    this.updateIngredient = this.updateIngredient.bind( this );
    this.updateDirection = this.updateDirection.bind( this );
    this.onRecipeChange = this.onRecipeChange.bind( this );
    this.onSubmitRecipe = this.onSubmitRecipe.bind( this );
    this.validateRecipe = this.validateRecipe.bind( this );
    this.scrollToDirections = this.scrollToDirections.bind( this );
    this.scrollToIngredients = this.scrollToIngredients.bind( this );
    this.addImage = this.addImage.bind( this );
  }

  componentDidMount() {
    if ( this.props.computedMatch.params.id ) {
      this.props.handleLoading();
      axios.get( `/api/recipes/${this.props.computedMatch.params.id}` )
        .then( ( result ) => {
          this.props.handleLoading();
          this.setState( {
            recipe: result.data,
            imageUrl: result.data.image_url,
            editing: true,
          } );
        } ).catch( ( err ) => {
          console.log( err );
          this.props.handleLoading();
        } );
    }
  }


  onRecipeChange( e ) {
    const { recipe } = this.state;
    recipe[e.target.name] = e.target.value;
    this.setState( {
      recipe,
    } );
  }

  onIngredientChange( e ) {
    const { currentIngredient } = this.state;
    currentIngredient[e.target.name] = e.target.value;
    this.setState( {
      currentIngredient,
      [e.target.name]: e.target.value,
    } );
  }

  onDirectionChange( e ) {
    const { currentDirection } = this.state;
    currentDirection[e.target.name] = e.target.value;
    this.setState( {
      currentDirection,
      [e.target.name]: e.target.value,
    } );
  }

  onNoteChange( e ) {
    const { recipe } = this.state;
    recipe[e.target.name] = e.target.value;
    this.setState( {
      recipe,
      [e.target.name]: e.target.value,
    } );
  }

  onSubmitRecipe() {
    const valid = this.validateRecipe();
    if ( valid ) {
      this.props.handleLoading();
      this.setState( {
        error: '',
      } );
      const formData = new FormData();
      formData.append( 'file', this.state.image );
      formData.append( 'recipe', JSON.stringify( this.state.recipe ) );
      if ( this.state.editing ) {
        axios.put( `/api/recipes/${this.props.computedMatch.params.id}`, formData )
          .then( () => {
            this.props.handleLoading();
            this.setState( {
              submitted: true,
            } );
          } ).catch( ( err ) => {
            this.props.handleLoading();
            console.log( err );
          } );
      } else {
        axios.post( '/api/recipes', formData )
          .then( () => {
            this.props.handleLoading();
            this.setState( {
              submitted: true,
            } );
          } ).catch( ( err ) => {
            this.props.handleLoading();
            console.log( err );
          } );
      }
    }
  }

  validateRecipe() {
    if ( this.state.description
      || this.state.units
      || this.state.quantity
      || this.state.name ) {
      this.setState( {
        error: 'Make sure to add your ingredients/directions to the recipe by pressing the + button!',
      } );
      return false;
    }

    if ( this.state.recipe.name
      && this.state.recipe.category
      && this.state.recipe.description
      && this.state.recipe.duration
      && this.state.recipe.ingredients.length
      && this.state.recipe.directions.length
    ) {
      return true;
    }

    this.setState( {
      error: 'Please fill in all fields',
    } );
    return false;
  }

  addImage( image, imageUrl ) {
    this.setState( {
      image,
      imageUrl,
    } );
  }

  addIngredient() {
    if ( this.state.currentIngredient.name
      && this.state.currentIngredient.units
      && this.state.currentIngredient.quantity ) {
      const { recipe, currentIngredient } = this.state;
      currentIngredient.id = uuidv1();
      recipe.ingredients.push( currentIngredient );
      this.setState( {
        currentIngredient: {},
        recipe,
        quantity: '',
        units: '',
        name: '',
      } );
    }
    this.scrollToIngredients();
  }

  addDirection() {
    if ( this.state.currentDirection.description ) {
      const { recipe, currentDirection } = this.state;
      currentDirection.id = uuidv1();
      recipe.directions.push( currentDirection );
      this.setState( {
        currentDirection: {},
        recipe,
        description: '',
      } );
    }
    this.scrollToDirections();
  }

  updateIngredient( currentIngredient, position ) {
    const { recipe } = this.state;
    if ( !currentIngredient.name
      && !currentIngredient.quantity
      && !currentIngredient.units ) {
      recipe.ingredients.splice( position, 1 );
    } else {
      recipe.ingredients[position] = currentIngredient;
    }

    this.setState( { recipe } );
  }

  updateDirection( currentDirection, position ) {
    const { recipe } = this.state;
    if ( !currentDirection.description ) {
      recipe.directions.splice( position, 1 );
    } else {
      recipe.directions[position] = currentDirection;
    }
    this.setState( { recipe } );
  }

  scrollToDirections() {
    this.directionScrollTarget.scrollIntoView( { behavior: 'smooth' } );
  }

  scrollToIngredients() {
    this.ingredientScrollTarget.scrollIntoView( { behavior: 'smooth' } );
  }
  render() {
    const ingredients = this.state.recipe.ingredients.map( ( ingredient, index ) => (
      <NewRecipeIngredient
        key={ingredient.id}
        id={ingredient.id}
        updateIngredient={this.updateIngredient}
        position={index}
        quantity={ingredient.quantity}
        units={ingredient.units}
        name={ingredient.name}
      />
    ) );

    const directions = this.state.recipe.directions.map( ( direction, index ) => (
      <NewRecipeDirection
        key={direction.id}
        id={direction.id}
        position={index}
        updateDirection={this.updateDirection}
        description={direction.description}
      />
    ) );
    return (
      <Segment type="main-container">
        {this.state.submitted && <Redirect to="/recipes" />}
        <div className="form-container new-recipe-container">
          <TitleBox />
          <Spacer size="l" />

          {/* Basic Info */}
          <div className="row ">
            <div className="col-xs-12 col-md-7 evenly-spaced-col">
              <Spacer size="desktop-m" />
              <div className="row">
                <div className="col-xs-6"><span className="flex-center">RECIPE NAME</span></div>
                <div className="col-xs-6"><input onChange={this.onRecipeChange} name="name" value={this.state.recipe.name} /></div>
              </div>
              <Spacer size="mobile-s" />
              <div className="row">
                <div className="col-xs-6"><span className="flex-center">CATEGORY</span></div>
                <div className="col-xs-6"><input onChange={this.onRecipeChange} name="category" value={this.state.recipe.category} /></div>
              </div>
              <Spacer size="mobile-s" />
              <div className="row">
                <div className="col-xs-6"><span className="flex-center">DESCRIPTION</span></div>
                <div className="col-xs-6"><input onChange={this.onRecipeChange} name="description" value={this.state.recipe.description} /></div>
              </div>
              <Spacer size="mobile-s" />
              <div className="row">
                <div className="col-xs-6"><span className="flex-center">DURATION</span></div>
                <div className="col-xs-6"><input type="number" onChange={this.onRecipeChange} name="duration" value={this.state.recipe.duration} /></div>
              </div>
              <Spacer size="desktop-m" />
            </div>
            <div className="col-xs-12 col-md-5 first-xs last-md">
              <ImageUpload addImage={this.addImage} editing={this.state.editing} imageUrl={this.state.imageUrl} />
              <Spacer size="mobile-l" />
            </div>
          </div>

          {/* Ingredients */}
          <Spacer size="m" />
          <div className="row left-align">
            <div className="col-xs new-recipe-header">
              <h2>INGREDIENTS</h2>
            </div>
          </div>
          {ingredients}
          <div className="row left-align">
            <div className="col-xs-3 hidden-large">QTY</div>
            <div className="col-xs-3 hidden-small">QUANTITY</div>
            <div className="col-xs-3">UNITS</div>
            <div className="col-xs-6">NAME</div>
          </div>
          <Spacer size="s" />
          <div className="row">
            <div className="col-xs-3"><input type="number" value={this.state.quantity} name="quantity" onChange={this.onIngredientChange} /></div>
            <div className="col-xs-3"><input value={this.state.units} name="units" onChange={this.onIngredientChange} /></div>
            <div className="col-xs-6"><input value={this.state.name} onChange={this.onIngredientChange} name="name" /></div>
          </div>
          <Spacer size="s" />
          <div className="row left-align">
            <div className="col-xs" ref={( el ) => { this.ingredientScrollTarget = el; }}>
              <button onClick={this.addIngredient}><i className="fas fa-plus" /></button>
            </div>
          </div>

          {/* Directions */}
          <Spacer size="m" />
          <div className="row left-align">
            <div className="col-xs new-recipe-header">
              <h2>DIRECTIONS</h2>
            </div>
          </div>
          {directions}
          <div className="row">
            <div className="col-xs col-md-6">
              <form>
                <textarea value={this.state.description} onChange={this.onDirectionChange} name="description" />
              </form>
            </div>
          </div>
          <Spacer size="s" />
          <div className="row left-align">
            <div className="col-xs" ref={( el ) => { this.directionScrollTarget = el; }}>
              <button onClick={this.addDirection}><i className="fas fa-plus" /></button>
            </div>
          </div>

          {/* Notes */}
          <Spacer size="m" />
          <div className="row left-align">
            <div className="col-xs new-recipe-header">
              <h2>NOTES</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-xs col-md-6">
              <form>
                <textarea value={this.state.note} onChange={this.onNoteChange} name="note" />
              </form>
            </div>
          </div>

          {/* Submit */}
          <Spacer size="m" />
          <div className="row left-align">
            <div className="col-xs">
              <button className="submit-button" onClick={this.onSubmitRecipe}><h5>Submit</h5></button>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default NewRecipe;
