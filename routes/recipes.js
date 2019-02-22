const ENV = process.env.ENV || 'development';

const express = require( 'express' );
const verifyUser = require( './utils.js' );
const knexConfig = require( '../knexfile' );
const knex = require( 'knex' )( knexConfig[ENV] );
const aws = require( 'aws-sdk' );


const router = express.Router();


function getIgredientsForDb( ingredients, recipeId, userId ) {
  return ingredients.map( ingredient => (
    {
      name: ingredient.name,
      quantity: ingredient.quantity,
      units: ingredient.units,
      recipe_id: recipeId,
      user_id: userId,
    } ) );
}

function getDirectionsForDb( directions, recipeId ) {
  return directions.map( direction => (
    {
      description: direction.description,
      recipe_id: recipeId,
    } ) );
}

function getBaseRecipe( req, recipe, fileName ) {
  const image_url = fileName
    ? `https://s3-us-west-2.amazonaws.com/big-cooking-recipe-images/${fileName}`
    : recipe.image_url;
  return {
    name: recipe.name,
    author: recipe.author,
    category: recipe.category,
    description: recipe.description,
    image_url,
    duration: recipe.duration,
    note: recipe.note,
    user_id: req.session.id,
  };
}

function insertRecipe( req, res ) {
  const recipe = JSON.parse( req.body.recipe );
  const fileName = req.files ? req.files.file.name : '';
  let recipeId;
  const { ingredients, directions } = recipe;
  const recipeBase = getBaseRecipe( req, recipe, fileName );
  knex( 'recipes' )
    .returning( 'id' )
    .insert( recipeBase )
    .then( ( recipeIds ) => {
      // Insert ingredients
      [recipeId] = recipeIds;
      return knex( 'ingredients' )
        .insert( getIgredientsForDb( ingredients, recipeId, req.session.id ) );
    } )
    .then( () => knex( 'directions' )
      .insert( getDirectionsForDb( directions, recipeId ) ) )
    .then( () => {
      res.status( 200 ).send( 'Succesful insert' );
    } )
    .catch( ( err ) => {
      console.log( err );
      knex( 'recipes' )
        .where( 'id', recipeId )
        .del()
        .then( () => {
          res.status( 400 ).send( 'Bad insert' );
        } );
    } );
}

function updateRecipe( req, res ) {
  const recipe = JSON.parse( req.body.recipe );
  const fileName = req.files ? req.files.file.name : '';
  const { ingredients, directions } = recipe;
  const recipeBase = getBaseRecipe( req, recipe, fileName );
  knex( 'recipes' )
    .where( 'id', req.params.recipe_id )
    .update( recipeBase )
    .then( () => knex( 'ingredients' )
      .where( 'recipe_id', req.params.recipe_id )
      .del() )
    .then( () => knex( 'ingredients' )
      .insert( getIgredientsForDb( ingredients, req.params.recipe_id, req.session.id[0] ) ) )
    .then( () => knex( 'directions' )
      .where( 'recipe_id', req.params.recipe_id )
      .del() )
    .then( () => knex( 'directions' )
      .insert( getDirectionsForDb( directions, req.params.recipe_id ) ) )
    .then( () => {
      res.status( 200 ).send( 'Update successful' );
    } )
    .catch( ( err ) => {
      console.log( err );
      res.status( 400 ).send( 'Update failed' );
    } );
}

function handleRecipe( req, res, fn ) {
  if ( req.files ) {
    aws.config.update( { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET, region: 'us-west-2' } );
    const s3 = new aws.S3();
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: req.files.file.name,
      Body: req.files.file.data,
    };
    s3.putObject( params, ( err, data ) => {
      if ( err ) {
        console.log( err );
      } else {
        fn( req, res );
      }
    } );
  } else {
    fn( req, res );
  }
}

//* ********************************************
//* ** GET /api/recipes' ***
//* ** Get all recipes
//* ********************************************

router.get( '/', ( req, res, next ) => {
  knex.select()
    .from( 'recipes' )
    .then( ( result ) => {
      if ( result.length ) {
        res.status( 200 ).json( result );
      } else {
        res.status( 204 ).send( 'No results' );
      }
    } );
} );

//* ********************************************
//* ** GET /api/recipes/random' ***
//* ** Get all recipes
//* ********************************************

router.get( '/random', ( req, res, next ) => {
  knex.select()
    .from( 'recipes' )
    .orderByRaw( 'RANDOM()' )
    .limit( 3 )
    .then( ( results ) => {
      if ( results.length ) {
        res.status( 200 ).json( results );
      } else {
        res.status( 204 ).send( 'No results' );
      }
    } )
    .catch( ( err ) => {
      res.status( 400 ).send( 'Bad Request' );
    } );
} );

//* ********************************************
//* ** GET /api/recipes/search ***
//* ** Favorite or Unfavorite a recipe
//* ********************************************

router.get( '/search', ( req, res, next ) => {
  console.log( req.query.q );
  const query = req.query.q;
  knex.select()
    .from( 'recipes' )
    .where( 'name', 'ilike', `%${query}%` )
    .orWhere( 'description', 'ilike', `%${query}%` )
    .then( ( results ) => {
      res.send( results );
    } )
    .catch( ( err ) => {
      console.log( err );
      res.status( 400 ).send( 'Bad Request' );
    } );
} );

//* ********************************************
//* ** GET /api/recipes/:recipe_id' ***
//* ** Get a specific recipe
//* ********************************************

router.get( '/:recipe_id', ( req, res, next ) => {
  let recipe = null;
  knex.select()
    .from( 'recipes' )
    .where( 'id', req.params.recipe_id )
    .then( ( result ) => {
      recipe = result[0];
      return knex.select( 'id', 'name', 'quantity', 'units' )
        .from( 'ingredients' )
        .where( 'recipe_id', recipe.id );
    } )
    .then( ( ingredientsResults ) => {
      recipe.ingredients = ingredientsResults;
      return knex.select( 'id', 'description' )
        .from( 'directions' )
        .where( 'recipe_id', recipe.id );
    } )
    .then( ( directionsResults ) => {
      recipe.directions = directionsResults;
      res.status( 200 ).json( recipe );
    } )
    .catch( ( err ) => {
      console.log( err );
      res.status( 400 ).send( 'OOPS' );
    } );
} );

//* ********************************************
//* ** POST /api/recipes' ***
//* ** Create a new recipe
//* ********************************************

router.post( '/', verifyUser, ( req, res, next ) => {
  handleRecipe( req, res, insertRecipe );
} );

//* ********************************************
//* ** DELETE /api/recipes/:recipe_id' ***
//* ** Delete a specific recipe
//* ********************************************

router.delete( '/:recipe_id', verifyUser, ( req, res, next ) => {
  knex( 'recipes' )
    .where( 'id', req.params.recipe_id )
    .del()
    .then( () => {
      res.status( 200 ).send( 'Recipe deleted' );
    } )
    .catch( ( err ) => {
      console.log( err );
      res.stauts( 400 ).send( 'Delete failed' );
    } );
} );

//* ********************************************
//* ** PUT /api/recipes/:recipe_id' ***
//* ** Update a specific recipe
//* ********************************************

router.put( '/:recipe_id', verifyUser, ( req, res, next ) => {
  handleRecipe( req, res, updateRecipe );
} );


//* ********************************************
//* ** PUT /api/favorite/:user_id/ ***
//* ** Favorite or Unfavorite a recipe
//* ********************************************

router.put( '/favorite/:recipe_id', verifyUser, ( req, res, next ) => {
  // Query db to see if recipe already favoritd
  knex.select()
    .from( 'favorites' )
    .where( 'recipe_id', req.params.recipe_id )
    .then( ( results ) => {
      if ( results.length ) {
        knex( 'favorites' )
          .where( 'recipe_id', req.params.recipe_id )
          .del()
          .then( () => {
            res.status( 200 ).send( 'Unfavorited' );
          } );
      } else {
        knex( 'favorites' )
          .insert( { user_id: req.session.id[0], recipe_id: req.params.recipe_id } )
          .then( () => {
            res.status( 200 ).send( 'Favorited' );
          } );
      }
    } )
    .catch( ( err ) => {
      console.log( err );
      res.status( 400 ).send( 'Bad favorite' );
    } );
} );

module.exports = router;

