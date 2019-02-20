import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isLoggedIn: '',
      userId: '',
      userName: '',
    };
    this.handleAuthState.bind( this );
  }

  handleAuthState( isLoggedIn, userId, userName ) {
    this.setState( { isLoggedIn, userId, userName } );
    localStorage.setItem( 'isLoggedIn', JSON.stringify( isLoggedIn ) );
    localStorage.setItem( 'userId', JSON.stringify( userId ) );
    localStorage.setItem( 'userName', userName );
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute
            path="/"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="random"
            key="random"
            cardsPerRow={3}
            userId={this.state.userId}
            component={Recipes}
          />
          <PrivateRoute
            path="/recipes"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="recipes"
            key="recipes"
            cardsPerRow={4}
            handleLoading={this.handleLoading}
            component={Recipes}
          />
          <PrivateRoute
            path="/myrecipes"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="myrecipes"
            key="myrecipes"
            userId={this.state.userId}
            cardsPerRow={4}
            handleLoading={this.handleLoading}
            component={Recipes}
          />
          <PrivateRoute
            path="/search"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="search"
            key="search"
            userId={this.state.userId}
            cardsPerRow={4}
            handleLoading={this.handleLoading}
            component={Recipes}
          />
          <PrivateRoute
            path="/recipe-details/:id"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="recipe-details"
            userId={this.state.userId}
            key="recipe-details"
            handleLoading={this.handleLoading}
            component={RecipeDetails}
          />
          <PrivateRoute
            path="/new-recipe"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="new-recipe"
            key="new-recipe"
            userId={this.state.userId}
            userName={this.state.userName}
            handleLoading={this.handleLoading}
            component={NewRecipe}
          />
          <PrivateRoute
            path="/edit-recipe/:id"
            exact
            isLoggedIn={this.state.isLoggedIn}
            rootPath="new-recipe"
            key="new-recipe"
            userId={this.state.userId}
            userName={this.state.userName}
            handleLoading={this.handleLoading}
            component={NewRecipe}
          />
          <Route
            path="/login"
            exact
            render={props =>
                    ( <Login
                      {...props}
                      handleAuthState={this.handleAuthState}
                      handleLoading={this.handleLoading}
                      rootPath="signin"
                      key="signin"
                    /> )}
          />

          <Route
            path="/register"
            exact
            render={props =>
                    ( <Register
                      {...props}
                      handleAuthState={this.handleAuthState}
                      handleLoading={this.handleLoading}
                      rootPath="register"
                      key="register"
                    /> )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
