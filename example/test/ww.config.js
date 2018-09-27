module.exports = {
  projectName: 'test',
  type: 'mobile',
  alias: {
    '@components': './src/components',
  },
  publishPath: 'http://cdn.dev.elys.cn',
  devServer: {
    host: '127.0.0.1',
    port: 8888,
    api: 'http://dev.elys.cn:7001',
  },
};
