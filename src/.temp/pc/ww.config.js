module.exports = {
  projectName: 'test',
  type: 'mobile',
  alias: {
    '@components': './src/components',
    '@utils': './src/utils',
  },
  // publishPath: 'http://cdn.dev.elys.cn',
  devServer: {
    host: '127.0.0.1',
    port: 8888,
    api: 'http://127.0.0.1:7001',
  },
};
