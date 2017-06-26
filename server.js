var express = require('express');
var app = express();
var request = require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var commentsArray = [{comment:'This is a comment', commentId:'7777777', likes:1, user:'Dylan', date:"20/6/2017", articleId:'1'},{comment:'This is a comment2', commentId:'55555', likes:1, user:'David', date:"22/6/2017", articleId:'2'},{comment:'Wow, inspiring stuff!', commentId:'457577', likes:2, user:'Larry', date:"22/6/2017", articleId:'3'},{comment:'This is a comment', commentId:'7777777', likes:1, user:'Dylan', date:"20/6/2017", articleId:'4'}];
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
    var filtered = articleData.articles.filter(function ( val ) {
        return val.id === id;
    })[0];
    var filteredComments = commentsArray.filter(function ( val ) {
        return val.articleId === id;
    })[0];
    res.render('pages/detail', { articles: filtered, comments:filteredComments });
});

io.on('connection', function(socket){
    console.log('Hey there!');

    socket.on('insert comments', function(){
        commentsArray.forEach(function(comment){
            socket.emit('place comment', comment);
        });
        socket.emit('place articleComment', commentsArray);
    });

    socket.on('place comment', function(comment){
        commentsArray.push(comment);
        io.emit('place comment', comment);
        io.emit('place articleComment', commentsArray, comment.commentId);
    });

    socket.on('like comment', function(id, article){
        function likes(id) {
            for (var i=0; i < commentsArray.length; i++) {
                if (commentsArray[i].commentId == id) {
                    commentsArray[i].likes++;
                    console.log('new likes = ' + commentsArray[i].likes);
                    return commentsArray[i];
                }
            }
        }
        io.emit('update likes', id, likes(id), article);
        io.emit('place articleComment', commentsArray, id);
    });

    socket.on('disconnect', function(){
        console.log('Bi bi : <');
    });
});

http.listen(1337, function(){
  console.log('listening on 1337');
});
