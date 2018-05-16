drop database if exists GoTrain;
create database GoTrain;
use GoTrain;

/******Tạo bảng*******/

create table NhanVien (
	MaNV int auto_increment primary key, 
	HoTen nvarchar(50) not null,
    GioiTinh bit not null,
    NgaySinh datetime not null,
    CMND varchar(20) not null,
    DiaChi nvarchar(50) not null,
    SoDienThoai varchar(20) not null
);

create table TaiKhoan (
    MaNV int,
	Username varchar(30) not null primary key,	
	Password varchar(30) not null,
    foreign key(MaNV)
    references NhanVien(MaNV),
);

/****3 loại ghế, mỗi loại ghế sẽ có số Toa tương ứng****/
create table LoaiGhe (
	MaLoai varchar(5) not null primary key,
    TenLoai nvarchar(20)
);

create table Tau(
	MaTau int auto_increment primary key,
    TenTau nvarchar(20)
);

create table Ga(
	MaGa int auto_increment primary key,
    TenGa nvarchar(15)
);
/***Chuyến tàu**/
create table ChuyenTau(
    MaChuyen int auto_increment primary key,
	TenChuyen nvarchar(15),
    GaDi int,
    GaDen int,
    GioDi time,
    foreign key(GaDi)
    references Ga(MaGa),
    foreign key(GaDen)
    references Ga(MaGa)
);
/***Mỗi chuyến tàu có nhiều lịch tàu, lịch tàu đc xác định bởi ngày đi và mã chuyến tàu, một chuyến tàu chỉ được bố trí 1 lần trong ngày và 1 tàu xác định**/
create table LichTau(
	NgayDi date,
    MaChuyen int,
    MaTau int,
    primary key(NgayDi, MaChuyen, MaTau),
    foreign key(MaChuyen)
    references ChuyenTau(MaChuyen),
    foreign key(MaTau)
    references Tau(MaTau)
);
/**Một toa chỉ có một loại ghế ngồi, xác định bởi mã toa, ngày đi, mã chuyến tàu, mã tàu**/
create table Toa(
	MaToa int auto_increment,
    NgayDi date,
    MaChuyen int,
    MaTau int,
    LoaiGhe varchar(5),
    SoGheDat int default 0,
    SoGheTrong int default 80,
    primary key(MaToa, MaTau, NgayDi, MaChuyen),
    foreign key(LoaiGhe)
    references LoaiGhe(MaLoai),
    foreign key(NgayDi, MaChuyen, MaTau)
    references LichTau(NgayDi, MaChuyen, MaTau)
);
/**Tương ứng mỗi toa sẽ có một số ghế nhất định, được xác định bởi số thứ tự ghế, mã toa, ngày đi, mã chuyến tàu, mã tàu, tình trạng ghế trống - true, đặt-false**/
create table Ghe(
	STT int auto_increment,
	MaToa int,
    NgayDi date,
    MaChuyen int,
    MaTau int,
    TinhTrang boolean default true,
    primary key (STT, MaToa, NgayDi, MaChuyen, MaTau),
    foreign key(MaToa, MaTau, NgayDi, MaChuyen)
    references Toa(MaToa, MaTau, NgayDi, MaChuyen)
);
/**Loai Vé được xác định bởi mã loại vẽ, tương ứng với địa điểm đi - đến và loại ghế ngồi sẽ có giá tiền khác nhau **/
create table LoaiVe(
	MaVe int not null auto_increment primary key,
    LoaiGhe varchar(5),
    GiaVe int,
    GaDi int,
    GaDen int,
    foreign key(LoaiGhe)
    references LoaiGhe(MaLoai),
    foreign key(GaDi)
    references Ga(MaGa),
    foreign key(GaDen)
    references Ga(MaGa)
);

create table LoaiThanhToan(
	MaLoai int(11) auto_increment primary key,
    TenLoai varchar(30)
);


create table GiaoDich(
	MaGD int auto_increment primary key,
    TinhTrang boolean, /*thanh toán thành công*/
    CMND int(10),
    HoTen nvarchar(50),
    email nvarchar(50),
    sdt int,
    TongTien int,
    LoaiThanhToan int,
    BaoMat int, /*số bảo mật của thẻ*/
    ThoiGian datetime, /*thời gian giao dịch*/
    foreign key(LoaiThanhToan)
    references LoaiThanhToan(MaLoai)
);

create table PhieuDatVe(
	MaPhieu int auto_increment,
    MaLoaiVe int,
    MaGD int,
    Ghe int,
    Toa int,
    NgayDi date,
    MaTau int,
    Chuyen int,
    primary key(MaPhieu),
    foreign key(MaLoaiVe)
    references LoaiVe(MaVe),
    foreign key(MaGD)
    references GiaoDich(MaGD),
    foreign key(Ghe, Toa, NgayDi, Chuyen, MaTau)
    references Ghe(STT, MaToa, NgayDi, MaChuyen, MaTau)    
);