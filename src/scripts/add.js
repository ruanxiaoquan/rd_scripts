const path = require('path');
const fs = require('fs-extra');
const config = require('../config');

const componentReg = /\$c/g;
const classReg = /\$style/g;

function addComponent(option = {}) {
  try {
    const { name, type } = option;
    const className = name.toLocaleLowerCase();
    const addPath = path.resolve(config.appDir, `src/${type}`, name);
    const tempPath = path.resolve(__dirname, '../.temp/component');
    if (fs.existsSync(addPath)) {
      console.log(`${type}目录已经存在${name}文件夹`);
      return;
    }
    let tempIndex;
    if (type === 'pages') {
      tempIndex = fs.readFileSync(
        path.resolve(tempPath, 'page.jsx.temp'),
        'utf-8',
      );
    } else {
      tempIndex = fs.readFileSync(
        path.resolve(tempPath, 'conponent.jsx.temp'),
        'utf-8',
      );
    }
    if (!tempIndex) {
      console.log('模板文件不存在');
      return;
    }
    tempIndex = tempIndex.replace(componentReg, name);
    tempIndex = tempIndex.replace(classReg, className);
    fs.mkdirSync(addPath);
    fs.writeFileSync(path.resolve(addPath, 'index.jsx'), tempIndex);
    fs.writeFileSync(
      path.resolve(addPath, `${name}.scss`),
      `.${className}_wrapper {}`,
    );
    console.log(`创建${name}组件成功~`);
  } catch (error) {
    console.log(`创建${name}组件失败~`, error);
  }
}

module.exports = { addComponent };
