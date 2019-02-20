const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

module.exports = merge( common, {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/Index.jsx',
  ],
  mode: 'development',
  devtool: 'inline-source-map',

} );
