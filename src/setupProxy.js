// 方式一
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  // /api 表示代理路径
  // target 表示目标服务器的地址
  app.use(
    createProxyMiddleware("/api", {
      // http://localhost:8080/ 地址只是示例，实际地址以项目为准
      //   https://api.apiopen.top/getWangYiNews?page=1&count=5
      target: "http://localhost:8080/#/",
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      pathRewrite: {
        "^/api": "" // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      },
      underscores_in_headers: "on"
    })
  );
};

// 方式二
// const { proxy } = require("http-proxy-middleware");
// module.exports = function(app) {
//   app.use(
//     "/api",
//     proxy({
//       target: "http://api.wx.creavidia.com/",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "http://localhost:8080/#/"
//       }
//     })
//   );
// };
