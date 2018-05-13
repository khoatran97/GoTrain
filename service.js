var express = require('express');
var hbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');

var guestController = require('./controllers/guestController');
var adminController = require('./controllers/adminController');

var app = express();

app.engine('hbs', hbs({
	defaultLayout: 'main',
	helpers: {
        section: express_handlebars_sections()
    }
}));

app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', guestController.router);

app.use('/admin', adminController);

app.listen(3000);