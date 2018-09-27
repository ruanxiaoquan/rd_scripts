const description = {
  react: '^16.4.1',
  'react-dom': '^16.4.1',
  'react-router-dom': '^4.3.1',
};
const devDescription = {};

const pc = {
  ...description,
  antd: '^3.9.2',
};
const pcDev = {};

const moblie = {
  ...description,
  'antd-mobile': '^2.2.5',
};
const moblieDev = {};

module.exports = {
  moblie,
  pc,
};
