var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { ok } = require('assert');
const fs = require('fs');
// const data = fs.readFile('/users.json', 'utf-8');
// const obj = JSON.parse(data);

app.use(express.static(__dirname + '/dist/frontend'));

app.post('/auth', function(req, res){
    let users = [
        {'username': 'bongii', 'email': 'bongii@outmail.com', 'password': 'abcd','id': '001', 'role': 'super', 'valid': true},
        {'username': 'bongraoi', 'email': 'bongraoi@outmail.com', 'password': 'abcd', 'id': '002', 'role': 'user', 'valid': true},
        {'username': 'bonnie', 'email': 'bonnie@outmail.com', 'password': 'abcd', 'id': '003', 'role': 'groupAd', 'valid': true},
        {'username': 'bongbong', 'email': 'bongbong@outmail.com', 'password': 'abcd', 'id': '004', 'role': 'groupAs', 'valid': true}
    ]

    fs.readFile('users.json', 'utf-8', function(err,data) {
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(uArray);

        var user = {};
        user.email = req.body.email;
        user.password = req.body.password;
        console.log(user);

        for (let i=0; i<uArray.length; i++){
            if (req.body.email == uArray[i].email && req.body.password == uArray[i].password){
                uArray[i].valid = true;
                res.send(uArray[i]);
                break;
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