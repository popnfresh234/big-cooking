import React, { Component } from 'react';
import axios from 'axios';
import RecipeCard from '../elements/RecipeCard.jsx';
import RecipeCardPlaceholder from '../elements/RecipeCardPlaceholder.jsx';
import TitleBox from '../elements/TitleBox.jsx';
import Spacer from '../elements/Spacer.jsx';
import Segment from '../elements/Segment.jsx';

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
            const baseRecipes = baseRecipeResponse.data;
            if ( this.props.rootPath !== 'random' ) baseRecipeResponse.data.unshift( { placeholder: true, id: 'placeholder' } );

            const chunkArray = [];
            for ( let i = 0; i < baseRecipes.length; i += this.props.cardsPerRow + 1 ) {
              chunkArray.push( baseRecipes.slice( i, i + this.props.cardsPerRow + 1 ) );
            }

            const recipes = chunkArray.map( ( recipeArray, index ) =>
              (
                <div className="row recipe-row" key={index}>
                  {
                    recipeArray.map( ( recipe ) => {
                      if ( recipe.placeholder ) {
                        return <div key={recipe.id} className={`col-xs-12 col-md-${this.props.cardsPerRow}`}><RecipeCardPlaceholder /></div>;
                      }
                        return <div key={recipe.id} className={`col-xs-12 col-md-${this.props.cardsPerRow}`}><RecipeCard recipe={recipe} /></div>;
                    } )
                    }
                </div>
              ) );
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
      <Segment padded="xxl-ignore-mobile" type="main-container">
        <TitleBox />
        <Spacer size="xl" />

        {this.state.recipes}

      </Segment>
    );
  }
}


export default Recipes;
