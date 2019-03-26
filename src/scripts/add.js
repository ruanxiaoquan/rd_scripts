const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const inquirer = require('inquirer');
const colors = require('colors');
const componentReg = /\$c/g;
const classReg = /\$style/g;

const asks = [];

function addComponent(option = {}) {
  const { name, type = 'components', isPrivate = false } = option;
  const pageOrComponetPath = path.resolve(config.appDir, `src/${type}`);
  if (isPrivate && type === 'components') {
    const pagesPath = path.resolve(config.appDir, `src/pages`);
    if (!fs.existsSync(pagesPath)) {
      console.log(`${pagesPath}路径不存在，请先创建`.red);
      return;
    }
    const pagesList = fs.readdirSync(pagesPath).map((item) => {
      return {
        name: `页面：${item}`,
        value: item,
      };
    });
    asks.push({
      type: 'list',
      name: 'pages',
      message: '请选择页面',
      choices: pagesList,
    });
    inquirer
      .prompt(asks)
      .then((res) => {
        const { pages } = res;
        const cpathDir = path.resolve(
          config.appDir,
          `src/pages/${pages}/${type}`,
        );
        if (!fs.existsSync(cpathDir)) fs.mkdirpSync(cpathDir);
        const cpath = path.resolve(
          config.appDir,
          `src/pages/${pages}/${type}`,
          name,
        );
        createComponent(cpath, type, name);
      })
      .catch((err) => {
        console.log(err);
      });
    const pages = path.resolve(config.appDir, `src/pages`);
    if (!fs.existsSync(pages)) console.log(`${pages}路径不存在，请先创建`.red);
    return;
  } else {
    if (!fs.existsSync(pageOrComponetPath)) fs.mkdirpSync(pageOrComponetPath);
    const cpath = path.resolve(config.appDir, `src/${type}`, name);
    createComponent(cpath, type, name);
  }
}

function createComponent(cPath, type, name) {
  try {
    const className = name.toLocaleLowerCase();
    const tempPath = path.resolve(__dirname, '../.temp/component');
    if (fs.existsSync(cPath)) {
      console.log(`${type}目录已经存在${name}文件夹`.red);
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
      console.log('模板文件不存在'.red);
      return;
    }
    tempIndex = tempIndex.replace(componentReg, name);
    tempIndex = tempIndex.replace(classReg, className);
    fs.mkdirSync(cPath);
    fs.writeFileSync(path.resolve(cPath, 'index.jsx'), tempIndex);
    fs.writeFileSync(
      path.resolve(cPath, `${name}.scss`),
      `.${className}-wrapper {}`,
    );
    console.log(`创建[${name}]${type}成功`.green);
  } catch (error) {
    console.log(`创建[${name}]${type}失败`.red, error);
  }
}

module.exports = { addComponent };
