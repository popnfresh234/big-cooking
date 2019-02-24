import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Spacer from '../elements/Spacer.jsx';

class RecipeOverview extends Component {
  render() {
    return (

      <NavLink className="recipe-card placeholder" to="/new-recipe">
        <div className="flex-center">
          <i className="fas fa-plus-circle fa-4x" />
          <Spacer size="m" />
          <h2>New Recipe</h2>
        </div>
      </NavLink>
    );
  }
}

export default RecipeOverview;
