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
    console.log(url);
    load(url, callback);
    function callback(data) {
      res.render('pages/index', { articles: data });
      console.log(data);
  }
});

app.get('/detail', function (req, res) {
    res.render('pages/detail');
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
