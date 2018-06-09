var DAO = require('../fn/dataAccess')

// Loai ghe
module.exports.loadAllType = () => {
    var script = "SELECT * FROM LoaiGhe";
    return DAO.load(script);
}

module.exports.loadCarriage = (data) => {
    var script = `SELECT * FROM Toa WHERE MaLich = '${data.MaLich}' and LoaiGhe = '${data.MaLoai}' and SoGheTrong>0`;
    return DAO.load(script);
}

module.exports.loadPosition = (data) => {
    var script = `SELECT * FROM Ghe WHERE MaToa = '${data.MaToa}' and TinhTrang = 1`;
    return DAO.load(script);
}

module.exports.addTransaction = (data, ve) => {
    var sql = `
        INSERT INTO GiaoDich(TinhTrang, CMND, HoTen, email, sdt, tongtien) Values (0,${data.CMND},"${data.HoTen}","${data.Email}",${data.SoDienThoai},${ve.GiaVe});
    `;
    console.log(sql);
    return DAO.save(sql);
}

module.exports.getTransaction = (id) => {
    var sql = `SELECT * FROM GiaoDich WHERE MaGD = ${id}`
    console.log(sql);
    return DAO.load(sql);
}

module.exports.setPosition = (Id) => {
    var sql = `UPDATE Ghe SET TinhTrang = 0 WHERE MaGhe = ${Id};`
    DAO.save(sql).then(result => {
        if (result.changedRows !== 0) {
            sql = `UPDATE Ghe join Toa on Ghe.MaToa = Toa.MaToa
            SET Toa.SoGheDat = SoGheDat +1, Toa.SoGheTrong = SoGheTrong - 1
            WHERE MaGhe = ${Id};`
            DAO.save(sql).then(result2 => {
                
            })
        }
    })
}

module.exports.addReservation = (typeId, transactionId, chairId) => {
    var sql = `
        INSERT INTO PhieuDatVe(MaLoaiVe, MaGD, Ghe) Values (${typeId}, ${transactionId}, ${chairId});
    `;
    console.log(sql);
    return DAO.save(sql);
}