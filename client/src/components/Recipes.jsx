import React, { Component } from 'react';
import axios from 'axios';
import RecipeOverview from './RecipeCard.jsx';
import TitleBox from './TitleBox.jsx';
import Spacer from './Spacer.jsx';

class Recipes extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      recipes: [],
    };
    this.fetchData.bind( this );
  }

  componentDidMount() {
    this.fetchData( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    this.fetchData( nextProps );
  }

  fetchData( props ) {
    const pageMap = {
      recipes: () => '/api/recipes',
      myrecipes: () => `/api/${props.userId}/recipes/`,
      random: () => '/api/recipes/random',
      search: () => `/api/recipes/search${props.location.search}`,
    };
    const fn = pageMap[this.props.rootPath];
    if ( fn ) {
      axios.get( fn() )
        .then( ( baseRecipeResponse ) => {
          if ( baseRecipeResponse.data ) {
            const recipes = baseRecipeResponse.data.map( recipe => <div key={recipe.id} className={`col-xs-12 col-md-${this.props.cardsPerRow}`}><RecipeOverview recipe={recipe} /></div> );
            this.setState( {
              recipes,
            } );
          }
        } ).catch( ( err ) => {
          console.log( err );
        } );
    }
  }

  render() {
    return (
      <div className="recipe-container">
        <TitleBox />
        <Spacer size="l" />
        <div className="row">
          {this.state.recipes}
        </div>
      </div>
    );
  }
}


export default Recipes;
