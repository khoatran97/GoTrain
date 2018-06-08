var express = require('express');
var hbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var wnumb = require('wnumb');

var guestController = require('./controllers/guestController');
var adminController = require('./controllers/adminController');

var app = express();

app.engine('hbs', hbs({
    defaultLayout: 'main',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n) + ' ₫';
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    key: 'userKey',
    secret: 'GoTrainSession',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

/*app.registerHelper('ifEqual', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.registerHelper('ifGreater', function (v1, v2, options) {
    if (v1 > v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});*/

app.use((req, res, next) => {
    if (!req.session.username) {
        res.clearCookie('userKey');
    }
    next();
});

app.use('/', guestController.router);

app.use('/admin', adminController.router);

app.use('./', guestController.router);

app.listen(3000);