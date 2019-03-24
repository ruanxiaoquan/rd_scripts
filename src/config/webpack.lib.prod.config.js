'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConifg = require('../config/webpack.lib.common.config');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
];

const prod = {
  mode: 'production',
  plugins: plugins,
  stats: 'verbose',
  output: {
    publicPath: '/dist/',
  },
};

module.exports = merge(commonConifg, prod);
