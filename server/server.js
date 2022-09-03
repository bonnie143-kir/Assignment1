var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { ok } = require('assert');

app.use(express.static(__dirname + '/dist/frontend'));

app.post('/auth', function(req, res){
    let users = [
        {'username': 'bongii', 'email': 'bongii@outmail.com', 'password': 'abcd','id': '001', 'role': 'super'},
        {'username': 'bongraoi', 'email': 'bongraoi@outmail.com', 'password': 'abcd', 'id': '002', 'role': 'user'},
        {'username': 'bonnie', 'email': 'bonnie@outmail.com', 'password': 'abcd', 'id': '003', 'role': 'groupAd'},
        {'username': 'bongbong', 'email': 'bongbong@outmail.com', 'password': 'abcd', 'id': '004', 'role': 'groupAs'}
    ]

    var user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(user);

    for (let i=0; i<users.length; i++){
        if (req.body.email == users[i].email && req.body.password == users[i].password){
            users[i].valid = true;
            res.send(users[i]);
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