const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './public/index.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
        },
      },


    ],
  },

};