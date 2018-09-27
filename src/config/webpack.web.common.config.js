const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./index');
const utils = require('../scripts/utils');
const ww_config = utils.requireModule(config.ww_config_name);
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const compilePath = path.resolve(config.appDir, 'src');

const { alias = {}, type = 'mobile', px2rem } = ww_config || {};

for (let key in alias) {
  alias[key] = path.resolve(config.appDir, alias[key]);
}

const cssLoaders = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
];
const sassLoaders = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
  require.resolve('sass-loader'),
];

const lessLoaders = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
  require.resolve('less-loader'),
];
if (utils.requireModule('postcss.config.js')) {
  const postCssLoader = require.resolve('postcss-loader');
  cssLoaders.push(postCssLoader);
  lessLoaders.push(postCssLoader);
  sassLoaders.push(postCssLoader);
}

const plugins = [
  new HappyPack({
    debug: true,
    id: 'js',
    loaders: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react'),
          ],
          plugins: [
            require.resolve('babel-plugin-transform-decorators-legacy'),
            require.resolve('babel-plugin-transform-async-to-generator'),
            require.resolve('babel-plugin-transform-class-properties'),
            [
              require.resolve('babel-plugin-import'),
              { libraryName: 'antd-mobile', style: 'css' },
              { libraryName: 'antd', style: 'css' },
            ],
          ],
        },
      },
    ],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    debug: true,
    id: 'css',
    loaders: cssLoaders,
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    debug: true,
    id: 'less',
    loaders: lessLoaders,
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    debug: true,
    id: 'sass',
    loaders: sassLoaders,
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    debug: true,
    id: 'assets',
    loaders: [
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: 8192,
        },
      },
    ],
  }),
  new BundleAnalyzerPlugin(),
];

module.exports = {
  entry: [path.resolve(config.appDir, 'src/index.jsx')],
  output: {
    pathinfo: false,
    path: path.resolve(config.appDir, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  stats: 'errors-only',
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
      {
        test: /\.css/,
        // include: compilePath,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'css',
        },
      },
      {
        test: /\.(scss|sass)$/,
        include: compilePath,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'sass',
        },
      },
      {
        test: /\.less/,
        include: compilePath,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'less',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: compilePath,
        loader: require.resolve('happypack/loader'),
        options: {
          id: 'assets',
        },
      },
    ],
  },
  plugins: plugins.concat([
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    }),
  ]),
};