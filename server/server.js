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
    db.collection("users").drop();
    db.collection("users").insertMany(obj, function(err,res){
        if (err) throw err;
        console.log("Number of docs inserted: " + res.insertedCount);
    })

    let grpObj = [
        {"groupName": "Chemistry", "creator": "Admin", "members": [
            {"username": "Tom", "email": "tom@outmail.com"},
            {"username": "Mary", "email": "mary@outmail.com"}
        ]},
        {"groupName": "Maths", "creator": "Tom", "members": [
            {"username": "Bongii", "email": "bongii@outmail.com"},
            {"username": "Mary", "email": "mary@outmail.com"}
        ]},
        {"groupName": "Science", "creator": "Admin", "members": [
            {"username": "Tom", "email": "tom@outmail.com"},
            {"username": "Mary", "email": "mary@outmail.com"}
        ]}
    ]
    db.collection("groups").drop();
    db.collection("groups").insertMany(grpObj, function(err, res){
        if (err) throw err;
        console.log("Added");
    })

    let grpChObj = [
        {"groupName": "Chemistry", "channelName": "Chem101"},
        {"groupName": "Chemistry", "channelName": "Chem102"},
        {"groupName": "Chemistry", "channelName": "Chem103"},
        {"groupName": "Maths", "channelName": "Maths1"},
        {"groupName": "Maths", "channelName": "Maths2"},
        {"groupName": "Maths", "channelName": "Maths3"}
    ]
    db.collection("channels").drop();
    db.collection("channels").insertMany(grpChObj, function(err, res){
        if (err) throw err;
        console.log("Added");
    })
});

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
                        console.log("Success");
                        res.send(doc);
                    }else{
                        res.send("Fail")
                        console.log("Failed, wrong credentials, try again");
                    }
                }else {
                    //
                }
            });
        });
    });
});

app.post('/deleteUser', function(req, res){
    let idd = req.body.userid;
    Mongo.connect(url, function(err, client){
        if(err) throw err;
        db.collection("users").deleteOne(idd, function(err,obj){
            if (err) throw err;
            console.log("delete success");
        });
    })
});

app.post('/createUser', function(req, res){
    //using Mongo
    let user = req.body;
    console.log(user);
    Mongo.connect(url, function(err,client){
        if (err) throw err;
        let db = client.db("chatDB"); //create a chat
        var obj = {username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role};
        var arrr = {};
        db.collection("users").insertOne(obj, function(err, result){
            console.log("Created user");
           // res.send("Added");
        });
        res.send("Added");
    });
});

// app.post('/createGroup', function(req, res){
//     let user = req.body
//     Mongo.connect(url, function(err,client){
//         if (err) throw err;
//         let db = client.db("chatDB"); //create a chat
//         var obj = {groupName: user.groupName}
//         var arrr = {};
//         db.collection("users").insertOne(obj, function(err, result){
//             console.log("Created user");
//             res.send("Added");
//         });
//     });
// });

// app.post('/add/user', function(req, res){
//     let gName = req.body.groupName;
//     let uName = req.body.username;
       
    
    

// });
