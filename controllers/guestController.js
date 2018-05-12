var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/test',(req,res)=>{
	res.render('test');
})

module.exports = router;