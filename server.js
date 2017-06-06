var express = require('express');
var app = express();
var request = require('request');
var http = require('http').Server(app);

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    res.render('pages/index');
});

http.listen(1337, function(){
  console.log('listening on 1337');
});
