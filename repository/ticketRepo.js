var DAO = require('../fn/dataAccess.js')

module.exports.check = (t, date) => {
    var script = `select g.*
from phieudatve p, loaive lv, giaodich g
where p.MaPhieu=${t.MaVe} and p.MaTau=${t.MacTau} and g.CMND=${t.GiayTo} and g.MaGD=p.MaGD and p.MaLoaiVe=lv.MaVe and lv.GaDi=${t.GaDi} and lv.GaDen=${t.GaDen} and p.NgayDi='${date}'`;
    return DAO.load(script);
}

module.exports.lookup = (t, date) => {
	var script = `select c.*, l.*, g1.TenGa GaDi, g2.TenGa GaDen from chuyentau c, lichtau l, ga g1, ga g2
	where c.GaDi=g1.MaGa and g1.TenGa='${t.GaDi}' and c.GaDen=g2.MaGa and g2.TenGa='${t.GaDen}' and c.MaChuyen=l.MaChuyen and l.NgayDi='${date}'`;
	return DAO.load(script);
}

module.exports.loadCarriges=(d) => {
	var script=`select t.* from toa t where t.MaTau=${d.maTau} and t.MaChuyen=${d.maChuyen} and t.NgayDi='${d.ngay}'`;
	return DAO.load(script);
}