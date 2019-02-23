import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/elements/Navbar.jsx';
import PrivateRoute from './components/elements/PrivateRoute.jsx';
import Recipes from './components/pages/Recipes.jsx';
import RecipeDetails from './components/pages/RecipeDetails.jsx';
import Register from './components/pages/Register.jsx';
import Login from './components/pages/Login.jsx';
import NewRecipe from './components/pages/NewRecipe.jsx';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isLoggedIn: '',
      userId: '',
      userName: '',
      loading: false,
    };
    this.handleAuthState = this.handleAuthState.bind( this );
    this.handleLoading = this.handleLoading.bind( this );
  }

  componentWillMount() {
    axios.get( '/api/login/check' )
      .then( ( result ) => {
        if ( result.status === 200 ) {
          const isLoggedIn = JSON.parse( localStorage.getItem( 'isLoggedIn' ) );
          const userId = JSON.parse( localStorage.getItem( 'userId' ) );
          const userName = localStorage.getItem( 'userName' );
          this.setState( {
            isLoggedIn,
            userId,
            userName,
          } );
        } else {
          this.setState( {
            isLoggedIn: false,
            userId: '',
            userName: '',
          } );
        }
      } );
  }

  handleAuthState( isLoggedIn, userId, userName ) {
    this.setState( { isLoggedIn, userId, userName } );
    localStorage.setItem( 'isLoggedIn', JSON.stringify( isLoggedIn ) );
    localStorage.setItem( 'userId', JSON.stringify( userId ) );
    localStorage.setItem( 'userName', userName );
  }

  handleLoading() {
    if ( this.state.loading === true ) {
      this.setState( { loading: false } );
    } else {
      this.setState( { loading: true } );
    }
  }

  render() {
    return (
      <div className="content">
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          handleAuthState={this.handleAuthState}
          handleLoading={this.handleLoading}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={props => ( <Recipes
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              rootPath="random"
              key="random"
              cardsPerRow={12 / 3}
              userId={this.state.userId}
            /> )}
          />
          <Route
            path="/recipes"
            exact
            render={props => ( <Recipes
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              rootPath="recipes"
              key="recipes"
              cardsPerRow={12 / 4}
              handleLoading={this.handleLoading}
            /> )}
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
