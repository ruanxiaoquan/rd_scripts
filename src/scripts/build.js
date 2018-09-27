const webpack = require('webpack');
const rimraf = require('rimraf');
const prodCfg = require('../config/webpack.web.prod.config');

function build() {
  rimraf(prodCfg.output.path, (err) => {
    if (err) {
      console.log('清除目录失败');
    } else {
      console.log('清除目录成功，启动编译任务。。。');
      webpack(prodCfg, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            'webpack打包错误',
            stats.toString({
              chunks: true, // 使构建过程更静默无输出
              colors: true, // 在控制台展示颜色
            }),
          );
        } else {
          console.log('编译成功~');
        }
      });
    }
  });
}
module.exports = { build };
