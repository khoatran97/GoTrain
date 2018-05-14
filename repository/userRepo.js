var DAO = require('../fn/dataAccess.js')

module.exports.loadAll = () => {
    var script = 'select * from Nhanvien';
    return DAO.load(script);
}

module.exports.loadByUsername = (username) => {
    var script = "select * from Nhanvien where Username='"+username+"'";
    return DAO.load(script);
}