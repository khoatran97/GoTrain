var DAO = require('../fn/dataAccess.js')
var reservationRepo = require('./reservationRepo')

module.exports.check = (t) => {
    var script = `select g.*, p.MaPhieu
		from PhieuDatVe p, GiaoDich g
		where p.MaPhieu=${t.MaVe} and p.Ghe=${t.MaGhe} and g.CMND=${t.CMND} and g.MaGD=p.MaGD`;
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

module.exports.getTicketByChair = (chairId) => {
	var sql = `
		select LoaiVe.MaVe as MaVe, LoaiVe.GiaVe as GiaVe
		from (
				select ChuyenTau.GaDi as GaDi, ChuyenTau.GaDen as GaDen, Toa.LoaiGhe as LoaiGhe
				from Ghe 
					join Toa on Ghe.MaToa = Toa.MaToa
					join LichTau on Toa.MaLich = LichTau.MaLich
					join ChuyenTau on LichTau.MaChuyen = ChuyenTau.MaChuyen
				where Ghe.MaGhe = "${chairId}"
		) as A join LoaiVe on LoaiVe.LoaiGhe = A.LoaiGhe and LoaiVe.GaDi = A.GaDi and LoaiVe.GaDen = A.GaDen
	`
	var result;
	return DAO.load(sql)
}

module.exports.cancel = async (ticketId, transactionId) => {
	var result = 0 ;
	await reservationRepo.getChairCarriageByTicket(ticketId).then(async(rows) =>  {
		var sql = `UPDATE Ghe
		SET TinhTrang=1
		WHERE MaGhe=${rows[0].MaGhe}`

		var sql2 = `
		UPDATE Toa
		SET SoGheDat=SoGheDat-1, SoGheTRong=SoGheTRong+1
		WHERE MaToa=${rows[0].MaToa}`;
		
		var sql3 = `
		UPDATE GiaoDich
		SET TinhTrang=3
		WHERE MaGD=${transactionId}`;

		await DAO.save(sql).then(result1 => {
			result = result + result1.affectedRows;
		});
		await DAO.save(sql2).then(result2 => {
			result = result + result2.affectedRows;
		});
		await DAO.save(sql3).then(result3 => {
			result = result + result3.affectedRows;
		});
	})
	return result;
}