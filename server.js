var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var url = process.env.APIURL;

var commentsArray = [{comment:'This is a comment', commentId:'7777777', likes:0, articleId:'1'},{comment:'This is a comment2', commentId:'55555', likes:0, articleId:'2'}];
var articleData = require('./articles.json');
// var articleData = JSON.parse('./articles.json');

// var filtered = articleData.articles.filter(function ( val ) {
//     return val.title === title;
// })[0];
// console.log('FILTERED' + filtered);

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    res.render('pages/index', { articles: articleData });
});

app.get('/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    var filtered = articleData.articles.filter(function ( val ) {
        return val.id === id;
    })[0];
    var filteredComments = commentsArray.filter(function ( val ) {
        return val.articleId === id;
    })[0];
    console.log(filteredComments);
    res.render('pages/detail', { articles: filtered, comments:filteredComments });
});

io.on('connection', function(socket){
    console.log('Hey there!');

    socket.on('place comment', function(comment){
        commentsArray.push(comment);
        io.emit('place articleComment', commentsArray);
        io.emit('place comment', comment);
    });

    socket.on('like comment', function(id){
        for (var i=0; i < commentsArray.length; i++) {
            if (commentsArray[i].commentId == id) {
                console.log('found ' + commentsArray[i].commentId);
                commentsArray[i].likes++;
                console.log('new likes = ' + commentsArray[i].likes);
            }
        }
        io.emit('place articleComment', commentsArray);
    });

    socket.on('disconnect', function(){
        console.log('Bi bi : <');
    });
});

http.listen(1337, function(){
  console.log('listening on 1337');
});
