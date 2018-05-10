var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');

var app = express()

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000);