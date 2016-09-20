//==============================================================================
// NightOwl GUI Test Server
//==============================================================================
"use strict";
const HTTP_PORT = 9779;

const express = require('express');
const path = require('path');

function launchClient() {
  const exec = require('child_process').exec;
  const cmd = `explorer http://localhost:${HTTP_PORT}`;
  exec(cmd, (error, stdout, stderr) => {

  });
}

function startHttpServer() {
  const app = express();

  app.use('/', express.static(path.join(__dirname, './webapp/')));

  app.listen(HTTP_PORT, function() {
    console.info(`HTTP server listening on port ${HTTP_PORT}...`);
    //launchClient();
  });
}
console.info("NightOWl GUI Test Server");
startHttpServer();
