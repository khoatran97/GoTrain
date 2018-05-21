var express = require('express');
var session = require('express-session');
var userRepo = require('../repository/userRepo');
var ticketRepo = require('../repository/ticketRepo');


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

router.get('/giohang',(req,res)=>{

    res.render('giohang');

})


router.get('/destinations', (req, res) => {
    res.render('destinations');
})

router.get('/services', (req, res) => {
    res.render('services');
})

router.get('/login', (req, res) => {
    if (req.session.username) {
        res.redirect('admin');
    }
    else {
        res.render('login', {layout: false});
    }
})

router.get('/test',(req,res)=>{
	res.render('test');
})

router.get('/pick-up',(req,res)=>{
    ticketRepo.loadCarriges(req.query).then(rows => {
        console.log(rows);
        var vm={
            carriges:rows
        }
        res.render('pick-up', vm);
    });
    
})

// POST
router.post('/login', (req, res) => {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var isSuccess = false;
    userRepo.loadByUsername(username).then(rows => {
        console.log(rows);
        if (rows[0] != null) {
            if (rows[0].Password == password) {
                req.session.username = username;
                res.redirect('/admin');
                isSuccess = true;
            }
        }

        if (!isSuccess) {
            var param = {
                layout: false,
                isIncorrect: true
            }
            res.render('login', param);
        }
    });
});

router.post('/test', (req, res) => {
    var date=formatDate(req.body.NgayDi);
    ticketRepo.check(req.body, date).then(rows => {
    	console.log(rows);
    	var vm;
    	if(rows[0]!=null){
    			vm={
	        	valid: true
	        };
    	}
    	else {
    		vm={
	        	invalid: true
	        };
    	}
    	res.render('test', vm);

    }).catch(err => {
        res.end('fail');
    });
});

router.post('/',(req, res)=>{
    var date=formatDate(req.body.NgayDi);
    ticketRepo.lookup(req.body, date).then(rows => {
        if(rows[0]!=null){
            res.render('./pick-up', {trains:rows});
        }
        else {
            var vm={
                invalid: true
            };
            res.render('home', vm);
        }
    })
});

module.exports.router = router;

// Xu ly
// // Hàm format ngày
function formatDate (date){
    var d = new Date(JSON.stringify(date));
    var dd=d.getDate();
    var mm=d.getMonth()+1;
    var yy=d.getFullYear();
    var newdate=yy+"-"+mm+"-"+dd;
    return newdate;
}