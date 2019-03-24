const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const zip = require('zip-local');
const shortid = require('shortid');
const config = require('../config');

const tools = require('./build');

function publish(env = 'dev') {
  console.log('发布环境：' + env);
  tools.build((err) => {
    if (!err) {
      zipDir();
    }
  });
}

function zipDir() {
  console.log('==========开始压缩文件==========');
  try {
    const distPath = path.resolve(config.appDir, './dist');
    const savePath = path.resolve(distPath, `${shortid()}.zip`);
    zip.sync
      .zip(distPath)
      .compress()
      .save(savePath);
    console.log('==========文件压缩成功==========');
  } catch (error) {
    console.log('[文件压缩失败]', error);
  }
}

module.exports = {
  publish,
};
