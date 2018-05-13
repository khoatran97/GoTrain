var express = require('express');


// Dieu huong
var router = express.Router();

// GET
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/destinations', (req, res) => {
    res.render('destinations');
})

router.get('/services', (req, res) => {
    res.render('services');
})

router.get('/login', (req, res) => {
    res.render('login', {layout: false});
})

router.get('/test',(req,res)=>{
	res.render('test');
})

// POST
router.post('/login', (req, res) => {
    console.log(req.body);

    // Check username and pass work
    res.redirect('/admin');
})

module.exports.router = router;

// Xu ly

// Ham xu ly dang nhap
module.exports.login = (username, passwork) => {
    
}