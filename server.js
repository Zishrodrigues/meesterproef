var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();
var http = require('http').Server(app);

var url = process.env.APIURL;

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    // res.render('pages/index');
    load(url, callback);
    function callback(data) {
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

http.listen(1337, function(){
  console.log('listening on 1337');
});
