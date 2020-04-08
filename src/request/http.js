/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
// import router from "../router/index";
// 环境的切换
console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '192.168.1.6:80';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = '';
// }
axios.defaults.baseURL = "/api";
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
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
export function get1(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
