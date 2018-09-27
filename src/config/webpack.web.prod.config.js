'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); 
const commonConifg = require('./webpack.web.common.config');
const utils = require('../scripts/utils');
const config = require('./index');
const ww_config = utils.requireModule(config.ww_config_name);

const { publishPath = '/' } = ww_config || {};

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
    publicPath: publishPath,
  },
};

module.exports = merge(commonConifg, prod);
