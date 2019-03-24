import { observable, action, computed, runInAction } from 'mobx';

import { net } from '@utils';

class AppStore {
  @observable
  testData = {};

  constructor() {}

  @action('获取bug信息')
  getBugs = async () => {
    const res = await net.get('/api/bugs');
    return res;
  };
}

export default new AppStore();
