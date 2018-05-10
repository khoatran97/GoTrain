var express = require('express');
var hbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');

var app = express()

app.engine('hbs', hbs({
	defaultLayout: 'main',
	helpers: {
        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000);