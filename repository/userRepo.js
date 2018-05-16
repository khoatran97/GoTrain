var DAO = require('../fn/dataAccess')

// Lấy danh sách tài khoản
module.exports.loadAll = () => {
    var script = 'SELECT * FROM TaiKhoan';
    return DAO.load(script);
}

// Lấy tài khoản dựa vào tên tài khoản
module.exports.loadByUsername = (username) => {
    var script = "SELECT * FROM TaiKhoan WHERE Username='" + username + "'";
    return DAO.load(script);
}