const { createProxyMiddleware } = require('http-proxy-middleware');
// 1.0以下 的版本用下面的方式引入模块
//const proxy = require('http-proxy-middleware');
const url = "http://43.206.189.226:9191/";
const urlCommon = "http://43.206.189.226:8830/";
const urltest = "https://testmerchant.uzenfood.com/";
const urlCommontest = "https://testadmin.uzenfood.com/";
const localUrl = "http://127.0.0.1:9192/"
const localCommonUrl = "http://127.0.0.1:8831/"
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/apis", {
      target: localUrl,
      // target: urltest,
      changeOrigin: true,
      pathRewrite: {
        '^/apis/': '/'
      }
    })
  );
  app.use(
    createProxyMiddleware("/commons", {
      target: localCommonUrl,
      // target: urlCommontest,
      changeOrigin: true,
      pathRewrite: {
        '^/commons/': '/'
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
