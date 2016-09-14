//==============================================================================
// NightOwl GUI Test Server
//==============================================================================
"use strict";
const HTTP_PORT = 9779;

const express = require('express');
const path = require('path');

function startHttpServer() {
  const app = express();

  app.use('/', express.static(path.join(__dirname, './webapp/')));

  app.listen(HTTP_PORT, function() {
    console.info(`HTTP server listening on port ${HTTP_PORT}...`);
  });
}
console.info("NightOWl GUI Test Server");
startHttpServer();
