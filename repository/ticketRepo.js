var DAO = require('../fn/dataAccess.js')

module.exports.check = (t, date) => {
    var script = `select g.*
from PhieuDatVe p, LoaiVe lv, GiaoDich g
where p.MaPhieu=${t.MaVe} and p.MaTau=${t.MacTau} and g.CMND=${t.GiayTo} and g.MaGD=p.MaGD and p.MaLoaiVe=lv.MaVe and lv.GaDi=${t.GaDi} and lv.GaDen=${t.GaDen} and p.NgayDi='${date}'`;
    return DAO.load(script);
}

module.exports.lookup = (data) => {
	var script = `select c.*, l.*, g1.TenGa GaDi, g2.TenGa GaDen, DATE_FORMAT(l.NgayDi, "%d/%m/%Y") NgayDiFormated
	from ChuyenTau c, LichTau l, Ga g1, Ga g2
	where c.GaDi=g1.MaGa and g1.MaGa='${data.GaDi}' and c.GaDen=g2.MaGa and g2.MaGa='${data.GaDen}' and c.MaChuyen=l.MaChuyen and l.NgayDi = STR_TO_DATE("${data.NgayDi}","%m/%d/%Y")`;
	return DAO.load(script);
}

module.exports.loadCarriges=(d) => {
	var script=`select t.* from Toa t where t.MaTau=${d.maTau} and t.MaChuyen=${d.maChuyen} and t.NgayDi='${d.ngay}'`;
	return DAO.load(script);
}