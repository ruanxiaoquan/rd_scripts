const dependencies = {
  react: '^16.4.1',
  'react-dom': '^16.4.1',
  'react-router-dom': '^4.3.1',
};
const devDependencies = {
  autoprefixer: '^9.1.5',
};

const pcDev = {
  autoprefixer: '^9.2.1',
  'babel-plugin-import': '^1.9.1',
  'babel-plugin-transform-runtime': '^6.23.0',
  'babel-preset-env': '^1.7.0',
};

const pc = {
  dependencies: {
    ...dependencies,
    antd: '^3.9.2',
    'bundle-loader': '^0.5.6',
    axios: '^0.18.0',
    mobx: '^5.5.1',
    'mobx-react': '^5.3.4',
  },
  devDependencies: pcDev,
};

const moblie = {
  dependencies: {
    ...dependencies,
    'antd-mobile': '^2.2.5',
  },
  devDependencies: {
    ...devDependencies,
  },
};

const library = {
  dependencies: {},
  devDependencies: {},
};

module.exports = {
  moblie,
  pc,
  library,
};
