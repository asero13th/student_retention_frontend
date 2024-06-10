const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/predict",
    createProxyMiddleware({
      target: "https://student-retention-prediction.onrender.com",
      changeOrigin: true,
    })
  );
};
