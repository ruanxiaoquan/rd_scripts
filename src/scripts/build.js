const webpack = require('webpack');
const rimraf = require('rimraf');
const prodCfg = require('../config/webpack.web.prod.config');
const prodLibCfg = require('../config/webpack.lib.prod.config');
const config = require('../config');
const utils = require('./utils');
const ww_config = utils.requireModule(config.ww_config_name);

function build(cb) {
  const cfg = ww_config.type === 'library' ? prodLibCfg : prodCfg;
  rimraf(cfg.output.path, (err) => {
    if (err) {
      console.log('==========清除目录失败==========');
    } else {
      console.log('==========清除目录成功，启动编译任务==========');
      webpack(cfg, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            'webpack打包错误',
            stats.toString({
              chunks: true, // 使构建过程更静默无输出
              colors: true, // 在控制台展示颜色
            }),
          );
          cb && cb(err);
        } else {
          console.log('==========编译成功==========');
          cb && cb(null);
        }
      });
    }
  });
}
module.exports = { build };
