var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { ok } = require('assert');
const fs = require('fs');
const data = fs.readFile('/users.json', 'utf-8');
const obj = JSON.parse(data);

app.use(express.static(__dirname + '/dist/frontend'));

app.post('/auth', function(req, res){
    usersList = obj.users;
    console.log(usersList);
    
    var user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    
    for (let i=0; i<usersList.length; i++){
        if (req.body.email == usersList[i].email && req.body.password == usersList[i].password){
            usersList[i].valid = true;
            res.send(usersList[i]);
            break;
        }
    }

});

app.listen(3000, ()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server is listening at: ' + n + ':' + m);
})