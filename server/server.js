var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/dist/phase1/'));

app.listen(3000, ()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server is listening at: ' + n + ':' + m);
})