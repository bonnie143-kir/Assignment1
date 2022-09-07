var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { ok } = require('assert');
const fs = require('fs');
const { application } = require('express');

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

app.post('/setUserPermissions', function(req, res){
    user = req.body.user;
    
});

app.post('/createUser', function(req, res){
    fs.readFile('users.json', 'utf-8', function(err,data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        usersList = uArray.users;

        var user = {};
        user.email = req.body.email;
        user.username = req.body.username;
        console.log(user);
        
        for (let i=0; i<usersList.length; i++){
            if (req.body.email == usersList[i].email && req.body.username == usersList[i].username){
                res.send(err);
            }else{
                obj = {"id": usersList.length, "username": req.body.username, "email": req.body.email, "password": "abcd", "role": "User", "valid": true}
                usersList.push(obj);
                var json = JSON.stringify(uArray, null, 2);
                fs.appendFile('users.json', json, 'utf-8', (err) =>{
                if (err){
                    console.log(err);
                } else {
                    console.log('Done');
                }
                res.send(usersList);
            });
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
