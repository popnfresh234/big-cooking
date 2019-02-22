import React, { Component } from 'react';

class RecipeOverview extends Component {
  render() {
    console.log( this.props.recipe );
    return (
      <div className="recipe-card">
        <img src={this.props.recipe.image_url} alt={this.props.recipe.name} />
        <div className="recipe-details">
          <h2>{this.props.recipe.name}</h2>
          <h6>{this.props.recipe.description}</h6>
          <div className="row">
            <div className="col-xs-2">
              <i className="recipe-clock-icon far fa-clock" />
            </div>
            <div className="col-xs">
              {`${this.props.recipe.duration} minutes`}
            </div>
            <div className="col-xs">
              {this.props.recipe.category}
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default RecipeOverview;
