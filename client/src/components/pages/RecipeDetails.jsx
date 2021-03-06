import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import Ingredient from '../elements/Ingredient.jsx';
import Direction from '../elements/Direction.jsx';
import TitleBox from '../elements/TitleBox.jsx';
import Spacer from '../elements/Spacer.jsx';
import Segment from '../elements/Segment.jsx';


class RecipeDetails extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipe: '',
    };
    this.onQuantityChange = this.onQuantityChange.bind( this );
    this.onDelete = this.onDelete.bind( this );
  }

  componentDidMount() {
    this.props.handleLoading();
    axios.get( `/api/recipes/${this.props.match.params.id}` )
      .then( ( result ) => {
        this.props.handleLoading();
        const ingredients = this.calcIngredients( result.data.ingredients, 1 );

        const directions = result.data.directions
          .map( ( direction, index ) => ( <Direction
            index={index + 1}
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
    this.props.toggleModal( this.props.match.params.id );
  }


  calcIngredients( ingredients, multiplier ) {
    return ingredients
      .map( ingredient => ( <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        units={ingredient.units}
        quantity={ingredient.quantity}
        multipliedQuantity={parseFloat( ( ingredient.quantity * multiplier ).toFixed( 2 ) )}
        onQuantityChange={this.onQuantityChange}
      /> ) );
  }

  render() {
    return (
      <div>
        <Segment type="main-container">
          {this.props.deleted && <Redirect to="/recipes" />}
          <TitleBox />
          <Spacer size="xl" />
          <div className="row">
            <div className="col-xs-12 col-md-2"><img className="img-recipe-detail" src={this.state.recipe.image_url} alt={this.state.recipe.name} /></div>
            <div className="col-xs">
              <Spacer size="mobile-m" />
              <div className="row left-align">
                <div className="col-xs-12 col-md-8"><h1>{this.state.recipe.name ? this.state.recipe.name.toUpperCase() : ''}</h1></div>
                {this.state.recipe.user_id === this.props.userId &&
                  <div className="col-xs-6 col-md mobile-center">
                    <NavLink to={`/edit-recipe/${this.props.match.params.id}`} className="flex-center align-center"><button className="edit-buttons edit">EDIT</button></NavLink>
                  </div>
                }
                {this.state.recipe.user_id === this.props.userId &&
                  <div className="col-xs-6 col-md mobile-center"><div className="flex-center align-center"><button className="edit-buttons delete" onClick={this.onDelete}>DELETE</button></div></div>
                }
              </div>
              <Spacer size="m" />
              <div className="row left-align">
                <div className="col-xs-4 col-md-2">Author: </div>
                <div className="col-xs col-md"><span>{this.state.recipe.author}</span></div>
              </div>
              <Spacer size="xs" />

              <div className="row left-align">
                <div className="col-xs-4 col-md-2">Description: </div>
                <div className="col-xs col-md"><span >{this.state.recipe.description}</span></div>
              </div>
              <Spacer size="xs" />

              <div className="row left-align">
                <div className="col-xs-4 col-md-2">Duration: </div>
                <div className="col-xs col-md"><span><i className="recipe-clock-icon far fa-clock" /> {this.state.recipe.duration} minutes</span></div>
              </div>
              <Spacer size="xs" />

              <div className="row left-align">
                <div className="col-xs-4 col-md-2">Notes: </div>
                <div className="col-xs col-md"><span>{this.state.recipe.note}</span></div>
              </div>
              <Spacer size="m" />
            </div>
          </div>


        </Segment>
        <Spacer size="m" />

        <Segment type="main-container">
          <h1 className="left-align">INGREDIENTS</h1>
          <Spacer size="s" />
          {this.state.ingredients}
        </Segment>
        <Spacer size="m" />

        <Segment type="main-container">
          <h1 className="left-align">DIRECTIONS</h1>
          <Spacer size="s" />
          {this.state.directions}
        </Segment>
      </div >
    );
  }
}

export default RecipeDetails;
