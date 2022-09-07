var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { ok } = require('assert');
const fs = require('fs');

app.use(express.static(__dirname + '/dist/frontend'));

app.post('/auth', function(req, res){
    fs.readFile('users.json', 'utf-8', function(err,data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        usersList = uArray.users;

        var user = {};
        user.email = req.body.email;
        console.log(user);
    
        for (let i=0; i<usersList.length; i++){
            if (req.body.email == usersList[i].email){
                console.log(usersList[i]);
                res.send(usersList[i]);   
            }
        }
    });   
});

app.post('/createUser', function(req, res){
    fs.readFile('users.json', 'utf-8', function(err,data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        usersList = uArray.users;

        var user = {};
        user.email = req.body.email;
        user.password = req.body.username;
        console.log(user);
        emails = [];
        usernames = [];

        for (let i=0; i<usersList.length; i++){
            emails.push(usersList[i].email);
            usernames.push(usersList[i].username);
        }
        
        for (let i=0; i<emails.length; i++){
            if (req.body.email == emails[i] && req.body.username == usernames[i]){
                res.send(err);
            }else{
                res.send({"value":"Added"});
            }
        }
    });   
});

app.listen(3000, ()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server is listening at: ' + n + ':' + m);
})
