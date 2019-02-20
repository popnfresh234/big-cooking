const webpack = require( 'webpack' );
const WebpackDevServer = require( 'webpack-dev-server' );
const config = require( './webpack.dev' );

const PORT = 3000;

new WebpackDevServer( webpack( config ), {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
    },
  },
} )
  .listen( PORT, '0.0.0.0', ( err, result ) => {
    if ( err ) {
      console.log( err, result );
    }

    console.log( `Running at http://0.0.0.0:${PORT}` );
  } );
