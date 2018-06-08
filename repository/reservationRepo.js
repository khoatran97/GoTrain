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
    var script = `SELECT * FROM Ghe WHERE MaToa = '${data.MaToa}' and TinhTrang = true`;
    return DAO.load(script);
}