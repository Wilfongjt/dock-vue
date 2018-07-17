// Simple server to serve static website content
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();

const port = 8080;
app.use(serveStatic(__dirname + "/dist"));

app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});
