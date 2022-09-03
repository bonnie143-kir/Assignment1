var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/dist/phase1/'));

app.post('/auth', function(req, res){
    let users = [
        {'username': 'bongii', 'birthdate': '14 Jan', 'age': 23, 'email': 'bongii@outmail.com', 'password': '1234', 'valid': true},
        {'username': 'bonnie', 'birthdate': '14 Jan', 'age': 23, 'email': 'bonnie@outmail.com', 'password': '567', 'valid': true},
        {'username': 'bong', 'birthdate': '14 Jan', 'age': 23, 'email': 'bong@outmail.com', 'password': 'abcd', 'valid': true}
    ]

    var user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    var incorrect = 1;
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