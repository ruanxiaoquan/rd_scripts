import axios from 'axios';

const instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * 网络请求
 * @param {*} api
 * @param {*} params
 */
function request(options = {}, params = {}) {
  const { type = 'GET', api } = options;
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'POST':
        instance
          .post(api, params || {})
          .then((data) => {
            console.log(`【${api}】的响应`, data.data);
            requestHandle(data, () => resolve(data.data));
          })
          .catch((err) => {
            console.log(`【${api}】发生错误`, err);
            resolve({
              status_code: 40000,
              message: '链接超时',
            });
          });
        break;
      default:
        instance
          .get(api, params || {})
          .then((data) => {
            console.log(`【${api}】的响应`, data.data);
            requestHandle(data, () => resolve(data.data));
          })
          .catch((err) => {
            console.log(`【${api}】发生错误`, err);
            resolve({
              status_code: 40000,
              message: '链接超时',
            });
          });
        break;
    }
  });
}

function requestHandle(res, cb) {
  const { data, status, code, status_code } = res.data;
  let redirectUrl = encodeURIComponent(window.location.href);
  if (status === 401 || code === 16000) {
    window.location.replace(`/login?redirectUrl=${redirectUrl}`);
  } else {
    cb && cb();
  }
}

export const net = {
  get: (api, params) => {
    return request({ api }, params);
  },
  post: (api, params) => {
    return request({ api, type: 'POST' }, params);
  },
};
