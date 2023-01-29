const { createProxyMiddleware } = require('http-proxy-middleware');
// 1.0以下 的版本用下面的方式引入模块
//const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/apis", {
      target: "http://43.206.189.226:9191/",
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
