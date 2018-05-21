var express = require('express');
var session = require('express-session');
var staffRepo = require('../repository/staffRepo')

var router = express.Router();

router.use((req, res, next) => {
    if (!req.session.username) {
        res.redirect('login');
    }
    else {
        next();
    }
})

router.get('/', (req, res) => {
    res.render('admin/index', {
        layout: 'admin'
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('../');
        }
})})


// Quản lý Nhân viên
router.get('/staff', (req, res) => {
    staffRepo.loadAll().then(rows => {
        var param = {
            staffs: rows,
            layout: 'admin'
        }
        res.render('admin/staff', param);
    })
})

router.get('/addstaff', (req, res) => {
    res.render('admin/addstaff', {layout: 'admin'});
})

module.exports.router = router;