import React, { Component } from 'react';

class RecipeOverview extends Component {
  render() {
    return (
      <p>{this.props.recipe.name}</p>
    );
  }
}

export default RecipeOverview;
