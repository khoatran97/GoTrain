var express = require('express');
var session = require('express-session');
var staffRepo = require('../repository/staffRepo')

var router = express.Router();

router.use((req, res, next) => {
    if (!req.session.username) {
        res.redirect('/login');
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

// POST: Thêm nhân viên
router.post('/addstaff', (req, res) => {
    console.log(req.body);
    var newStaff = req.body;
    var result = staffRepo.addStaff(newStaff.Hoten, (newStaff.Gioitinh=="Nam")?1:0, newStaff.Ngaysinh, newStaff.CMND, newStaff.Diachi, newStaff.Sdt);
    res.render('admin/addstaff', {layout: 'admin', _result: !result, result: result});
})

module.exports.router = router;