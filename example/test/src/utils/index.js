import axios from 'axios';
axios.defaults.withCredentials = true;
/**
 * 网络请求
 * @param {*} api
 * @param {*} params
 */
function request(options = {}, params) {
  const { type = 'GET', api } = options;
  let instance = axios.create({
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'POST':
        instance
          .post(api, params || {})
          .then((data) => {
            console.log(`【${api}】的响应`, data.data);
            resolve(data.data);
          })
          .catch((err) => {
            console.log(`【${api}】发生错误`, err);
          });
        break;
      default:
        instance
          .get(api, params || {})
          .then((data) => {
            console.log(`【${api}】的响应`, data.data);
            resolve(data.data);
          })
          .catch((err) => {
            console.log(`【${api}】发生错误`, err);
          });
        break;
    }
  });
}

export const net = {
  get: (api, params) => {
    return request({ api }, params);
  },
  post: (api, params) => {
    return request({ api, type: 'POST' }, params);
  },
};
