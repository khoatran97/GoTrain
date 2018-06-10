var express = require('express');
var session = require('express-session');
var staffRepo = require('../repository/staffRepo')
var stationRepo = require('../repository/stationRepo')
var ticketRepo = require('../repository/ticketRepo')

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
        layout: 'admin',
        search: false
    });
})

router.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.ThanhToan == 1) {
        ticketRepo.pay(req.body.MaGD).then(result => {
            if (result.affectedRows != 0) {
                res.render('admin/index', {
                    layout: 'admin',
                    success: true
                });
            }
            else {
                res.render('admin/index', {
                    layout: 'admin',
                    fail: true
                });
            }
        })
    } 
    else {
        ticketRepo.getInformation(req.body.MaPhieu).then(rows => {
            if (rows[0] != null) {
                var TinhTrang;
                switch (rows[0].TinhTrang) {
                    case 0: TinhTrang = "Chưa thanh toán"; break;
                    case 1: TinhTrang = "Đã thanh toán"; break;
                    case 2: TinhTrang = "Đã sử dụng"; break;
                    case 3: TinhTrang = "Đã huỷ"; break;
                }
                res.render('admin/index', {
                    layout: 'admin',
                    search: true,
                    data: rows[0],
                    TinhTrang: TinhTrang,
                    ThanhToan: (rows[0].TinhTrang == 0),
                    In: (rows[0].TinhTrang == 1)
                });
            }
            else {
                res.render('admin/index', {
                    layout: 'admin',
                    invalid: true
                });
            }
        });
    }
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

router.get('/sellticket', (req, res) => {
    var stations = stationRepo.loadStation();
    res.render('admin/sellticket', {
        stations: stations,
        layout: 'admin'
    });
})

module.exports.router = router;