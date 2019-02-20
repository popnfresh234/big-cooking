const merge = require( 'webpack-merge' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const path = require( 'path' );
const common = require( './webpack.common.js' );

const DIST = path.resolve( __dirname, './dist' );


module.exports = merge( common, {
  entry: [
    './src/Index.jsx',
  ],
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin( DIST ),
  ],
} );
