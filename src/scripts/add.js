const path = require('path');
const fs = require('fs-extra');
const config = require('../config');

const componentReg = /\$component/;

function addComponent(name) {
  try {
    const addPath = path.resolve(config.appDir, name);
    const tempPath = path.resolve(__dirname, '../.temp/component');
    if (fs.existsSync(addPath)) {
      console.log(`该目录已经存在${name}文件夹`);
      return;
    }
    let tempIndex = fs.readFileSync(
      path.resolve(tempPath, 'page.jsx.temp'),
      'utf-8',
    );
    if (!tempIndex) {
      console.log('模板文件不存在');
      return;
    }
    tempIndex = tempIndex.replace(componentReg, name);
    fs.mkdirSync(addPath);
    fs.writeFileSync(path.resolve(addPath, 'index.jsx'), tempIndex);
    fs.writeFileSync(path.resolve(addPath, `${name}.scss`), `.${name}_wrapper {}`);
    console.log(`创建${name}组件成功~`);
  } catch (error) {
    console.log(`创建${name}组件失败~`, error);
  }
}

module.exports = { addComponent };
