var express = require('express');
var app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
var Mongo = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/';

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
const io = require('socket.io')(http,{
    cors: { 
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const sockets = require('./socket.js');
const server = require('./listen.js');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();    
});

const PORT = 3000;
app.use(cors());
sockets.connect(io, PORT);
server.listen(http,PORT);
const { ok } = require('assert');
const fs = require('fs');

//Initialise some users
Mongo.connect(url, function(err,client){
    if (err) throw err;
    let db = client.db("chatDB"); //create a chat
    let obj = [
        {"username": "Bongii", "email": "bongii@outmail.com", "password": "bongii", "role": "user"},
        {"username": "Admin", "email": "admin@outmail.com", "password": "admin", "role": "super"},
        {"username": "Tom", "email": "tom@outmail.com", "password": "tom", "role": "groupAd"},
        {"username": "Mary", "email": "mary@outmail.com", "password": "mary", "role": "groupAs"}
    ]
    db.collection("users").insertMany(obj, function(err,res){
        if (err) throw err;
        console.log("Number of docs inserted: " + res.insertedCount);
    })
});


//app.use(express.static(__dirname + '/dist/frontend'));

app.post('/auth', function(req, res){
    let user = req.body;
    //console.log(user);
    Mongo.connect(url, function(err,client){
        if (err) throw err;
        let db = client.db("chatDB"); //create a chat
        db.collection("users").find({}).toArray().then(function(docs){
            docs.forEach(doc => {
                if (doc.email == req.body.email){
                    if (doc.password == req.body.password){
                        res.send(doc);
                        console.log("Success");
                    }else{
                        console.log("Failed, wrong credentials, try again");
                        res.send("fail");
                    }
                }else {
                    //
                }
            });
        });
    });

    // Using json instead of mongo
    // fs.readFile('users.json', 'utf-8', function(err,data) {
    //     if (err) throw err;
    //     uArray = JSON.parse(data);
    //     usersList = uArray.users;

    //     var user = {};
    //     user.email = req.body.email;
    //     console.log(user);
    
    //     for (let i=0; i<usersList.length; i++){
    //         if (req.body.email == usersList[i].email){
    //             console.log(usersList[i]);
    //             res.send(usersList[i]);   
    //         }
    //     }
    // });   
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
        fs.readFile('users.json', 'utf-8', function(err,data){
            if (err) throw err;
            uArray = JSON.parse(data);
            for (i=0; i<gArray.groups.length; i++){
                if (gArray[i].groupName == gName){
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
            }
        });
    });

});
