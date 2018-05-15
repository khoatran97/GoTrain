var DAO = require('../fn/dataAccess.js')

module.exports.check = (t) => {
    var script = `select p.NgayDi
from phieudatve p, loaive lv, giaodich g
where p.MaPhieu=${t.MaVe} and p.MaTau=${t.MacTau} and g.CMND=${t.GiayTo} and g.MaGD=p.MaGD and p.MaLoaiVe=lv.MaVe and lv.GaDi=${t.GaDi} and lv.GaDen=${t.GaDen}`;
    return DAO.load(script);
}