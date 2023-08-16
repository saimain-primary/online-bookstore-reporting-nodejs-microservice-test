const expressApp = require("./express-app");
const express = require("express");

function createServer() {
  const app = express();
  expressApp(app);

  return app;
}

module.exports = createServer;
