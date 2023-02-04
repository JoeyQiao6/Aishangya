const { createProxyMiddleware } = require('http-proxy-middleware');
// 1.0以下 的版本用下面的方式引入模块
//const proxy = require('http-proxy-middleware');
const url = "http://43.206.189.226:9191/";
const localUrl = "http://localhost:9191/"
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/apis", {
      target: url,
      changeOrigin: true,
      pathRewrite: {
        '^/apis/': '/'
      }
    })
  );
  // //......多个配置
  // app.use(
  //   createProxyMiddleware("/url", {
  //     target: "http://192.168.1.114/",
  //     changeOrigin: true
  //   })
  // );
};
