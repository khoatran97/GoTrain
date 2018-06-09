INSERT INTO `Ga`(`MaGa`, `TenGa`) VALUES (1, 'Sài Gòn');
INSERT INTO `Ga`(`MaGa`, `TenGa`) VALUES (2, 'Đà Nẵng');
INSERT INTO `Ga`(`MaGa`, `TenGa`) VALUES (3, 'Hà Nội');

INSERT INTO `LoaiGhe`(`MaLoai`, `TenLoai`) VALUES ('1', 'Ghế cứng');
INSERT INTO `LoaiGhe`(`MaLoai`, `TenLoai`) VALUES ('2', 'Ghế mềm');
INSERT INTO `LoaiGhe`(`MaLoai`, `TenLoai`) VALUES ('3', 'Ghế mềm điều hoà');

INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (3, 'SE1', 1, 2, '08:00:00');
INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (4, 'SE2', 2, 1, '08:00:00');
INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (5, 'SE3', 1, 3, '09:00:00');
INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (6, 'SE4', 3, 1, '09:00:00');
INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (7, 'SE5', 2, 3, '10:00:00');
INSERT INTO `ChuyenTau`(`MaChuyen`, `TenChuyen`, `GaDi`, `GaDen`, `GioDi`) VALUES (8, 'SE6', 3, 2, '10:00:00');

INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (1, 'TG001');
INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (2, 'TG002');
INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (3, 'TG003');
INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (4, 'TG004');
INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (5, 'TG005');
INSERT INTO `Tau`(`MaTau`, `TenTau`) VALUES (6, 'TG006');

INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (3, '2018-07-01', 3, 1);
INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (4, '2018-07-01', 4, 2);
INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (5, '2018-07-01', 5, 3);
INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (6, '2018-07-01', 6, 4);
INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (7, '2018-07-01', 7, 5);
INSERT INTO `LichTau`(`MaLich`, `NgayDi`, `MaChuyen`, `MaTau`) VALUES (8, '2018-07-01', 8, 6);

INSERT INTO `Toa`(`MaToa`, `TenToa`, `MaLich`, `LoaiGhe`, `SoGheDat`, `SoGheTrong`) VALUES (3, 'SE1_1', 3, '1', 0, 80);
INSERT INTO `Toa`(`MaToa`, `TenToa`, `MaLich`, `LoaiGhe`, `SoGheDat`, `SoGheTrong`) VALUES (4, 'SE1_2', 3, '2', 0, 80);
INSERT INTO `Toa`(`MaToa`, `TenToa`, `MaLich`, `LoaiGhe`, `SoGheDat`, `SoGheTrong`) VALUES (5, 'SE1_3', 3, '3', 0, 80);

INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (5, '1', 3, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (6, '2', 3, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (7, '3', 3, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (8, '4', 4, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (9, '5', 4, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (10, '6', 4, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (11, '7', 5, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (12, '8', 5, 1);
INSERT INTO `Ghe`(`MaGhe`, `TenGhe`, `MaToa`, `TinhTrang`) VALUES (13, '9', 5, 1);

INSERT INTO `LoaiVe`(`MaVe`, `LoaiGhe`, `GiaVe`, `GaDi`, `GaDen`) VALUES (2, '1', 500000, 1, 3);
INSERT INTO `LoaiVe`(`MaVe`, `LoaiGhe`, `GiaVe`, `GaDi`, `GaDen`) VALUES (3, '2', 600000, 1, 3);
INSERT INTO `LoaiVe`(`MaVe`, `LoaiGhe`, `GiaVe`, `GaDi`, `GaDen`) VALUES (4, '3', 700000, 1, 3);