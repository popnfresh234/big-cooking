import React, { Component } from 'react';
import axios from 'axios';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipe: '',
      deleted: false,
    };
    this.onQuantityChange = this.onQuantityChange.bind( this );
    this.onDelete = this.onDelete.bind( this );
  }

  componentDidMount() {
    this.props.handleLoading();
    axios.get( `/api/recipes/${this.props.computedMatch.params.id}` )
      .then( ( result ) => {
        this.props.handleLoading();
        const ingredients = this.calcIngredients( result.data.ingredients, 1 );

        const directions = result.data.directions
          .map( direction => ( <Direction
            key={direction.id}
            description={direction.description}
          /> ) );
        this.setState( {
          recipe: result.data,
          rawIngredients: result.data.ingredients,
          ingredients,
          directions,
        } );
      } ).catch( ( err ) => {
        this.props.handleLoading();
        console.log( err );
      } );
  }

  onQuantityChange( origValue, e ) {
    let multiplier = e.target.value / origValue;
    if ( multiplier <= 0 ) multiplier = 1;
    const ingredients = this.calcIngredients( this.state.rawIngredients, multiplier );
    this.setState( { ingredients } );
  }

  onDelete() {
    this.props.handleLoading();
    axios.delete( `/api/recipes/${this.props.computedMatch.params.id}` )
      .then( () => {
        this.props.handleLoading();
        this.setState( {
          deleted: true,
        } );
      } ).catch( ( err ) => {
        this.props.handleLoading();
        console.log( err );
      } );
  }

  calcIngredients( ingredients, multiplier ) {
    return ingredients
      .map( ingredient => ( <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        units={ingredient.units}
        quantity={ingredient.quantity}
        multipliedQuantity={ingredient.quantity * multiplier}
        onQuantityChange={this.onQuantityChange}
      /> ) );
  }


  render() {
    return (
      <h1>recipe details</h1>
    );
  }
}

export default RecipeDetails;
