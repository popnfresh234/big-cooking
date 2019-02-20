// const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const fileUpload = require( 'express-fileupload' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const cookieSession = require( 'cookie-session' );
const logger = require( 'morgan' );
const indexRouter = require( './routes/index' );
const recipesRouter = require( './routes/recipes' );


const app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( fileUpload() );
app.use( bodyParser.json() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( cookieSession( {
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000,
} ) );

// Catch all route redirects to index.html so react router can take over

app.use( '/api', indexRouter );
app.use( '/api/recipes', recipesRouter );

app.get( '/*', ( req, res ) => {
  console.log( 'HERE' );
  res.sendFile( path.join( __dirname, './public/index.html' ), ( err ) => {
    if ( err ) {
      res.status( 500 ).send( err );
    }
  } );
} );

module.exports = app;
