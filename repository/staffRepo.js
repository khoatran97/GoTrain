var DAO = require('../fn/dataAccess')

// Lấy danh sách nhân viên
module.exports.loadAll = () => {
    var script = 'SELECT * FROM NhanVien';
    return DAO.load(script);
}

// Lấy nhân viên qua Mã NV
module.exports.loadByID = (id) => {
    var script = "SELECT * FROM NhanVien WHERE MaNV='" + id + "'";
    return DAO.load(script);
}

// Chỉnh sửa thông tin nhân viên
module.exports.update = (id, hoten, gioitinh, ngaysinh, cmnd, diachi, sodienthoai) => {
    var script = "UPDATE NhanVien SET Hoten = " + hoten + ", GioiTinh = " + gioitinh + ", CMND = " + cmnd + ", DiaChi = " + diachi + ", SoDienThoai = " + sodienthoai + " WHERE MaNV = " + id;
    DAO.save(script).then(result => {
        if (result.affectedRows == 0) {
            return false;
        }
        else {
            return true;
        }
    })
}

//
module.exports.addStaff = (hoten, gioitinh, ngaysinh, cmnd, diachi, sodienthoai) => {
    if (cmnd.length != 9 || (sodienthoai.length != 10 && sodienthoai.length != 11)) {
        return false
    }
    var values = [[hoten, gioitinh, ngaysinh, cmnd, diachi, sodienthoai]];
    var script = "INSERT INTO NhanVien(HoTen, GioiTinh, NgaySinh, CMND, DiaChi, SoDienThoai) VALUES ?";
    DAO.save(script, [values]).then(result => {
        if (result.affectedRows == 0) {
            return false;
        }
        else {
            return true;
        }
    })
    return true;
}