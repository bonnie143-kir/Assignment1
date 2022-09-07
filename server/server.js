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
const { PassThrough } = require('stream');

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

app.post('/deleteUser', function(req, res){
    let idd = req.body.userid;
    fs.readFile('users.json', 'utf-8', function(err,data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        usersList = uArray.users;
    
        for (let i=0; i<usersList.length; i++){
            if (idd == usersList[i].id){
                usersList = usersList.filter(function(returnableObjects){
                    return returnableObjects.id !== idd;
                });                
                usersList = JSON.stringify(usersList);
                fs.writeFile('users.json', usersList, 'utf-8', (err) =>{
                    if (err){
                        console.log(err);
                    } else {
                        console.log('Done');
                    } 
                });
                res.send(usersList);
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
        user.username = req.body.username;
        console.log(user);
        
        for (let i=0; i<usersList.length; i++){
            if (req.body.email == usersList[i].email && req.body.username == usersList[i].username){
                res.send({"value":"Exists"});
                break;
            }else if (req.body.email != usersList[i].email && req.body.username != usersList[i].username && i >= usersList.length){
                continue;
            } else{
                obj = {"id": usersList.length, "username": req.body.username, "email": req.body.email, "password": "abcd", "role": "normalUser", "valid": true}
                usersList.push(obj);
                var json = JSON.stringify(uArray);
                fs.writeFileSync('users.json', json, 'utf-8', (err) =>{
                    if (err){
                        console.log(err);
                    } else {
                        console.log('Done');
                    } 
                });
                res.send({"value":"Added"});
                break;
            }
        }
    });   
});

app.post('/createGroup', function(req, res){
    fs.readFile('groups.json', 'utf-8', function(err,data) {
        if (err) throw err;
        gArray = JSON.parse(data);
        let name = req.body.groupName;
        obj = {"groupName": name, "members":{"users": []}, "channels": []}
        gArray.groups.push(obj);
        var json = JSON.stringify(gArray);
        res.send({"value":"Created"});
        fs.writeFileSync('groups.json', json, 'utf-8', (err) =>{
            res.send({"value":"Created"});
            if (err){
                console.log(err);
                res.send({"value":"Created"});
            }else{
                console.log('Done');
            } 
        });
    });   
});

app.post('/add/user', function(req, res){
    let gName = req.body.groupName;
    let uName = req.body.username;
        
    fs.readFile('groups.json', 'utf-8', function(err,data){
        if (err) throw err;
        gArray = JSON.parse(data);
        return gArray; 
    });

    fs.readFile('users.json', 'utf-8', function(err,data){
        if (err) throw err;
        uArray = JSON.parse(data);
        return uArray;
    });

    if (gArray.groupName == gName){
        users = uArray.users
        for (i=0; i<users.length; i++){
            if (uName == users[i].username){
                obj = {"id": users[i].id, "username":users[i].username, "email": users[i].email, "role": users[i].role}
                gArray.groupName.members.users.push(obj);
                var json = JSON.stringify(gArray);
                fs.writeFileSync('groups.json', json, 'utf-8', (err) =>{
                    if (err){
                        console.log(err);
                    }else{
                        console.log('Done');
                    }
                    res.send({"value":"Created"});
                });
            }
        }
        
    } else{
        res.send({"value":"Doesn't exist"})
    }    
});


app.listen(3000, ()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server is listening at: ' + n + ':' + m);
})
