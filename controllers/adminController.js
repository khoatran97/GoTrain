var express = require('express');

var staffRepo = require('../repository/staffRepo')

var router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index', {
        layout: 'admin'
    });
})

router.get('/logout', (req, res) => {
    res.redirect('../')
})


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

module.exports.router = router;