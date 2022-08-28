var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/dist/phase1/'));
