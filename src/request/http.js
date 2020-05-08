/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
// import QS from "qs";
// import router from "../router/index";
// 环境的切换
import { getToken, removeToken } from "../untils/auth";
console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '192.168.1.6:80';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = '';
// }
// https://api-haoke-web.itheima.net/home/swiper
console.log(process.env);

console.log(process.env.REACT_APP_ROOT);
console.log(process.env.NODE_ENV);
axios.defaults.baseURL = "http://localhost:8080/";
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";
// 响应拦截
// axios.interceptors.response.use(
//   response => {
//     // token 已过期，重定向到登录页面
//     if (response.data.msg == "token not avaliable") {
//       sessionStorage.clear();
//       router.replace({
//         path: "/login",
//         query: { redirect: router.currentRoute.fullPath }
//       });
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, headers) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err.data);
      });
  });
}
export function get1(url, params, headers) {
  console.log(url, params, headers);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
// const res = await API.get("/user", {
//   headers: {
//     authorization: getToken(),
//   },
// });
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function DELETE(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  console.log(config, config.url);
  const { url } = config;
  if (
    url.startsWith("/user") &&
    !url.startsWith("/user/login") &&
    !url.startsWith("/user/registered")
  ) {
    // 添加请求头
    config.headers.authorization = getToken();
  }
  return config;
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // console.log(response)
  const { status } = response.data;
  if (status === 400) {
    // 此时，说明 token 失效，直接移除 token 即可
    removeToken();
  }
  return response;
});
