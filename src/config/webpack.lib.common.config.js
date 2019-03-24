const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./index');
const utils = require('../scripts/utils');
const ww_config = utils.requireModule(config.ww_config_name);
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { alias = {}, type = 'mobile', px2rem } = ww_config || {};

for (let key in alias) {
  alias[key] = path.resolve(config.appDir, alias[key]);
}

const plugins = [
  new HappyPack({
    debug: false,
    id: 'js',
    loaders: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-stage-0')],
          plugins: [
            require.resolve('babel-plugin-transform-decorators-legacy'),
            require.resolve('babel-plugin-transform-async-to-generator'),
            require.resolve('babel-plugin-transform-class-properties'),
          ],
        },
      },
    ],
    threadPool: happyThreadPool,
  }),
];
module.exports = {
  entry: [path.resolve(config.appDir, 'index.js')],
  output: {
    pathinfo: false,
    path: path.resolve(config.appDir, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  stats: 'normal',
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.js'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'js',
        },
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
    ],
  },
  plugins: plugins.concat([new ProgressBarPlugin()]),
};
