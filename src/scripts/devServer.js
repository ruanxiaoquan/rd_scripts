'use strict';

const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs-extra');
const open = require('open');
const queryString = require('querystring');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackCfg = require('../config/webpack.web.dev.config');
const libWebpackCfg = require('../config/webpack.lib.dev.config');
const config = require('../config');
const utils = require('./utils');
const ww_config = utils.requireModule(config.ww_config_name);

class DevServer {
  constructor(options = {}) {
    this.app = null;
    this.compiler = {};
    const { type } = ww_config || {};
    this.webpackCfg = type === 'library' ? libWebpackCfg : webpackCfg;
    this.createServer();
  }

  run() {
    const { devServer = {} } = ww_config || {};
    const { host = '127.0.0.1', port = 8888 } = devServer;
    console.log('开发服务启动中...');
    this.app.listen(port, host, (err) => {
      if (err) {
        console.log('启动服务器失败', err);
        return;
      }
      console.log(`成功开启开发服务器:http://${host}:${port}`);
      open(`http://${host}:${port}`);
    });
  }

  createServer() {
    const { devServer = {} } = ww_config || {};
    // const updateCfg = utils.requireModule('webpack.dev.update.config.js');
    this.compiler = webpack(this.webpackCfg);
    this.app = express();
    this.app.engine('.html', require('ejs').__express);
    this.app.set('view engine', 'html');
    this.app.use(morgan('dev'));
    this.app.use(express.static('static'));
    this.app.use(
      webpackDevMiddleware(this.compiler, {
        publicPath: webpackCfg.output.publicPath,
        hot: true,
        stats: {
          colors: true,
          modules: false,
          chunks: false,
          children: false,
        },
      }),
    );
    this.app.use(webpackHotMiddleware(this.compiler));
    this.app.use(bodyParser.json()); // for parsing application/json
    this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    this.app.all('/api/*', (req, res) => {
      const method = req.method.toLocaleUpperCase();
      let params = req.query;
      const { api = '', timeout = 5000 } = devServer;
      let url = '';
      if (api.indexOf('http') > -1 || api.indexOf('https') > -1) {
        url =
          api.substring(api.length - 1) === '/'
            ? api.substring(0, api.length - 1)
            : api;
      } else {
        url = `http://${api}`;
      }
      url += `${req.path}`;
      let reqHeaders = {};
      if (req.headers.cookie) {
        reqHeaders['Cookie'] = req.headers.cookie;
      }

      const reqOps = {
        url,
        method,
        headers: reqHeaders,
        params: params || {},
        timeout: timeout,
        withCredentials: true,
      };

      if (method === 'POST') {
        reqOps.data = Object.assign({}, params, req.body);
      }

      axios
        .request(reqOps)
        .then((result) => {
          const resCookie = result.headers['set-cookie'];
          if (resCookie) {
            res.setHeader('set-cookie', resCookie.join(';'));
          }
          return res.send(result.data);
        })
        .catch((err) => {
          const { status, statusText, headers = {} } = err.response || {};
          return res.send({ statusText, status, headers });
        });
    });

    this.app.get('*', (req, res) => {
      const viewPath = path.resolve(config.appDir, 'public', 'index.html');
      return res.sendFile(viewPath);
    });
  }
}

function requireModule(path) {
  const exist = fs.existsSync(path);
  if (exist) return require(path);
  return {};
}

module.exports = DevServer;
