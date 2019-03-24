import load from '../router/bundle';

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/index',
    page: load.pageFactory(require('bundle-loader?lazy!../pages/Index')),
  },
  {
    name: '测试页面',
    icon: 'setting',
    path: '/test',
    page: load.pageFactory(require('bundle-loader?lazy!../pages/Test')),
  },
];
