'use strict';

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConifg = require('./webpack.lib.common.config');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
];

const dev = {
  entry: [require.resolve('webpack-hot-middleware/client')],
  output: {
    publicPath: '/dist/',
  },
  mode: 'development',
  plugins: plugins,
  devtool: 'inline-source-map',
};

module.exports = merge(commonConifg, dev);
