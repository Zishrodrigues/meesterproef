var express = require('express');
var app = express();
var request = require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var commentsArray = [{comment:'Good article. I like your writting style! Dont agree with all of it but nice read!', commentId:'7777777', likes:1, user:'Dylan', date:"20/6/2017", articleId:'1'},{comment:'Thanks for writting this. Really enjoyed reading it.', commentId:'7777777', likes:1, user:'Bob Dylan', date:"20/6/2017", articleId:'1'},{comment:'Cool. I agree that we have way too many tools. But I dont think your solution holds up..', commentId:'55555', likes:2, user:'David', date:"22/6/2017", articleId:'1'},{comment:'Made my day! I love drawing and you inspire me. Will try sketchnoting soon :)', commentId:'7777777', likes:2, user:'Sarah', date:"20/6/2017", articleId:'2'},{comment:'Good article. I like your writting style! Dont agree with all of it but nice read!', commentId:'7777777', likes:1, user:'Paul', date:"20/6/2017", articleId:'2'},{comment:'Wow, inspiring stuff!', commentId:'457577', likes:2, user:'Larry', date:"22/6/2017", articleId:'3'},{comment:'Man.. this one hits hard. I didnt come here for these kind of feels! Good read man.', commentId:'457577', likes:2, user:'Brad', date:"24/6/2017", articleId:'3'},{comment:'Haha I cant wait to have my housemaid robot. Lazy for the win. Cool stuff!', commentId:'7777777', likes:5, user:'Jeff', date:"20/6/2017", articleId:'4'}];
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
    });
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
