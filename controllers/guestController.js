var express = require('express');
var session = require('express-session');
var userRepo = require('../repository/userRepo');
var ticketRepo = require('../repository/ticketRepo');
var stationRepo = require('../repository/stationRepo');
var reservationRepo = require('../repository/reservationRepo');


// Dieu huong
var router = express.Router();


// GET
router.get('/', (req, res) => {
    stationRepo.loadStation().then(rows => {
        res.render('home', {
            stations: rows
        });
    })
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/giohang', (req, res) => {
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
    } else {
        res.render('login', {
            layout: false
        });
    }
})

router.get('/test', (req, res) => {
    res.render('test');
})

router.get('/pick-up', (req, res) => {
    ticketRepo.loadCarriges(req.query).then(rows => {
        console.log(rows);
        var vm = {
            carriges: rows
        }
        res.render('pick-up', vm);
    });

})

router.get('/chair/', (req, res) => {
    console.log(req.session.step);
    if (req.session.step < 1) {
        res.redirect('/')
    }
    else {
        var MaLich = req.query.MaLich;
        reservationRepo.loadAllType().then(rows => {
            req.session.step = 2
            res.render('chair', {
                MaLich: MaLich,
                LoaiGhe: rows
            });
        })
    }
    
})

router.get('/carriage/', (req, res) => {
    if (req.session.step < 2) {
        res.redirect('/')
    }
    else {
        var MaLich = req.query.MaLich;
        var MaLoai = req.query.MaLoai;
        reservationRepo.loadCarriage(req.query).then(rows => {
            req.session.step = 3;
            res.render('carriage', {
                Toa: rows
            });
        })
    }
    
})

router.get('/position/', (req, res) => {
    if (req.session.step < 3) {
        res.redirect('/')
    }
    else {
        reservationRepo.loadPosition(req.query).then(rows => {
            req.session.step = 4;
            res.render('position', {
                Ghe: rows
            });
        })
    }
    
})

router.get('/information/', (req, res) => {
    if (req.session.step < 4) {
        res.redirect('/')
    }
    else {
        ticketRepo.getTicketByChair(req.query.Ghe).then(rows => {
            console.log(rows);
            req.session.step = 5
            res.render('information', {
                MaGhe: req.query.Ghe,
                GiaVe: rows[0].GiaVe
            });
        })    
    }
    
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
    if (req.body.Huy == 1) {
        ticketRepo.cancel(req.body.MaPhieu, req.body.MaGD).then(result => {
            if (result == 3)
                res.render('test', {success: true})
            else 
                res.render('test', {fail: true})
        })
    }
    else {
        ticketRepo.check(req.body).then(rows => {
            console.log(rows);
            var vm;
            var TinhTrang;
            if (rows[0] != null) {
                switch (rows[0].TinhTrang) {
                    case 0: TinhTrang = "Chưa thanh toán"; break;
                    case 1: TinhTrang = "Đã thanh toán"; break;
                    case 2: TinhTrang = "Đã sử dụng"; break;
                    case 3: TinhTrang = "Đã huỷ"; break;
                }
                vm = {
                    data: rows[0],
                    TinhTrang: TinhTrang,
                    canCancel: (rows[0].TinhTrang == 0), 
                    valid: true
                };
            } else {
                vm = {
                    invalid: true
                };
            }
            res.render('test', vm);

        }).catch(err => {
            res.end('fail');
        });
    }
    
});

router.post('/', (req, res) => {
    console.log(req.body);
    ticketRepo.lookup(req.body).then(rows => {
        if (rows[0] != null) {

            req.session.step = 1;
            console.log(req.session.step);

            res.render('./pick-up', {
                trains: rows
            });
        } else {
            stationRepo.loadStation().then(rows => {
                res.render('home', {
                    stations: rows,
                    invalid: true
                });
            })
        }
    })
});

router.post('/information', (req, res) => {
    if (req.session.step < 5) {
        res.redirect('/');
    }
    else {
        var parameter = req.body;
        ticketRepo.getTicketByChair(req.body.MaGhe).then(rows => {
            console.log(rows[0])
            reservationRepo.addTransaction(req.body, rows[0]).then(result => {
                if (result.affectedRows !== 0) {
                    reservationRepo.setPosition(req.body.MaGhe)
                    reservationRepo.addReservation(rows[0].MaVe, result.insertId, req.body.MaGhe).then(result2 => {
                        if (result2.affectedRows !== 0) {
                            req.session.step = null;
                            reservationRepo.getTransaction(result.insertId).then(rows1 => {
                                res.render('success', {
                                    GiaoDich: rows1[0],
                                    MaPhieu: result2.insertId,
                                    GiaVe: rows[0].GiaVe,
                                    MaGhe: req.body.MaGhe
                                })
                            })
                        }
                    })
                }
            })
        })    
    }
});

module.exports.router = router;

// Xu ly
// // Hàm format ngày
function formatDate(date) {
    var d = new Date(JSON.stringify(date));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    var newdate = yy + "-" + mm + "-" + dd;
    return newdate;
}