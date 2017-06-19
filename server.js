var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var url = process.env.APIURL;
var commentsArray = [];

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    load(url, callback);
    function callback(data) {
        console.log(data);
        res.render('pages/index', { articles: data });
  }
});

app.get('/:title', function(req, res) {
    var title = req.params.title;
    // request(detailUrl + req.params.Id, function (error, response, body) {
    //     var data = JSON.parse(body);
    //     res.render('pages/detail', {properties: data});
    // });
    load(url, callback);
    function callback(data) {
        var filtered = data.articles.filter(function ( val ) {
            return val.title === title;
        })[0];
        res.render('pages/detail', { articles: filtered });
    }
});

function load(url, callback) {
  request(url, function(err, res, body) {
    if (err) console.warn(err);
    callback(JSON.parse(body));
  });
}

io.on('connection', function(socket){
    console.log('Hey there!');

    socket.on('place comment', function(comment){
        commentsArray.push(comment);
        io.emit('place articleComment', commentsArray);
        io.emit('place comment', comment);
    });

    socket.on('disconnect', function(){
        console.log('Bi bi : <');
    });
});

http.listen(1337, function(){
  console.log('listening on 1337');
});
