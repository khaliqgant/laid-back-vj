'use strict';

const webpack = require('webpack');
const path = require('path');

const fe = 'public/js';

module.exports = {
  entry: `./${fe}/app`,

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, `${fe}/dist`),

    filename: 'app.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/,
      minimize: true,
    }),
  ],
};
