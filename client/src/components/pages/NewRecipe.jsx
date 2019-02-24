import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import axios from 'axios';

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
    return (
      <h1>new recipe</h1>
    );
  }
}

export default NewRecipe;
