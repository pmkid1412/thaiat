const saotuvi = 1,
saoliemtrinh = 2,
saothiendong = 3,
saovukhuc = 4,
saothaiduong = 5,
saothienco = 6,
saothienphu = 7,
saothaiam = 8,
saothamlang = 9,
saocumon = 10,
saothientuong = 11,
saothienluong = 12,
saothatsat = 13,
saophaquan = 14,
saothaitue = 15,
saothieuduong = 16,
saotangmon = 17,
saothieuam = 18,
saoquanphuf = 19,
saotuphu = 20,
saotuepha = 21,
saolongduc = 22,
saobachho = 23,
saophucduc = 24,
saodieukhach = 25,
saotrucphu = 26,
saobacsy = 27,
saolucsi = 28,
saothanhlong = 29,
saotieuhao = 30,
saotuongquan = 31,
saotauthu = 32,
saophiliem = 33,
saohythan = 34,
saobenhphu = 35,
saodaihao = 36,
saophucbinh = 37,
saoquanphur = 38,
saotrangsinh = 39,
saomocduc = 40,
saoquandoi = 41,
saolamquan = 42,
saodevuong = 43,
saosuy = 44,
saobenh = 45,
saotu = 46,
saomo = 47,
saotuyet = 48,
saothai = 49,
saoduong = 50,
saodala = 51,
saokinhduong = 52,
saodiakhong = 53,
saodiakiep = 54,
saolinhtinh = 55,
saohoatinh = 56,
saovanxuong = 57,
saovankhuc = 58,
saothienkhoi = 59,
saothienviet = 60,
saotaphu = 61,
saohuubat = 62,
saolongtri = 63,
saophuongcac = 64,
saotamthai = 65,
saobattoa = 66,
saoanquang = 67,
saothienquy = 68,
saothienkhoc = 69,
saothienhu = 70,
saothienduc = 71,
saonguyetduc = 72,
saothienhinh = 73,
saothienrieu = 74,
saothieny = 75,
saoquocan = 76,
saoduongphu = 77,
saodaohoa = 78,
saohongloan = 79,
saothienhy = 80,
saothiengiai = 81,
saodiagiai = 82,
saogiaithan = 83,
saothaiphu = 84,
saophongcao = 85,
saothientai = 86,
saothientho = 87,
saothienthuong = 88,
saothiensu = 89,
saothienla = 90,
saodiavong = 91,
saohoaloc = 92,
saohoaquyen = 93,
saohoakhoa = 94,
saohoaky = 95,
saocothan = 96,
saoquatu = 97,
saothienma = 98,
saophatoai = 99,
saothienquan = 100,
saothienphuc = 101,
saoluuha = 102,
saothientru = 103,
saokiepsat = 104,
saohoacai = 105,
saovantinh = 106,
saodauquan = 107,
saothienkhong = 108,
saolocton = 109,
saolthaitue = 110,
saolbachho = 111,
saoltangmon = 112,
saolthienhu = 113,
saolthienkhoc = 114,
saolthienma = 115,
saollocton = 116,
saolkinhduong = 117,
saoldala = 118,
saolhoaloc = 119,
saolhoaquyen = 120,
saolhoakhoa = 121,
saolhoaky = 122,
saotuongtinh = 123,
saophanan = 124,
saotuedich = 125,
saotucthan = 126,
saotaisat = 127,
saothiensat = 128,
saochiboi = 129,
saohamtri = 130,
saonguyetsat = 131,
saovongthan = 132,
saotuan = 133,
saotriet = 134,
saoldaohoa = 135,
saolhongloan = 136,
saolvanxuong = 137,
saolvankhuc = 138,
saolthienkhoi = 139,
saolthienviet = 140,
saolthienduc = 141,
saolnguyetduc = 142,
saollongduc = 143,
saolkiepsat = 144,
saoldauquan = 145,
saolthienhy = 147,
saoamsat = 146;
const ptt = 3,
ppt = 10,
p6t = 20,
pst = 26,
ptuan = 36,
ptriet = 37,
trsi = 38,
plncat = 46,
plnsat = 54;
const cungad = [
    0,
    1,
    - 1,
    1,
    - 1,
    1,
    - 1,
    1,
    - 1,
    1,
    - 1,
    1,
    - 1
];
var stars,
p_saotuvi,
p_saoliemtrinh,
p_saothiendong,
p_saovukhuc,
p_saothaiduong,
p_saothienco,
p_saothienphu,
p_saothaiam,
p_saothamlang,
p_saocumon,
p_saothientuong,
p_saothienluong,
p_saothatsat,
p_saophaquan,
p_saothaitue,
p_saothieuduong,
p_saotangmon,
p_saothieuam,
p_saoquanphuf,
p_saotuphu,
p_saotuepha,
p_saolongduc,
p_saobachho,
p_saophucduc,
p_saodieukhach,
p_saotrucphu,
p_saobacsy,
p_saolucsi,
p_saothanhlong,
p_saotieuhao,
p_saotuongquan,
p_saotauthu,
p_saophiliem,
p_saohythan,
p_saobenhphu,
p_saodaihao,
p_saophucbinh,
p_saoquanphur,
p_saotrangsinh,
p_saomocduc,
p_saoquandoi,
p_saolamquan,
p_saodevuong,
p_saosuy,
p_saobenh,
p_saotu,
p_saomo,
p_saotuyet,
p_saothai,
p_saoduong,
p_saodala,
p_saokinhduong,
p_saodiakhong,
p_saodiakiep,
p_saolinhtinh,
p_saohoatinh,
p_saovanxuong,
p_saovankhuc,
p_saothienkhoi,
p_saothienviet,
p_saotaphu,
p_saohuubat,
p_saolongtri,
p_saophuongcac,
p_saotamthai,
p_saobattoa,
p_saoanquang,
p_saothienquy,
p_saothienkhoc,
p_saothienhu,
p_saothienduc,
p_saonguyetduc,
p_saothienhinh,
p_saothienrieu,
p_saothieny,
p_saoquocan,
p_saoduongphu,
p_saodaohoa,
p_saohongloan,
p_saothienhy,
p_saothiengiai,
p_saodiagiai,
p_saogiaithan,
p_saothaiphu,
p_saophongcao,
p_saothientai,
p_saothientho,
p_saothienthuong,
p_saothiensu,
p_saothienla,
p_saodiavong,
p_saohoaloc,
p_saohoaquyen,
p_saohoakhoa,
p_saohoaky,
p_saocothan,
p_saoquatu,
p_saothienma,
p_saophatoai,
p_saothienquan,
p_saothienphuc,
p_saoluuha,
p_saothientru,
p_saokiepsat,
p_saohoacai,
p_saovantinh,
p_saodauquan,
p_saothienkhong,
p_saolocton,
p_saolhoaloc,
p_saolhoaquyen,
p_saolhoakhoa,
p_saolhoaky,
p_saotuongtinh,
p_saophanan,
p_saotuedich,
p_saotucthan,
p_saotaisat,
p_saothiensat,
p_saochiboi,
p_saohamtri,
p_saonguyetsat,
p_saovongthan,
p_saoamsat,
p_saotuan,
p_saotriet,
p_saoluu_thaitue,
p_saoluu_bachho,
p_saoluu_tangmon,
p_saoluu_thienhu,
p_saoluu_thienkhoc,
p_saoluu_thienma,
p_saoluu_locton,
p_saoluu_kinhduong,
p_saoluu_dala,
p_saoluu_daohoa,
p_saoluu_hongloan,
p_saoluu_vanxuong,
p_saoluu_vankhuc,
p_saoluu_thienkhoi,
p_saoluu_thienviet,
p_saoluu_thienduc,
p_saoluu_nguyetduc,
p_saoluu_longduc,
p_saoluu_kiepsat,
p_saoluu_dauquan,
chonbangdosang,
bangdosang,
cuctuoi,
tuoiduongso,
cungdaihan,
cungluudaihan,
cungtieuhan,
cungnguyethan,
plocton,
pluulocton,
pluuthaitue,
pluuthienma,
ptrangsinh,
pvanxuong,
pvankhuc,
ptaphu,
phuubat,
pthaitue,
pmenh,
pthan,
pphumau,
pphucduc,
pdientrach,
pquanloc,
pnoboc,
pthiendi,
ptatach,
ptaibach,
ptutuc,
pphuthe,
phuynhde,
namxemhan,
tuongquanmenhcuc,
textlength,
namsinhAL,
cungmenh,
cungthan,
dataURL,
can_cung,
can_cung_full,
nguhanh_canchi,
pmaunguoi,
tencung,
ct_post,
lucsatinh,
pthatue,
cungchinhdieu,
tuan_post,
triet_post,
tuhoa,
luutuhoa,
tensaohoa,
BatTu,
cannam,
chinam,
canchi_thangsinh,
canchi_ngaysinh,
canchi_giosinh,
tuoiamduong,
nguhanhbanmenh,
giosinhAL,
ngaysinhAL,
thangsinhAL,
gtinh,
jamduong,
saochumenh,
saochuthan,
saochumenh_id,
saochuthan_id,
str_lainhan,
str_nguyenthan,
TuViDienToan,
cookieValue,
lainhancung,
lainhancung_id,
nguyenthancung,
nguyenthancung_id,
tencaccung,
nct,
ntt,
npt,
n6t,
nst,
lncat,
lnsat,
giotinhngay,
color_nguHanh,
color_BackGround,
color_TextDefault,
color_Border,
color_Border1,
color_cunghoa,
color_tuhoa,
tt_color,
tuvidientoancolor,
tuvidientoancolor1,
tuvidientoancolor2,
tuvidientoancolor3,
thienbancolor,
nghanhnamxem,
thangnhuan,
thanghan_en,
_can_namxem,
_chi_namxem,
thanghan,
font_name,
font_tt,
font_155,
font_14,
font_13,
font_13t,
font_115,
font_11,
font_11t,
font_10,
font_10t,
font_9,
font_9t,
font_7,
font_7t,
font_khochu,
nguhanh_th,
nguhanh_th_min,
_ncatt,
_nsatt,
dataURL,
canva,
ctx,
mDevice,
anThongTinLS,
quaNhieuCatTinh,
cungViBatQuai,
thutungaygio,
hiensaoluutuhoa,
hiencacsaoluukhac,
hientuhoaphitinh,
hienvongtuongtinh,
hienlainhancung,
battrachlaso,
notethongtinlaso,
thongtincannote,
cuccualaso,
tentrangls,
website,
ttlienhe,
ngayamlichHT,
str_cungansao,
cungthienban,
cungansao,
cungansaoLA,
tttcung,
tttcung_th,
tttcung_rg,
tencungluuhan,
tabcung,
tabcung_5hanh,
tabcannam,
tabllocton,
tablthienma,
tabtuhoa,
arrsaotuhoa,
tuoiad,
tabsaochumenh,
tabsaochumenh_id,
tabsaochuthan,
tabsaochuthan_id,
begin_ngaycanchi,
vitriCT_LS,
sLook,
timcaci,
doigiosinh,
tim_canchi_thang,
tim_canchi_ngay,
tim_canchi_gio,
cungmov,
cungmov10,
PI,
INT,
jdFromDate,
jdToDate,
NewMoon,
SunLongitude,
getSunLongitude,
getNewMoonDay,
getLunarMonth11,
getLeapMonthOffset,
convertSolar2Lunar,
convertLunar2Solar,
TimTuoiAmDuong_TheoCan,
TimTuoiAmDuong_TheoChi,
XD_HanhBanMenh,
nguhanhnam,
xd_vitri_cung_menhthan,
tim_cuc_laso,
vitri_sao_tuvi,
an_chinhtinh,
an_sao_gio,
an_sao_thang,
an_sao_theo_can_cua_nam_sinh,
AnTuHoa,
ansao_chinam,
an_thaitue,
ansaotuan,
anhoalinh,
anvong_bacsy,
antrangsinh,
antapdieu,
cungghitieuhan,
cungghinguyethan,
AnLuuTuHoa,
luucacsao,
timtuongquanmenhcuc,
timsaochumenh,
timsaochuthan,
napthiencan_cung,
battrach,
tinhTongSoHang,
tinh2TongSoHangCuoi,
phicungtuhoa,
VongTuongTinh,
SaoAmSat,
GetSao_Possittion,
checkDevice,
getFullNameTuHoa,
laplasotv,
printCanvas,
resizeImage,
handleDoubleClick,
saveCanvas,
luanGiai,
ancacsao,
napthongtincaccung,
canvaslasotv,
convertToBase64,
saocolor,
color5hanh,
getRandomInt,
bangdosangcacsao,
luudslsthoaman,
verticalTextCanvas;

function function_01(function_02, sLook) {
	if (!function_02) {
		return;
	}
	;
	var function_01 = new Date;
	if (function_01.getFullYear() * 1e4 + (1 + function_01.getMonth()) * 100 + function_01.getDate() < parseInt(function_02)) {
		return;
	}
	;
	throw sLook || "error";
}
function function_02(sLook, tim_canchi_ngay, tim_canchi_thang) {
	if (!sLook) {
		return;
	};
	var timcaci = this.location.href.split("://")[1].split("/")[0].split(":")[0];
	var function_01 = sLook.split(",");
	for (var doigiosinh = 0; doigiosinh < function_01.length; doigiosinh++) {
		var function_02 = function_01[doigiosinh];
		if (function_02 == timcaci) {
			return;
		}
		;
		if (!tim_canchi_ngay) {
			continue;
		}
		;
		function_02 = timcaci.split("." + function_02);
		if (function_02.length == 2 && !function_02[1]) {
			return;
		}
	};
	throw tim_canchi_thang || "error";
}
function sLook(sLook, function_01) {
	let timcaci = "";
	for (let function_02 = 0; function_02 < 40; function_02++) {
		if (sLook == bangdosang[function_02][0]) {
			timcaci = bangdosang[function_02][function_01];
			return timcaci;
		}
	}
}
function timcaci(function_02, timcaci, function_01, cungmov) {
	let sLook = new Array(4).fill(0);
	sLook = convertSolar2Lunar(function_02, timcaci, function_01, cungmov);
	let cungmov10 = sLook[2];
	const doigiosinh = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
	const tim_canchi_ngay = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
	const tim_canchi_thang = cungmov10 % 10;
	const tim_canchi_gio = cungmov10 % 12;
	return [doigiosinh[tim_canchi_thang], tim_canchi_ngay[tim_canchi_gio]];
}
function doigiosinh(function_01, function_02, doigiosinh) {
	let sLook = "";
	let timcaci = 0;
	timcaci = function_01;
	timcaci += function_02 / 60;
	if (timcaci > 23) {
		giotinhngay = 1;
	}
	;
	if (timcaci >= 23 || timcaci < 1) {
		sLook = "Tý";
	} else {
		if (timcaci >= 1 && timcaci < 3) {
			sLook = "Sửu";
		} else {
			if (timcaci >= 3 && timcaci < 5) {
				sLook = "Dần";
			} else {
				if (timcaci >= 5 && timcaci < 7) {
					sLook = "Mão";
				} else {
					if (timcaci >= 7 && timcaci < 9) {
						sLook = "Thìn";
					} else {
						if (timcaci >= 9 && timcaci < 11) {
							sLook = "Tỵ";
						} else {
							if (timcaci >= 11 && timcaci < 13) {
								sLook = "Ngọ";
							} else {
								if (timcaci >= 13 && timcaci < 15) {
									sLook = "Mùi";
								} else {
									if (timcaci >= 15 && timcaci < 17) {
										sLook = "Thân";
									} else {
										if (timcaci >= 17 && timcaci < 19) {
											sLook = "Dậu";
										} else {
											if (timcaci >= 19 && timcaci < 21) {
												sLook = "Tuất";
											} else {
												if (timcaci >= 21 && timcaci < 23) {
													sLook = "Hợi";
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	;
	return sLook;
}
function tim_canchi_thang(function_02, function_01) {
	const timcaci = [["Tháng/Năm", " Giáp/Kỷ", "Ất/Canh", "Bính/Tân", "Đinh/ Nhâm", "Mậu/Quý"], [1, "Bính Dần", "Mậu Dần", "Canh Dần", "Nhâm Dần", "Giáp Dần"], [2, "Đinh Mão", "Kỷ Mão", "Tân Mão", "Quý Mão", "Ất Mão"], [3, "Mậu Thìn", "Canh Thìn", "Nhâm Thìn", "Giáp Thìn", "Bính Thìn"], [4, "Kỷ Tỵ", "Tân Tỵ", "Quý Tỵ", "Ất Tỵ", "Đinh Tỵ"], [5, "Canh Ngọ", "Nhâm Ngọ", "Giáp Ngọ", "Bính Ngọ", "Mậu Ngọ"], [6, "Tân Mùi", "Quý Mùi", "Ất Mùi", "Đinh Mùi", "Kỷ Mùi"], [7, "Nhâm Thân", "Giáp Thân", "Bính Thân", "Mậu Thân", "Canh Thân"], [8, "Quý Dậu", "Ất Dậu", "Đinh Dậu", "Kỷ Dậu", "Tân Dậu"], [9, "Giáp Tuất", "Bính Tuất", "Mậu Tuất", "Canh Tuất", "Nhâm Tuất"], [10, "Ất Hợi", "Đinh Hợi", "Kỷ Hợi", "Tân Hợi", "Quý Hợi"], [11, "Bính Tý", "Mậu Tý", "Canh Tý", "Nhâm Tý", "Giáp Tý"], [12, "Đinh Sửu", "Kỷ Sửu", "Tân Sửu", "Quý Sửu", "Ất Sửu"]];
	for (let sLook = 1; sLook < 6; sLook++) {
		if (timcaci[0][sLook].includes(function_01)) {
			return timcaci[function_02][sLook];
		}
	}
}
function tim_canchi_ngay(function_01, function_02, timcaci) {
	const doigiosinh = ["zzz", "Giáp Tý", "Ất Sửu", "Bính Dần", "Đinh Mão", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi", "Nhâm Thân", "Quý Dậu", "Giáp Tuất", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Mậu Dần", "Kỷ Mão", "Canh Thìn", "Tân Tỵ", "Nhâm Ngọ", "Quý Mùi", "Giáp Thân", "Ất Dậu", "Bính Tuất", "Đinh Hợi", "Mậu Tý", "Kỷ Sửu", "Canh Dần", "Tân Mão", "Nhâm Thìn", "Quý Tỵ", "Giáp Ngọ", "Ất Mùi", "Bính Thân", "Đinh Dậu", "Mậu Tuất", "Kỷ Hợi", "Canh Tý", "Tân Sửu", "Nhâm Dần", "Quý Mão", "Giáp Thìn", "Ất Tỵ", "Bính Ngọ", "Đinh Mùi", "Mậu Thân", "Kỷ Dậu", "Canh Tuất", "Tân Hợi", "Nhâm Tý", "Quý Sửu", "Giáp Dần", "Ất Mão", "Bính Thìn", "Đinh Tỵ", "Mậu Ngọ", "Kỷ Mùi", "Canh Thân", "Tân Dậu", "Nhâm Tuất", "Quý Hợi"];
	let sLook = (jdFromDate(function_01, function_02, timcaci) - jdFromDate(3, 11, 1977)) % 60;
	if (sLook == 0) {
		return begin_ngaycanchi;
	}
	;
	if (sLook > 0) {
		return doigiosinh[sLook + 1];
	}
	;
	if (sLook < 0) {
		return doigiosinh[60 + sLook + 1];
	}
}
function tim_canchi_gio(function_02, function_01) {
	const doigiosinh = [["Giờ/Ngày", "Giáp/Kỷ", "Ất/Canh", "Bính/Tân", "Đinh/Nhâm", "Mậu/Quý"], ["Tý", "Giáp Tý", "Bính Tý", "Mậu Tý", "Canh Tý", "Nhâm Tý"], ["Sửu", "Ất Sửu", "Đinh Sửu", "Kỷ Sửu", "Tân Sửu", "Quý Sửu"], ["Dần", "Bính Dần", "Mậu Dần", "Canh Dần", "Nhâm Dần", "Giáp Dần"], ["Mão", "Đinh Mão", "Kỷ Mão", "Tân Mão", "Quý Mão", "Ất Mão"], ["Thìn", "Mậu Thìn", "Canh Thìn", "Nhâm Thìn", "Giáp Thìn", "Bính Thìn"], ["Tỵ", "Kỷ Tỵ", "Tân Tỵ", "Quý Tỵ", "Ất Tỵ", "Đinh Tỵ"], ["Ngọ", "Canh Ngọ", "Nhâm Ngọ", "Giáp Ngọ", "Bính Ngọ", "Mậu Ngọ"], ["Mùi", "Tân Mùi", "Quý Mùi", "Ất Mùi", "Đinh Mùi", "Kỷ Mùi"], ["Thân", "Nhâm Thân", "Giáp Thân", "Bính Thân", "Mậu Thân", "Canh Thân"], ["Dậu", "Quý Dậu", "Ất Dậu", "Đinh Dậu", "Kỷ Dậu", "Tân Dậu"], ["Tuất", "Giáp Tuất", "Bính Tuất", "Mậu Tuất", "Canh Tuất", "Nhâm Tuất"], ["Hợi", "Ất Hợi", "Đinh Hợi", "Kỷ Hợi", "Tân Hợi", "Quý Hợi"]];
	for (let sLook = 1; sLook < 13; sLook++) {
		if (function_02 == doigiosinh[sLook][0]) {
			for (let timcaci = 1; timcaci < 6; timcaci++) {
				if (doigiosinh[0][timcaci].includes(function_01)) {
					return doigiosinh[sLook][timcaci];
				}
			}
		}
	}
}
function cungmov(doigiosinh, tim_canchi_thang, tim_canchi_ngay) {
	let function_02 = 0;
	let sLook = 0;
	let function_01 = 0;
	let timcaci = 0;
	sLook = tim_canchi_thang;
	function_01 = doigiosinh;
	timcaci = tim_canchi_ngay;
	if (!Number.isFinite(sLook)) {
		document.write("Lỗi! Số cung dịch chuyển phải là số.");
		document.write("<br />");
		return 0;
	}
	;
	if (timcaci !== 1 && timcaci !== -1) {
		document.write("Lỗi! Dịch tiến thì +1, dịch lùi thì -1.");
		document.write("<br />");
		return 0;
	}
	;
	if (tim_canchi_thang == 0) {
		function_02 = function_01;
		return function_02;
	}
	;
	if (timcaci == 1) {
		function_02 = function_01 + sLook;
		if (function_02 < 13) {
			return function_02;
		}
		;
		if (function_02 > 12) {
			function_02 = function_02 % 12;
			if (function_02 == 0) {
				function_02 = 12;
			}
			;
			return function_02;
		}
	}
	;
	if (timcaci == -1) {
		if (sLook > 12) {
			sLook = sLook % 12;
		}
		;
		if (sLook == function_01) {
			function_02 = 12;
			return function_02;
		}
		;
		if (function_01 > sLook) {
			function_02 = function_01 - sLook;
			return function_02;
		}
		;
		if (function_01 < sLook) {
			function_02 = 12 + function_01 - sLook;
			return function_02;
		}
	}
}
function cungmov10(doigiosinh, tim_canchi_thang, tim_canchi_ngay) {
	let function_02 = 0;
	let sLook = 0;
	let function_01 = 0;
	let timcaci = 0;
	sLook = tim_canchi_thang;
	function_01 = doigiosinh;
	timcaci = tim_canchi_ngay;
	if (!Number.isFinite(sLook)) {
		document.write("Lỗi! Số cung dịch chuyển phải là số.");
		document.write("<br />");
		return;
	}
	;
	if (timcaci !== 1 && timcaci !== -1) {
		document.write("Lỗi! Dịch tiến thì +1, dịch lùi thì -1.");
		document.write("<br />");
		return;
	}
	;
	if (tim_canchi_thang == 0) {
		function_02 = function_01;
		return function_02;
	}
	;
	if (timcaci == 1) {
		function_02 = function_01 + sLook;
		if (function_02 < 11) {
			return function_02;
		}
		;
		if (function_02 > 10) {
			function_02 = function_02 % 10;
			if (function_02 == 0) {
				function_02 = 10;
			}
			;
			return function_02;
		}
	}
}
function jdFromDate(function_01, timcaci, tim_canchi_thang) {
	var sao;
	var doigiosinh;
	var sLook;
	var function_02;
	sao = Math.floor((14 - timcaci) / 12);
	doigiosinh = tim_canchi_thang + 4800 - sao;
	sLook = timcaci + 12 * sao - 3;
	function_02 = function_01 + Math.floor((153 * sLook + 2) / 5) + 365 * doigiosinh + Math.floor(doigiosinh / 4) - Math.floor(doigiosinh / 100) + Math.floor(doigiosinh / 400) - 32045;
	if (function_02 < 2299161) {
		function_02 = function_01 + Math.floor((153 * sLook + 2) / 5) + 365 * doigiosinh + Math.floor(doigiosinh / 4) - 32083;
	}
	;
	return function_02;
}
function jdToDate(tim_canchi_thang) {
	var sao;
	var function_01;
	var function_02;
	var sLook;
	var doigiosinh;
	var tim_canchi_ngay;
	var timcaci;
	var tim_canchi_gio;
	var cungmov;
	if (tim_canchi_thang > 2299160) {
		sao = tim_canchi_thang + 32044;
		function_01 = Math.floor((4 * sao + 3) / 146097);
		function_02 = sao - Math.floor(function_01 * 146097 / 4);
	} else {
		function_01 = 0;
		function_02 = tim_canchi_thang + 32082;
	}
	;
	sLook = Math.floor((4 * function_02 + 3) / 1461);
	doigiosinh = function_02 - Math.floor(1461 * sLook / 4);
	tim_canchi_ngay = Math.floor((5 * doigiosinh + 2) / 153);
	timcaci = doigiosinh - Math.floor((153 * tim_canchi_ngay + 2) / 5) + 1;
	tim_canchi_gio = tim_canchi_ngay + 3 - 12 * Math.floor(tim_canchi_ngay / 10);
	cungmov = function_01 * 100 + sLook - 4800 + Math.floor(tim_canchi_ngay / 10);
	return new Array(timcaci, tim_canchi_gio, cungmov);
}
function NewMoon(tim_canchi_ngay) {
	var cungmov10;
	var INT;
	var jdFromDate;
	var sLook;
	var doigiosinh;
	var tim_canchi_gio;
	var cungmov;
	var timcaci;
	var function_01;
	var function_02;
	var tim_canchi_thang;
	cungmov10 = tim_canchi_ngay / 1236.85;
	INT = cungmov10 * cungmov10;
	jdFromDate = INT * cungmov10;
	sLook = PI / 180;
	doigiosinh = 2415020.75933 + 29.53058868 * tim_canchi_ngay + 0.0001178 * INT - 1.55e-7 * jdFromDate;
	doigiosinh = doigiosinh + 0.00033 * Math.sin((166.56 + 132.87 * cungmov10 - 0.009173 * INT) * sLook);
	tim_canchi_gio = 359.2242 + 29.10535608 * tim_canchi_ngay - 0.0000333 * INT - 0.00000347 * jdFromDate;
	cungmov = 306.0253 + 385.81691806 * tim_canchi_ngay + 0.0107306 * INT + 0.00001236 * jdFromDate;
	timcaci = 21.2964 + 390.67050646 * tim_canchi_ngay - 0.0016528 * INT - 0.00000239 * jdFromDate;
	function_01 = (0.1734 - 0.000393 * cungmov10) * Math.sin(tim_canchi_gio * sLook) + 0.0021 * Math.sin(2 * sLook * tim_canchi_gio);
	function_01 = function_01 - 0.4068 * Math.sin(cungmov * sLook) + 0.0161 * Math.sin(sLook * 2 * cungmov);
	function_01 = function_01 - 0.0004 * Math.sin(sLook * 3 * cungmov);
	function_01 = function_01 + 0.0104 * Math.sin(sLook * 2 * timcaci) - 0.0051 * Math.sin(sLook * (tim_canchi_gio + cungmov));
	function_01 = function_01 - 0.0074 * Math.sin(sLook * (tim_canchi_gio - cungmov)) + 0.0004 * Math.sin(sLook * (2 * timcaci + tim_canchi_gio));
	function_01 = function_01 - 0.0004 * Math.sin(sLook * (2 * timcaci - tim_canchi_gio)) - 0.0006 * Math.sin(sLook * (2 * timcaci + cungmov));
	function_01 = function_01 + 0.001 * Math.sin(sLook * (2 * timcaci - cungmov)) + 0.0005 * Math.sin(sLook * (2 * cungmov + tim_canchi_gio));
	if (cungmov10 < -11) {
		function_02 = 0.001 + 0.000839 * cungmov10 + 0.0002261 * INT - 0.00000845 * jdFromDate - 8.1e-8 * cungmov10 * jdFromDate;
	} else {
		function_02 = -0.000278 + 0.000265 * cungmov10 + 0.000262 * INT;
	}
	tim_canchi_thang = doigiosinh + function_01 - function_02;
	return tim_canchi_thang;
}
function SunLongitude(sLook) {
	var tim_canchi_ngay;
	var tim_canchi_gio;
	var function_02;
	var tim_canchi_thang;
	var doigiosinh;
	var function_01;
	var timcaci;
	tim_canchi_ngay = (sLook - 2451545) / 36525;
	tim_canchi_gio = tim_canchi_ngay * tim_canchi_ngay;
	function_02 = PI / 180;
	tim_canchi_thang = 357.5291 + 35999.0503 * tim_canchi_ngay - 0.0001559 * tim_canchi_gio - 4.8e-7 * tim_canchi_ngay * tim_canchi_gio;
	doigiosinh = 280.46645 + 36000.76983 * tim_canchi_ngay + 0.0003032 * tim_canchi_gio;
	function_01 = (1.9146 - 0.004817 * tim_canchi_ngay - 0.000014 * tim_canchi_gio) * Math.sin(function_02 * tim_canchi_thang);
	function_01 = function_01 + (0.019993 - 0.000101 * tim_canchi_ngay) * Math.sin(function_02 * 2 * tim_canchi_thang) + 0.00029 * Math.sin(function_02 * 3 * tim_canchi_thang);
	timcaci = doigiosinh + function_01;
	timcaci = timcaci * function_02;
	timcaci = timcaci - PI * 2 * Math.floor(timcaci / (PI * 2));
	return timcaci;
}
function getLunarMonth11(doigiosinh, timcaci) {
	var sao;
	var function_02;
	var function_01;
	var sLook;
	function_02 = jdFromDate(31, 12, doigiosinh) - 2415021;
	sao = Math.floor(function_02 / 29.530588853);
	function_01 = Math.floor(NewMoon(sao) + 0.5 + timcaci / 24);
	sLook = Math.floor(SunLongitude(function_01 - 0.5 - timcaci / 24) / PI * 6);
	if (sLook >= 9) {
		function_01 = Math.floor(NewMoon(sao - 1) + 0.5 + timcaci / 24);
	}
	;
	return function_01;
}
function getLeapMonthOffset(sao, doigiosinh) {
	var sLook;
	var timcaci;
	var function_01;
	var function_02;
	sLook = Math.floor((sao - 2415021.076998695) / 29.530588853 + 0.5);
	timcaci = 0;
	function_02 = 1;
	function_01 = Math.floor(SunLongitude(Math.floor(NewMoon(sLook + function_02) + 0.5 + doigiosinh / 24) - 0.5 - doigiosinh / 24) / PI * 6);
	do {
		timcaci = function_01;
		function_02++;
		function_01 = Math.floor(SunLongitude(Math.floor(NewMoon(sLook + function_02) + 0.5 + doigiosinh / 24) - 0.5 - doigiosinh / 24) / PI * 6);
	} while (function_01 != timcaci && function_02 < 14);
	;
	return function_02 - 1;
}
function convertSolar2Lunar(sLook, jdToDate, getSunLongitude, SunLongitude) {
	var doigiosinh;
	var function_02;
	var sNewMoon;
	var sao;
	var function_01;
	var tim_canchi_ngay;
	var cungmov;
	var cungmov10;
	var tim_canchi_gio;
	var timcaci;
	var tim_canchi_thang;
	function_02 = jdFromDate(sLook, jdToDate, getSunLongitude);
	doigiosinh = Math.floor((function_02 - 2415021.076998695) / 29.530588853);
	sNewMoon = Math.floor(NewMoon(doigiosinh + 1) + 0.5 + SunLongitude / 24);
	if (sNewMoon > function_02) {
		sNewMoon = Math.floor(NewMoon(doigiosinh) + 0.5 + SunLongitude / 24);
	}
	;
	sao = getLunarMonth11(getSunLongitude, SunLongitude);
	function_01 = sao;
	if (sao >= sNewMoon) {
		cungmov10 = getSunLongitude;
		sao = getLunarMonth11(getSunLongitude - 1, SunLongitude);
	} else {
		cungmov10 = getSunLongitude + 1;
		function_01 = getLunarMonth11(getSunLongitude + 1, SunLongitude);
	}
	;
	tim_canchi_ngay = function_02 - sNewMoon + 1;
	timcaci = Math.floor((sNewMoon - sao) / 29);
	tim_canchi_gio = 0;
	cungmov = timcaci + 11;
	if (function_01 - sao > 365) {
		tim_canchi_thang = getLeapMonthOffset(sao, SunLongitude);
		if (timcaci >= tim_canchi_thang) {
			cungmov = timcaci + 10;
			if (timcaci == tim_canchi_thang) {
				tim_canchi_gio = 1;
			}
		}
	}
	;
	if (cungmov > 12) {
		cungmov = cungmov - 12;
	}
	;
	if (cungmov >= 11 && timcaci < 4) {
		cungmov10 -= 1;
	}
	;
	return new Array(tim_canchi_ngay, cungmov, cungmov10, tim_canchi_gio);
}
function convertLunar2Solar(doigiosinh, tim_canchi_ngay, tim_canchi_gio, tim_canchi_thang, jdFromDate) {
	var function_02;
	var sao;
	var function_01;
	var cungmov10;
	var timcaci;
	var sLook;
	var cungmov;
	if (tim_canchi_ngay < 11) {
		sao = getLunarMonth11(tim_canchi_gio - 1, jdFromDate);
		function_01 = getLunarMonth11(tim_canchi_gio, jdFromDate);
	} else {
		sao = getLunarMonth11(tim_canchi_gio, jdFromDate);
		function_01 = getLunarMonth11(tim_canchi_gio + 1, jdFromDate);
	}
	;
	function_02 = Math.floor(0.5 + (sao - 2415021.076998695) / 29.530588853);
	cungmov10 = tim_canchi_ngay - 11;
	if (cungmov10 < 0) {
		cungmov10 += 12;
	}
	;
	if (function_01 - sao > 365) {
		timcaci = getLeapMonthOffset(sao, jdFromDate);
		sLook = timcaci - 2;
		if (sLook < 0) {
			sLook += 12;
		}
		;
		if (tim_canchi_thang != 0 && tim_canchi_ngay != sLook) {
			return new Array(0, 0, 0);
		} else {
			if (tim_canchi_thang != 0 || cungmov10 >= timcaci) {
				cungmov10 += 1;
			}
		}
	}
	;
	cungmov = Math.floor(NewMoon(function_02 + cungmov10) + 0.5 + jdFromDate / 24);
	return jdToDate(cungmov + doigiosinh - 1);
}
function TimTuoiAmDuong_TheoCan(function_01) {
	if (function_01 === "Giáp" || function_01 === "Bính" || function_01 === "Mậu" || function_01 === "Canh" || function_01 === "Nhâm") {
		tuoiad = 1;
		return 1;
	} else {
		tuoiad = -1;
		return 0;
	}
}
function TimTuoiAmDuong_TheoChi(function_01) {
	if (function_01 === "Tý" || function_01 === "Dần" || function_01 === "Thìn" || function_01 === "Ngọ" || function_01 === "Thân" || function_01 === "Tuất") {
		tuoiad = 1;
		return 1;
	} else {
		tuoiad = -1;
		return 0;
	}
}
function XD_HanhBanMenh(function_01, function_02) {
	const doigiosinh = [["C/C", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"], ["Tý", "Hải Trung Kim", "", "Giản Hạ Thủy", "", "Tích Lịch Hỏa", "", "Bích Thượng Thổ", "", "Tang Đố Mộc", ""], ["Sửu", "", "Hải Trung Kim", "", "Giản Hạ Thủy", "", "Tích Lịch Hỏa", "", "Bích Thượng Thổ", "", "Tang Đố Mộc"], ["Dần", "Đại Khê Thủy", "", "Lư Trung Hỏa", "", "Thành Đầu Thổ", "", "Tùng Bách Mộc", "", "Kim Bạch Kim", ""], ["Mão", "", "Đại Khê Thủy", "", "Lư Trung Hỏa", "", "Thành Đầu Thổ", "", "Tùng Bách Mộc", "", "Kim Bạch Kim"], ["Thìn", "Phú Đăng Hỏa", "", "Sa Trung Thổ", "", "Đại Lâm Mộc", "", "Bạch Lạp Kim", "", "Trường Lưu Thủy", ""], ["Tỵ", "", "Phú Đăng Hỏa", "", "Sa Trung Thổ", "", "Đại Lâm Mộc", "", "Bạch Lạp Kim", "", "Trường Lưu Thủy"], ["Ngọ", "Sa Trung Kim", "", "Thiên Hà Thủy", "", "Thiên Thượng Hỏa", "", "Lộ Bàng Thổ", "", "Dương Liễu Mộc", ""], ["Mùi", "", "Sa Trung Kim", "", "Thiên Hà Thủy", "", "Thiên Thượng Hỏa", "", "Lộ Bàng Thổ", "", "Dương Liễu Mộc"], ["Thân", "Tuyền Trung Thủy", "", "Sơn Hạ Hỏa", "", "Đại Dịch Thổ", "", "Thạch Lựu Mộc", "", "Kiếm Phong Kim", ""], ["Dậu", "", "Tuyền Trung Thủy", "", "Sơn Hạ Hỏa", "", "Đại Dịch Thổ", "", "Thạch Lực Mộc", "", "Kiếm Phong Kim"], ["Tuất", "Sơn Đầu Hỏa", "", "Ốc Thượng Thổ", "", "Bình Địa Mộc", "", "Thoa Xuyến Kim", "", "Đại Hải Thủy", ""], ["Hợi", "", "Sơn Đầu Hỏa", "", "Ốc Thượng Thổ", "", "Bình Địa Mộc", "", "Thoa Xuyến Kim", "", "Đại Hải Thủy"]];
	for (let sLook = 1; sLook < 11; sLook++) {
		if (function_01 == doigiosinh[0][sLook]) {
			for (let timcaci = 1; timcaci < 13; timcaci++) {
				if (function_02 == doigiosinh[timcaci][0]) {
					return doigiosinh[timcaci][sLook];
				}
			}
		}
	}
	;
	return;
}
function nguhanhnam(function_01) {
	let sLook = ["zzz", "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
	let timcaci = ["Z", "K", "M", "T", "H", "O"];
	for (let function_02 = 1; function_02 < 6; function_02++) {
		if (function_01.indexOf(sLook[function_02]) !== -1) {
			return timcaci[function_02];
		}
	}
}
function xd_vitri_cung_menhthan(sLook, tim_canchi_thang) {
	let function_01 = "";
	let function_02 = "";
	_cungid = 3;
	_cungid = cungmov(_cungid, tim_canchi_thang - 1, 1);
	_cungid = cungmov(_cungid, tabcung.indexOf(sLook) - 1, -1);
	pmenh = _cungid;
	function_01 = tabcung[pmenh];
	_cungid = pmenh;
	pphumau = cungmov(pmenh, 1, 1);
	pphucduc = cungmov(pmenh, 2, 1);
	pdientrach = cungmov(pmenh, 3, 1);
	pquanloc = cungmov(pmenh, 4, 1);
	pnoboc = cungmov(pmenh, 5, 1);
	pthiendi = cungmov(pmenh, 6, 1);
	ptatach = cungmov(pmenh, 7, 1);
	ptaibach = cungmov(pmenh, 8, 1);
	ptutuc = cungmov(pmenh, 9, 1);
	pphuthe = cungmov(pmenh, 10, 1);
	phuynhde = cungmov(pmenh, 11, 1);
	_cungid = 3;
	_cungid = cungmov(_cungid, tim_canchi_thang - 1, 1);
	_cungid = cungmov(_cungid, tabcung.indexOf(sLook) - 1, 1);
	pthan = _cungid;
	function_02 = tabcung[pthan];
	return [function_01, function_02];
}
function tim_cuc_laso(sLook, timcaci) {
	const cungmov10 = [["Can NS", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"], ["Giáp", "Thủy", "Thủy", "Hỏa", "Hỏa", "Mộc", "Mộc", "Thổ", "Thổ", "Kim", "Kim", "Hỏa", "Hỏa"], ["Ất", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Mộc", "Mộc", "Thủy", "Thủy", "Thổ", "Thổ"], ["Bính", "Thổ", "Thổ", "Mộc", "Mộc", "Thủy", "Thủy", "Kim", "Kim", "Hỏa", "Hỏa", "Mộc", "Mộc"], ["Đinh", "Mộc", "Mộc", "Kim", "Kim", "Hỏa", "Hỏa", "Thủy", "Thủy", "Thổ", "Thổ", "Kim", "Kim"], ["Mậu", "Kim", "Kim", "Thủy", "Thủy", "Thổ", "Thổ", "Hỏa", "Hỏa", "Mộc", "Mộc", "Thủy", "Thủy"], ["Kỷ", "Thủy", "Thủy", "Hỏa", "Hỏa", "Mộc", "Mộc", "Thổ", "Thổ", "Kim", "Kim", "Hỏa", "Hỏa"], ["Canh", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Mộc", "Mộc", "Thủy", "Thủy", "Thổ", "Thổ"], ["Tân", "Thổ", "Thổ", "Mộc", "Mộc", "Thủy", "Thủy", "Kim", "Kim", "Hỏa", "Hỏa", "Mộc", "Mộc"], ["Nhâm", "Mộc", "Mộc", "Kim", "Kim", "Hỏa", "Hỏa", "Thủy", "Thủy", "Thổ", "Thổ", "Kim", "Kim"], ["Quý", "Kim", "Kim", "Thủy", "Thủy", "Thổ", "Thổ", "Hỏa", "Hỏa", "Mộc", "Mộc", "Thủy", "Thủy"]];
	const function_01 = ["0", "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
	const tim_canchi_gio = [0, 4, 3, 2, 6, 5];
	const function_02 = ["0", "Kim Tứ Cục", "Mộc Tam Cục", "Thủy Nhị Cục", "Hỏa Lục Cục", "Thổ Ngũ Cục"];
	let tim_canchi_ngay = 0;
	let cungmov = "";
	for (let doigiosinh = 1; doigiosinh < 11; doigiosinh++) {
		if (sLook == cungmov10[doigiosinh][0]) {
			tim_canchi_ngay = doigiosinh;
			break;
		}
	}
	;
	for (let tim_canchi_thang = 1; tim_canchi_thang < 13; tim_canchi_thang++) {
		if (cungmov10[0][tim_canchi_thang] == timcaci) {
			cungmov = cungmov10[tim_canchi_ngay][tim_canchi_thang];
			break;
		}
	}
	;
	for (let doigiosinh = 1; doigiosinh < 6; doigiosinh++) {
		if (cungmov == function_01[doigiosinh]) {
			cungmov = function_02[doigiosinh];
			cuctuoi = tim_canchi_gio[doigiosinh];
			break;
		}
	}
	;
	return cungmov;
}
function vitri_sao_tuvi(doigiosinh, function_01) {
	const tim_canchi_ngay = [[0, "Thủy Nhị Cục", "Mộc Tam Cục", "Kim Tứ Cục", "Thổ Ngũ Cục", "Hỏa Lục Cục"], [1, "Sửu", "Thìn", "Hợi", "Ngọ", "Dậu"], [2, "Dần", "Sửu", "Thìn", "Hợi", "Ngọ"], [3, "Dần", "Dần", "Sửu", "Thìn", "Hợi"], [4, "Mão", "Tỵ", "Dần", "Sửu", "Thìn"], [5, "Mão", "Dần", "Tý", "Dần", "Sửu"], [6, "Thìn", "Mão", "Tỵ", "Mùi", "Dần"], [7, "Thìn", "Ngọ", "Dần", "Tý", "Tuất"], [8, "Tỵ", "Mão", "Mão", "Tỵ", "Mùi"], [9, "Tỵ", "Thìn", "Sửu", "Dần", "Tý"], [10, "Ngọ", "Mùi", "Ngọ", "Mão", "Tỵ"], [11, "Ngọ", "Thìn", "Mão", "Thân", "Dần"], [12, "Mùi", "Tỵ", "Thìn", "Sửu", "Mão"], [13, "Mùi", "Thân", "Dần", "Ngọ", "Hợi"], [14, "Thân", "Tỵ", "Mùi", "Mão", "Thân"], [15, "Thân", "Ngọ", "Thìn", "Thìn", "Sửu"], [16, "Dậu", "Dậu", "Tỵ", "Dậu", "Ngọ"], [17, "Dậu", "Ngọ", "Mão", "Dần", "Mão"], [18, "Tuất", "Mùi", "Thân", "Mùi", "Thìn"], [19, "Tuất", "Tuất", "Tỵ", "Thìn", "Tý"], [20, "Hợi", "Mùi", "Ngọ", "Tỵ", "Dậu"], [21, "Hợi", "Thân", "Thìn", "Tuất", "Dần"], [22, "Tý", "Hợi", "Dậu", "Mão", "Mùi"], [23, "Tý", "Thân", "Ngọ", "Thân", "Thìn"], [24, "Sửu", "Dậu", "Mùi", "Tỵ", "Tỵ"], [25, "Sửu", "Tý", "Tỵ", "Ngọ", "Sửu"], [26, "Dần", "Dậu", "Tuất", "Hợi", "Tuất"], [27, "Dần", "Tuất", "Mùi", "Thìn", "Mão"], [28, "Mão", "Sửu", "Thân", "Dậu", "Thân"], [29, "Mão", "Tuất", "Ngọ", "Ngọ", "Tỵ"], [30, "Thìn", "Hợi", "Hợi", "Mùi", "Ngọ"]];
	let timcaci = 0;
	let tim_canchi_thang = "";
	for (let function_02 = 1; function_02 < 31; function_02++) {
		if (doigiosinh == tim_canchi_ngay[function_02][0]) {
			timcaci = function_02;
			break;
		}
	}
	;
	for (let sLook = 1; sLook < 6; sLook++) {
		if (function_01 == tim_canchi_ngay[0][sLook]) {
			tim_canchi_thang = tim_canchi_ngay[timcaci][sLook];
			break;
		}
	}
	;
	return tim_canchi_thang;
}
function an_chinhtinh(function_01) {
	const cungmov10 = [["TVat", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"], ["Tý", "TUWV_0000", "0000_0000", "PHAH_0000", "0000_0000", "LIEM_PHUV", "AAMH_0000", "THAM_0000", "DONH_CUWH", "VUXV_TUOM", "DUOH_LUOH", "SATH_0000", "COWH_0000"], ["Sửu", "COWD_0000", "TUWD_PHAV", "0000_0000", "PHUB_0000", "AAMH_0000", "LIEH_THAH", "CUWV_0000", "TUOD_0000", "DONM_LUOV", "VUXM_SATH", "DUOH_0000", "0000_0000"], ["Dần", "PHAM_0000", "COWD_0000", "TUWM_PHUM", "AAMH_0000", "THAV_0000", "CUWH_0000", "LIEV_TUOV", "LUOD_0000", "SATM_0000", "DONH_0000", "VUXM_0000", "DUOH_0000"], ["Mão", "DUOH_0000", "PHUB_0000", "COWH_AAMH", "TUWB_THAH", "CUWH_0000", "TUOD_0000", "LUOM_0000", "LIED_SATD", "0000_0000", "0000_0000", "DONH_0000", "VUXH_PHAH"], ["Thìn", "VUXV_PHUV", "AAMD_DUOD", "THAD_0000", "CUWM_COWM", "TUWV_TUOV", "LUOH_0000", "SATM_0000", "0000_0000", "LIEV_0000", "0000_0000", "PHAD_0000", "DONV_0000"], ["Tỵ", "DOND_AAMD", "THAM_VUXM", "CUWD_DUOD", "TUOH_0000", "COWM_LUOM", "TUWD_SATV", "0000_0000", "0000_0000", "0000_0000", "LIEH_PHAH", "0000_0000", "PHUV_0000"], ["Ngọ", "THAH_0000", "DONH_CUWH", "VUXV_TUOM", "DUOD_LUOD", "SATH_0000", "COWV_0000", "TUWM_0000", "0000_0000", "PHAH_0000", "0000_0000", "LIEM_PHUV", "AAMM_0000"], ["Mùi", "CUWV_0000", "TUOD_0000", "DONM_LUOV", "VUXD_SATH", "DUOV_0000", "0000_0000", "COWD_0000", "TUWD_PHAV", "0000_0000", "PHUB_0000", "AAMM_0000", "LIEH_THAH"], ["Thân", "LIEV_TUOV", "LUOD_0000", "SATM_0000", "DOND_0000", "VUXM_0000", "DUOM_0000", "PHAM_0000", "COWD_0000", "TUWM_PHUM", "AAMM_0000", "THAV_0000", "CUWV_0000"], ["Dậu", "LUOV_0000", "LIED_SATD", "0000_0000", "0000_0000", "DONH_0000", "VUXH_PHAH", "DUOM_0000", "PHUD_0000", "COWV_AAMV", "TUWB_THAH", "CUWH_0000", "TUOV_0000"], ["Tuất", "SATM_0000", "0000_0000", "LIEV_0000", "0000_0000", "PHAD_0000", "DOND_0000", "VUXV_PHUM", "AAMD_DUOD", "THAD_0000", "CUWM_COWM", "TUWD_TUOV", "LUOH_0000"], ["Hợi", "0000_0000", "0000_0000", "0000_0000", "LIEH_PHAH", "0000_0000", "PHUM_0000", "DONH_AAMH", "THAM_VUXM", "CUWD_DUOH", "TUOH_0000", "COWM_LUOM", "TUWB_SATM"]];
	const function_02 = ["0", "TUW", "LIE", "DON", "VUX", "DUO", "COW", "PHU", "AAM", "THA", "CUW", "TUO", "LUO", "SAT", "PHA"];
	const timcaci = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	let cungmov = 0;
	str = "";
	for (let doigiosinh = 1; doigiosinh < 13; doigiosinh++) {
		if (function_01 == cungmov10[doigiosinh][0]) {
			cungmov = doigiosinh;
			break;
		}
	}
	;
	for (let tim_canchi_thang = 1; tim_canchi_thang < 13; tim_canchi_thang++) {
		str = cungmov10[cungmov][tim_canchi_thang];
		if (str !== "0000_0000") {
			for (let tim_canchi_ngay = 1; tim_canchi_ngay < 15; tim_canchi_ngay++) {
				if (str.substring(0, 3) == function_02[tim_canchi_ngay]) {
					ct_post[tim_canchi_ngay] = tim_canchi_thang;
					cungansao[tim_canchi_thang][1] = stars[timcaci[tim_canchi_ngay]];
					cungansao[tim_canchi_thang][1][8] = sLook(timcaci[tim_canchi_ngay], tim_canchi_thang);
					nct[tim_canchi_thang] = 1;
					break;
				}
			}
			;
			cungchinhdieu[tim_canchi_thang] = 1;
			if (str.substring(5) !== "0000") {
				for (let tim_canchi_gio = 1; tim_canchi_gio < 15; tim_canchi_gio++) {
					if (str.substring(5, 8) == function_02[tim_canchi_gio]) {
						ct_post[tim_canchi_gio] = tim_canchi_thang;
						cungansao[tim_canchi_thang][2] = stars[timcaci[tim_canchi_gio]];
						cungansao[tim_canchi_thang][2][8] = sLook(timcaci[tim_canchi_gio], tim_canchi_thang);
						nct[tim_canchi_thang] = 2;
						break;
					}
				}
				;
				cungchinhdieu[tim_canchi_thang] = 2;
			}
		} else {
			cungchinhdieu[tim_canchi_thang] = 0;
		}
	}
	;
	return;
}
function an_sao_gio(function_01) {
	const tim_canchi_thang = [[0, "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "00"], [57, "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "ntt"], [58, "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "ntt"], [84, "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "npt"], [85, "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "npt"], [53, "Hợi", "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "n6t"], [54, "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "n6t"]];
	let tim_canchi_ngay = 0;
	let doigiosinh = 0;
	doigiosinh = tabcung.indexOf(function_01);
	for (let function_02 = 1; function_02 < 7; function_02++) {
		for (let timcaci = 1; timcaci < 13; timcaci++) {
			if (tabcung[timcaci] == tim_canchi_thang[function_02][doigiosinh]) {
				tim_canchi_ngay = timcaci;
				if (function_02 == 1) {
					ct_post[15] = timcaci;
				}
				;
				if (function_02 == 2) {
					ct_post[16] = timcaci;
				}
			}
		}
		;
		if (tim_canchi_thang[function_02][13] == "ntt") {
			cungansao[tim_canchi_ngay][ptt + ntt[tim_canchi_ngay]] = stars[tim_canchi_thang[function_02][0]];
			cungansao[tim_canchi_ngay][ptt + ntt[tim_canchi_ngay]][8] = sLook(tim_canchi_thang[function_02][0], tim_canchi_ngay);
			ntt[tim_canchi_ngay]++;
		} else {
			if (tim_canchi_thang[function_02][13] == "npt") {
				cungansao[tim_canchi_ngay][ppt + npt[tim_canchi_ngay]] = stars[tim_canchi_thang[function_02][0]];
				cungansao[tim_canchi_ngay][ppt + npt[tim_canchi_ngay]][8] = sLook(tim_canchi_thang[function_02][0], tim_canchi_ngay);
				npt[tim_canchi_ngay]++;
			} else {
				if (tim_canchi_thang[function_02][13] == "nst") {
					cungansao[tim_canchi_ngay][pst + nst[tim_canchi_ngay]] = stars[tim_canchi_thang[function_02][0]];
					cungansao[tim_canchi_ngay][pst + nst[tim_canchi_ngay]][8] = sLook(tim_canchi_thang[function_02][0], tim_canchi_ngay);
					nst[tim_canchi_ngay]++;
				} else {
					if (tim_canchi_thang[function_02][13] == "n6t") {
						cungansao[tim_canchi_ngay][p6t + n6t[tim_canchi_ngay]] = stars[tim_canchi_thang[function_02][0]];
						cungansao[tim_canchi_ngay][p6t + n6t[tim_canchi_ngay]][8] = sLook(tim_canchi_thang[function_02][0], tim_canchi_ngay);
						n6t[tim_canchi_ngay]++;
					}
				}
			}
		}
	}
	;
	return;
}
function an_sao_thang(tim_canchi_thang) {
	const doigiosinh = [[0, "Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12", "0"], [62, "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "ntt"], [61, "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "ntt"], [81, "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "npt"], [82, "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "npt"], [75, "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "npt"], [74, "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "nst"], [73, "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "thân", "nst"]];
	let timcaci = 0;
	let tim_canchi_ngay = 0;
	timcaci = tim_canchi_thang;
	for (let function_01 = 1; function_01 < 8; function_01++) {
		for (let function_02 = 1; function_02 < 13; function_02++) {
			if (tabcung[function_02] == doigiosinh[function_01][timcaci]) {
				tim_canchi_ngay = function_02;
				if (function_01 == 1) {
					ct_post[17] = function_02;
				}
				;
				if (function_01 == 2) {
					ct_post[18] = function_02;
				}
			}
		}
		;
		if (doigiosinh[function_01][13] == "ntt") {
			cungansao[tim_canchi_ngay][ptt + ntt[tim_canchi_ngay]] = stars[doigiosinh[function_01][0]];
			cungansao[tim_canchi_ngay][ptt + ntt[tim_canchi_ngay]][8] = sLook(doigiosinh[function_01][0], tim_canchi_ngay);
			ntt[tim_canchi_ngay]++;
		}
		;
		if (doigiosinh[function_01][13] == "npt") {
			cungansao[tim_canchi_ngay][ppt + npt[tim_canchi_ngay]] = stars[doigiosinh[function_01][0]];
			cungansao[tim_canchi_ngay][ppt + npt[tim_canchi_ngay]][8] = sLook(doigiosinh[function_01][0], tim_canchi_ngay);
			npt[tim_canchi_ngay]++;
		}
		;
		if (doigiosinh[function_01][13] == "nst") {
			cungansao[tim_canchi_ngay][pst + nst[tim_canchi_ngay]] = stars[doigiosinh[function_01][0]];
			cungansao[tim_canchi_ngay][pst + nst[tim_canchi_ngay]][8] = sLook(doigiosinh[function_01][0], tim_canchi_ngay);
			nst[tim_canchi_ngay]++;
		}
		;
		if (doigiosinh[function_01][13] == "n6t") {
			cungansao[tim_canchi_ngay][p6t + n6t[tim_canchi_ngay]] = stars[doigiosinh[function_01][0]];
			cungansao[tim_canchi_ngay][p6t + n6t[tim_canchi_ngay]][8] = sLook(doigiosinh[function_01][0], tim_canchi_ngay);
			n6t[tim_canchi_ngay]++;
		}
	}
	;
	return;
}
function an_sao_theo_can_cua_nam_sinh(function_02) {
	const INT = [[0, "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý", "0"], [51, "Sửu", "Dần", "Thìn", "Tỵ", "Thìn", "Tỵ", "Mùi", "Thân", "Tuất", "Hợi", "n6t"], [109, "Dần", "Mão", "Tỵ", "Ngọ", "Tỵ", "Ngọ", "Thân", "Dậu", "Hợi", "Tý", "ntt"], [52, "Mão", "Thìn", "Ngọ", "Mùi", "Ngọ", "Mùi", "Dậu", "Tuất", "Tý", "Sửu", "n6t"], [76, "Tuất", "Hợi", "Sửu", "Dần", "Sửu", "Dần", "Thìn", "Tỵ", "Mùi", "Thân", "npt"], [77, "Mùi", "Thân", "Tuất", "Hợi", "Tuất", "Hợi", "Sửu", "Dần", "Thìn", "Tỵ", "npt"], [106, "Tỵ", "Ngọ", "Thân", "Dậu", "Thân", "Dậu", "Hợi", "Tý", "Dậu", "Mão", "npt"], [59, "Sửu", "Tý", "Hợi", "Hợi", "Sửu", "Tý", "Ngọ", "Ngọ", "Mão", "Mão", "ntt"], [60, "Mùi", "Thân", "Dậu", "Dậu", "Mùi", "Thân", "Dần", "Dần", "Tỵ", "Tỵ", "ntt"], [100, "Mùi", "Thìn", "Tỵ", "Dần", "Mão", "Dậu", "Hợi", "Dậu", "Tuất", "Ngọ", "npt"], [101, "Dậu", "Thân", "Tý", "Hợi", "Mão", "Dần", "Ngọ", "Tỵ", "Ngọ", "Tỵ", "npt"], [102, "Dậu", "Tuất", "Mùi", "Thìn", "Tị", "Ngọ", "Thân", "Mão", "Hợi", "Dần", "nst"], [103, "Tỵ", "Ngọ", "Tý", "Tỵ", "Ngọ", "Thân", "Dần", "Ngọ", "Dậu", "Tuất", "npt"], [92, "Liêm Trinh", "Thiên Cơ", "Thiên Đồng", "Thái Âm", "Tham Lang", "Vũ Khúc", "Thái Dương", "Cự Môn", "Thiên Lương", "Phá Quân", "ntt"], [93, "Phá Quân", "Thiên Lương", "Thiên Cơ", "Thiên Đồng", "Thái Âm", "Tham Lang", "Vũ Khúc", "Thái Đương", "Tử Vi", "Cự Môn", "ntt"], [94, "Vũ Khúc", "Tử Vi", "Văn Xương", "Thiên Cơ", "Hữu Bật", "Thiên Lương", "Thiên Đồng", "Văn Khúc", "Tả Phụ", "Thái Âm", "ntt"], [95, "Thái Dương", "Thái Âm", "Liêm Trinh", "Cự Môn", "Thiên Cơ", "Văn Khúc", "Thái Âm", "Văn Xương", "Vũ Khúc", "Tham Lang", "nst"], [199, "THA_DAU", "NGO_MUI", "THI_TYJ", "DAN_MAO", "TIS_SUU", "THA_DAU", "NGO_MUI", "THI_TYJ", "DAN_MAO", "TIS_SUU"]];
	let cungmov10 = 0;
	let jdToDate = 0;
	let cungmov = "";
	let doigiosinh = ["Giáp Ngọ", "Giáp Dần", "Giáp Tuất", "Ất Hợi", "Ất Mão", "Ất Mùi", "Canh Thân", "Canh Tý", "Canh Thìn", "Tân Tỵ", "Tân Dậu", "Tân Sửu"];
	let tim_canchi_thang = ["Giáp Thìn", "Giáp Thân", "Giáp Tý", "Ất Tỵ", "Ất Dậu", "Ất Sửu", "Canh Dần", "Canh Ngọ", "Canh Tuất", "Tân Hợi", "Tân Mão", "Tân Mùi"];
	let timcaci = cannam + " " + chinam;
	const function_01 = ["0", "TIS", "SUU", "DAN", "MAO", "THI", "TYJ", "NGO", "MUI", "THA", "DAU", "TUA", "HOI"];
	cungmov10 = tabcannam.indexOf(function_02);
	for (let tim_canchi_ngay = 1; tim_canchi_ngay < 13; tim_canchi_ngay++) {
		for (let tim_canchi_gio = 1; tim_canchi_gio < 13; tim_canchi_gio++) {
			if (tabcung[tim_canchi_gio] == INT[tim_canchi_ngay][cungmov10]) {
				jdToDate = tim_canchi_gio;
				if (tim_canchi_ngay == 2) {
					plocton = tim_canchi_gio;
				}
			}
		}
		;
		if (INT[tim_canchi_ngay][11] == "ntt") {
			cungansao[jdToDate][ptt + ntt[jdToDate]] = stars[INT[tim_canchi_ngay][0]];
			cungansao[jdToDate][ptt + ntt[jdToDate]][8] = sLook(INT[tim_canchi_ngay][0], jdToDate);
			if (tim_canchi_ngay == 2) {
				if (doigiosinh.includes(timcaci)) {
					cungansao[jdToDate][ptt + ntt[jdToDate]][7] = "🪙";
				} else {
					if (tim_canchi_thang.includes(timcaci)) {
						cungansao[jdToDate][ptt + ntt[jdToDate]][7] = "🍀";
					} else {
						cungansao[jdToDate][ptt + ntt[jdToDate]][7] = "zzz";
					}
				}
			}
			;
			ntt[jdToDate]++;
		} else {
			if (INT[tim_canchi_ngay][11] == "npt") {
				cungansao[jdToDate][ppt + npt[jdToDate]] = stars[INT[tim_canchi_ngay][0]];
				cungansao[jdToDate][ppt + npt[jdToDate]][8] = sLook(INT[tim_canchi_ngay][0], jdToDate);
				npt[jdToDate]++;
			} else {
				if (INT[tim_canchi_ngay][11] == "nst") {
					cungansao[jdToDate][pst + nst[jdToDate]] = stars[INT[tim_canchi_ngay][0]];
					cungansao[jdToDate][pst + nst[jdToDate]][8] = sLook(INT[tim_canchi_ngay][0], jdToDate);
					nst[jdToDate]++;
				} else {
					if (INT[tim_canchi_ngay][11] == "n6t") {
						cungansao[jdToDate][p6t + n6t[jdToDate]] = stars[INT[tim_canchi_ngay][0]];
						cungansao[jdToDate][p6t + n6t[jdToDate]][8] = sLook(INT[tim_canchi_ngay][0], jdToDate);
						n6t[jdToDate]++;
					}
				}
			}
		}
	}
	;
	cungmov = INT[17][cungmov10];
	for (let tim_canchi_gio = 1; tim_canchi_gio < 13; tim_canchi_gio++) {
		if (cungmov.substring(0, 3) == function_01[tim_canchi_gio]) {
			triet_post[1] = tim_canchi_gio;
			cungansao[tim_canchi_gio][ptriet] = stars[saotriet];
			cungansao[tim_canchi_gio + 1][ptriet] = stars[saotriet];
			if (tim_canchi_gio == 12) {
				triet_post[2] = 1;
				cungansao[1][ptriet] = stars[saotriet];
			}
			;
			break;
		}
	}
	;
	return;
}
function AnTuHoa(tim_canchi_thang, doigiosinh) {
	const cungmov10 = [["zzz", "Khâm Thiên Môn", "Mân Phái", "Trung Châu Phái", "Tử Vi Đẩu Số Toàn Thư"], ["Giáp", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương"], ["Ất", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm"], ["Bính", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm"], ["Đinh", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự"], ["Mậu", "Tham Âm Bật Cơ", "Tham Âm Bật Cơ", "Tham Âm Dương Cơ", "Tham Âm Bật Cơ"], ["Kỷ", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc"], ["Canh", "Dương Vũ Âm Đồng", "Dương Vũ Đồng Âm", "Dương Vũ Phủ Đồng", "Dương Vũ Đồng Tướng"], ["Tân", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương"], ["Nhâm", "Lương Tử Phụ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phụ Vũ"], ["Quý", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham"]];
	const function_02 = ["zzz", "Tử", "Liêm", "Đồng", "Vũ", "Dương", "Cơ", "Phủ", "Âm", "Tham", "Cự", "Tướng", "Lương", "Sát", "Phá", "Xương", "Khúc", "Bật", "Phụ"];
	const timcaci = [92, 93, 94, 95];
	let cungmov = tabcannam.indexOf(tim_canchi_thang);
	let function_01 = cungmov10[cungmov][doigiosinh];
	tuhoa = function_01.split(" ");
	for (let tim_canchi_ngay = 0; tim_canchi_ngay < 4; tim_canchi_ngay++) {
		for (let tim_canchi_gio = 1; tim_canchi_gio < 19; tim_canchi_gio++) {
			if (tuhoa[tim_canchi_ngay] == function_02[tim_canchi_gio]) {
				if (tim_canchi_ngay < 3) {
					cungansao[ct_post[tim_canchi_gio]][ptt + ntt[ct_post[tim_canchi_gio]]] = stars[timcaci[tim_canchi_ngay]];
					cungansao[ct_post[tim_canchi_gio]][ptt + ntt[ct_post[tim_canchi_gio]]][8] = sLook(timcaci[tim_canchi_ngay], ct_post[tim_canchi_gio]);
					ntt[ct_post[tim_canchi_gio]]++;
				} else {
					cungansao[ct_post[tim_canchi_gio]][pst + nst[ct_post[tim_canchi_gio]]] = stars[timcaci[tim_canchi_ngay]];
					cungansao[ct_post[tim_canchi_gio]][pst + nst[ct_post[tim_canchi_gio]]][8] = sLook(timcaci[tim_canchi_ngay], ct_post[tim_canchi_gio]);
					nst[ct_post[tim_canchi_gio]]++;
				}
			}
		}
	}
}
function ansao_chinam(function_01) {
	const doigiosinh = [[0, "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "00"], [98, "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "npt"], [105, "Thìn", "Sửu", "Tuất", "Mùi", "Thìn", "Sửu", "Tuất", "Mùi", "Thìn", "Sửu", "Tuất", "Mùi", "npt"], [104, "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "nst"], [78, "Dậu", "Ngọ", "Mão", "Tý", "Dậu", "Ngọ", "Mão", "Tý", "Dậu", "Ngọ", "Mão", "Tý", "npt"], [99, "Tỵ", "Sửu", "Dậu", "Tỵ", "Sửu", "Dậu", "Tỵ", "Sửu", "Dậu", "Tỵ", "Sửu", "Dậu", "nst"], [96, "Dần", "Dần", "Tỵ", "Tỵ", "Tỵ", "Thân", "Thân", "Thân", "Hợi", "Hợi", "Hợi", "Dần", "nst"], [97, "Tuất", "Tuất", "Sửu", "Sửu", "Sửu", "Thìn", "Thìn", "Thìn", "Mùi", "Mùi", "Mùi", "Tuất", "nst"], [108, "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "nst"], [69, "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "Dậu", "Thân", "Mùi", "nst"], [70, "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "nst"], [71, "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "npt"], [72, "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "npt"], [79, "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "npt"], [80, "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "npt"], [63, "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "npt"], [64, "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "npt"], [83, "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "npt"]];
	let timcaci = 0;
	let tim_canchi_thang = 0;
	timcaci = tabcung.indexOf(function_01);
	for (let function_02 = 1; function_02 < 18; function_02++) {
		for (k = 1; k < 13; k++) {
			if (tabcung[k] == doigiosinh[function_02][timcaci]) {
				tim_canchi_thang = k;
			}
		}
		;
		if (doigiosinh[function_02][13] == "npt") {
			cungansao[tim_canchi_thang][ppt + npt[tim_canchi_thang]] = stars[doigiosinh[function_02][0]];
			cungansao[tim_canchi_thang][ppt + npt[tim_canchi_thang]][8] = sLook(doigiosinh[function_02][0], tim_canchi_thang);
			npt[tim_canchi_thang]++;
		}
		;
		if (doigiosinh[function_02][13] == "nst") {
			cungansao[tim_canchi_thang][pst + nst[tim_canchi_thang]] = stars[doigiosinh[function_02][0]];
			cungansao[tim_canchi_thang][pst + nst[tim_canchi_thang]][8] = sLook(doigiosinh[function_02][0], tim_canchi_thang);
			nst[tim_canchi_thang]++;
		}
	}
	;
	return;
}
function an_thaitue(function_02) {
	const tim_canchi_thang = ["nst", "npt", "nst", "npt", "nst", "nst", "nst", "npt", "nst", "npt", "nst", "nst"];
	const tim_canchi_ngay = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
	let function_01 = 0;
	function_01 = tabcung.indexOf(function_02);
	cungansao[function_01][pst + nst[function_01]] = stars[15];
	cungansao[function_01][pst + nst[function_01]][8] = sLook(15, function_01);
	nst[function_01]++;
	pthatue[1] = function_01;
	for (let timcaci = 1; timcaci < 12; timcaci++) {
		function_01 = cungmov(function_01, 1, 1);
		if (tim_canchi_thang[timcaci] == "npt") {
			cungansao[function_01][ppt + npt[function_01]] = stars[tim_canchi_ngay[timcaci]];
			cungansao[function_01][ppt + npt[function_01]][8] = sLook(tim_canchi_ngay[timcaci], function_01);
			npt[function_01]++;
		}
		;
		if (tim_canchi_thang[timcaci] == "nst") {
			cungansao[function_01][pst + nst[function_01]] = stars[tim_canchi_ngay[timcaci]];
			cungansao[function_01][pst + nst[function_01]][8] = sLook(tim_canchi_ngay[timcaci], function_01);
			nst[function_01]++;
		}
	}
}
function ansaotuan(function_01, function_02) {
	const INT = [["C/C", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"], ["Tý", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z"], ["Sửu", "Z", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO"], ["Dần", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z"], ["Mão", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ"], ["Thìn", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI", "Z"], ["Tỵ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU", "Z", "NGO_MUI"], ["Ngọ", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU", "Z"], ["Mùi", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z", "THA_DAU"], ["Thân", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI", "Z"], ["Dậu", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z", "TUA_HOI"], ["Tuất", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU", "Z"], ["Hợi", "Z", "THA_DAU", "Z", "NGO_MUI", "Z", "THI_TYJ", "Z", "DAN_MAO", "Z", "TIS_SUU"]];
	let cungmov = 0;
	let cungmov10 = 0;
	let sLook = "";
	let tim_canchi_gio = ["z", "TIS", "SUU", "DAN", "MAO", "THI", "TYJ", "NGO", "MUI", "THA", "DAU", "TUA", "HOI"];
	for (let timcaci = 1; timcaci < 13; timcaci++) {
		if (function_02 == INT[timcaci][0]) {
			cungmov = timcaci;
			break;
		}
	}
	;
	for (let doigiosinh = 1; doigiosinh < 11; doigiosinh++) {
		if (function_01 == INT[0][doigiosinh]) {
			cungmov10 = doigiosinh;
			break;
		}
	}
	;
	if (INT[cungmov][cungmov10] == "Z") {
		document.write("Lỗi! Kiểm tra bảng dữ liệu tabtuan." + INT[cungmov][cungmov10] + cungmov + " " + cungmov10);
		document.write("<br />");
		return;
	}
	;
	sLook = INT[cungmov][cungmov10];
	for (let tim_canchi_thang = 1; tim_canchi_thang < 13; tim_canchi_thang++) {
		if (sLook.substring(0, 3) == tim_canchi_gio[tim_canchi_thang]) {
			tuan_post[1] = tim_canchi_thang;
			cungansao[tim_canchi_thang][ptuan] = stars[saotuan];
		}
	}
	;
	for (let tim_canchi_ngay = 1; tim_canchi_ngay < 13; tim_canchi_ngay++) {
		if (sLook.substring(4) == tim_canchi_gio[tim_canchi_ngay]) {
			tuan_post[2] = tim_canchi_ngay;
			cungansao[tim_canchi_ngay][ptuan] = stars[saotuan];
		}
	}
	;
	return;
}
function anhoalinh(function_01, function_02) {
	const tim_canchi_ngay = ["z", "Dần Ngọ Tuất", "Thân Tý Thìn", "Tỵ Dậu Sửu", "Hợi Mão Mùi"];
	const doigiosinh = ["Hỏa Tinh", "Sửu", "Dần", "Mão", "Dậu"];
	const tim_canchi_thang = ["Linh Tinh", "Mão", "Tuất", "Tuất", "Tuất"];
	for (let timcaci = 1; timcaci < 5; timcaci++) {
		if (tim_canchi_ngay[timcaci].includes(function_01)) {
			if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
				_cungid = tabcung.indexOf(doigiosinh[timcaci]);
				_cungid = cungmov(_cungid, tabcung.indexOf(function_02) - 1, 1);
				cungansao[_cungid][p6t + n6t[_cungid]] = stars[saohoatinh];
				cungansao[_cungid][p6t + n6t[_cungid]][8] = sLook(saohoatinh, _cungid);
				n6t[_cungid]++;
				_cungid = tabcung.indexOf(tim_canchi_thang[timcaci]);
				_cungid = cungmov(_cungid, tabcung.indexOf(function_02) - 1, -1);
				cungansao[_cungid][p6t + n6t[_cungid]] = stars[saolinhtinh];
				cungansao[_cungid][p6t + n6t[_cungid]][8] = sLook(saolinhtinh, _cungid);
				n6t[_cungid]++;
			}
			;
			if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
				_cungid = tabcung.indexOf(doigiosinh[timcaci]);
				_cungid = cungmov(_cungid, tabcung.indexOf(function_02) - 1, -1);
				cungansao[_cungid][p6t + n6t[_cungid]] = stars[saohoatinh];
				cungansao[_cungid][p6t + n6t[_cungid]][8] = sLook(saohoatinh, _cungid);
				n6t[_cungid]++;
				_cungid = tabcung.indexOf(tim_canchi_thang[timcaci]);
				_cungid = cungmov(_cungid, tabcung.indexOf(function_02) - 1, 1);
				cungansao[_cungid][p6t + n6t[_cungid]] = stars[saolinhtinh];
				cungansao[_cungid][p6t + n6t[_cungid]][8] = sLook(saolinhtinh, _cungid);
				n6t[_cungid]++;
			}
			;
			break;
		}
	}
	;
	return;
}
function anvong_bacsy(function_02) {
	const doigiosinh = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
	const tim_canchi_thang = ["npt", "npt", "npt", "nst", "nst", "npt", "nst", "npt", "nst", "nst", "nst", "nst"];
	let function_01 = function_02;
	if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
		cungansao[function_01][ppt + npt[function_01]] = stars[saobacsy];
		cungansao[function_01][ppt + npt[function_01]][8] = sLook(saobacsy, function_01);
		npt[function_01]++;
		for (let timcaci = 1; timcaci < 12; timcaci++) {
			function_01 = cungmov(function_01, 1, 1);
			if (tim_canchi_thang[timcaci] == "npt") {
				cungansao[function_01][ppt + npt[function_01]] = stars[doigiosinh[timcaci]];
				cungansao[function_01][ppt + npt[function_01]][8] = sLook(doigiosinh[timcaci], function_01);
				npt[function_01]++;
			}
			;
			if (tim_canchi_thang[timcaci] == "nst") {
				cungansao[function_01][pst + nst[function_01]] = stars[doigiosinh[timcaci]];
				cungansao[function_01][pst + nst[function_01]][8] = sLook(doigiosinh[timcaci], function_01);
				nst[function_01]++;
			}
		}
	}
	;
	if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
		cungansao[function_01][ppt + npt[function_01]] = stars[saobacsy];
		cungansao[function_01][ppt + npt[function_01]][8] = sLook(saobacsy, function_01);
		npt[function_01]++;
		for (let timcaci = 1; timcaci < 12; timcaci++) {
			function_01 = cungmov(function_01, 1, -1);
			if (tim_canchi_thang[timcaci] == "npt") {
				cungansao[function_01][ppt + npt[function_01]] = stars[doigiosinh[timcaci]];
				cungansao[function_01][ppt + npt[function_01]][8] = sLook(doigiosinh[timcaci], function_01);
				npt[function_01]++;
			}
			;
			if (tim_canchi_thang[timcaci] == "nst") {
				cungansao[function_01][pst + nst[function_01]] = stars[doigiosinh[timcaci]];
				cungansao[function_01][pst + nst[function_01]][8] = sLook(doigiosinh[timcaci], function_01);
				nst[function_01]++;
			}
		}
	}
}
function antrangsinh(function_01) {
	const timcaci = ["0", "Thủy Nhị Cục", "Mộc Tam Cục", "Kim Tứ Cục", "Thổ Ngũ Cục", "Hỏa Lục Cục"];
	const doigiosinh = [0, 9, 12, 6, 9, 3];
	const tim_canchi_thang = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
	let function_02 = 0;
	for (let sLook = 1; sLook < 6; sLook++) {
		if (function_01 == timcaci[sLook]) {
			function_02 = doigiosinh[sLook];
			break;
		}
	}
	;
	if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
		cungansao[function_02][38] = stars[saotrangsinh];
		for (let sLook = 1; sLook < 12; sLook++) {
			function_02 = cungmov(function_02, 1, 1);
			cungansao[function_02][38] = stars[tim_canchi_thang[sLook]];
		}
		;
		return;
	}
	;
	if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
		cungansao[function_02][38] = stars[saotrangsinh];
		for (let sLook = 1; sLook < 12; sLook++) {
			function_02 = cungmov(function_02, 1, -1);
			cungansao[function_02][38] = stars[tim_canchi_thang[sLook]];
		}
	}
	;
	return;
}
function antapdieu() {
	let function_01 = 0;
	let timcaci;
	let [function_02, sLook] = xd_vitri_cung_menhthan(giosinhAL, thangsinhAL);
	const tim_canchi_thang = ["", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
	function_01 = ct_post[15];
	function_01 = cungmov(function_01, ngaysinhAL - 1, 1);
	function_01 = cungmov(function_01, 1, -1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saoanquang];
	npt[function_01]++;
	function_01 = ct_post[16];
	function_01 = cungmov(function_01, ngaysinhAL - 1, -1);
	function_01 = cungmov(function_01, 1, 1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saothienquy];
	npt[function_01]++;
	function_01 = ct_post[18];
	function_01 = cungmov(function_01, ngaysinhAL - 1, 1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saotamthai];
	npt[function_01]++;
	function_01 = ct_post[17];
	function_01 = cungmov(function_01, ngaysinhAL - 1, -1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saobattoa];
	npt[function_01]++;
	function_01 = pthatue[1];
	function_01 = cungmov(function_01, thangsinhAL - 1, -1);
	timcaci = tim_canchi_thang.indexOf(giosinhAL);
	function_01 = cungmov(function_01, timcaci - 1, 1);
	cungansao[function_01][pst + nst[function_01]] = stars[saodauquan];
	nst[function_01]++;
	function_01 = tim_canchi_thang.indexOf(function_02);
	timcaci = tim_canchi_thang.indexOf(chinam);
	function_01 = cungmov(function_01, timcaci - 1, 1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saothientai];
	npt[function_01]++;
	function_01 = tim_canchi_thang.indexOf(sLook);
	timcaci = tim_canchi_thang.indexOf(chinam);
	function_01 = cungmov(function_01, timcaci - 1, 1);
	cungansao[function_01][ppt + npt[function_01]] = stars[saothientho];
	npt[function_01]++;
	function_01 = tim_canchi_thang.indexOf(function_02);
	function_01 = cungmov(function_01, 5, 1);
	cungansao[function_01][pst + nst[function_01]] = stars[saothienthuong];
	nst[function_01]++;
	function_01 = tim_canchi_thang.indexOf(function_02);
	function_01 = cungmov(function_01, 7, 1);
	cungansao[function_01][pst + nst[function_01]] = stars[saothiensu];
	nst[function_01]++;
	cungansao[5][pst + nst[5]] = stars[saothienla];
	nst[5]++;
	cungansao[11][pst + nst[11]] = stars[saodiavong];
	nst[11]++;
	function_01 = tim_canchi_thang.indexOf(function_02);
	for (let doigiosinh = 1; doigiosinh < 13; doigiosinh++) {
		cungansao[function_01][0][1] = tttcung[doigiosinh];
		tencung[function_01] = tttcung_rg[doigiosinh];
		function_01 = cungmov(function_01, 1, 1);
	}
	;
	function_01 = tim_canchi_thang.indexOf(sLook);
	cungansao[function_01][0][2] = "THÂN";
}
function cungghitieuhan(function_01) {
	const sLook = ["z", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
	const timcaci = [0, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5, 2];
	let function_02 = timcaci[sLook.indexOf(function_01)];
	return function_02;
}
function cungghinguyethan(function_01, sLook, function_02) {
	let sao = function_01;
	sao = cungmov(sao, sLook - 1, -1);
	sao = cungmov(sao, function_02 - 1, 1);
	return sao;
}
function AnLuuTuHoa(tim_canchi_ngay, tim_canchi_thang) {
	const jdFromDate = [["zzz", "Khâm Thiên Môn", "Mân Phái", "Trung Châu Phái", "Tử Vi Đẩu Số Toàn Thư"], ["Giáp", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương"], ["Ất", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm"], ["Bính", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm"], ["Đinh", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự"], ["Mậu", "Tham Âm Bật Cơ", "Tham Âm Bật Cơ", "Tham Âm Dương Cơ", "Tham Âm Bật Cơ"], ["Kỷ", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc"], ["Canh", "Dương Vũ Âm Đồng", "Dương Vũ Đồng Âm", "Dương Vũ Phủ Đồng", "Dương Vũ Đồng Tướng"], ["Tân", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương"], ["Nhâm", "Lương Tử Phụ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phụ Vũ"], ["Quý", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham"]];
	const timcaci = ["zzz", "Tử", "Liêm", "Đồng", "Vũ", "Dương", "Cơ", "Phủ", "Âm", "Tham", "Cự", "Tướng", "Lương", "Sát", "Phá", "Xương", "Khúc", "Bật", "Phụ"];
	const function_02 = [119, 120, 121, 122];
	const doigiosinh = [92, 93, 94, 95];
	let INT = tabcannam.indexOf(tim_canchi_ngay);
	let function_01 = jdFromDate[INT][tim_canchi_thang];
	let cungmov10 = function_01.split(" ");
	for (let tim_canchi_gio = 0; tim_canchi_gio < 4; tim_canchi_gio++) {
		for (let cungmov = 1; cungmov < 19; cungmov++) {
			if (cungmov10[tim_canchi_gio] == timcaci[cungmov]) {
				if (tim_canchi_gio < 3) {
					cungansao[ct_post[cungmov]][plncat + lncat[ct_post[cungmov]]] = stars[function_02[tim_canchi_gio]];
					cungansao[ct_post[cungmov]][plncat + lncat[ct_post[cungmov]]][8] = sLook(doigiosinh[tim_canchi_gio], ct_post[cungmov]);
					lncat[ct_post[cungmov]]++;
				} else {
					cungansao[ct_post[cungmov]][plnsat + lnsat[ct_post[cungmov]]] = stars[function_02[tim_canchi_gio]];
					cungansao[ct_post[cungmov]][plnsat + lnsat[ct_post[cungmov]]][8] = sLook(doigiosinh[tim_canchi_gio], ct_post[cungmov]);
					lnsat[ct_post[cungmov]]++;
				}
			}
		}
	}
	;
	return;
}
function luucacsao() {
	if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
		let function_01 = cuctuoi;
		for (let getLunarMonth11 = 0; getLunarMonth11 < 12; getLunarMonth11++) {
			cungansao[cungmov(pmenh, getLunarMonth11, 1)][39][1] = function_01;
			function_01 += 10;
		}
	}
	;
	if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
		let function_01 = cuctuoi;
		for (let getLunarMonth11 = 0; getLunarMonth11 < 12; getLunarMonth11++) {
			cungansao[cungmov(pmenh, getLunarMonth11, -1)][39][1] = function_01;
			function_01 += 10;
		}
	}
	;
	const NewMoon = ["Z", "MỆNH", "PHỤ", "PHÚC", "ĐIỀN", "QUAN", "NÔ", "DI", "TẬT", "TÀI", "TỬ", "PHỐI", "BÀO"];
	const SunLongitude = ["Z", "Mệnh", "Phụ", "Phúc", "Điền", "Quan", "Nô", "Di", "Tật", "Tài", "Tử", "Phối", "Bào"];
	let tim_canchi_thang = 0;
	let jdFromDate = 0;
	let tim_canchi_ngay = "";
	cungdaihan = 0;
	cungluudaihan = 0;
	cungtieuhan = 0;
	cungnguyethan = 0;
	tuoiduongso = 0;
	tuoiduongso = namxemhan - namsinhAL + 1;
	for (let getLunarMonth11 = 1; getLunarMonth11 < 13; getLunarMonth11++) {
		if (tuoiduongso >= cungansao[getLunarMonth11][39][1] && tuoiduongso < cungansao[getLunarMonth11][39][1] + 10) {
			cungdaihan = getLunarMonth11;
			tim_canchi_thang = getLunarMonth11;
			for (let getLeapMonthOffset = 0; getLeapMonthOffset < 12; getLeapMonthOffset++) {
				cungansao[cungmov(tim_canchi_thang, getLeapMonthOffset, 1)][40][1] = "ĐV-" + NewMoon[getLeapMonthOffset + 1];
			}
			;
			let jdToDate = tuoiduongso - cungansao[tim_canchi_thang][39][1];
			if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
				if (jdToDate == 0) {
					cungluudaihan = cungdaihan;
				} else {
					if (jdToDate == 1) {
						cungluudaihan = cungmov(cungdaihan, 6, 1);
					} else {
						if (jdToDate == 2) {
							cungluudaihan = cungmov(cungdaihan, 5, 1);
						} else {
							if (jdToDate == 3) {
								cungluudaihan = cungmov(cungdaihan, 6, 1);
							} else {
								if (jdToDate == 4) {
									cungluudaihan = cungmov(cungdaihan, 7, 1);
								} else {
									if (jdToDate == 5) {
										cungluudaihan = cungmov(cungdaihan, 8, 1);
									} else {
										if (jdToDate == 6) {
											cungluudaihan = cungmov(cungdaihan, 9, 1);
										} else {
											if (jdToDate == 7) {
												cungluudaihan = cungmov(cungdaihan, 10, 1);
											} else {
												if (jdToDate == 8) {
													cungluudaihan = cungmov(cungdaihan, 11, 1);
												} else {
													if (jdToDate == 9) {
														cungluudaihan = cungdaihan;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				;
				for (let convertLunar2Solar = 0; convertLunar2Solar < 12; convertLunar2Solar++) {
					cungansao[cungmov(cungluudaihan, convertLunar2Solar, 1)][41][1] = "Lđv-" + SunLongitude[convertLunar2Solar + 1];
				}
				;
				break;
			} else {
				if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
					if (jdToDate == 0) {
						cungluudaihan = cungdaihan;
					} else {
						if (jdToDate == 1) {
							cungluudaihan = cungmov(cungdaihan, 6, 1);
						} else {
							if (jdToDate == 2) {
								cungluudaihan = cungmov(cungdaihan, 7, 1);
							} else {
								if (jdToDate == 3) {
									cungluudaihan = cungmov(cungdaihan, 6, 1);
								} else {
									if (jdToDate == 4) {
										cungluudaihan = cungmov(cungdaihan, 5, 1);
									} else {
										if (jdToDate == 5) {
											cungluudaihan = cungmov(cungdaihan, 4, 1);
										} else {
											if (jdToDate == 6) {
												cungluudaihan = cungmov(cungdaihan, 3, 1);
											} else {
												if (jdToDate == 7) {
													cungluudaihan = cungmov(cungdaihan, 2, 1);
												} else {
													if (jdToDate == 8) {
														cungluudaihan = cungmov(cungdaihan, 1, 1);
													} else {
														if (jdToDate == 9) {
															cungluudaihan = cungdaihan;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					;
					for (let convertLunar2Solar = 0; convertLunar2Solar < 12; convertLunar2Solar++) {
						cungansao[cungmov(cungluudaihan, convertLunar2Solar, 1)][41][1] = "Lđv-" + SunLongitude[convertLunar2Solar + 1];
					}
					;
					break;
				}
			}
		}
	}
	;
	[_can_namxem, _chi_namxem] = timcaci(6, 6, Math.floor(namxemhan), 7);
	let tim_canchi_gio = cungghitieuhan(chinam);
	for (let getLunarMonth11 = 0; getLunarMonth11 < 12; getLunarMonth11++) {
		tim_canchi_thang = tim_canchi_gio;
		if (gtinh == "Nam") {
			cungansao[cungmov(tim_canchi_thang, getLunarMonth11, 1)][42][1] = tabcung[cungmov(tabcung.indexOf(chinam), getLunarMonth11, 1)];
		} else {
			if (gtinh == "Nữ") {
				cungansao[cungmov(tim_canchi_thang, getLunarMonth11, -1)][42][1] = tabcung[cungmov(tabcung.indexOf(chinam), getLunarMonth11, 1)];
			}
		}
	}
	;
	cungtieuhan = _chi_namxem;
	let function_02 = 0;
	let doigiosinh = 0;
	for (let getLunarMonth11 = 1; getLunarMonth11 < 13; getLunarMonth11++) {
		if (cungansao[getLunarMonth11][42][1] == cungtieuhan) {
			doigiosinh = getLunarMonth11;
			break;
		}
	}
	;
	tim_canchi_thang = doigiosinh;
	cungansao[tim_canchi_thang][44][1] = "Tv Mệnh";
	for (let getLunarMonth11 = 1; getLunarMonth11 < 12; getLunarMonth11++) {
		cungansao[cungmov(tim_canchi_thang, getLunarMonth11, 1)][44][1] = "Tv " + SunLongitude[getLunarMonth11 + 1];
	}
	;
	function_02 = cungghinguyethan(tim_canchi_thang, thangsinhAL, tabcung.indexOf(giosinhAL));
	tim_canchi_thang = function_02;
	cungansao[tim_canchi_thang][43][1] = "Tháng 1";
	cungansao[tim_canchi_thang][43][2] = 1;
	let INT = 0;
	for (let getLeapMonthOffset = 1; getLeapMonthOffset < 12; getLeapMonthOffset++) {
		INT = getLeapMonthOffset + 1;
		cungansao[cungmov(tim_canchi_thang, getLeapMonthOffset, 1)][43][1] = "Tháng " + INT.toString();
		cungansao[cungmov(tim_canchi_thang, getLeapMonthOffset, 1)][43][2] = INT;
	}
	;
	let getSunLongitude = new Date;
	let getNewMoonDay = getSunLongitude.getDate();
	let XD_HanhBanMenh = getSunLongitude.getMonth() + 1;
	let ansao_chinam = getSunLongitude.getFullYear();
	let AnTuHoa = ["z", "1,13,25", "2,14,26", "3,15,27", "4,16,28", "5,17,29", "6,18,30", "7,19", "8,20", "9,21", "10,22", "11,23", "12,24"];
	ngayamlichHT = convertSolar2Lunar(Math.floor(getNewMoonDay), Math.floor(XD_HanhBanMenh), Math.floor(ansao_chinam), 7);
	for (let getLunarMonth11 = 1; getLunarMonth11 < 13; getLunarMonth11++) {
		if (cungansao[getLunarMonth11][43][2] == ngayamlichHT[1]) {
			tim_canchi_thang = getLunarMonth11;
			break;
		}
	}
	;
	cungansao[tim_canchi_thang][43][3] = "1,13,25";
	for (let getLeapMonthOffset = 1; getLeapMonthOffset < 12; getLeapMonthOffset++) {
		tim_canchi_thang = cungmov(tim_canchi_thang, 1, 1);
		cungansao[tim_canchi_thang][43][3] = AnTuHoa[getLeapMonthOffset + 1];
	}
	;
	for (let getLunarMonth11 = 1; getLunarMonth11 < 13; getLunarMonth11++) {
		lncat[getLunarMonth11] = 0;
		lnsat[getLunarMonth11] = 0;
	}
	;
	tim_canchi_thang = tabcung.indexOf(_chi_namxem);
	pluuthaitue = tim_canchi_thang;
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolthaitue];
	cungansao[tim_canchi_thang][45][1] = tencungluuhan[1];
	for (let getLunarMonth11 = 2; getLunarMonth11 < 13; getLunarMonth11++) {
		pluuthaitue = cungmov(pluuthaitue, 1, 1);
		if (gtinh == "Nam" && getLunarMonth11 == 11) {
			cungansao[pluuthaitue][45][1] = "L.THÊ";
		} else {
			cungansao[pluuthaitue][45][1] = tencungluuhan[getLunarMonth11];
		}
	}
	;
	pluuthaitue = tim_canchi_thang;
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = cungmov(tim_canchi_thang, 2, 1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saoltangmon];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saotangmon, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = cungmov(tim_canchi_thang, 6, 1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolbachho];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saobachho, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = tabcung.indexOf("Ngọ");
	jdFromDate = tabcung.indexOf(_chi_namxem) - 1;
	tim_canchi_thang = cungmov(tim_canchi_thang, jdFromDate, -1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolthienkhoc];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saothienkhoc, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = tabcung.indexOf("Ngọ");
	jdFromDate = tabcung.indexOf(_chi_namxem) - 1;
	tim_canchi_thang = cungmov(tim_canchi_thang, jdFromDate, 1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolthienhu];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saothienhu, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = tabcannam.indexOf(_can_namxem);
	tim_canchi_ngay = tabllocton[tim_canchi_thang];
	tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
	pluulocton = tim_canchi_thang;
	cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saollocton];
	cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]][8] = sLook(saolocton, tim_canchi_thang);
	lncat[tim_canchi_thang]++;
	tim_canchi_thang = cungmov(tim_canchi_thang, 1, 1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolkinhduong];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saokinhduong, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = cungmov(tim_canchi_thang, 2, -1);
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saoldala];
	cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]][8] = sLook(saodala, tim_canchi_thang);
	lnsat[tim_canchi_thang]++;
	tim_canchi_thang = tabcung.indexOf(_chi_namxem);
	tim_canchi_ngay = tablthienma[tim_canchi_thang];
	tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
	cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolthienma];
	lncat[tim_canchi_thang]++;
	if (TuViDienToan.hiencacsaoluukhac == true) {
		const an_sao_thang = [59, "Sửu", "Tý", "Hợi", "Hợi", "Sửu", "Tý", "Ngọ", "Ngọ", "Mão", "Mão", "ntt"];
		const an_sao_theo_can_cua_nam_sinh = [60, "Mùi", "Thân", "Dậu", "Dậu", "Mùi", "Thân", "Dần", "Dần", "Tỵ", "Tỵ", "ntt"];
		for (let getLunarMonth11 = 1; getLunarMonth11 < 11; getLunarMonth11++) {
			if (_can_namxem == tabcannam[getLunarMonth11]) {
				tim_canchi_ngay = an_sao_thang[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolthienkhoi];
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]][8] = sLook(saothienkhoi, tim_canchi_thang);
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = an_sao_theo_can_cua_nam_sinh[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolthienviet];
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]][8] = sLook(saothienviet, tim_canchi_thang);
				lncat[tim_canchi_thang]++;
				break;
			}
		}
		;
		const nguhanhnam = [78, "Dậu", "Ngọ", "Mão", "Tý", "Dậu", "Ngọ", "Mão", "Tý", "Dậu", "Ngọ", "Mão", "Tý", "npt"];
		const xd_vitri_cung_menhthan = [79, "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "npt"];
		const an_sao_gio = [79, "Dậu", "Thân", "Mùi", "Ngọ", "Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "npt"];
		const an_chinhtinh = [71, "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "npt"];
		const vitri_sao_tuvi = [72, "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "npt"];
		const tim_cuc_laso = [104, "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "nst"];
		for (let getLunarMonth11 = 1; getLunarMonth11 < 13; getLunarMonth11++) {
			if (_chi_namxem == tabcung[getLunarMonth11]) {
				tim_canchi_ngay = nguhanhnam[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saoldaohoa];
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = xd_vitri_cung_menhthan[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolhongloan];
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = an_sao_gio[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolthienhy];
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = an_chinhtinh[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolthienduc];
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = vitri_sao_tuvi[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolnguyetduc];
				lncat[tim_canchi_thang]++;
				tim_canchi_ngay = tim_cuc_laso[getLunarMonth11];
				tim_canchi_thang = tabcung.indexOf(tim_canchi_ngay);
				cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saolkiepsat];
				lnsat[tim_canchi_thang]++;
				break;
			}
		}
		;
		tim_canchi_thang = pluulocton;
		if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
			tim_canchi_thang = cungmov(tim_canchi_thang, 7, 1);
			cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[148];
			lncat[tim_canchi_thang]++;
		}
		;
		if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
			tim_canchi_thang = cungmov(tim_canchi_thang, 7, -1);
			cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[148];
			lncat[tim_canchi_thang]++;
		}
		;
		tim_canchi_thang = tabcung.indexOf(_chi_namxem);
		tim_canchi_thang = cungmov(tim_canchi_thang, 7, 1);
		cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saollongduc];
		lncat[tim_canchi_thang]++;
		tim_canchi_thang = tabcung.indexOf(_chi_namxem);
		tim_canchi_thang = cungmov(tim_canchi_thang, thangsinhAL - 1, -1);
		let cungmov10 = tabcung.indexOf(giosinhAL);
		tim_canchi_thang = cungmov(tim_canchi_thang, cungmov10 - 1, 1);
		cungansao[tim_canchi_thang][plnsat + lnsat[tim_canchi_thang]] = stars[saoldauquan];
		lnsat[tim_canchi_thang]++;
		const TimTuoiAmDuong_TheoChi = ["z", "Tỵ", "Ngọ", "Thân", "Dậu", "Thân", "Dậu", "Hợi", "Tý", "Dần", "Mão"];
		const TimTuoiAmDuong_TheoCan = ["z", "Dậu", "Thân", "Ngọ", "Tỵ", "Ngọ", "Tỵ", "Mão", "Dần", "Tý", "Hợi"];
		tim_canchi_thang = tabcung.indexOf(TimTuoiAmDuong_TheoChi[tabcannam.indexOf(_can_namxem)]);
		cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolvanxuong];
		cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]][8] = sLook(saovanxuong, tim_canchi_thang);
		lncat[tim_canchi_thang]++;
		tim_canchi_thang = tabcung.indexOf(TimTuoiAmDuong_TheoCan[tabcannam.indexOf(_can_namxem)]);
		cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]] = stars[saolvankhuc];
		cungansao[tim_canchi_thang][plncat + lncat[tim_canchi_thang]][8] = sLook(saovankhuc, tim_canchi_thang);
		lncat[tim_canchi_thang]++;
	}
	;
	return;
}
function timtuongquanmenhcuc(sLook, function_01) {
	let tim_canchi_gio = ["Z", "O", "K", "T", "M", "H"];
	let tim_canchi_thang = nguhanhnam(nguhanhbanmenh);
	let tim_canchi_ngay = nguhanhnam(function_01);
	let timcaci = tim_canchi_gio.indexOf(tim_canchi_thang);
	let function_02 = tim_canchi_gio.indexOf(tim_canchi_ngay);
	let doigiosinh = (5 + timcaci - function_02) % 5;
	switch (doigiosinh) {
		case 0:
		return "Mệnh Cục Bình Hòa";
		case 1:
		return "Cục Sinh Mệnh";
		case 2:
		return "Cục Khắc Mệnh";
		case 3:
		return "Mệnh Khắc Cục";
		case 4:
		return "Mệnh Sinh Cục";
	}
	;
	return;
}
function timsaochumenh(sao) {
	saochumenh = tabsaochumenh[sao];
	saochumenh_id = tabsaochumenh_id[sao];
	return;
}
function timsaochuthan(function_01) {
	let function_02 = tabcung.indexOf(function_01);
	saochuthan = tabsaochuthan[function_02];
	saochuthan_id = tabsaochuthan_id[function_02];
	return;
}
function napthiencan_cung() {
	const tim_canchi_ngay = ["zzz", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
	const timcaci = ["zzz", "Bính", "Mậu", "Canh", "Nhâm", "Giáp", "Bính", "Mậu", "Canh", "Nhâm", "Giáp"];
	const doigiosinh = ["zzz", "B.", "M.", "C.", "N.", "G.", "B.", "M.", "C.", "N.", "G."];
	const tim_canchi_thang = ["zzz", "G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."];
	let function_02 = 0;
	let function_01 = 0;
	let jdFromDate = 0;
	let jdToDate = 0;
	for (let tim_canchi_gio = 1; tim_canchi_gio < 13; tim_canchi_gio++) {
		if (tim_canchi_ngay[tim_canchi_gio] == cannam) {
			can_cung[3] = doigiosinh[tim_canchi_gio];
			can_cung_full[3] = timcaci[tim_canchi_gio];
			nguhanh_canchi[3] = nguhanhnam(XD_HanhBanMenh(can_cung_full[3], tabcung[3]));
			function_01 = tim_canchi_thang.indexOf(doigiosinh[tim_canchi_gio]);
			function_02 = 3;
			for (let INT = 1; INT < 12; INT++) {
				function_01 = cungmov10(function_01, 1, 1);
				function_02 = cungmov(function_02, 1, 1);
				can_cung[function_02] = tim_canchi_thang[function_01];
				can_cung_full[function_02] = tim_canchi_ngay[function_01];
				nguhanh_canchi[function_02] = nguhanhnam(XD_HanhBanMenh(can_cung_full[function_02], tabcung[function_02]));
			}
		}
	}
	;
	str_lainhan = "";
	str_nguyenthan = "";
	function_02 = pmenh;
	let sLook = 0;
	if (tuoiamduong == "Dương Nam" || tuoiamduong == "Âm Nữ") {
		sLook = 1;
	} else {
		if (tuoiamduong == "Âm Nam" || tuoiamduong == "Dương Nữ") {
			sLook = -1;
		}
	}
	;
	for (let tim_canchi_gio = 1; tim_canchi_gio < 13; tim_canchi_gio++) {
		if (can_cung_full[function_02] == cannam) {
			jdToDate += 1;
			lainhancung_id[jdToDate] = function_02;
			lainhancung[jdToDate] = cungansao[function_02][0][1];
			str_lainhan += lainhancung[jdToDate] + ", ";
		}
		;
		if (nguhanh_canchi[function_02] == nguhanhnam(nguhanhbanmenh)) {
			jdFromDate += 1;
			nguyenthancung_id[jdFromDate] = function_02;
			nguyenthancung[jdFromDate] = cungansao[function_02][0][1];
			str_nguyenthan += nguyenthancung[jdFromDate] + ", ";
		}
		;
		function_02 = cungmov(function_02, 1, sLook);
	}
	;
	str_lainhan = str_lainhan.substring(0, str_lainhan.length - 2);
	str_nguyenthan = str_nguyenthan.substring(0, str_nguyenthan.length - 2);
	return;
}
function battrach(sLook, function_01) {
	const tim_canchi_thang = ["Nam", "Khảm", "Ly", "Cấn", "Đoài", "Càn", "Khôn", "Tốn", "Chấn", "Khôn"];
	const tim_canchi_ngay = ["Nữ", "Cấn", "Càn", "Đoài", "Cấn", "Ly", "Khảm", "Khôn", "Chấn", "Tốn"];
	const doigiosinh = [["Quái Số", "Sinh Khí", "Thiên Y", "Diên Niên", "Phục Vị", "Họa Hại", "Ngũ Quỷ", "Lục Sát", "Tuyệt Mệnh"], [1, "Đông Nam", "Đông", "Nam", "Bắc", "Tây", "Đông Bắc", "Tây Bắc", "Tây Nam"], [2, "Đông Bắc", "Tây", "Tây Bắc", "Tây Nam", "Đông", "Đông Nam", "Nam", "Bắc"], [3, "Nam", "Bắc", "Đông Nam", "Đông", "Tây Nam", "Tây Bắc", "Đông Bắc", "Tây"], [4, "Bắc", "Nam", "Đông", "Đông Nam", "Tây Bắc", "Tây Nam", "Tây", "Đông Bắc"], [5, "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz"], [6, "Tây", "Đông Băc", "Tây Nam", "Tây Bắc", "Đông nam", "Đông", "Bắc", "Nam"], [7, "Tây Bắc", "Tây Nam", "Đông Bắc", "Tây", "Bắc", "Nam", "Đông Nam", "Đông"], [8, "Tây Nam", "Tây Bắc", "Tây", "Đông Bắc", "Nam", "Bắc", "Đông", "Đông Nam"], [9, "Đông", "Đông Nam", "Bắc", "Nam", "Đông Bắc", "Tây", "Tây Nam", "Tây Bắc"]];
	let function_02 = 0;
	let cungmov = 0;
	let timcaci = "";
	let tim_canchi_gio = 0;
	function_02 = tinhTongSoHang(sLook);
	tim_canchi_gio = function_02 % 9;
	if (tim_canchi_gio == 0) {
		tim_canchi_gio = 9;
	}
	;
	if (function_01 == "Nam") {
		cungViBatQuai = tim_canchi_thang[tim_canchi_gio];
	} else {
		cungViBatQuai = tim_canchi_ngay[tim_canchi_gio];
	}
	;
	cungmov = tinh2TongSoHangCuoi(sLook);
	if (function_01 == "Nam") {
		if (sLook < 2e3) {
			cungmov = Math.abs(10 - cungmov);
		} else {
			cungmov = Math.abs(9 - cungmov);
		}
		;
		if (cungmov == 5) {
			cungmov = 2;
		}
		;
		if (cungmov == 0) {
			cungmov = 9;
		}
	} else {
		if (sLook < 2e3) {
			cungmov = 5 + cungmov;
		} else {
			cungmov = 6 + cungmov;
		}
		;
		if (cungmov > 9) {
			timcaci = cungmov.toString();
			cungmov = parseInt(timcaci[0]) + parseInt(timcaci[1]);
			if (cungmov == 5) {
				cungmov = 8;
			}
		}
	}
	;
	BatTu[0] = cungViBatQuai;
	BatTu[1] = doigiosinh[cungmov][1];
	BatTu[2] = doigiosinh[cungmov][2];
	BatTu[3] = doigiosinh[cungmov][3];
	BatTu[4] = doigiosinh[cungmov][4];
	BatTu[5] = doigiosinh[cungmov][5];
	BatTu[6] = doigiosinh[cungmov][6];
	BatTu[7] = doigiosinh[cungmov][7];
	BatTu[8] = doigiosinh[cungmov][8];
}
function tinhTongSoHang(function_01) {
	var function_02 = 0;
	while (function_01 > 0) {
		function_02 += function_01 % 10;
		function_01 = Math.floor(function_01 / 10);
	}
	;
	return function_02;
}
function tinh2TongSoHangCuoi(function_02) {
	var sLook = 0;
	var function_01 = function_02 % 100;
	sLook = Math.floor(function_01 / 10) + function_01 % 10;
	if (sLook > 10) {
		sLook = Math.floor(sLook / 10) + sLook % 10;
	}
	;
	return sLook;
}
function phicungtuhoa(function_01) {
	const INT = [["zzz", "Khâm Thiên Môn", "Mân Phái", "Trung Châu Phái", "Tử Vi Đẩu Số Toàn Thư"], ["Giáp", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương", "Liêm Phá Vũ Dương"], ["Ất", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm", "Cơ Lương Tử Âm"], ["Bính", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm", "Đồng Cơ Xương Liêm"], ["Đinh", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự", "Âm Đồng Cơ Cự"], ["Mậu", "Tham Âm Bật Cơ", "Tham Âm Bật Cơ", "Tham Âm Dương Cơ", "Tham Âm Bật Cơ"], ["Kỷ", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc", "Vũ Tham Lương Khúc"], ["Canh", "Dương Vũ Âm Đồng", "Dương Vũ Đồng Âm", "Dương Vũ Phủ Đồng", "Dương Vũ Đồng Tướng"], ["Tân", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương", "Cự Dương Khúc Xương"], ["Nhâm", "Lương Tử Phụ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phủ Vũ", "Lương Tử Phụ Vũ"], ["Quý", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham", "Phá Cự Âm Tham"]];
	const tim_canchi_ngay = ["zzz", "Tử", "Liêm", "Đồng", "Vũ", "Dương", "Cơ", "Phủ", "Âm", "Tham", "Cự", "Tướng", "Lương", "Sát", "Phá", "Xương", "Khúc", "Bật", "Phụ"];
	let jdFromDate = new Array(4);
	let cungmov = "";
	let cungmov10 = 0;
	let function_02 = "";
	let sLook = "";
	let timcaci = "";
	let doigiosinh = "";
	let tim_canchi_thang = "";
	for (let tim_canchi_gio = 1; tim_canchi_gio < 13; tim_canchi_gio++) {
		cungmov10 = tabcannam.indexOf(can_cung_full[tim_canchi_gio]);
		cungmov = INT[cungmov10][function_01];
		jdFromDate = cungmov.split(" ");
		function_02 = cungansao[tim_canchi_gio][0][1];
		sLook = tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[0])]];
		sLook = sLook.toUpperCase();
		if (!function_02.includes(sLook)) {
			if (gtinh == "Nữ" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[0])]] == "Phu") {
				cungansao[tim_canchi_gio][62][1] = "Lộc → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[0])]];
			} else {
				if (gtinh == "Nam" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[0])]] == "Phu") {
					cungansao[tim_canchi_gio][62][1] = "Lộc → Thê";
				} else {
					cungansao[tim_canchi_gio][62][1] = "Lộc → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[0])]];
				}
			}
		} else {
			cungansao[tim_canchi_gio][62][1] = "Lộc tự hóa";
		}
		;
		if (function_02 == "HUYNH ĐỆ" && sLook == "BÀO") {
			cungansao[tim_canchi_gio][62][1] = "Lộc tự hóa";
		}
		;
		timcaci = tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[1])]];
		timcaci = timcaci.toUpperCase();
		if (!function_02.includes(timcaci)) {
			if (gtinh == "Nữ" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[1])]] == "Phu") {
				cungansao[tim_canchi_gio][62][2] = "Quyền → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[1])]];
			} else {
				if (gtinh == "Nam" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[1])]] == "Phu") {
					cungansao[tim_canchi_gio][62][2] = "Quyền → Thê";
				} else {
					cungansao[tim_canchi_gio][62][2] = "Quyền → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[1])]];
				}
			}
		} else {
			cungansao[tim_canchi_gio][62][2] = "Quyền tự hóa";
		}
		;
		if (function_02 == "HUYNH ĐỆ" && timcaci == "BÀO") {
			cungansao[tim_canchi_gio][62][2] = "Quyền tự hóa";
		}
		;
		doigiosinh = tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[2])]];
		doigiosinh = doigiosinh.toUpperCase();
		if (!function_02.includes(doigiosinh)) {
			if (gtinh == "Nữ" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[2])]] == "Phu") {
				cungansao[tim_canchi_gio][62][3] = "Khoa → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[2])]];
			} else {
				if (gtinh == "Nam" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[2])]] == "Phu") {
					cungansao[tim_canchi_gio][62][3] = "Khoa → Thê";
				} else {
					cungansao[tim_canchi_gio][62][3] = "Khoa → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[2])]];
				}
			}
		} else {
			cungansao[tim_canchi_gio][62][3] = "Khoa tự hóa";
		}
		;
		if (function_02 == "HUYNH ĐỆ" && doigiosinh == "BÀO") {
			cungansao[tim_canchi_gio][62][3] = "Khoa tự hóa";
		}
		;
		tim_canchi_thang = tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[3])]];
		tim_canchi_thang = tim_canchi_thang.toUpperCase();
		if (!function_02.includes(tim_canchi_thang)) {
			if (gtinh == "Nữ" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[3])]] == "Phu") {
				cungansao[tim_canchi_gio][62][4] = "Kỵ → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[3])]];
			} else {
				if (gtinh == "Nam" && tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[3])]] == "Phu") {
					cungansao[tim_canchi_gio][62][4] = "Kỵ → Thê";
				} else {
					cungansao[tim_canchi_gio][62][4] = "Kỵ → " + tencung[ct_post[tim_canchi_ngay.indexOf(jdFromDate[3])]];
				}
			}
		} else {
			cungansao[tim_canchi_gio][62][4] = "Kỵ tự hóa";
		}
		;
		if (function_02 == "HUYNH ĐỆ" && tim_canchi_thang == "BÀO") {
			cungansao[tim_canchi_gio][62][4] = "Kỵ tự hóa";
		}
	}
}
function VongTuongTinh() {
	let doigiosinh = [saotuongtinh, saophanan, 0, saotucthan, 0, 0, saotaisat, saothiensat, saochiboi, 0, saonguyetsat, saovongthan];
	let function_02 = [["z", "z", "z"], ["z", "Dần Ngọ Tuất", "Ngọ"], ["z", "Thân Tý Thìn", "Tý"], ["z", "Tỵ Dậu Sửu", "Dậu"], ["z", "Hợi Mão Mùi", "Mão"]];
	for (let sLook = 1; sLook < 5; sLook++) {
		if (function_02[sLook][1].includes(chinam)) {
			let function_01 = tabcung.indexOf(function_02[sLook][2]);
			cungansao[function_01][pst + nst[function_01]] = stars[doigiosinh[0]];
			nst[function_01]++;
			for (let timcaci = 1; timcaci < 12; timcaci++) {
				if (doigiosinh !== 0) {
					function_01 = cungmov(function_01, 1, 1);
					cungansao[function_01][pst + nst[function_01]] = stars[doigiosinh[timcaci]];
					nst[function_01]++;
				}
			}
			;
			break;
		}
	}
}
function SaoAmSat() {
	const function_02 = ["z", "Dần", "Tý", "Tuất", "Thân", "Ngọ", "Thìn", "Dần", "Tý", "Tuất", "Thân", "Ngọ", "Thìn"];
	let function_01 = tabcung.indexOf(function_02[thangsinhAL]);
	cungansao[function_01][pst + nst[function_01]] = stars[saoamsat];
	nst[function_01]++;
}
function GetSao_Possittion(sao) {
	let sLook = 0;
	for (let function_01 = 1; function_01 < 13; function_01++) {
		for (let function_02 = 1; function_02 < 63; function_02++) {
			sLook = cungansao[function_01][function_02][0];
			switch (sLook) {
				case saotuvi:
				p_saotuvi = function_01;
				break;
				case saoliemtrinh:
				p_saoliemtrinh = function_01;
				break;
				case saothiendong:
				p_saothiendong = function_01;
				break;
				case saovukhuc:
				p_saovukhuc = function_01;
				break;
				case saothaiduong:
				p_saothaiduong = function_01;
				break;
				case saothienco:
				p_saothienco = function_01;
				break;
				case saothienphu:
				p_saothienphu = function_01;
				break;
				case saothaiam:
				p_saothaiam = function_01;
				break;
				case saothamlang:
				p_saothamlang = function_01;
				break;
				case saocumon:
				p_saocumon = function_01;
				break;
				case saothientuong:
				p_saothientuong = function_01;
				break;
				case saothienluong:
				p_saothienluong = function_01;
				break;
				case saothatsat:
				p_saothatsat = function_01;
				break;
				case saophaquan:
				p_saophaquan = function_01;
				break;
				case saothaitue:
				p_saothaitue = function_01;
				break;
				case saothieuduong:
				p_saothieuduong = function_01;
				break;
				case saotangmon:
				p_saotangmon = function_01;
				break;
				case saothieuam:
				p_saothieuam = function_01;
				break;
				case saoquanphuf:
				p_saoquanphuf = function_01;
				break;
				case saotuphu:
				p_saotuphu = function_01;
				break;
				case saotuepha:
				p_saotuepha = function_01;
				break;
				case saolongduc:
				p_saolongduc = function_01;
				break;
				case saobachho:
				p_saobachho = function_01;
				break;
				case saophucduc:
				p_saophucduc = function_01;
				break;
				case saodieukhach:
				p_saodieukhach = function_01;
				break;
				case saotrucphu:
				p_saotrucphu = function_01;
				break;
				case saobacsy:
				p_saobacsy = function_01;
				break;
				case saolucsi:
				p_saolucsi = function_01;
				break;
				case saothanhlong:
				p_saothanhlong = function_01;
				break;
				case saotieuhao:
				p_saotieuhao = function_01;
				break;
				case saotuongquan:
				p_saotuongquan = function_01;
				break;
				case saotauthu:
				p_saotauthu = function_01;
				break;
				case saophiliem:
				p_saophiliem = function_01;
				break;
				case saohythan:
				p_saohythan = function_01;
				break;
				case saobenhphu:
				p_saobenhphu = function_01;
				break;
				case saodaihao:
				p_saodaihao = function_01;
				break;
				case saophucbinh:
				p_saophucbinh = function_01;
				break;
				case saoquanphur:
				p_saoquanphur = function_01;
				break;
				case saotrangsinh:
				p_saotrangsinh = function_01;
				break;
				case saomocduc:
				p_saomocduc = function_01;
				break;
				case saoquandoi:
				p_saoquandoi = function_01;
				break;
				case saolamquan:
				p_saolamquan = function_01;
				break;
				case saodevuong:
				p_saodevuong = function_01;
				break;
				case saosuy:
				p_saosuy = function_01;
				break;
				case saobenh:
				p_saobenh = function_01;
				break;
				case saotu:
				p_saotu = function_01;
				break;
				case saomo:
				p_saomo = function_01;
				break;
				case saotuyet:
				p_saotuyet = function_01;
				break;
				case saothai:
				p_saothai = function_01;
				break;
				case saoduong:
				p_saoduong = function_01;
				break;
				case saodala:
				p_saodala = function_01;
				break;
				case saokinhduong:
				p_saokinhduong = function_01;
				break;
				case saodiakhong:
				p_saodiakhong = function_01;
				break;
				case saodiakiep:
				p_saodiakiep = function_01;
				break;
				case saolinhtinh:
				p_saolinhtinh = function_01;
				break;
				case saohoatinh:
				p_saohoatinh = function_01;
				break;
				case saovanxuong:
				p_saovanxuong = function_01;
				break;
				case saovankhuc:
				p_saovankhuc = function_01;
				break;
				case saothienkhoi:
				p_saothienkhoi = function_01;
				break;
				case saothienviet:
				p_saothienviet = function_01;
				break;
				case saotaphu:
				p_saotaphu = function_01;
				break;
				case saohuubat:
				p_saohuubat = function_01;
				break;
				case saolongtri:
				p_saolongtri = function_01;
				break;
				case saophuongcac:
				p_saophuongcac = function_01;
				break;
				case saotamthai:
				p_saotamthai = function_01;
				break;
				case saobattoa:
				p_saobattoa = function_01;
				break;
				case saoanquang:
				p_saoanquang = function_01;
				break;
				case saothienquy:
				p_saothienquy = function_01;
				break;
				case saothienkhoc:
				p_saothienkhoc = function_01;
				break;
				case saothienhu:
				p_saothienhu = function_01;
				break;
				case saothienduc:
				p_saothienduc = function_01;
				break;
				case saonguyetduc:
				p_saonguyetduc = function_01;
				break;
				case saothienhinh:
				p_saothienhinh = function_01;
				break;
				case saothienrieu:
				p_saothienrieu = function_01;
				break;
				case saothieny:
				p_saothieny = function_01;
				break;
				case saoquocan:
				p_saoquocan = function_01;
				break;
				case saoduongphu:
				p_saoduongphu = function_01;
				break;
				case saodaohoa:
				p_saodaohoa = function_01;
				break;
				case saohongloan:
				p_saohongloan = function_01;
				break;
				case saothienhy:
				p_saothienhy = function_01;
				break;
				case saothiengiai:
				p_saothiengiai = function_01;
				break;
				case saodiagiai:
				p_saodiagiai = function_01;
				break;
				case saogiaithan:
				p_saogiaithan = function_01;
				break;
				case saothaiphu:
				p_saothaiphu = function_01;
				break;
				case saophongcao:
				p_saophongcao = function_01;
				break;
				case saothientai:
				p_saothientai = function_01;
				break;
				case saothientho:
				p_saothientho = function_01;
				break;
				case saothienthuong:
				p_saothienthuong = function_01;
				break;
				case saothiensu:
				p_saothiensu = function_01;
				break;
				case saothienla:
				p_saothienla = function_01;
				break;
				case saodiavong:
				p_saodiavong = function_01;
				break;
				case saohoaloc:
				p_saohoaloc = function_01;
				break;
				case saohoaquyen:
				p_saohoaquyen = function_01;
				break;
				case saohoakhoa:
				p_saohoakhoa = function_01;
				break;
				case saohoaky:
				p_saohoaky = function_01;
				break;
				case saocothan:
				p_saocothan = function_01;
				break;
				case saoquatu:
				p_saoquatu = function_01;
				break;
				case saothienma:
				p_saothienma = function_01;
				break;
				case saophatoai:
				p_saophatoai = function_01;
				break;
				case saothienquan:
				p_saothienquan = function_01;
				break;
				case saothienphuc:
				p_saothienphuc = function_01;
				break;
				case saoluuha:
				p_saoluuha = function_01;
				break;
				case saothientru:
				p_saothientru = function_01;
				break;
				case saokiepsat:
				p_saokiepsat = function_01;
				break;
				case saohoacai:
				p_saohoacai = function_01;
				break;
				case saovantinh:
				p_saovantinh = function_01;
				break;
				case saodauquan:
				p_saodauquan = function_01;
				break;
				case saothienkhong:
				p_saothienkhong = function_01;
				break;
				case saolocton:
				p_saolocton = function_01;
				break;
				case saolhoaloc:
				p_saolhoaloc = function_01;
				break;
				case saolhoaquyen:
				p_saolhoaquyen = function_01;
				break;
				case saolhoakhoa:
				p_saolhoakhoa = function_01;
				break;
				case saolhoaky:
				p_saolhoaky = function_01;
				break;
				case saotuongtinh:
				p_saotuongtinh = function_01;
				break;
				case saophanan:
				p_saophanan = function_01;
				break;
				case saotuedich:
				p_saotuedich = function_01;
				break;
				case saotucthan:
				p_saotucthan = function_01;
				break;
				case saotaisat:
				p_saotaisat = function_01;
				break;
				case saothiensat:
				p_saothiensat = function_01;
				break;
				case saochiboi:
				p_saochiboi = function_01;
				break;
				case saohamtri:
				p_saohamtri = function_01;
				break;
				case saonguyetsat:
				p_saonguyetsat = function_01;
				break;
				case saovongthan:
				p_saovongthan = function_01;
				break;
				case saoamsat:
				p_saoamsat = function_01;
				break;
				case saotuan:
				p_saotuan = function_01;
				break;
				case saotriet:
				p_saotriet = function_01;
				break;
				case saolthaitue:
				p_saoluu_thaitue = function_01;
				break;
				case saolbachho:
				p_saoluu_bachho = function_01;
				break;
				case saoltangmon:
				p_saoluu_tangmon = function_01;
				break;
				case saolthienhu:
				p_saoluu_thienhu = function_01;
				break;
				case saolthienkhoc:
				p_saoluu_thienkhoc = function_01;
				break;
				case saolthienma:
				p_saoluu_thienma = function_01;
				break;
				case saollocton:
				p_saoluu_locton = function_01;
				break;
				case saolkinhduong:
				p_saoluu_kinhduong = function_01;
				break;
				case saoldala:
				p_saoluu_dala = function_01;
				break;
				case saoldaohoa:
				p_saoluu_daohoa = function_01;
				break;
				case saolhongloan:
				p_saoluu_hongloan = function_01;
				break;
				case saolvanxuong:
				p_saoluu_vanxuong = function_01;
				break;
				case saolvankhuc:
				p_saoluu_vankhuc = function_01;
				break;
				case saolthienkhoi:
				p_saoluu_thienkhoi = function_01;
				break;
				case saolthienviet:
				p_saoluu_thienviet = function_01;
				break;
				case saolthienduc:
				p_saoluu_thienduc = function_01;
				break;
				case saolnguyetduc:
				p_saoluu_nguyetduc = function_01;
				break;
				case saollongduc:
				p_saoluu_longduc = function_01;
				break;
				case saolkiepsat:
				p_saoluu_kiepsat = function_01;
				break;
				case saoldauquan:
				p_saoluu_dauquan = function_01;
				break;
			}
		}
	}
}
function checkDevice() {
	var function_01 = navigator.userAgent;
	if (/Windows/.test(function_01)) {
		return "Windows";
	} else {
		if (/Mac/.test(function_01)) {
			return "Mac";
		} else {
			if (/Android/.test(function_01)) {
				return "Android";
			} else {
				if (/iPhone/.test(function_01)) {
					return "iPhone";
				} else {
					if (/iPad/.test(function_01)) {
						return "iPad";
					} else {
						return "Unknown";
					}
				}
			}
		}
	}
}
function getFullNameTuHoa(function_01) {
	switch (function_01) {
		case "Tử":
		return "TỬ VI";
		case "Liêm":
		return "LIÊM TRINH";
		case "Đồng":
		return "THIÊN ĐỒNG";
		case "Vũ":
		return "VŨ KHÚC";
		case "Dương":
		return "THÁI DƯƠNG";
		case "Cơ":
		return "THIÊN CƠ";
		case "Phủ":
		return "THIÊN PHỦ";
		case "Âm":
		return "THÁI ÂM";
		case "Tham":
		return "THAM LANG";
		case "Cự":
		return "CỰ MÔN";
		case "Tướng":
		return "THIÊN TƯỚNG";
		case "Lương":
		return "THIÊN LƯƠNG";
		case "Sát":
		return "THẤT SÁT";
		case "Phá":
		return "PHÁ QUÂN";
		case "Xương":
		return "Văn Xương";
		case "Khúc":
		return "Văn Khúc";
		case "Bật":
		return "Hữu Bật";
		case "Phụ":
		return "Tả Phụ";
	}
}
function laplasotv() {
	let sLook = "";
	let jdToDate = document.getElementById("_hoten").value;
	let getNewMoonDay = document.getElementById("_ngaysinh").value;
	let TimTuoiAmDuong_TheoCan = document.getElementById("_thangsinh").value;
	let getSunLongitude = document.getElementById("_namsinh").value;
	let timcaci = document.getElementById("_giosinh").value;
	let getLeapMonthOffset = document.getElementById("_phutsinh").value;
	let SunLongitude = document.getElementById("_namhan").value;
	let convertLunar2Solar = document.getElementById("_thanghan").value;
	thanghan = convertLunar2Solar;
	let AnTuHoa = document.getElementsByName("gender");
	if (AnTuHoa[0].checked == true) {
		sLook = AnTuHoa[0].value;
	} else {
		if (AnTuHoa[1].checked == true) {
			sLook = AnTuHoa[1].value;
		}
	}
	;
	let ansao_chinam = document.getElementsByName("antuhoa");
	if (ansao_chinam[0].checked) {
		cachantuhoa = 1;
	} else {
		if (ansao_chinam[1].checked) {
			cachantuhoa = 2;
		} else {
			if (ansao_chinam[2].checked) {
				cachantuhoa = 3;
			} else {
				if (ansao_chinam[3].checked) {
					cachantuhoa = 4;
				}
			}
		}
	}
	;
	if (jdToDate == "") {
		alert("Bạn cần phải nhập tên!");
		return;
	}
	;
	if (getNewMoonDay == "") {
		alert("Bạn cần phải nhập ngày sinh!");
		return;
	}
	;
	if (TimTuoiAmDuong_TheoCan == "") {
		alert("Bạn cần phải nhập tháng sinh!");
		return;
	}
	;
	if (getSunLongitude == "") {
		alert("Bạn cần phải nhập năm sinh!");
		return;
	}
	;
	if (timcaci == "") {
		alert("Bạn cần phải nhập giờ sinh!");
		return;
	}
	;
	let function_02 = document.getElementsByName("bangdosang");
	if (function_02[0].checked) {
		chonbangdosang = 1;
	} else {
		if (function_02[1].checked) {
			chonbangdosang = 2;
		}
	}
	;
	let cungmov10 = document.getElementById("saoluutuhoa");
	let tim_canchi_ngay = document.getElementById("cacsaoluukhac");
	let INT = document.getElementById("tuhoaphitinh");
	let jdFromDate = document.getElementById("vongtuongtinh");
	let tim_canchi_gio = document.getElementById("hiencacthongtinkhac");
	let function_01 = document.getElementById("anthongtincanhan");
	TuViDienToan.name = jdToDate;
	TuViDienToan.birthday = getNewMoonDay;
	TuViDienToan.birthmonth = TimTuoiAmDuong_TheoCan;
	TuViDienToan.birthyear = getSunLongitude;
	TuViDienToan.birthhour = timcaci;
	TuViDienToan.birthmins = getLeapMonthOffset;
	TuViDienToan.gender = sLook;
	TuViDienToan.muigio = "7";
	TuViDienToan.namxemhan = SunLongitude;
	TuViDienToan.cachantuhoa = cachantuhoa;
	TuViDienToan.chonbangdosang = chonbangdosang;
	TuViDienToan.hiensaoluutuhoa = cungmov10.checked;
	TuViDienToan.hiencacsaoluukhac = tim_canchi_ngay.checked;
	TuViDienToan.hientuhoaphitinh = INT.checked;
	TuViDienToan.hienvongtuongtinh = jdFromDate.checked;
	TuViDienToan.hiencacthongtinkhac = tim_canchi_gio.checked;
	TuViDienToan.anthongtincanhan = function_01.checked;
	TuViDienToan.time = new Date;
	giotinhngay = 0;
	if (function_01.checked == true) {
		anThongTinLS = true;
	} else {
		anThongTinLS = false;
	}
	;
	if (TuViDienToan.hiencacthongtinkhac == true) {
		battrachlaso = true;
	} else {
		battrachlaso = false;
	}
	;
	lasovualay[0] = "z";
	lasovualay[1] = jdToDate;
	lasovualay[2] = getNewMoonDay;
	lasovualay[3] = TimTuoiAmDuong_TheoCan;
	lasovualay[4] = getSunLongitude;
	lasovualay[5] = timcaci;
	lasovualay[6] = getLeapMonthOffset;
	lasovualay[7] = sLook;
	lasovualay[8] = "UTC+7";
	if (mDevice == "Windows" || mDevice == "Android") {
		cookieValue = JSON.stringify(TuViDienToan);
		document.cookie = "" + cookieName + "=" + cookieValue + "; path=/; max-age=3600";
		let timsaochumenh = isValueDuplicated("danhSachLaSo", lasovualay);
		if (!timsaochumenh) {
			addItemToLocal("danhSachLaSo", lasovualay);
			danhsachlaso = getAllItemsFromLocal("danhSachLaSo");
		}
	} else {
		if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
			let battrach = JSON.stringify(TuViDienToan);
			localStorage.setItem("TuViDienToan", battrach);
			let timsaochumenh = isValueDuplicated("danhSachLaSo", lasovualay);
			if (!timsaochumenh) {
				addItemToLocal("danhSachLaSo", lasovualay);
				danhsachlaso = getAllItemsFromLocal("danhSachLaSo");
			}
		}
	}
	;
	bangdosangcacsao();
	for (let timtuongquanmenhcuc = 0; timtuongquanmenhcuc < 13; timtuongquanmenhcuc++) {
		for (let napthiencan_cung = 0; napthiencan_cung < 63; napthiencan_cung++) {
			cungansaoLA[timtuongquanmenhcuc][napthiencan_cung] = [0, "zzz", "zzz", 99, "zzz", "zzz", "zzz", 99, "zzz"];
		}
	}
	;
	cungansaoLA = napthongtincaccung(jdToDate, getNewMoonDay, TimTuoiAmDuong_TheoCan, getSunLongitude, timcaci, getLeapMonthOffset, sLook, SunLongitude, cachantuhoa);
	mDevice = checkDevice();
	var xd_vitri_cung_menhthan = tuan_post[1];
	var TimTuoiAmDuong_TheoChi = triet_post[1];
	const _0x2296D = [0, 391.5, 0, 97.875, 0, 97.875, 0, 391.5, 0, 685.125, 0, 685.125];
	const _0x22996 = [0, 834.75, 0, 834.75, 0, 278.25, 0, 278.25, 0, 278.25, 0, 834.75];
	const an_chinhtinh = [0, 489.375, 293.625, 195.75, 195.75, 195.75, 195.75, 293.625, 489.375, 587.25, 587.25, 587.25, 587.25];
	const an_sao_thang = [0, 834.75, 834.75, 834.75, 695.625, 417.375, 278.25, 278.25, 278.25, 278.25, 417.375, 695.625, 834.75];
	const _0x22877 = ["z", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
	canva = document.getElementById("myCanvas");
	ctx = canva.getContext("2d");
	canva.style.width = "100%";
	canva.style.height = "100%";
	canva.width = Math.floor(2382);
	canva.height = Math.floor(3369);
	ctx.scale(3, 3);
	canva.addEventListener("dblclick", handleDoubleClick);
	if (mDevice == "Windows") {
		font_name = "Tahoma";
		font_155 = "Bold 15.5px " + font_name;
		font_14 = "Bold 14px " + font_name;
		font_14t = "Bold 13.5px " + font_name;
		font_13 = "Bold 13px " + font_name;
		font_13t = "13px " + font_name;
		font_115 = "Bold 12px " + font_name;
		font_12 = "Bold 12.5px " + font_name;
		font_12t = "12px " + font_name;
		font_11 = "Bold 11px " + font_name;
		font_11t = "11px " + font_name;
		font_105 = "Bold 10.5px " + font_name;
		font_10 = "Bold 10px " + font_name;
		font_10t = "10px " + font_name;
		font_9 = "Bold 9px " + font_name;
		font_9t = "9px " + font_name;
		font_8 = "Bold 8px " + font_name;
		font_8t = "8px " + font_name;
		font_tt = "Bold 8.5px " + font_name;
		font_7 = "Bold 7px " + font_name;
		font_7t = "7px " + font_name;
		font_6 = "Bold 6px " + font_name;
		font_6t = "6px " + font_name;
		font_5 = "Bold 5px " + font_name;
		font_5t = "5px " + font_name;
		font_13b = "11.5px Helvetica";
		font_12b = "500 12px " + font_name;
		font_11b = "500 11px " + font_name;
		font_khochu = "Bold italic 12px" + font_name;
	} else {
		if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
			font_name = "sans-serif";
			font_155 = "Bold 15.5px " + font_name;
			font_14 = "Bold 14.5px " + font_name;
			font_14t = "Bold 13.5px " + font_name;
			font_13 = "Bold 13px " + font_name;
			font_13t = "13px " + font_name;
			font_115 = "Bold 13px " + font_name;
			font_12 = "Bold 12.5px " + font_name;
			font_12c = "Bold 13px " + font_name;
			font_12t = "12px " + font_name;
			font_11 = "Bold 11px " + font_name;
			font_11t = "11px " + font_name;
			font_10 = "Bold 10px " + font_name;
			font_105 = "Bold 10.5px " + font_name;
			font_10t = "10px " + font_name;
			font_9 = "Bold 9px " + font_name;
			font_9t = "9px " + font_name;
			font_tt = "Bold 8.5px " + font_name;
			font_8 = "Bold 8px " + font_name;
			font_8t = "8px " + font_name;
			font_7 = "Bold 7px " + font_name;
			font_7t = "7px " + font_name;
			font_6 = "Bold 6px " + font_name;
			font_6t = "6px " + font_name;
			font_5 = "Bold 5px " + font_name;
			font_5t = "5px " + font_name;
			font_13b = "Bold 11.5px Helvetica";
			font_12b = "600 12px " + font_name;
			font_11b = "600 11px " + font_name;
			font_khochu = "Bold Italic 12px" + font_name;
		} else {
			font_name = "Archivo Narrow";
			font_155 = "Bold 15.5px " + font_name;
			font_14 = "Bold 14px " + font_name;
			font_14t = "Bold 13.5px " + font_name;
			font_13 = "Bold 13px " + font_name;
			font_13t = "13px " + font_name;
			font_115 = "Bold 12px " + font_name;
			font_12 = "Bold 12.5px " + font_name;
			font_12t = "12px " + font_name;
			font_11 = "Bold 11px " + font_name;
			font_11t = "11px " + font_name;
			font_105 = "Bold 10.5px " + font_name;
			font_10 = "Bold 10px " + font_name;
			font_10t = "10px " + font_name;
			font_9 = "Bold 9px " + font_name;
			font_9t = "9px " + font_name;
			font_8 = "Bold 8px " + font_name;
			font_8t = "8px " + font_name;
			font_tt = "Bold 8.5px " + font_name;
			font_7 = "Bold 7px " + font_name;
			font_7t = "7px " + font_name;
			font_6 = "Bold 6px " + font_name;
			font_6t = "6px " + font_name;
			font_5 = "Bold 5px " + font_name;
			font_5t = "5px " + font_name;
			font_13b = "11.5px Helvetica";
			font_12b = "500 12px " + font_name;
			font_11b = "500 11px " + font_name;
			font_khochu = "Bold Italic 12px" + font_name;
		}
	}
	;
	mauvienlaso = "#00405d";
	ctx.fillStyle = color_BackGround;
	ctx.fillRect(0, 0, canva.width, canva.height);
	var _0x22A11 = 0;
	var saveCanvas = 0;
	var luanGiai = 0;
	var canvaslasotv = 0;
	var convertToBase64 = 0;
	var VongTuongTinh = ["#FFFFFA", "#FFFDFF", "#FDFDFA", "#FEFDFF", "#FFFAFA", "#F5F5F5"];
	_0x22A11 = getRandomInt(1, 6);
	ctx.fillStyle = VongTuongTinh[_0x22A11];
	ctx.fillRect(0, 0, canva.width, canva.height);
	ctx.beginPath();
	ctx.strokeStyle = mauvienlaso;
	ctx.transform(1, 0, 0, 1, 5, 5);
	ctx.lineWidth = 2;
	ctx.moveTo(1, 1);
	ctx.lineTo(1, 1113);
	ctx.moveTo(0, 0);
	ctx.lineTo(784, 0);
	ctx.moveTo(783, 0);
	ctx.lineTo(784, 1114);
	ctx.moveTo(0, 1113);
	ctx.lineTo(783, 1113);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "#80c0c0";
	ctx.lineWidth = 1;
	ctx.moveTo(195.75, 1);
	ctx.lineTo(195.75, 1112);
	ctx.moveTo(587.25, 1);
	ctx.lineTo(587.25, 1112);
	ctx.moveTo(782.5, 556.5);
	ctx.lineTo(587.25, 556.5);
	ctx.moveTo(195.75, 556.5);
	ctx.lineTo(2, 556.5);
	ctx.moveTo(2, 278.25);
	ctx.lineTo(782, 278.25);
	ctx.moveTo(2, 834.75);
	ctx.lineTo(782.5, 834.75);
	ctx.moveTo(391.5, 1);
	ctx.lineTo(391.5, 278.25);
	ctx.moveTo(391.5, 834.75);
	ctx.lineTo(391.5, 1112);
	ctx.stroke();
	canvaslasotv = 270.75;
	convertToBase64 = 671.5;
	let luudslsthoaman = 512.25;
	if (battrachlaso == true && notethongtinlaso == false) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(canvaslasotv, convertToBase64);
		ctx.lineTo(luudslsthoaman, convertToBase64);
		ctx.lineTo(luudslsthoaman, convertToBase64 + 80);
		ctx.lineTo(canvaslasotv, convertToBase64 + 80);
		ctx.lineTo(canvaslasotv, convertToBase64);
		ctx.moveTo(391.5, convertToBase64);
		ctx.lineTo(391.5, convertToBase64 + 80);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(391.5, convertToBase64);
		ctx.lineTo(391.5, convertToBase64 + 80);
		ctx.moveTo(canvaslasotv, convertToBase64 + 20);
		ctx.lineTo(luudslsthoaman, convertToBase64 + 20);
		ctx.moveTo(canvaslasotv, convertToBase64 + 40);
		ctx.lineTo(luudslsthoaman, convertToBase64 + 40);
		ctx.moveTo(canvaslasotv, convertToBase64 + 60);
		ctx.lineTo(luudslsthoaman, convertToBase64 + 60);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 0.1;
		ctx.moveTo(canvaslasotv + 55, convertToBase64);
		ctx.lineTo(canvaslasotv + 55, convertToBase64 + 80);
		ctx.moveTo(canvaslasotv + 170, convertToBase64);
		ctx.lineTo(canvaslasotv + 170, convertToBase64 + 80);
		ctx.fillStyle = "#CDC9C9";
		textlength = ctx.measureText("<" + BatTu[0] + ">").width;
		ctx.clearRect(391.5 - textlength / 2, convertToBase64 - 5, textlength, 10);
		ctx.fillRect(391.5 - textlength / 2, convertToBase64 - 5, textlength, 10);
		ctx.stroke();
	}
	;
	ctx.beginPath();
	ctx.strokeStyle = tuvidientoancolor1;
	ctx.lineWidth = 0.5;
	ctx.moveTo(an_chinhtinh[_0x22877.indexOf(cungmenh)], an_sao_thang[_0x22877.indexOf(cungmenh)]);
	ctx.lineTo(an_chinhtinh[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 4, 1)])], an_sao_thang[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 4, 1)])]);
	ctx.moveTo(an_chinhtinh[_0x22877.indexOf(cungmenh)], an_sao_thang[_0x22877.indexOf(cungmenh)]);
	ctx.lineTo(an_chinhtinh[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 4, -1)])], an_sao_thang[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 4, -1)])]);
	ctx.moveTo(an_chinhtinh[_0x22877.indexOf(cungmenh)], an_sao_thang[_0x22877.indexOf(cungmenh)]);
	ctx.lineTo(an_chinhtinh[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 6, 1)])], an_sao_thang[_0x22877.indexOf(_0x22877[cungmov(_0x22877.indexOf(cungmenh), 6, 1)])]);
	ctx.stroke();
	if (xd_vitri_cung_menhthan == TimTuoiAmDuong_TheoChi) {
		if (xd_vitri_cung_menhthan == 1) {
			ctx.clearRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 15 + 3, 70, 15);
			ctx.fillStyle = color_nguHanh[8];
			ctx.fillRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 15 + 3, 70, 15);
			ctx.textAlign = "center";
			ctx.fillStyle = tt_color;
			ctx.font = font_tt;
			ctx.fillText("TUẦN-TRIỆT", _0x2296D[xd_vitri_cung_menhthan], _0x22996[xd_vitri_cung_menhthan] - 1);
		} else {
			if (xd_vitri_cung_menhthan == 7) {
				ctx.clearRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 7.5 + 5, 70, 15);
				ctx.fillStyle = color_nguHanh[8];
				ctx.fillRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 7.5 + 5, 70, 15);
				ctx.textAlign = "center";
				ctx.fillStyle = tt_color;
				ctx.font = font_tt;
				ctx.fillText("TUẦN-TRIỆT", _0x2296D[xd_vitri_cung_menhthan], _0x22996[xd_vitri_cung_menhthan] + 8);
			} else {
				ctx.clearRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 7.5 - 1, 70, 15);
				ctx.fillStyle = color_nguHanh[8];
				ctx.fillRect(_0x2296D[xd_vitri_cung_menhthan] - 35, _0x22996[xd_vitri_cung_menhthan] - 7.5 - 1, 70, 15);
				ctx.textAlign = "center";
				ctx.fillStyle = tt_color;
				ctx.font = font_tt;
				ctx.fillText("TUẦN-TRIỆT", _0x2296D[xd_vitri_cung_menhthan], _0x22996[xd_vitri_cung_menhthan] + 2);
			}
		}
	} else {
		if (xd_vitri_cung_menhthan == 7) {
			ctx.clearRect(_0x2296D[xd_vitri_cung_menhthan] - 20, _0x22996[xd_vitri_cung_menhthan] - 7.5 + 5, 40, 15);
			ctx.fillStyle = color_nguHanh[6];
			ctx.fillRect(_0x2296D[xd_vitri_cung_menhthan] - 20, _0x22996[xd_vitri_cung_menhthan] - 7.5 + 5, 40, 15);
			ctx.textAlign = "center";
			ctx.fillStyle = tt_color;
			ctx.font = font_tt;
			ctx.fillText("Tuần", _0x2296D[xd_vitri_cung_menhthan], _0x22996[xd_vitri_cung_menhthan] + 8);
		} else {
			ctx.clearRect(_0x2296D[xd_vitri_cung_menhthan] - 20, _0x22996[xd_vitri_cung_menhthan] - 15 + 4, 40, 15);
			ctx.fillStyle = color_nguHanh[6];
			ctx.fillRect(_0x2296D[xd_vitri_cung_menhthan] - 20, _0x22996[xd_vitri_cung_menhthan] - 15 + 4, 40, 15);
			ctx.textAlign = "center";
			ctx.fillStyle = tt_color;
			ctx.font = font_tt;
			ctx.fillText("Tuần", _0x2296D[xd_vitri_cung_menhthan], _0x22996[xd_vitri_cung_menhthan]);
		}
		;
		if (TimTuoiAmDuong_TheoChi == 7) {
			ctx.clearRect(_0x2296D[TimTuoiAmDuong_TheoChi] - 20, _0x22996[TimTuoiAmDuong_TheoChi] - 7.5 + 5, 40, 15);
			ctx.fillStyle = color_nguHanh[7];
			ctx.fillRect(_0x2296D[TimTuoiAmDuong_TheoChi] - 20, _0x22996[TimTuoiAmDuong_TheoChi] - 7.5 + 5, 40, 15);
			ctx.textAlign = "center";
			ctx.fillStyle = tt_color;
			ctx.font = font_tt;
			ctx.fillText("Triệt", _0x2296D[TimTuoiAmDuong_TheoChi], _0x22996[TimTuoiAmDuong_TheoChi] + 8);
		} else {
			ctx.clearRect(_0x2296D[TimTuoiAmDuong_TheoChi] - 20, _0x22996[TimTuoiAmDuong_TheoChi] - 15 + 4, 40, 15);
			ctx.fillStyle = color_nguHanh[7];
			ctx.fillRect(_0x2296D[TimTuoiAmDuong_TheoChi] - 20, _0x22996[TimTuoiAmDuong_TheoChi] - 15 + 4, 40, 15);
			ctx.textAlign = "center";
			ctx.fillStyle = tt_color;
			ctx.font = font_tt;
			ctx.fillText("Triệt", _0x2296D[TimTuoiAmDuong_TheoChi], _0x22996[TimTuoiAmDuong_TheoChi]);
		}
	}
	;
	saveCanvas = 270.75;
	luanGiai = 366.25;
	ctx.font = font_155;
	ctx.textAlign = "center";
	ctx.fillStyle = "#008080";
	ctx.fillText("LÁ SỐ TỬ VI", 391.5, 313.25);
	ctx.fillStyle = tuvidientoancolor;
	ctx.font = font_13t;
	if (anThongTinLS == true) {
		ctx.textAlign = "left";
		ctx.font = font_13t;
		ctx.fillStyle = tuvidientoancolor;
		ctx.fillText("Họ tên", saveCanvas, luanGiai - 20);
		ctx.fillText(":", saveCanvas + 50, luanGiai - 20);
		ctx.fillStyle = "#708090";
		ctx.font = font_12;
		ctx.fillText("zZZZz", saveCanvas + 70, luanGiai - 20);
		ctx.fillStyle = tuvidientoancolor;
		ctx.font = font_13t;
		ctx.fillText("Năm", saveCanvas, luanGiai);
		ctx.fillText(":", saveCanvas + 50, luanGiai);
		ctx.fillStyle = "#708090";
		ctx.font = font_12;
		ctx.fillText("zzzz", saveCanvas + 70, luanGiai);
		let getLunarMonth11 = nguhanhnam(nguhanhbanmenh);
		ctx.fillStyle = color5hanh(getLunarMonth11);
		ctx.fillText(cannam + " " + chinam, saveCanvas + 180, luanGiai);
		ctx.fillStyle = tuvidientoancolor;
		ctx.font = font_13t;
		ctx.fillText("Tháng", saveCanvas, luanGiai + 18);
		ctx.fillText(":", saveCanvas + 50, luanGiai + 18);
		ctx.fillStyle = "#708090";
		ctx.font = font_12;
		ctx.fillText("zz", saveCanvas + 70, luanGiai + 18);
		ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_thangsinh.split(" ")[0], canchi_thangsinh.split(" ")[1])));
		ctx.fillText(canchi_thangsinh, saveCanvas + 180, luanGiai + 18);
		ctx.fillStyle = tuvidientoancolor;
		ctx.font = font_13t;
		ctx.fillText("Ngày", saveCanvas, luanGiai + 36);
		ctx.fillText(":", saveCanvas + 50, luanGiai + 36);
		ctx.fillStyle = "#708090";
		ctx.font = font_12;
		ctx.fillText("zz", saveCanvas + 70, luanGiai + 36);
		ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_ngaysinh.split(" ")[0], canchi_ngaysinh.split(" ")[1])));
		ctx.fillText(canchi_ngaysinh, saveCanvas + 180, luanGiai + 36);
		ctx.fillStyle = tuvidientoancolor;
		ctx.font = font_13t;
		ctx.fillText("Giờ sinh", saveCanvas, luanGiai + 54);
		ctx.fillText(":", saveCanvas + 50, luanGiai + 54);
		ctx.fillStyle = "#708090";
		ctx.font = font_12;
		ctx.fillText("zz:zz (UTC+7)", saveCanvas + 70, luanGiai + 54);
		ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_giosinh.split(" ")[0], canchi_giosinh.split(" ")[1])));
		ctx.fillText(canchi_giosinh, saveCanvas + 180, luanGiai + 54);
	} else {
		ctx.textAlign = "left";
		ctx.font = font_13t;
		if (thutungaygio == true) {
			ctx.fillStyle = tuvidientoancolor;
			ctx.fillText("Họ tên", saveCanvas, luanGiai - 20);
			ctx.fillText(":", saveCanvas + 50, luanGiai - 20);
			ctx.fillStyle = "#708090";
			ctx.font = font_12;
			ctx.fillText(jdToDate, saveCanvas + 70, luanGiai - 20);
			ctx.fillStyle = tuvidientoancolor;
			ctx.font = font_13t;
			ctx.fillText("Năm", saveCanvas, luanGiai);
			ctx.fillText(":", saveCanvas + 50, luanGiai);
			ctx.fillStyle = "#708090";
			ctx.font = font_12;
			ctx.fillText(getSunLongitude, saveCanvas + 70, luanGiai);
			ctx.fillText("[" + namsinhAL + "]", saveCanvas + 106, luanGiai);
			let getLunarMonth11 = nguhanhnam(nguhanhbanmenh);
			ctx.fillStyle = color5hanh(getLunarMonth11);
			ctx.fillText(cannam + " " + chinam, saveCanvas + 180, luanGiai);
			ctx.fillStyle = tuvidientoancolor;
			ctx.font = font_13t;
			ctx.fillText("Tháng", saveCanvas, luanGiai + 18);
			ctx.fillText(":", saveCanvas + 50, luanGiai + 18);
			ctx.fillStyle = "#708090";
			ctx.font = font_12;
			ctx.fillText(TimTuoiAmDuong_TheoCan, saveCanvas + 70, luanGiai + 18);
			if (!thangnhuan) {
				ctx.fillText("[" + thangsinhAL + "]", saveCanvas + 106, luanGiai + 18);
			} else {
				ctx.fillText("[" + thangsinhAL + " (N)]", saveCanvas + 106, luanGiai + 18);
			}
			;
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_thangsinh.split(" ")[0], canchi_thangsinh.split(" ")[1])));
			ctx.fillText(canchi_thangsinh, saveCanvas + 180, luanGiai + 18);
			ctx.fillStyle = tuvidientoancolor;
			ctx.font = font_13t;
			ctx.fillText("Ngày", saveCanvas, luanGiai + 36);
			ctx.fillText(":", saveCanvas + 50, luanGiai + 36);
			ctx.fillStyle = "#708090";
			ctx.font = font_12;
			ctx.fillText(getNewMoonDay, saveCanvas + 70, luanGiai + 36);
			ctx.fillText("[" + ngaysinhAL + "]", saveCanvas + 106, luanGiai + 36);
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_ngaysinh.split(" ")[0], canchi_ngaysinh.split(" ")[1])));
			ctx.fillText(canchi_ngaysinh, saveCanvas + 180, luanGiai + 36);
			ctx.fillStyle = tuvidientoancolor;
			ctx.font = font_13t;
			ctx.fillText("Giờ sinh", saveCanvas, luanGiai + 54);
			ctx.fillText(":", saveCanvas + 50, luanGiai + 54);
			ctx.fillStyle = "#708090";
			ctx.font = font_12;
			ctx.fillText(timcaci + ":" + getLeapMonthOffset + " (UTC+7)", saveCanvas + 70, luanGiai + 54);
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_giosinh.split(" ")[0], canchi_giosinh.split(" ")[1])));
			ctx.fillText(canchi_giosinh, saveCanvas + 180, luanGiai + 54);
		} else {
			ctx.fillText("Họ tên", saveCanvas, luanGiai - 20);
			ctx.fillText(":", saveCanvas + 50, luanGiai - 20);
			ctx.fillText(jdToDate, saveCanvas + 70, luanGiai - 20);
			ctx.font = font_13t;
			ctx.fillStyle = tuvidientoancolor;
			ctx.fillText("Ngày", saveCanvas, luanGiai);
			ctx.fillText(":", saveCanvas + 50, luanGiai);
			ctx.fillText(getNewMoonDay, saveCanvas + 70, luanGiai);
			ctx.fillText("[" + ngaysinhAL + "]", saveCanvas + 106, luanGiai);
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_ngaysinh.split(" ")[0], canchi_ngaysinh.split(" ")[1])));
			ctx.fillText(canchi_ngaysinh, saveCanvas + 180, luanGiai);
			ctx.fillStyle = tuvidientoancolor;
			ctx.fillText("Tháng", saveCanvas, luanGiai + 18);
			ctx.fillText(":", saveCanvas + 50, luanGiai + 18);
			ctx.fillText(TimTuoiAmDuong_TheoCan, saveCanvas + 70, luanGiai + 18);
			if (!thangnhuan) {
				ctx.fillText("[" + thangsinhAL + "]", saveCanvas + 106, luanGiai + 18);
			} else {
				ctx.fillText("[" + thangsinhAL + "(N)]", saveCanvas + 106, luanGiai + 18);
			}
			;
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_thangsinh.split(" ")[0], canchi_thangsinh.split(" ")[1])));
			ctx.fillText(canchi_thangsinh, saveCanvas + 180, luanGiai + 18);
			ctx.fillStyle = tuvidientoancolor;
			ctx.fillText("Năm sinh:", saveCanvas, luanGiai + 36);
			ctx.fillText(getSunLongitude, saveCanvas + 70, luanGiai + 36);
			ctx.fillText("[" + namsinhAL + "]", saveCanvas + 106, luanGiai + 36);
			let getLunarMonth11 = nguhanhnam(nguhanhbanmenh);
			ctx.fillStyle = color5hanh(getLunarMonth11);
			ctx.fillText(cannam + " " + chinam, saveCanvas + 180, luanGiai + 36);
			ctx.fillStyle = tuvidientoancolor;
			ctx.fillText("Giờ sinh  : " + timcaci + ":" + getLeapMonthOffset + " (UTC+7)", saveCanvas, luanGiai + 54);
			ctx.fillStyle = color5hanh(nguhanhnam(XD_HanhBanMenh(canchi_giosinh.split(" ")[0], canchi_giosinh.split(" ")[1])));
			ctx.fillText(canchi_giosinh, saveCanvas + 180, luanGiai + 54);
		}
	}
	;
	ctx.textAlign = "center";
	let doigiosinh = XD_HanhBanMenh(_can_namxem, _chi_namxem);
	nghanhnamxem = nguhanhnam(doigiosinh);
	ctx.font = font_13t;
	let _0x228A0 = ctx.measureText("Năm xem: " + SunLongitude + " (" + _can_namxem + " " + _chi_namxem + ")").width;
	let _0x228C9 = ctx.measureText("Năm xem: ").width;
	ctx.textAlign = "left";
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("Năm xem: ", 391.5 - _0x228A0 / 2, luanGiai + 80);
	ctx.fillStyle = "#708090";
	ctx.font = font_12;
	ctx.fillText(SunLongitude, 391.5 - _0x228A0 / 2 + _0x228C9, luanGiai + 80);
	ctx.fillStyle = color5hanh(nghanhnamxem);
	ctx.fillText("(" + _can_namxem + " " + _chi_namxem + ")", 391.5 - _0x228A0 / 2 + _0x228C9 + 36, luanGiai + 80);
	ctx.fillStyle = "#708090";
	ctx.textAlign = "center";
	ctx.fillText(tuoiamduong + " - " + tuoiduongso + " Tuổi", 391.5, luanGiai + 100);
	canvaslasotv = 280.75;
	convertToBase64 = 486.5;
	ctx.font = font_13t;
	ctx.textAlign = "left";
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("Ngũ hành mệnh:", canvaslasotv, convertToBase64);
	ctx.fillStyle = color5hanh(nguhanhnam(nguhanhbanmenh));
	ctx.font = font_12;
	ctx.fillText(nguhanhbanmenh, canvaslasotv + 130, convertToBase64);
	ctx.fillStyle = tuvidientoancolor;
	ctx.font = font_13t;
	ctx.fillText("Cục của lá số:", canvaslasotv, convertToBase64 + 18);
	ctx.fillStyle = color5hanh(nguhanhnam(tim_cuc_laso(cannam, cungmenh)));
	ctx.font = font_12;
	ctx.fillText(tim_cuc_laso(cannam, cungmenh), canvaslasotv + 130, convertToBase64 + 18);
	ctx.fillStyle = tuvidientoancolor2;
	ctx.textAlign = "center";
	let NewMoon = "";
	if (cungad[pmenh] * tuoiad == 1) {
		NewMoon = "Âm Dương Thuận Lý";
	} else {
		NewMoon = "Âm Dương Nghịch Lý";
	}
	;
	ctx.fillText(NewMoon, 391.5, convertToBase64 + 40);
	ctx.fillStyle = tuvidientoancolor3;
	ctx.fillText(tuongquanmenhcuc, 391.5, convertToBase64 + 60);
	ctx.textAlign = "left";
	ctx.font = font_13t;
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("Sao chủ mệnh:", canvaslasotv, 566.5);
	ctx.font = font_12;
	ctx.fillStyle = saocolor(saochumenh_id);
	ctx.fillText(saochumenh, canvaslasotv + 135, 566.5);
	ctx.fillStyle = tuvidientoancolor;
	ctx.font = font_13t;
	ctx.fillText("Sao chủ thân:", canvaslasotv, 586.5);
	ctx.font = font_12;
	ctx.fillStyle = saocolor(saochuthan_id);
	ctx.fillText(saochuthan, canvaslasotv + 135, 586.5);
	ctx.fillStyle = color5hanh(nguhanhnam(nguhanhbanmenh));
	ctx.fillText("Mệnh", saveCanvas, 606.5);
	ctx.font = font_13t;
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("tại", saveCanvas + 43, 606.5);
	ctx.font = font_12;
	ctx.fillStyle = color5hanh(tabcung_5hanh[pmenh]);
	ctx.fillText("[" + tabcung[pmenh] + "]", saveCanvas + 68, 606.5);
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("Thân", canvaslasotv + 120, 606.5);
	ctx.font = font_13t;
	ctx.fillStyle = tuvidientoancolor;
	ctx.fillText("cư:", canvaslasotv + 156, 606.5);
	ctx.font = font_12;
	if (pmenh == pthan) {
		ctx.fillStyle = color5hanh(nguhanhnam(nguhanhbanmenh));
	} else {
		ctx.fillStyle = color5hanh(tabcung_5hanh[pthan]);
	}
	;
	ctx.fillText(tttcung_th[tttcung.indexOf(cungansao[pthan][0][1])], canvaslasotv + 182, 606.5);
	ctx.textAlign = "center";
	ctx.font = font_11;
	ctx.fillStyle = "#8273B0";
	let ansaotuan = new Date;
	let getFullNameTuHoa = ansaotuan.getDate();
	let _0x2291B = ansaotuan.getMonth() + 1;
	let GetSao_Possittion = ansaotuan.getFullYear();
	let antrangsinh = ansaotuan.getHours();
	let resizeImage = ansaotuan.getMinutes();
	let convertSolar2Lunar = "";
	if (resizeImage < 10) {
		convertSolar2Lunar = "0" + resizeImage.toString();
	} else {
		convertSolar2Lunar = resizeImage.toString();
	}
	;
	if (!notethongtinlaso) {
		ctx.fillText("Ngày lập lá số: " + getFullNameTuHoa + "/" + _0x2291B + "/" + GetSao_Possittion + " [" + ngayamlichHT[0] + "/" + ngayamlichHT[1] + "/" + ngayamlichHT[2] + " ÂL]" + "  " + antrangsinh + ":" + convertSolar2Lunar, 391.5, 659.5);
	} else {
		ctx.font = font_10;
		ctx.fillText("Lập ngày: " + getFullNameTuHoa + "/" + _0x2291B + "/" + GetSao_Possittion + " [" + ngayamlichHT[0] + "/" + ngayamlichHT[1] + "/" + ngayamlichHT[2] + " ÂL]", 391.5, 328.25);
	}
	;
	if (hienlainhancung == true) {
		ctx.fillStyle = "#708090";
		ctx.textAlign = "center";
		ctx.font = font_10;
		ctx.fillText("Lai nhân cung: " + str_lainhan, 391.5, 625.625);
		if (!notethongtinlaso) {
			ctx.fillText("Nguyên thần cung: " + str_nguyenthan, 391.5, 640.625);
		}
	}
	;
	ctx.fillStyle = "#708090";
	ctx.textAlign = "center";
	ctx.font = font_13;
	if (notethongtinlaso) {
		ctx.fillStyle = "#E8D3E3";
		ctx.fillText(tentrangls, 391.5, 774.75);
		ctx.font = font_10;
		ctx.fillText(website, 391.5, 787.75);
		ctx.fillText(ttlienhe, 391.5, 799.75);
	} else {
		ctx.fillText(tentrangls, 391.5, 776.75);
		ctx.font = font_10;
		ctx.fillText(website, 391.5, 790.75);
		ctx.fillText(ttlienhe, 391.5, 802.75);
	}
	;
	ctx.font = font_9;
	ctx.fillStyle = tuvidientoancolor1;
	ctx.fillText("chuongnv.com" + String.fromCharCode(174) + " 2023", 391.5, 819.75);
	if (battrachlaso == true && notethongtinlaso == false) {
		ctx.font = font_9;
		ctx.fillStyle = "#1273B0";
		ctx.fillText("<" + BatTu[0] + ">", 391.5, 674.5);
		ctx.textAlign = "left";
		ctx.fillStyle = "#528B8B";
		canvaslasotv = 270.75;
		convertToBase64 = 671.5;
		luudslsthoaman = 512.25;
		ctx.fillText("Sinh Khí", canvaslasotv + 5, convertToBase64 + 13);
		ctx.fillText("Thiên Y", canvaslasotv + 5, convertToBase64 + 33);
		ctx.fillText("Diên Niên", canvaslasotv + 5, convertToBase64 + 53);
		ctx.fillText("Phục Vị", canvaslasotv + 5, convertToBase64 + 73);
		ctx.fillText("Họa Hại", canvaslasotv + 125, convertToBase64 + 13);
		ctx.fillText("Ngũ Quỷ", canvaslasotv + 125, convertToBase64 + 33);
		ctx.fillText("Lục Sát", canvaslasotv + 125, convertToBase64 + 53);
		ctx.fillText("T. Mệnh", canvaslasotv + 125, convertToBase64 + 73);
		ctx.textAlign = "center";
		ctx.fillStyle = "#20B2AA";
		ctx.fillText(BatTu[1], 357.5625, convertToBase64 + 13);
		ctx.fillText(BatTu[2], 357.5625, convertToBase64 + 33);
		ctx.fillText(BatTu[3], 357.5625, convertToBase64 + 53);
		ctx.fillText(BatTu[4], 357.5625, convertToBase64 + 73);
		ctx.fillStyle = "#CD5C5C";
		ctx.fillText(BatTu[5], 475.4375, convertToBase64 + 13);
		ctx.fillText(BatTu[6], 475.4375, convertToBase64 + 33);
		ctx.fillText(BatTu[7], 475.4375, convertToBase64 + 53);
		ctx.fillText(BatTu[8], 475.4375, convertToBase64 + 73);
	}
	;
	if (notethongtinlaso) {
		ctx.beginPath();
		ctx.moveTo(236.5, 641.5);
		ctx.lineTo(546.5, 641.5);
		ctx.arcTo(551.5, 641.5, 551.5, 646.5, 5);
		ctx.lineTo(551.5, 801.5);
		ctx.arcTo(551.5, 806.5, 546.5, 806.5, 5);
		ctx.lineTo(236.5, 806.5);
		ctx.arcTo(231.5, 806.5, 231.5, 801.5, 5);
		ctx.lineTo(231.5, 646.5);
		ctx.arcTo(231.5, 641.5, 236.5, 641.5, 5);
		ctx.closePath();
		ctx.strokeStyle = "#80c0c0";
		ctx.lineWidth = 0.5;
		ctx.stroke();
		textlength = ctx.measureText("<Note>").width;
		ctx.clearRect(391.5 - textlength / 2, 636.5, textlength, 10);
		ctx.fillRect(391.5 - textlength / 2, 636.5, textlength, 10);
		ctx.fillStyle = "#C0C9C9";
		ctx.fillText("<Note>", 391.5, 644);
	}
	;
	ancacsao(cungansaoLA);
	const anhoalinh = "Arial";
	ctx.font = "12px " + anhoalinh + "";
	ctx.fillStyle = color5hanh("K");
	let phicungtuhoa = thongtincannote.split("\n");
	let _0x228F2 = phicungtuhoa.slice(0, 10).join("\n");
	if (notethongtinlaso) {
		_0x22AB5(_0x228F2);
	}
	;
	let tag_actions = "<div>";
	tag_actions += '<button type="button" class="btn btn-primary" onclick="saveCanvas()">Lưu Lá Số</button>';
	tag_actions += '<button type="button" id="myButton" class="btn btn-danger" onclick="luanGiai()">Luận Giải</button></div>';
	if( document.getElementById("valueInput") ) {
		document.getElementById("valueInput").innerHTML = tag_actions;
	}
	function _0x22AB5(getNewMoonDay) {
		const jdToDate = getNewMoonDay.split("_");
		let timcaci = 659.5;
		for (let jdFromDate = 0; jdFromDate < jdToDate.length; jdFromDate++) {
			const function_02 = jdToDate[jdFromDate].trim();
			const cungmov = function_02.split("\n");
			for (let tim_canchi_gio = 0; tim_canchi_gio < cungmov.length; tim_canchi_gio++) {
				const function_01 = cungmov[tim_canchi_gio].trim();
				const getLeapMonthOffset = function_01.split(" ");
				let sLook = 242.5;
				let cungmov10 = "";
				let INT = 0;
				for (let doigiosinh = 0; doigiosinh < getLeapMonthOffset.length; doigiosinh++) {
					const getLunarMonth11 = getLeapMonthOffset[doigiosinh];
					const convertLunar2Solar = ctx.measureText(getLunarMonth11).width;
					if (INT + convertLunar2Solar + 2 <= 300) {
						cungmov10 += getLunarMonth11 + " ";
						INT += convertLunar2Solar + 2;
					} else {
						const SunLongitude = cungmov10.trim().split(" ").length - 1;
						const getSunLongitude = (300 - INT) / SunLongitude;
						const convertSolar2Lunar = cungmov10.trim().split(" ");
						for (let tim_canchi_ngay = 0; tim_canchi_ngay < convertSolar2Lunar.length; tim_canchi_ngay++) {
							ctx.fillText(convertSolar2Lunar[tim_canchi_ngay], sLook, timcaci);
							sLook += ctx.measureText(convertSolar2Lunar[tim_canchi_ngay]).width + getSunLongitude + 2;
						}
						;
						cungmov10 = getLunarMonth11 + " ";
						INT = convertLunar2Solar + 2;
						timcaci += 15;
						sLook = 242.5;
						if (timcaci > 806.5) {
							return;
						}
					}
					;
					if (doigiosinh === getLeapMonthOffset.length - 1) {
						ctx.fillText(cungmov10.trim(), sLook, timcaci);
					}
				}
				;
				sLook = 242.5;
				if (tim_canchi_gio !== cungmov.length - 1) {
					timcaci += 15;
				}
			}
			;
			if (jdFromDate !== jdToDate.length - 1) {
				timcaci += 15;
			}
		}
	}
}
function printCanvas() {
	dataURL = canva.toDataURL("image/png");
	resizeImage(dataURL, 794, 1123).then(function_02 => {
		var function_01 = window.open();
		function_01.document.write("<img src = '" + function_02 + "'/>");
		function_01.document.close();
		function_01.onload = function_02 => {
			function_01.print();
			function_01.location.reload();
			function_01.close();
		};
	});
}
function resizeImage(function_01, sLook, function_02) {
	return new Promise(doigiosinh => {
		let timcaci = new Image;
		timcaci.src = function_01;
		timcaci.onload = async () => {
			let function_01 = document.createElement("canvas");
			let cungmov = timcaci.width;
			let tim_canchi_ngay = timcaci.height;
			if (cungmov > tim_canchi_ngay) {
				if (cungmov > sLook) {
					tim_canchi_ngay *= sLook / cungmov;
					cungmov = sLook;
				}
			} else {
				if (tim_canchi_ngay > function_02) {
					cungmov *= function_02 / tim_canchi_ngay;
					tim_canchi_ngay = function_02;
				}
			}
			;
			function_01.width = cungmov;
			function_01.height = tim_canchi_ngay;
			let tim_canchi_thang = function_01.getContext("2d");
			tim_canchi_thang.drawImage(timcaci, 0, 0, cungmov, tim_canchi_ngay);
			let tim_canchi_gio = function_01.toDataURL();
			doigiosinh(tim_canchi_gio);
		};
	});
}
function handleDoubleClick(function_01) {
	if (document.fullscreenEnabled) {
		if (!document.fullscreenElement) {
			if (canva.requestFullscreen) {
				canva.requestFullscreen();
			} else {
				if (canva.mozRequestFullScreen) {
					canva.mozRequestFullScreen();
				} else {
					if (canva.webkitRequestFullscreen) {
						canva.webkitRequestFullscreen();
					} else {
						if (canva.msRequestFullscreen) {
							canva.msRequestFullscreen();
						}
					}
				}
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else {
				if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else {
					if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else {
						if (document.msExitFullscreen) {
							document.msExitFullscreen();
						}
					}
				}
			}
		}
	}
}
function saveCanvas() {
	let function_01 = document.getElementById("_hoten").value;
	const function_02 = canva.toDataURL("image/png");
	const sLook = document.createElement("a");
	sLook.download = function_01 + ".png";
	sLook.href = function_02;
	sLook.click();
}
function luanGiai() {
	let function_01 = '<div class="container">';
	function_01 += "<br>";
	function_01 += '<div class="row">';
	function_01 += '<div class="col-md-6">';
	function_01 += '<table class="table">';
	function_01 += "<thead>";
	function_01 += "<tr>";
	function_01 += "<th>ĐẶT LỊCH XEM TỬ VI THẦY HƯNG LUẬN GIẢI TRỰC TIẾP</th>";
	function_01 += "</tr>";
	function_01 += "</thead>";
	function_01 += "<tbody>";
	function_01 += "<tr>";
	function_01 += "<td><b>Luận giải Online:</b> khách hàng sau khi đặt lịch sẽ gọi điện thoại / Zalo / Viber trực tiếp cho Thầy Hưng. Số điện thoại sẽ được cung cấp sau khi đăng ký thành công. Kết thúc cuộc nói chuyện qua điện thoại, quý khách có thể yêu cầu nhận thêm file ghi âm luận giải.</td>";
	function_01 += "</tr>";
	function_01 += "<tr>";
	function_01 += "<td><b>Luận giải tại văn phòng:</b> khách hàng sau khi đặt lịch tại văn phòng sẽ nhận được lịch hẹn và thời gian tới văn phòng để nghe Thầy luận giải trực tiếp.</td>";
	function_01 += "</tr>";
	function_01 += "<tr>";
	function_01 += "<td><b>Hình thức thanh toán:</b> Quý khách luận giải Online vui lòng thanh toán trước khi luận giải để giữ lịch. Quý khách đến văn phòng có thể thanh toán trực tiếp tại văn phòng hoặc chuyển khoản đều được.</td>";
	function_01 += "</tr>";
	function_01 += "<tr>";
	function_01 += "<th>THÔNG TIN CHUYỂN KHOẢN</th>";
	function_01 += "</tr>";
	function_01 += "</thead>";
	function_01 += "<tbody>";
	function_01 += "<tr>";
	function_01 += "<td>Số tài khoản: <b>1111898899899</b>";
	function_01 += "<br>Chủ tài khoản: <b>NGUYỄN HUY HƯNG</b></br>";
	function_01 += "Mở tại: <b>Ngân hàng Quân Đội MB Bank</b></br>";
	function_01 += "Nội dung ghi: <b><i>Số điện thoại của quý khách</i></b></br></td>";
	function_01 += "</tr>";
	function_01 += "</tbody>";
	function_01 += "</table>";
	function_01 += "</div>";
	function_01 += '<div class="col-md-6">';
	function_01 += '<table class="table">';
	function_01 += "<thead>";
	function_01 += "<tr>";
	function_01 += "</thead>";
	function_01 += "<tbody>";
	function_01 += '<div class="text-center">';
	function_01 += '<img src="./image/thayhungtuvi.jpg" alt="Mô tả ảnh" class="img-fluid">';
	function_01 += "</div>";
	function_01 += "</tr>";
	function_01 += "<thead>";
	function_01 += "<tr>";
	function_01 += "<th>THÔNG TIN LIÊN HỆ</th>";
	function_01 += "</tr>";
	function_01 += "</thead>";
	function_01 += "</tbody>";
	function_01 += "<tr>";
	function_01 += '<td style="width: 65%;">712 CT2 Bắc Linh Đàm, Hoàng Mai, Hà Nội';
	function_01 += '<br><a href="tel:+8486.786.5685">Phone</a> / <a href="https://zalo.me/0867865685">Zalo</a> / <a href="viber://chat?number=+84867865685">Viber</a>: (+84) 086.786.5685</br>';
	function_01 += 'Email:<a href="mailto:thayhungtuviphucso@gmail.com"> thayhungtuviphucso@gmail.com</a></br>';
	function_01 += 'Facebook Fanpage:<a href="https://www.facebook.com/thayhungtuvi"> Thầy Hưng Fanpage</a></br></td>';
	function_01 += "</div>";
	function_01 += '<td style="width: 65%;"><img src="./image/qr_zalo.jpg" alt="Mô tả ảnh" class="img-fluid"></td>';
	function_01 += "</div>";
	function_01 += "</div>";
	function_01 += "</div>";
	function_01 += "</tr>";
	function_01 += "</table>";
	function_01 += "</div>";
	function_01 += "</div>";
	function_01 += "</div>";
	document.getElementById("valueInput1").innerHTML = function_01;
}
function ancacsao(vitri_sao_tuvi) {
	const antapdieu = ["z", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-"];
	const cungghitieuhan = ["", 0, 3, 1, 1, 3, 4, 4, 3, 2, 2, 3, 0];
	const luucacsao = [0, 391.5, 195.75, 0, 0, 0, 0, 195.75, 391.5, 587.25, 587.25, 587.25, 587.25];
	const timtuongquanmenhcuc = [0, 834.75, 834.75, 834.75, 556.5, 278.25, 0, 0, 0, 0, 278.25, 556.5, 834.75];
	const timsaochumenh = [0, 587.25, 391.5, 195.75, 195.75, 195.75, 195.75, 391.5, 587.25, 783, 783, 783, 783];
	const timsaochuthan = [0, 834.75, 834.75, 834.75, 556.5, 278.25, 0, 0, 0, 0, 278.25, 556.5, 834.75];
	const INT = [0, 391.5, 195.75, 0, 0, 0, 0, 195.75, 391.5, 587.25, 587.25, 587.25, 587.25];
	const jdFromDate = [0, 1113, 1113, 1113, 834.75, 556.5, 278.25, 278.25, 278.25, 278.25, 556.5, 834.75, 1113];
	const jdToDate = [0, 587.25, 391.5, 195.75, 195.75, 195.75, 195.75, 391.5, 587.25, 783, 783, 783, 783];
	const NewMoon = [0, 1113, 1113, 1113, 834.75, 556.5, 278.25, 278.25, 278.25, 278.25, 556.5, 834.75, 1113];
	const anvong_bacsy = [0, 489.375, 293.625, 201.75, 201.75, 201.75, 201.75, 293.625, 489.375, 581.25, 581.25, 581.25, 581.25];
	const antrangsinh = [0, 828.75, 828.75, 828.75, 695.625, 417.375, 293.25, 293.25, 293.25, 293.25, 417.375, 695.625, 828.75];
	var an_thaitue = 0;
	let an_chinhtinh = new Array(13).fill(60);
	let an_sao_gio = Array(13).fill(60);
	var convertLunar2Solar = document.getElementById("myCanvas");
	var tim_cuc_laso = convertLunar2Solar.getContext("2d");
	const TimTuoiAmDuong_TheoChi = [0, 489.375, 293.625, 97.875, 97.875, 97.875, 97.875, 293.625, 489.375, 685.125, 685.125, 685.125, 685.125];
	const xd_vitri_cung_menhthan = [0, 1113, 1113, 1113, 834.75, 556.5, 278.25, 278.25, 278.25, 278.25, 556.5, 834.75, 1113];
	for (let AnTuHoa = 1; AnTuHoa < 13; AnTuHoa++) {
		_ncatt[AnTuHoa] = 0;
		_nsatt[AnTuHoa] = 0;
		tim_cuc_laso.font = font_115;
		tim_cuc_laso.textAlign = "center";
		tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][38][0]);
		tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][38][1], TimTuoiAmDuong_TheoChi[AnTuHoa], xd_vitri_cung_menhthan[AnTuHoa] - 15);
		let sLook = 0;
		if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
			sLook = 1;
		} else {
			sLook = 0.6;
		}
		;
		tim_cuc_laso.font = font_115;
		tim_cuc_laso.textAlign = "center";
		if (vitri_sao_tuvi[AnTuHoa][0][2] == "zzz") {
			if (AnTuHoa == pmenh) {
				tim_cuc_laso.fillStyle = color5hanh(nguhanhnam(nguhanhbanmenh));
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][0][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 20);
			} else {
				tim_cuc_laso.fillStyle = "#008080";
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][0][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 20);
			}
		} else {
			if (AnTuHoa == pmenh) {
				tim_cuc_laso.fillStyle = color5hanh(nguhanhnam(nguhanhbanmenh));
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][0][1] + " (" + vitri_sao_tuvi[AnTuHoa][0][2] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 20);
			} else {
				tim_cuc_laso.fillStyle = "#008080";
				let cungghinguyethan = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][0][1]).width;
				let AnLuuTuHoa = tim_cuc_laso.measureText(" (" + vitri_sao_tuvi[AnTuHoa][0][2] + ")").width;
				textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][0][1] + " (" + vitri_sao_tuvi[AnTuHoa][0][2] + ")").width;
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][0][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 + cungghinguyethan / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 20);
				tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[pthan]];
				tim_cuc_laso.fillText(" (" + vitri_sao_tuvi[AnTuHoa][0][2] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + textlength / 2 - AnLuuTuHoa / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 20);
			}
		}
		;
		if (nct[AnTuHoa] !== 0) {
			if (nct[AnTuHoa] == 1) {
				tim_cuc_laso.font = font_14t;
				tim_cuc_laso.textAlign = "center";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][1][0]);
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][1] + " (" + vitri_sao_tuvi[AnTuHoa][1][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][1][1] + " (" + vitri_sao_tuvi[AnTuHoa][1][8] + ")").width;
				tim_cuc_laso.font = font_7t;
				if (vitri_sao_tuvi[AnTuHoa][1][1] !== "TỬ VI") {
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				} else {
					tim_cuc_laso.fillStyle = "#800080";
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				}
				;
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][1][0]);
				tim_cuc_laso.font = font_9t;
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40 - 8);
				for (let ansao_chinam = 1; ansao_chinam < 5; ansao_chinam++) {
					if (vitri_sao_tuvi[AnTuHoa][1][1] == tensaohoa[ansao_chinam]) {
						tim_cuc_laso.fillStyle = color_tuhoa[ansao_chinam];
						tim_cuc_laso.font = font_9t;
						tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 8, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40 - 4.5);
					}
				}
			}
			;
			if (nct[AnTuHoa] == 2) {
				tim_cuc_laso.font = font_14t;
				tim_cuc_laso.textAlign = "center";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][1][0]);
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][1] + " (" + vitri_sao_tuvi[AnTuHoa][1][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][1][1] + " (" + vitri_sao_tuvi[AnTuHoa][1][8] + ")").width;
				tim_cuc_laso.font = font_7t;
				if (vitri_sao_tuvi[AnTuHoa][1][1] !== "TỬ VI") {
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				} else {
					tim_cuc_laso.fillStyle = "#800080";
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40);
				}
				;
				tim_cuc_laso.font = font_9t;
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][1][0]);
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][1][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40 - 8);
				for (let ansao_chinam = 1; ansao_chinam < 5; ansao_chinam++) {
					if (vitri_sao_tuvi[AnTuHoa][1][1] == tensaohoa[ansao_chinam]) {
						tim_cuc_laso.fillStyle = color_tuhoa[ansao_chinam];
						tim_cuc_laso.font = font_9t;
						tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 8, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 40 - 4.5);
					}
				}
				;
				tim_cuc_laso.font = font_14t;
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][2][0]);
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][2][1] + " (" + vitri_sao_tuvi[AnTuHoa][2][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 58);
				textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][2][1] + " (" + vitri_sao_tuvi[AnTuHoa][2][8] + ")").width;
				tim_cuc_laso.font = font_7t;
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][2][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 58);
				tim_cuc_laso.font = font_9t;
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][2][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 58 - 8);
				for (let ansao_chinam = 1; ansao_chinam < 5; ansao_chinam++) {
					if (vitri_sao_tuvi[AnTuHoa][2][1] == tensaohoa[ansao_chinam]) {
						tim_cuc_laso.fillStyle = color_tuhoa[ansao_chinam];
						tim_cuc_laso.font = font_9t;
						tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - textlength / 2 - 8, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + 58 - 4.5);
					}
				}
				;
				an_chinhtinh[AnTuHoa] = 78;
				an_sao_gio[AnTuHoa] = 78;
			}
		}
		;
		for (let ansao_chinam = 3; ansao_chinam < 10; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][2] !== "zzz") {
				_ncatt[AnTuHoa] += 1;
				tim_cuc_laso.font = font_12;
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
				if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined && vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== "") {
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saovanxuong) {
						if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
							an_thaitue = 3.5;
						} else {
							an_thaitue = 5;
						}
					} else {
						an_thaitue = 0;
					}
					;
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5 - an_thaitue, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
					textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hóa Lộc") {
						tim_cuc_laso.font = font_9;
						tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 1.5 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.3);
					}
					;
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hóa Quyền") {
						tim_cuc_laso.font = font_9;
						tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 1.5 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.3);
					}
					;
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hóa Khoa") {
						tim_cuc_laso.font = font_9;
						tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 1.5 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.3);
					}
					;
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "N" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "B") {
						textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][5], luucacsao[AnTuHoa] + 10.5 - an_thaitue - 4, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 - an_thaitue + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
					}
					;
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Lộc Tồn") {
						tim_cuc_laso.font = font_10t;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][7] == "🪙") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("🪙", luucacsao[AnTuHoa] + 10.5 - 10.3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][7] == "🍀") {
								tim_cuc_laso.font = font_8t;
								tim_cuc_laso.fillText("🍀", luucacsao[AnTuHoa] + 10.5 - 9.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
							}
						}
					}
					;
					for (let ansaotuan = 1; ansaotuan < 5; ansaotuan++) {
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == tensaohoa[ansaotuan]) {
							tim_cuc_laso.fillStyle = color_tuhoa[ansaotuan];
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - an_thaitue + textlength - 4, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] + 1);
						}
					}
					;
					an_chinhtinh[AnTuHoa] += 16;
					an_thaitue = 0;
				} else {
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "N" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "B") {
						textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][5], luucacsao[AnTuHoa] + 10.5 - 4, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength + 1, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
						for (let ansaotuan = 1; ansaotuan < 5; ansaotuan++) {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == tensaohoa[ansaotuan]) {
								tim_cuc_laso.fillStyle = color_tuhoa[ansaotuan];
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 + textlength, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] + 1);
							}
						}
					}
					;
					an_chinhtinh[AnTuHoa] += 16;
				}
			}
		}
		;
		for (let ansao_chinam = 10; ansao_chinam < 20; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][2] !== "zzz") {
				_ncatt[AnTuHoa] += 1;
				let doigiosinh = 0;
				if (cungchinhdieu[AnTuHoa] == 0 || cungchinhdieu[AnTuHoa] == 1) {
					if (_ncatt[AnTuHoa] < 12) {
						tim_cuc_laso.font = font_13t;
						tim_cuc_laso.textAlign = "left";
						tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined && vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== "") {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saothienma) {
									if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 2;
										} else {
											doigiosinh = 1;
										}
									} else {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 1;
										} else {
											doigiosinh = 0;
										}
									}
									;
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
									tim_cuc_laso.fillText(" (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5 + textlength, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("♞", luucacsao[AnTuHoa] + 10.5 - 8 + doigiosinh, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
								} else {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Dương") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#FF3030";
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("☀", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Âm") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("◑", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Tài") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓠ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Thọ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓝ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Đào Hoa") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("💮", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.8);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hồng Loan") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Hỷ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hỷ Thần") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("䷊", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						}
					} else {
						quaNhieuCatTinh = true;
						tim_cuc_laso.font = font_13t;
						tim_cuc_laso.textAlign = "left";
						tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined && vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== "") {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saothienma) {
									if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 2;
										} else {
											doigiosinh = 1;
										}
									} else {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 1;
										} else {
											doigiosinh = 0;
										}
									}
									;
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
									tim_cuc_laso.fillText(" (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5 + textlength, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("♞", luucacsao[AnTuHoa] + 10.5 - 8 + doigiosinh, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
								} else {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Dương") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#FF3030";
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("☀", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Âm") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("◑", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Tài") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓠ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Thọ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓝ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Đào Hoa") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9;
									tim_cuc_laso.fillText("💮", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hồng Loan") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Hỷ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hỷ Thần") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("䷊", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						}
					}
				} else {
					if (_ncatt[AnTuHoa] < 11) {
						tim_cuc_laso.font = font_13t;
						tim_cuc_laso.textAlign = "left";
						tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined && vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== "") {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saothienma) {
									if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 2;
										} else {
											doigiosinh = 1;
										}
									} else {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 1;
										} else {
											doigiosinh = 0;
										}
									}
									;
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
									tim_cuc_laso.fillText(" (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5 + textlength, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("♞", luucacsao[AnTuHoa] + 10.5 - 8 + doigiosinh, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
								} else {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], luucacsao[AnTuHoa] + 10.5 + textlength - 3, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 5);
							} else {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Dương") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#FF3030";
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("☀", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Âm") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("◑", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Tài") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓠ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Thọ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓝ", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Đào Hoa") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9;
									tim_cuc_laso.fillText("💮", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hồng Loan") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Hỷ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hỷ Thần") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("䷊", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
								}
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						}
					} else {
						quaNhieuCatTinh = true;
						an_chinhtinh[AnTuHoa] -= 16;
						tim_cuc_laso.font = font_13t;
						tim_cuc_laso.textAlign = "left";
						tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined && vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== "") {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 5);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saothienma) {
									if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 2;
										} else {
											doigiosinh = 1;
										}
									} else {
										if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
											doigiosinh = 1;
										} else {
											doigiosinh = 0;
										}
									}
									;
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
									tim_cuc_laso.fillText(" (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("♞", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 - 8 + doigiosinh, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 0.5);
								} else {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								}
							}
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][5] == "-") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								tim_cuc_laso.font = font_7t;
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength - 3, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 5);
							} else {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Dương") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#FF3030";
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("☀", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 0.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiếu Âm") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.font = font_10t;
									tim_cuc_laso.fillText("◑", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Tài") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓠ", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Thọ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9t;
									tim_cuc_laso.fillText("ⓝ", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Đào Hoa") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_9;
									tim_cuc_laso.fillText("💮", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 0.5);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hồng Loan") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 0.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 2);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Hỷ") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 1);
								}
								;
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hỷ Thần") {
									textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
									tim_cuc_laso.fillStyle = "#00688B";
									tim_cuc_laso.font = font_7t;
									tim_cuc_laso.fillText("䷊", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength + 1.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 1);
								}
							}
						}
					}
				}
			}
		}
		;
		for (let ansao_chinam = 20; ansao_chinam < 26; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][2] !== "zzz") {
				_nsatt[AnTuHoa] += 1;
				tim_cuc_laso.font = font_115;
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
				if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined) {
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saokinhduong) {
						an_thaitue = 10;
						if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
							tim_cuc_laso.font = font_12c;
						}
					} else {
						an_thaitue = 0;
					}
					;
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "-" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+") {
						textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saokinhduong && (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad")) {
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - 3 + textlength - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] + 5);
							tim_cuc_laso.font = font_7t;
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 - 1 + textlength - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 9);
						} else {
							tim_cuc_laso.font = font_7t;
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][5], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 7 + textlength - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] + 1);
							tim_cuc_laso.font = font_7t;
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 7 + textlength - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 5);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saokinhduong && AnTuHoa == 7) {
							tim_cuc_laso.fillStyle = color5hanh("H");
							tim_cuc_laso.fillText("♞", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 4 - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 0);
							tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
							if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
								tim_cuc_laso.fillText("⚔", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 4 - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 5);
							} else {
								tim_cuc_laso.fillText("⚔", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 5 - an_thaitue, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 5);
							}
						}
					}
					;
					an_sao_gio[AnTuHoa] += 16;
					an_thaitue = 0;
				} else {
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
					an_sao_gio[AnTuHoa] += 16;
				}
			}
		}
		;
		for (let ansao_chinam = 26; ansao_chinam < 36; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][2] !== "zzz") {
				_nsatt[AnTuHoa] += 1;
				tim_cuc_laso.font = font_13t;
				if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][0] == saohoaky) {
					tim_cuc_laso.font = font_115;
				}
				;
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
				if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] !== undefined) {
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "-" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+") {
						textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")").width;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + textlength + 5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 5);
					} else {
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + "(" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Hóa Kỵ") {
							tim_cuc_laso.font = font_9;
							tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 0.3);
						}
					}
					;
					an_sao_gio[AnTuHoa] += 16;
				} else {
					if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "-" || vitri_sao_tuvi[AnTuHoa][ansao_chinam][6] == "+") {
						textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						tim_cuc_laso.font = font_7t;
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][6], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + textlength + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 5);
					} else {
						tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thái Tuế") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("👑", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 11 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 1.5);
							} else {
								tim_cuc_laso.font = font_9;
							}
							;
							tim_cuc_laso.fillText("♕", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 13 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 1);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Không" && AnTuHoa % 3 == 0) {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.font = font_10t;
							tim_cuc_laso.fillText("☸", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 0.3);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Không" && (AnTuHoa + 1) % 3 == 0) {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.font = font_10t;
							tim_cuc_laso.fillText("⓪", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 0.3);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "Thiên Không" && (AnTuHoa + 2) % 3 == 0) {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("⟁", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10 + textlength, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa] - 0.5);
						}
					}
					;
					an_sao_gio[AnTuHoa] += 16;
				}
			}
		}
	}
	;
	let function_01 = "";
	let function_02 = "";
	tim_cuc_laso.font = font_13t;
	const cungmov10 = ["zzz", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
	const cungmov = ["zzz", "G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."];
	for (let AnTuHoa = 1; AnTuHoa < 13; AnTuHoa++) {
		tim_cuc_laso.textAlign = "right";
		tim_cuc_laso.fillStyle = "#4A708B";
		tim_cuc_laso.font = font_13t;
		tim_cuc_laso.fillStyle = color5hanh(nguhanh_th[AnTuHoa]);
		tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][39][1], timsaochumenh[AnTuHoa] - 7, timsaochuthan[AnTuHoa] + 16);
		tim_cuc_laso.fillStyle = color5hanh("K");
		let anhoalinh = namsinhAL + parseInt(vitri_sao_tuvi[AnTuHoa][39][1]) - 1;
		[function_01, function_02] = timcaci(6, 6, namsinhAL + parseInt(vitri_sao_tuvi[AnTuHoa][39][1]) - 1, 7);
		tim_cuc_laso.font = font_5;
		tim_cuc_laso.fillStyle = "#D3D3D3";
		verticalTextCanvas(cungmov[cungmov10.indexOf(function_01)] + function_02 + " " + anhoalinh.toString(), timsaochumenh[AnTuHoa] - 1.8, timsaochuthan[AnTuHoa] + 6.5, font_6, 3.7);
		tim_cuc_laso.textAlign = "left";
		tim_cuc_laso.fillStyle = color5hanh(nguhanh_canchi[AnTuHoa]);
		tim_cuc_laso.font = font_11t;
		textlength = tim_cuc_laso.measureText("[" + can_cung[AnTuHoa] + "" + tabcung[AnTuHoa] + "]").width;
		tim_cuc_laso.fillText("[" + can_cung[AnTuHoa] + tabcung[AnTuHoa] + "]", luucacsao[AnTuHoa] + 5, timtuongquanmenhcuc[AnTuHoa] + 16);
		tim_cuc_laso.font = font_9t;
		tim_cuc_laso.fillText(antapdieu[AnTuHoa], luucacsao[AnTuHoa] + textlength + 5, timtuongquanmenhcuc[AnTuHoa] + 11);
		tim_cuc_laso.font = font_10t;
		tim_cuc_laso.textAlign = "left";
		if (vitri_sao_tuvi[AnTuHoa][40][1] == "ĐV-MỆNH") {
			tim_cuc_laso.fillStyle = "#C9E4D6";
			tim_cuc_laso.fillRect(INT[AnTuHoa] + 3, jdFromDate[AnTuHoa] - 16.5, 53.5, 14.5);
			if (nguhanh_th[tabcung.indexOf(chinam)] == "H") {
				tim_cuc_laso.fillStyle = "#EE1289";
			} else {
				tim_cuc_laso.fillStyle = color5hanh(nguhanh_th[tabcung.indexOf(chinam)]);
			}
			;
			tim_cuc_laso.font = font_10;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][40][1], INT[AnTuHoa] + 5, jdFromDate[AnTuHoa] - 5);
		} else {
			tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
			tim_cuc_laso.font = font_10t;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][40][1], INT[AnTuHoa] + 5, jdFromDate[AnTuHoa] - 5);
		}
		;
		tim_cuc_laso.font = font_11t;
		tim_cuc_laso.textAlign = "left";
		if (vitri_sao_tuvi[AnTuHoa][41][1] == "Lđv-Mệnh") {
			tim_cuc_laso.fillStyle = "#98D0B9";
			tim_cuc_laso.fillRect(INT[AnTuHoa] + 3, jdFromDate[AnTuHoa] - 29, 53.5, 14.5);
			tim_cuc_laso.fillStyle = "#257CAC";
			tim_cuc_laso.font = font_10;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][41][1], INT[AnTuHoa] + 5, jdFromDate[AnTuHoa] - 18);
		} else {
			tim_cuc_laso.fillStyle = "#966666";
			tim_cuc_laso.font = font_11t;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][41][1], INT[AnTuHoa] + 5, jdFromDate[AnTuHoa] - 18);
		}
		;
		tim_cuc_laso.font = font_11t;
		tim_cuc_laso.fillStyle = "#777777";
		if (AnTuHoa == 1 || AnTuHoa == 2 || AnTuHoa == 7 || AnTuHoa == 8) {
			tim_cuc_laso.textAlign = "center";
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][42][1], anvong_bacsy[AnTuHoa], antrangsinh[AnTuHoa]);
		} else {
			if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][42][1], anvong_bacsy[AnTuHoa], antrangsinh[AnTuHoa]);
			} else {
				if (AnTuHoa == 9 || AnTuHoa == 10 || AnTuHoa == 11 || AnTuHoa == 12) {
					tim_cuc_laso.textAlign = "right";
					tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][42][1], anvong_bacsy[AnTuHoa], antrangsinh[AnTuHoa]);
				}
			}
		}
		;
		tim_cuc_laso.font = font_11t;
		tim_cuc_laso.textAlign = "right";
		tim_cuc_laso.fillStyle = tim_cuc_laso.fillStyle = "#966666";
		tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][43][1], timsaochumenh[AnTuHoa] - 7, timsaochuthan[AnTuHoa] + 27);
		tim_cuc_laso.font = font_9t;
		tim_cuc_laso.fillStyle = "#966666";
		tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][43][3], timsaochumenh[AnTuHoa] - 7, timsaochuthan[AnTuHoa] + 38);
		tim_cuc_laso.font = font_9t;
		if (vitri_sao_tuvi[AnTuHoa][45][1] == "L.MỆNH") {
			tim_cuc_laso.fillStyle = "#E8D3E3";
			tim_cuc_laso.fillRect(jdToDate[AnTuHoa] - 50, NewMoon[AnTuHoa] - 16, 48, 14);
			tim_cuc_laso.fillStyle = "#966666";
			tim_cuc_laso.font = font_10;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][45][1], jdToDate[AnTuHoa] - 5, NewMoon[AnTuHoa] - 5);
		} else {
			tim_cuc_laso.fillStyle = "#966666";
			tim_cuc_laso.font = font_11t;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][45][1], jdToDate[AnTuHoa] - 5, NewMoon[AnTuHoa] - 5);
		}
		;
		tim_cuc_laso.font = font_11t;
		if (vitri_sao_tuvi[AnTuHoa][44][1] == "Tv Mệnh") {
			tim_cuc_laso.fillStyle = "#F19373";
			tim_cuc_laso.fillRect(jdToDate[AnTuHoa] - 36, NewMoon[AnTuHoa] - 32, 33, 15);
			tim_cuc_laso.fillStyle = "#E6F1D8";
			tim_cuc_laso.font = font_10;
			tim_cuc_laso.textAlign = "center";
			tim_cuc_laso.fillText(namxemhan, jdToDate[AnTuHoa] - 19.5, NewMoon[AnTuHoa] - 21);
		} else {
			tim_cuc_laso.fillStyle = "#966666";
			tim_cuc_laso.font = font_11t;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][44][1], jdToDate[AnTuHoa] - 5, NewMoon[AnTuHoa] - 18);
		}
	}
	;
	if (TuViDienToan.hientuhoaphitinh == true) {
		for (let AnTuHoa = 1; AnTuHoa < 13; AnTuHoa++) {
			tim_cuc_laso.font = font_10t;
			tim_cuc_laso.textAlign = "center";
			tim_cuc_laso.fillStyle = "#00B2BF";
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][62][1], INT[AnTuHoa] + (jdToDate[AnTuHoa] - INT[AnTuHoa]) / 4, jdFromDate[AnTuHoa] - 43);
			tim_cuc_laso.fillStyle = "#FF0000";
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][62][2], INT[AnTuHoa] + (jdToDate[AnTuHoa] - INT[AnTuHoa]) / 4, jdFromDate[AnTuHoa] - 33);
			tim_cuc_laso.textAlign = "center";
			tim_cuc_laso.fillStyle = "#00BB00";
			textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][62][3]).width;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][62][3], INT[AnTuHoa] + 3 * (jdToDate[AnTuHoa] - INT[AnTuHoa]) / 4, jdFromDate[AnTuHoa] - 43);
			tim_cuc_laso.fillStyle = "#000000";
			textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][62][4]).width;
			tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][62][4], INT[AnTuHoa] + 3 * (jdToDate[AnTuHoa] - INT[AnTuHoa]) / 4, jdFromDate[AnTuHoa] - 33);
		}
	}
	;
	let tim_canchi_ngay = 0;
	if (TuViDienToan.hientuhoaphitinh == true) {
		tim_canchi_ngay = 0;
	} else {
		tim_canchi_ngay = 1;
	}
	;
	for (let AnTuHoa = 1; AnTuHoa < 13; AnTuHoa++) {
		let sLook = 0;
		let doigiosinh = 0;
		if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
			sLook = 1.2;
		} else {
			sLook = 0.6;
		}
		;
		for (let ansao_chinam = 46; ansao_chinam < 54; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] !== "zzz") {
				_ncatt[AnTuHoa] += 1;
				if (stars[vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]][7] == 1) {
					tim_cuc_laso.font = font_115;
				} else {
					tim_cuc_laso.font = font_13t;
				}
				;
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
				if (cungchinhdieu[AnTuHoa] == 0 || cungchinhdieu[AnTuHoa] == 1) {
					if (_ncatt[AnTuHoa] < 12 + tim_canchi_ngay) {
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khôi") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Việt") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Xương") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khúc") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
												} else {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
												}
											}
										}
									}
								}
							}
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Đào Hoa") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_7;
							tim_cuc_laso.fillText("💮", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hồng Loan") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Hỷ") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hỷ Thần") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("䷊", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1.5);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Mã") {
							if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
								if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
									doigiosinh = 3;
								} else {
									doigiosinh = 1;
								}
							} else {
								if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
									doigiosinh = 2;
								} else {
									doigiosinh = 0;
								}
							}
							;
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
							tim_cuc_laso.font = font_10t;
							tim_cuc_laso.fillText("♞", luucacsao[AnTuHoa] + 10.5 - 9 - sLook + doigiosinh, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
						}
						;
						an_chinhtinh[AnTuHoa] += 16;
					} else {
						an_chinhtinh[AnTuHoa] -= 16;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khôi") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Việt") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Xương") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khúc") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
												} else {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
												}
											}
										}
									}
								}
							}
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Đào Hoa") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_7;
							tim_cuc_laso.fillText("💮", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hồng Loan") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength + 0.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 2);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Hỷ") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength + 0.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 2);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hỷ Thần") {
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = "#00688B";
							tim_cuc_laso.font = font_6t;
							tim_cuc_laso.fillText("䷊", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength + 0.5, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 1.5);
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Mã") {
							if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
								if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
									doigiosinh = 3;
								} else {
									doigiosinh = 1;
								}
							} else {
								if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
									doigiosinh = 2;
								} else {
									doigiosinh = 0;
								}
							}
							;
							textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
							tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("♞", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 0.5);
						}
					}
				} else {
					if (cungchinhdieu[AnTuHoa] == 2) {
						if (_ncatt[AnTuHoa] < 11 + tim_canchi_ngay) {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khôi") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Việt") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Xương") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
												} else {
													if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khúc") {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
													} else {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
													}
												}
											}
										}
									}
								}
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9 + sLook, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Đào Hoa") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_7;
								tim_cuc_laso.fillText("💮", luucacsao[AnTuHoa] + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hồng Loan") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Hỷ") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("🌹", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 2);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hỷ Thần") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("䷊", luucacsao[AnTuHoa] + 10.5 + textlength + 0.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1.5);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Mã") {
								if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
									if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
										doigiosinh = 3;
									} else {
										doigiosinh = 1;
									}
								} else {
									if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
										doigiosinh = 2;
									} else {
										doigiosinh = 0;
									}
								}
								;
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
								tim_cuc_laso.font = font_10t;
								tim_cuc_laso.fillText("♞", luucacsao[AnTuHoa] + 10.5 - 9 - sLook + doigiosinh, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 0.5);
							}
							;
							an_chinhtinh[AnTuHoa] += 16;
						} else {
							an_chinhtinh[AnTuHoa] -= 16;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khôi") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Việt") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Xương") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
												} else {
													if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khúc") {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
													} else {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
													}
												}
											}
										}
									}
								}
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Lộc") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Quyền") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khoa") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Đào Hoa") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_7;
								tim_cuc_laso.fillText("💮", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength + 1.5, timtuongquanmenhcuc[AnTuHoa] + an_chinhtinh[AnTuHoa] - 1);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hồng Loan") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength - 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 2);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Hỷ") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("🌹", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength - 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 2);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Hỷ Thần") {
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = "#00688B";
								tim_cuc_laso.font = font_6t;
								tim_cuc_laso.fillText("䷊", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10.5 + textlength - 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa] - 1.5);
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L.Thiên Mã") {
								if (AnTuHoa == 3 || AnTuHoa == 4 || AnTuHoa == 5 || AnTuHoa == 6) {
									if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
										doigiosinh = 3;
									} else {
										doigiosinh = 1;
									}
								} else {
									if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
										doigiosinh = 2;
									} else {
										doigiosinh = 0;
									}
								}
								;
								textlength = tim_cuc_laso.measureText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1]).width;
								tim_cuc_laso.fillStyle = color_nguHanh[cungghitieuhan[AnTuHoa]];
								tim_cuc_laso.font = font_10t;
								tim_cuc_laso.fillText("♞", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1 + doigiosinh, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_chinhtinh[AnTuHoa]);
							}
						}
					}
				}
			}
		}
	}
	;
	for (let AnTuHoa = 1; AnTuHoa < 13; AnTuHoa++) {
		for (let ansao_chinam = 54; ansao_chinam < 62; ansao_chinam++) {
			if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] !== "zzz") {
				_nsatt[AnTuHoa] += 1;
				if (stars[vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]][7] == 1) {
					tim_cuc_laso.font = font_115;
				} else {
					tim_cuc_laso.font = font_13t;
				}
				;
				tim_cuc_laso.textAlign = "left";
				tim_cuc_laso.fillStyle = saocolor(vitri_sao_tuvi[AnTuHoa][ansao_chinam][0]);
				if (cungchinhdieu[AnTuHoa] == 0 || cungchinhdieu[AnTuHoa] == 1) {
					if (_nsatt[AnTuHoa] < 12 + tim_canchi_ngay) {
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kình") {
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Đà") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hổ") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Tang") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khốc") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hư") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
												} else {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
												}
											}
										}
									}
								}
							}
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
						}
						;
						an_sao_gio[AnTuHoa] += 16;
					} else {
						an_sao_gio[AnTuHoa] -= 16;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kình") {
							tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
						} else {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Đà") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hổ") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Tang") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khốc") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hư") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
												} else {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
												}
											}
										}
									}
								}
							}
						}
						;
						if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
							tim_cuc_laso.font = font_9t;
							tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
						}
					}
				} else {
					if (cungchinhdieu[AnTuHoa] == 2) {
						if (_nsatt[AnTuHoa] < 11 + tim_canchi_ngay) {
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kình") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Đà") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hổ") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Tang") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khốc") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hư") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
												} else {
													if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
													} else {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 10, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
													}
												}
											}
										}
									}
								}
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", (luucacsao[AnTuHoa] + timsaochumenh[AnTuHoa]) / 2 + 1, (timtuongquanmenhcuc[AnTuHoa] + timsaochuthan[AnTuHoa]) / 2 + an_sao_gio[AnTuHoa]);
							}
							;
							an_sao_gio[AnTuHoa] += 16;
						} else {
							an_sao_gio[AnTuHoa] -= 16;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kình") {
								tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
							} else {
								if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Đà") {
									tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
								} else {
									if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hổ") {
										tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
									} else {
										if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Tang") {
											tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
										} else {
											if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Khốc") {
												tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
											} else {
												if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Hư") {
													tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
												} else {
													if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] + " (" + vitri_sao_tuvi[AnTuHoa][ansao_chinam][8] + ")", luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
													} else {
														tim_cuc_laso.fillText(vitri_sao_tuvi[AnTuHoa][ansao_chinam][1], luucacsao[AnTuHoa] + 10.5, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
													}
												}
											}
										}
									}
								}
							}
							;
							if (vitri_sao_tuvi[AnTuHoa][ansao_chinam][1] == "L. Kỵ") {
								tim_cuc_laso.font = font_9t;
								tim_cuc_laso.fillText("☯︎", luucacsao[AnTuHoa] + 10.5 - 9, timtuongquanmenhcuc[AnTuHoa] + an_sao_gio[AnTuHoa]);
							}
						}
					}
				}
			}
		}
	}
}
function napthongtincaccung(SunLongitude, cungghitieuhan, checkDevice, getLeapMonthOffset, jdToDate, tinhTongSoHang, INT, convertLunar2Solar, function_02) {
	let sLook = "";
	let cungmov = "";
	[sLook, cungmov] = timcaci(Math.floor(cungghitieuhan), Math.floor(checkDevice), Math.floor(getLeapMonthOffset), 7);
	[_can_namxem, _chi_namxem] = timcaci(15, 6, Math.floor(convertLunar2Solar), 7);
	cungansao = new Array(13);
	cungansaoLA = new Array(13);
	for (let printCanvas = 0; printCanvas < 13; printCanvas++) {
		cungansao[printCanvas] = new Array(63).fill();
		cungansaoLA[printCanvas] = new Array(63).fill();
		cungchinhdieu[printCanvas] = 0;
		nct[printCanvas] = 0;
		ntt[printCanvas] = 0;
		npt[printCanvas] = 0;
		n6t[printCanvas] = 0;
		nst[printCanvas] = 0;
		str_cungansao[printCanvas] = "";
	}
	;
	for (let printCanvas = 0; printCanvas < 13; printCanvas++) {
		for (let resizeImage = 0; resizeImage < 63; resizeImage++) {
			cungansao[printCanvas][resizeImage] = ["0", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz"];
			cungansaoLA[printCanvas][resizeImage] = ["0", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz", "zzz"];
		}
	}
	;
	cannam = sLook;
	chinam = cungmov;
	namxemhan = convertLunar2Solar;
	giosinhAL = doigiosinh(Math.floor(jdToDate), Math.floor(tinhTongSoHang), 7);
	let handleDoubleClick = new Array(4);
	handleDoubleClick = convertSolar2Lunar(Math.floor(cungghitieuhan), Math.floor(checkDevice), Math.floor(getLeapMonthOffset), 7);
	if (handleDoubleClick[3] == 1) {
		thangnhuan = true;
	} else {
		thangnhuan = false;
	}
	;
	ngaysinhAL = handleDoubleClick[0];
	if (giotinhngay == 1) {
		ngaysinhAL = ngaysinhAL + 1;
	}
	;
	thangsinhAL = handleDoubleClick[1];
	namsinhAL = handleDoubleClick[2];
	canchi_thangsinh = tim_canchi_thang(thangsinhAL, cannam);
	canchi_ngaysinh = tim_canchi_ngay(Math.floor(cungghitieuhan), Math.floor(checkDevice), Math.floor(getLeapMonthOffset));
	canchi_giosinh = tim_canchi_gio(giosinhAL, canchi_ngaysinh.split(" ")[0]);
	gtinh = INT;
	jamduong = TimTuoiAmDuong_TheoCan(cannam);
	nguhanhbanmenh = XD_HanhBanMenh(cannam, chinam);
	[cungmenh, cungthan] = xd_vitri_cung_menhthan(giosinhAL, thangsinhAL);
	if (TimTuoiAmDuong_TheoChi(chinam) == 1) {
		tuoiamduong = "Dương " + gtinh;
		tuoiad = 1;
	} else {
		tuoiad = -1;
		tuoiamduong = "Âm " + gtinh;
	}
	;
	battrach(namsinhAL, INT);
	an_chinhtinh(vitri_sao_tuvi(ngaysinhAL, tim_cuc_laso(cannam, cungmenh)));
	an_thaitue(chinam);
	an_sao_gio(giosinhAL);
	an_sao_thang(thangsinhAL);
	an_sao_theo_can_cua_nam_sinh(cannam);
	AnTuHoa(cannam, function_02);
	ansao_chinam(chinam);
	ansaotuan(cannam, chinam);
	anhoalinh(chinam, giosinhAL);
	timsaochumenh(pmenh);
	timsaochuthan(chinam);
	anvong_bacsy(plocton);
	cuccualaso = tim_cuc_laso(cannam, cungmenh);
	antrangsinh(tim_cuc_laso(cannam, cungmenh));
	antapdieu();
	if (TuViDienToan.hienvongtuongtinh == true) {
		VongTuongTinh();
		SaoAmSat();
	}
	;
	luucacsao();
	if (TuViDienToan.hiensaoluutuhoa == true) {
		AnLuuTuHoa(_can_namxem, function_02);
	}
	;
	napthiencan_cung();
	if (TuViDienToan.hientuhoaphitinh == true) {
		phicungtuhoa(function_02);
	}
	;
	if (TuViDienToan.hiencacthongtinkhac == true) {}
		;
	if (TuViDienToan.anthongtincanhan == true) {
		anThongTinLS = true;
	}
	;
	GetSao_Possittion();
	tuongquanmenhcuc = timtuongquanmenhcuc(nguhanhbanmenh, tim_cuc_laso(cannam, cungmenh));
	tensaohoa[1] = getFullNameTuHoa(tuhoa[0]);
	tensaohoa[2] = getFullNameTuHoa(tuhoa[1]);
	tensaohoa[3] = getFullNameTuHoa(tuhoa[2]);
	tensaohoa[4] = getFullNameTuHoa(tuhoa[3]);
	for (let printCanvas = 1; printCanvas < 13; printCanvas++) {
		str_cungansao[printCanvas] = "{" + printCanvas + "}{" + can_cung_full[printCanvas] + "}";
		for (let resizeImage = 0; resizeImage < 63; resizeImage++) {
			if (cungansao[printCanvas][resizeImage][1] !== "zzz") {
				str_cungansao[printCanvas] += "{" + cungansao[printCanvas][resizeImage][1] + "}";
			}
		}
		;
		str_cungansao[printCanvas] += "{" + cungansao[printCanvas][55][2] + "}" + "{" + cungansao[printCanvas][55][3] + "}" + "{" + cungansao[printCanvas][55][4] + "}";
	}
	;
	let getSunLongitude = "";
	if (cungad[pmenh] * tuoiad == 1) {
		getSunLongitude = "Âm Dương Thuận Lý";
	} else {
		getSunLongitude = "Âm Dương Nghịch Lý";
	}
	;
	cungthienban.hoten = SunLongitude;
	cungthienban.ngaysinh = cungghitieuhan;
	cungthienban.thangsinh = checkDevice;
	cungthienban.namsinh = getLeapMonthOffset;
	cungthienban.giosinh = jdToDate;
	cungthienban.phutsinh = tinhTongSoHang;
	cungthienban.gioitinh = INT;
	cungthienban.ngaysinh_al = ngaysinhAL.toString();
	cungthienban.thangsinh_al = thangsinhAL.toString();
	cungthienban.namsinh_al = namsinhAL.toString();
	cungthienban.giosinh_al = giosinhAL.toString();
	cungthienban.canchingay = canchi_ngaysinh;
	cungthienban.canchithang = canchi_thangsinh;
	cungthienban.canchinam = cannam + " " + chinam;
	cungthienban.canchigio = canchi_giosinh;
	cungthienban.namxemhan = namxemhan;
	cungthienban.cachantuhoa = function_02;
	cungthienban.tuoiduongso = tuoiduongso.toString();
	cungthienban.tuoiamduong = tuoiamduong;
	cungthienban.nguhanhbanmenh = nguhanhbanmenh;
	cungthienban.cuccualaso = cuccualaso;
	cungthienban.thuannghichad = getSunLongitude;
	cungthienban.tuongquanmenhcuc = tuongquanmenhcuc;
	cungthienban.saochumenh = saochumenh;
	cungthienban.saochuthan = saochuthan;
	cungthienban.menhlaptai = tabcung[pmenh];
	cungthienban.thancu = cungansao[pthan][0][1];
	cungthienban.lainhancung = str_lainhan;
	cungthienban.nguyenthancung = str_nguyenthan;
	str_cungansao[0] = JSON.stringify(Object.values(cungthienban));
	str_cungansao[0] = str_cungansao[0].replace(/"([^"]*)"/g, "{$1}");
	return cungansao;
}
function canvaslasotv() {}
function convertToBase64(function_01) {
	return new Promise((timcaci, sLook) => {
		const function_02 = new Image;
		function_02.onload = () => {
			const sLook = document.createElement("canvas");
			sLook.width = function_02.width;
			sLook.height = function_02.height;
			const doigiosinh = sLook.getContext("2d");
			doigiosinh.drawImage(function_02, 0, 0);
			const function_01 = sLook.toDataURL("image/jpeg").split(",")[1];
			timcaci(function_01);
		};
		function_02.onerror = () => {
			sLook(new Error("Failed to load the image."));
		};
		function_02.src = function_01;
	});
}
function saocolor(function_01) {
	let function_02 = stars[function_01][2];
	switch (function_02) {
		case "K":
		return color_nguHanh[2];
		case "M":
		return color_nguHanh[1];
		case "T":
		return color_nguHanh[0];
		case "H":
		return color_nguHanh[4];
		case "O":
		return color_nguHanh[3];
		case "K1":
		return color_nguHanh[9];
		case "H1":
		return color_nguHanh[10];
		case "T1":
		return color_nguHanh[11];
	}
}
function color5hanh(function_01) {
	switch (function_01) {
		case "K":
		return color_nguHanh[2];
		case "M":
		return color_nguHanh[1];
		case "T":
		return color_nguHanh[0];
		case "H":
		return color_nguHanh[4];
		case "O":
		return color_nguHanh[3];
		case "K1":
		return color_nguHanh[9];
		case "H1":
		return color_nguHanh[10];
		case "T1":
		return color_nguHanh[11];
	}
}
function getRandomInt(function_02, function_01) {
	function_02 = Math.ceil(function_02);
	function_01 = Math.floor(function_01);
	return Math.floor(Math.random() * (function_01 - function_02) + function_02);
}
function bangdosangcacsao() {
	if (TuViDienToan.chonbangdosang == 1) {
		bangdosang = [[1, "Đ", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "Đ"], [2, "V", "Đ", "V", "H", "M", "H", "V", "Đ", "V", "H", "M", "H"], [3, "V", "H", "M", "Đ", "H", "Đ", "H", "H", "M", "H", "H", "Đ"], [4, "V", "M", "V", "Đ", "M", "H", "V", "M", "V", "Đ", "M", "H"], [5, "H", "Đ", "V", "V", "V", "M", "M", "Đ", "H", "H", "H", "H"], [6, "Đ", "Đ", "H", "M", "M", "V", "Đ", "Đ", "V", "M", "M", "H"], [7, "M", "B", "M", "B", "V", "Đ", "M", "Đ", "M", "B", "V", "Đ"], [8, "V", "Đ", "H", "H", "H", "H", "H", "Đ", "V", "M", "M", "M"], [9, "H", "M", "Đ", "H", "V", "H", "H", "M", "Đ", "H", "V", "H"], [10, "V", "H", "V", "M", "H", "H", "V", "H", "Đ", "M", "H", "Đ"], [11, "V", "Đ", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"], [12, "V", "Đ", "V", "V", "M", "H", "M", "Đ", "V", "H", "M", "H"], [13, "M", "Đ", "M", "H", "H", "V", "M", "Đ", "M", "H", "H", "V"], [14, "M", "V", "H", "H", "Đ", "H", "M", "V", "H", "H", "Đ", "H"], [17, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [23, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [52, "H", "Đ", "", "H", "Đ", "", "H", "Đ", "", "H", "Đ", ""], [51, "", "Đ", "H", "", "Đ", "H", "", "Đ", "H", "", "Đ", "H"], [56, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"], [55, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"], [54, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"], [53, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"], [36, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [30, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [69, "Đ", "H", "Đ", "H", "H", "H", "Đ", "H", "Đ", "H", "H", "H"], [70, "Đ", "Đ", "H", "Đ", "H", "H", "Đ", "Đ", "H", "Đ", "H", "H"], [73, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [74, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [92, "B", "M", "B", "H", "M", "Đ", "B", "M", "M", "B", "M", "M"], [93, "N", "M", "V", "V", "B", "B", "M", "V", "V", "B", "M", "V"], [94, "V", "V", "V", "M", "M", "N", "M", "V", "M", "B", "V", "V"], [95, "V", "M", "H", "V", "N", "H", "H", "V", "H", "H", "H", "H"], [59, "V", "V", "", "M", "", "", "M", "", "", "", "", "V"], [60, "", "", "V", "", "", "V", "", "V", "M", "M", "", ""], [61, "V", "M", "M", "H", "M", "B", "V", "M", "B", "H", "M", "N"], [62, "", "M", "V", "H", "M", "B", "V", "M", "N", "H", "M", "B"], [57, "M", "M", "H", "B", "V", "M", "H", "B", "V", "M", "H", "V"], [58, "V", "M", "B", "V", "M", "M", "H", "V", "B", "M", "H", "V"], [109, "M", "", "M", "V", "", "M", "V", "", "M", "V", "", "M"], [98, "", "", "V", "", "", "V", "", "", "Đ", "", "", "B"]];
	} else {
		if (TuViDienToan.chonbangdosang == 2) {
			bangdosang = [[1, "B", "M", "M", "V", "H", "V", "M", "M", "V", "B", "N", "V"], [2, "B", "V", "M", "N", "V", "H", "B", "M", "M", "B", "V", "H"], [3, "V", "H", "N", "M", "B", "M", "H", "H", "V", "B", "B", "M"], [4, "V", "M", "N", "H", "M", "B", "V", "M", "B", "V", "M", "B"], [5, "H", "H", "V", "M", "V", "V", "M", "B", "N", "N", "H", "H"], [6, "M", "H", "V", "V", "M", "B", "M", "H", "B", "V", "M", "B"], [7, "M", "M", "M", "B", "M", "B", "V", "M", "B", "H", "M", "V"], [8, "M", "M", "N", "H", "N", "H", "H", "B", "B", "V", "V", "M"], [9, "V", "M", "B", "Đ", "M", "H", "V", "M", "B", "B", "M", "H"], [10, "V", "V", "M", "M", "B", "B", "V", "H", "M", "M", "V", "V"], [11, "M", "M", "M", "H", "V", "B", "V", "N", "M", "H", "N", "B"], [12, "M", "V", "M", "M", "V", "H", "M", "V", "H", "Đ", "V", "H"], [13, "B", "M", "M", "H", "V", "B", "V", "V", "M", "N", "M", "B"], [14, "M", "V", "H", "V", "V", "N", "M", "M", "H", "H", "V", "B"], [17, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [23, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [52, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"], [51, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"], [56, "B", "V", "M", "B", "N", "V", "M", "N", "H", "H", "M", "B"], [55, "H", "H", "M", "M", "V", "V", "M", "V", "V", "H", "M", "M"], [54, "B", "H", "H", "B", "H", "M", "M", "B", "M", "M", "H", "H"], [53, "H", "H", "B", "B", "H", "N", "M", "B", "M", "B", "B", "V"], [36, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [30, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [69, "Đ", "Đ", "H", "Đ", "H", "H", "Đ", "Đ", "H", "Đ", "H", "H"], [70, "Đ", "Đ", "H", "Đ", "H", "H", "Đ", "Đ", "H", "Đ", "H", "H"], [73, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [74, "H", "H", "Đ", "Đ", "H", "H", "H", "H", "Đ", "Đ", "H", "H"], [92, "B", "M", "B", "H", "M", "Đ", "B", "M", "M", "B", "M", "M"], [93, "N", "M", "V", "V", "B", "B", "M", "V", "V", "B", "M", "V"], [94, "V", "V", "V", "M", "M", "N", "M", "V", "M", "B", "V", "V"], [95, "V", "M", "H", "V", "N", "H", "H", "V", "H", "H", "H", "H"], [59, "V", "V", "", "M", "", "", "M", "", "", "", "", "V"], [60, "", "", "V", "", "", "V", "", "V", "M", "M", "", ""], [61, "V", "M", "M", "H", "M", "B", "V", "M", "B", "H", "M", "N"], [62, "", "M", "V", "H", "M", "B", "V", "M", "N", "H", "M", "B"], [57, "M", "M", "H", "B", "V", "M", "H", "B", "V", "M", "H", "V"], [58, "V", "M", "B", "V", "M", "M", "H", "V", "B", "M", "H", "V"], [109, "M", "", "M", "V", "", "M", "V", "", "M", "V", "", "M"], [98, "", "", "V", "", "", "V", "", "", "Đ", "", "", "B"]];
		}
	}
}
function luudslsthoaman(timcaci, tim_canchi_ngay, cungmov, doigiosinh, sLook, tim_canchi_gio, function_02, tim_canchi_thang, function_01) {
	TuViDienToan.name = timcaci;
	TuViDienToan.birthday = tim_canchi_ngay;
	TuViDienToan.birthmonth = cungmov;
	TuViDienToan.birthyear = doigiosinh;
	TuViDienToan.birthhour = sLook;
	TuViDienToan.birthmins = tim_canchi_gio;
	TuViDienToan.gender = function_02;
	TuViDienToan.muigio = "7";
	TuViDienToan.namxemhan = tim_canchi_thang;
	TuViDienToan.cachantuhoa = function_01;
	TuViDienToan.chonbangdosang = 1;
	TuViDienToan.time = new Date;
	lasovualay[0] = "z";
	lasovualay[1] = timcaci;
	lasovualay[2] = tim_canchi_ngay;
	lasovualay[3] = cungmov;
	lasovualay[4] = doigiosinh;
	lasovualay[5] = sLook;
	lasovualay[6] = tim_canchi_gio;
	lasovualay[7] = function_02;
	lasovualay[8] = "UTC+7";
	if (mDevice == "Windows" || mDevice == "Android") {
		cookieValue = JSON.stringify(TuViDienToan);
		document.cookie = "" + cookieName + "=" + cookieValue + "; path=/; max-age=3600";
		let cungmov10 = isValueDuplicated("danhSachLaSo", lasovualay);
		if (!cungmov10) {
			addItemToLocal("danhSachLaSo", lasovualay);
			danhsachlaso = getAllItemsFromLocal("danhSachLaSo");
		}
	} else {
		if (mDevice == "Mac" || mDevice == "iPhone" || mDevice == "iPad") {
			let INT = JSON.stringify(TuViDienToan);
			localStorage.setItem("TuViDienToan", INT);
			let cungmov10 = isValueDuplicated("danhSachLaSo", lasovualay);
			if (!cungmov10) {
				addItemToLocal("danhSachLaSo", lasovualay);
				danhsachlaso = getAllItemsFromLocal("danhSachLaSo");
			}
		}
	}
	;
	return;
}
function verticalTextCanvas(timcaci, doigiosinh, tim_canchi_thang, function_02) {
	ctx.font = function_02;
	for (var sLook = timcaci.length - 1; sLook >= 0; sLook--) {
		let function_01 = timcaci.charAt(sLook);
		ctx.save();
		ctx.translate(doigiosinh, tim_canchi_thang);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText(function_01, 0, 0);
		ctx.restore();
		tim_canchi_thang += ctx.measureText(function_01).width + 0.5;
	}
	;
	return;
}
function_01("20291231", "Bạn hãy liên hệ với chuongnv.com để được gia hạn bản quyền!");
function_02("tuviphucso.com", 1, "Bạn hãy liên hệ với chuongnv.com để được cập nhật bản quyền!");
stars = new Array(136);
stars[0] = [0, "zzz", "zzz", 99, "zzz", "zzz", "zzz", 99, "zzz"];
stars[1] = [1, "TỬ VI", "O", 1, "Đế tinh", "⚛", "+", 0, 0];
stars[2] = [2, "LIÊM TRINH", "H", 1, "Hình ngục", "B", "-", 0];
stars[3] = [3, "THIÊN ĐỒNG", "T", 1, "Phúc tinh", "N", "+", 0];
stars[4] = [4, "VŨ KHÚC", "K", 1, "Tài tinh", "B", "-", 0];
stars[5] = [5, "THÁI DƯƠNG", "H", 1, "Quý tinh", "N", "+", 0];
stars[6] = [6, "THIÊN CƠ", "M", 1, "Thiện tinh", "N", "-", 0];
stars[7] = [7, "THIÊN PHỦ", "O", 1, "Tài tinh", "N", "-", 0];
stars[8] = [8, "THÁI ÂM", "T", 1, "Phú tinh", "B", "-", 0];
stars[9] = [9, "THAM LANG", "T", 1, "Dâm tinh", "B", "-", 0];
stars[10] = [10, "CỰ MÔN", "T", 1, "Ám tinh", "B", "-", 0];
stars[11] = [11, "THIÊN TƯỚNG", "T", 1, "Quyền tinh", "N", "+", 0];
stars[12] = [12, "THIÊN LƯƠNG", "M", 1, "Thọ tinh", "N", "-", 0];
stars[13] = [13, "THẤT SÁT", "K", 1, "Dũng tinh", "N", "+", 0];
stars[14] = [14, "PHÁ QUÂN", "T", 1, "Hao tinh", "B", "-", 0];
stars[15] = [15, "Thái Tuế", "H", 5, "", "", 0, 0];
stars[16] = [16, "Thiếu Dương", "H", 3, "", "", 0, 0];
stars[17] = [17, "Tang Môn", "M", 5, "", "", 0, 0];
stars[18] = [18, "Thiếu Âm", "T", 3, "", "", 0, 0];
stars[19] = [19, "Quan Phù", "H", 5, "", "", 0, 0];
stars[20] = [20, "Tử Phù", "H", 5, "", "", 0, 0];
stars[21] = [21, "Tuế Phá", "H", 5, "", "", 0, 0];
stars[22] = [22, "Long Đức", "T", 3, "", "", 0, 0];
stars[23] = [23, "Bạch Hổ", "K", 5, "", "B", 0, 0];
stars[24] = [24, "Phúc Đức", "O", 3, "", "", 0, 0];
stars[25] = [25, "Điếu Khách", "H", 5, "", "", 0, 0];
stars[26] = [26, "Trực Phù", "H", 5, "", "", 0, 0];
stars[27] = [27, "Bác Sỹ", "T", 3, "", "", 0, 0];
stars[28] = [28, "Lực Sĩ", "H", 3, "", "", 0, 0];
stars[29] = [29, "Thanh Long", "T", 3, "", "", 0, 0];
stars[30] = [30, "Tiểu Hao", "H", 5, "", "", 0, 0];
stars[31] = [31, "Tướng Quân", "M", 5, "", "", 0, 0];
stars[32] = [32, "Tấu Thư", "K", 3, "", "", 0, 0];
stars[33] = [33, "Phi Liêm", "H", 5, "", "", 0, 0];
stars[34] = [34, "Hỷ Thần", "H", 3, "", "", 0, 0];
stars[35] = [35, "Bệnh Phù", "O", 5, "", "", 0, 0];
stars[36] = [36, "Đại Hao", "H", 5, "", "", 0, 0];
stars[37] = [37, "Phục Binh", "H", 5, "", "", 0, 0];
stars[38] = [38, "Quan Phủ", "H", 5, "", "", 0, 0];
stars[39] = [39, "Trường Sinh", "T", 9, "", "", 0, 1];
stars[40] = [40, "Mộc Dục", "T", 9, "", "", 0, 1];
stars[41] = [41, "Quan Đới", "K", 9, "", "", 0, 1];
stars[42] = [42, "Lâm Quan", "K", 9, "", "", 0, 1];
stars[43] = [43, "Đế Vượng", "K", 9, "", "", 0, 1];
stars[44] = [44, "Suy", "T", 9, "", "", 0, 1];
stars[45] = [45, "Bệnh", "H", 9, "", "", 0, 1];
stars[46] = [46, "Tử", "T", 9, "", "", 0, 1];
stars[47] = [47, "Mộ", "O", 9, "", "", 0, 1];
stars[48] = [48, "Tuyệt", "O", 9, "", "", 0, 1];
stars[49] = [49, "Thai", "O", 9, "", "", 0, 1];
stars[50] = [50, "Dưỡng", "M", 9, "", "", 0, 1];
stars[51] = [51, "Đà La", "K", 4, "Kỵ tinh", "B", "-", 0];
stars[52] = [52, "Kình Dương", "K", 4, "Hình tinh", "B", "+", 0];
stars[53] = [53, "Địa Không", "H", 4, "Phá tán", "", "-", 0];
stars[54] = [54, "Địa Kiếp", "H", 4, "Phá tán", "", "+", 0];
stars[55] = [55, "Linh Tinh", "H", 4, "Lục sát tinh", "N", "-", 0];
stars[56] = [56, "Hỏa Tinh", "H", 4, "Lục sát tinh", "N", "+", 0];
stars[57] = [57, "Văn Xương", "K", 2, "Văn tinh", "B", "+", 0];
stars[58] = [58, "Văn Khúc", "T", 2, "Văn tinh", "N", "+", 0];
stars[59] = [59, "Thiên Khôi", "H", 2, "Quý tinh", "N", "+", 0];
stars[60] = [60, "Thiên Việt", "H", 2, "Quý tinh", "N", "-", 0];
stars[61] = [61, "Tả Phụ", "O", 2, "Phù trợ tinh", "B", "+", 0];
stars[62] = [62, "Hữu Bật", "T", 2, "Phù trợ tinh", "B", "+", 0];
stars[63] = [63, "Long Trì", "T", 3, "", "", 0, 0];
stars[64] = [64, "Phượng Các", "O", 3, "", "", 0, 0];
stars[65] = [65, "Tam Thai", "T", 3, "", "", 0, 0];
stars[66] = [66, "Bát Tọa", "M", 3, "", "", 0, 0];
stars[67] = [67, "Ân Quang", "M", 3, "", "", 0, 0];
stars[68] = [68, "Thiên Quý", "O", 3, "", "", 0, 0];
stars[69] = [69, "Thiên Khốc", "T", 5, "", "", "+", 0];
stars[70] = [70, "Thiên Hư", "T", 5, "", "", "-", 0];
stars[71] = [71, "Thiên Đức", "H", 3, "", "", 0, 0];
stars[72] = [72, "Nguyệt Đức", "H", 3, "", "", 0, 0];
stars[73] = [73, "Thiên Hình", "H", 5, "", "", "+", 0];
stars[74] = [74, "Thiên Riêu", "T", 5, "", "", "-", 0];
stars[75] = [75, "Thiên Y", "T", 3, "Cứu giải", "", 0, 0];
stars[76] = [76, "Quốc Ấn", "O", 3, "", "", 0, 0];
stars[77] = [77, "Đường Phù", "M", 3, "", "", 0, 0];
stars[78] = [78, "Đào Hoa", "M", 3, "Đào hoa tinh", "", 0, 0];
stars[79] = [79, "Hồng Loan", "T", 3, "Đào hoa tinh", "", 0, 0];
stars[80] = [80, "Thiên Hỷ", "T", 3, "Vui vẻ", "", 0, 0];
stars[81] = [81, "Thiên Giải", "H", 3, "Sao giải cứu", "", 0, 0];
stars[82] = [82, "Địa Giải", "O", 3, "Sao giải cứu", "", 0, 0];
stars[83] = [83, "Giải Thần", "M", 3, "Sao giải cứu", "", 0, 0];
stars[84] = [84, "Thai Phụ", "K", 3, "", "", 0, 0];
stars[85] = [85, "Phong Cáo", "O", 3, "", "", 0, 0];
stars[86] = [86, "Thiên Tài", "O", 5, "", "", 0, 0];
stars[87] = [87, "Thiên Thọ", "O", 5, "", "", 0, 0];
stars[88] = [88, "Thiên Thương", "O", 5, "", "", 0, 0];
stars[89] = [89, "Thiên Sứ", "T", 5, "", "", 0, 0];
stars[90] = [90, "Thiên La", "O", 5, "", "", 0, 0];
stars[91] = [91, "Địa Võng", "O", 5, "", "", 0, 0];
stars[109] = [109, "Lộc Tồn", "O", 2, "Quý tinh", "B", "-", 0];
stars[92] = [92, "Hóa Lộc", "K1", 2, "Lộc tinh", "", 0, 0];
stars[93] = [93, "Hóa Quyền", "H1", 2, "Mạnh bạo", "", 0, 0];
stars[94] = [94, "Hóa Khoa", "M", 2, "Khoa bảng", "", 0, 0];
stars[95] = [95, "Hóa Kỵ", "T1", 4, "Thị phi", "", 0, 0];
stars[96] = [96, "Cô Thần", "O", 5, "Cô độc", "", "+", 0];
stars[97] = [97, "Quả Tú", "O", 5, "Cô độc", "", "-", 0];
stars[98] = [98, "Thiên Mã", "H", 3, "", "", 0, 0];
stars[99] = [99, "Phá Toái", "H", 5, "", "", 0, 0];
stars[100] = [100, "Thiên Quan", "H", 3, "", "", 0, 0];
stars[101] = [101, "Thiên Phúc", "O", 3, "", "", 0, 0];
stars[102] = [102, "Lưu Hà", "T", 5, "", "", 0, 0];
stars[103] = [103, "Thiên Trù", "O", 3, "", "", 0, 0];
stars[104] = [104, "Kiếp Sát", "H", 5, "", "", 0, 0];
stars[105] = [105, "Hoa Cái", "K", 3, "", "", 0, 0];
stars[106] = [106, "LN Văn Tinh", "K", 3, "", "", 0, 0];
stars[107] = [107, "Đẩu Quân", "H", 5, "", "", 0, 0];
stars[108] = [108, "Thiên Không", "H", 5, "", "", 0, 0];
stars[110] = [110, "L.Thái Tuế", "H", 5, "", "", 0, 1];
stars[111] = [111, "L. Hổ", "K", 5, "", "", 0, 0];
stars[112] = [112, "L. Tang", "M", 5, "", "", 0, 0];
stars[113] = [113, "L. Hư", "T", 5, "", "", 0, 0];
stars[114] = [114, "L. Khốc", "K", 5, "", "", 0, 0];
stars[115] = [115, "L.Thiên Mã", "H", 3, "", "", 0, 0];
stars[116] = [116, "L.Lộc Tồn", "O", 2, "", "", 0, 1];
stars[117] = [117, "L. Kình", "K", 4, "", "", 0, 1];
stars[118] = [118, "L. Đà", "K", 4, "", "", 0, 1];
stars[119] = [119, "L. Lộc", "K1", 2, "", "", 0, 1];
stars[120] = [120, "L. Quyền", "H1", 2, "", "", 0, 1];
stars[121] = [121, "L. Khoa", "M", 2, "", "", 0, 1];
stars[122] = [122, "L. Kỵ", "T1", 4, "", "", 0, 1];
stars[123] = [123, "Tướng Tinh", "K", 5, "", "", 0, 0];
stars[124] = [124, "Phan An", "K", 5, "", "", 0, 0];
stars[125] = [125, "Tuế Dịch", "K", 5, "", "", 0, 0];
stars[126] = [126, "Tức Thần", "K", 5, "", "", 0, 0];
stars[127] = [127, "Tai Sát", "K", 5, "", "", 0, 0];
stars[128] = [128, "Thiên Sát", "K", 5, "", "", 0, 0];
stars[129] = [129, "Chỉ Bối", "K", 5, "", "", 0, 0];
stars[130] = [130, "Hàm Trì", "K", 5, "", "", 0, 0];
stars[131] = [131, "Nguyệt Sát", "K", 5, "", "", 0, 0];
stars[132] = [132, "Vong Thần", "K", 5, "", "", 0, 0];
stars[133] = [133, "TUẦN", "", 11, "", "", 0, 0];
stars[134] = [134, "TRIỆT", "", 11, "", "", 0, 0];
stars[135] = [135, "L.Đào Hoa", "M", 3, "Đào hoa tinh", "", 0, 0];
stars[136] = [136, "L.Hồng Loan", "T", 3, "Đào hoa tinh", "", 0, 0];
stars[147] = [147, "L.Thiên Hỷ", "T", 3, "Đào hoa tinh", "", 0, 0];
stars[148] = [148, "L.Hỷ Thần", "H", 3, "Đào hoa tinh", "", 0, 0];
stars[137] = [137, "L. Xương", "K", 2, "Văn tinh", "", "", 1];
stars[138] = [138, "L. Khúc", "T", 2, "Văn tinh", "", "", 1];
stars[139] = [139, "L. Khôi", "H", 2, "Quý tinh", "", "", 1];
stars[140] = [140, "L. Việt", "H", 2, "Quý tinh", "", "", 1];
stars[141] = [141, "L.Thiên Đức", "H", 3, "", "", 0, 0];
stars[142] = [142, "L.Nguyệt Đức", "H", 3, "", "", 0, 0];
stars[143] = [143, "L.Long Đức", "T", 3, "", "", 0, 0];
stars[144] = [144, "L.Kiếp Sát", "H", 5, "", "", 0, 0];
stars[145] = [145, "L.Đẩu Quân", "H", 5, "", "", 0, 0];
stars[146] = [146, "Âm Sát", "T", 5, "", "", 0, 0];
p_saotuvi = 0;
p_saoliemtrinh = 0;
p_saothiendong = 0;
p_saovukhuc = 0;
p_saothaiduong = 0;
p_saothienco = 0;
p_saothienphu = 0;
p_saothaiam = 0;
p_saothamlang = 0;
p_saocumon = 0;
p_saothientuong = 0;
p_saothienluong = 0;
p_saothatsat = 0;
p_saophaquan = 0;
p_saothaitue = 0;
p_saothieuduong = 0;
p_saotangmon = 0;
p_saothieuam = 0;
p_saoquanphuf = 0;
p_saotuphu = 0;
p_saotuepha = 0;
p_saolongduc = 0;
p_saobachho = 0;
p_saophucduc = 0;
p_saodieukhach = 0;
p_saotrucphu = 0;
p_saobacsy = 0;
p_saolucsi = 0;
p_saothanhlong = 0;
p_saotieuhao = 0;
p_saotuongquan = 0;
p_saotauthu = 0;
p_saophiliem = 0;
p_saohythan = 0;
p_saobenhphu = 0;
p_saodaihao = 0;
p_saophucbinh = 0;
p_saoquanphur = 0;
p_saotrangsinh = 0;
p_saomocduc = 0;
p_saoquandoi = 0;
p_saolamquan = 0;
p_saodevuong = 0;
p_saosuy = 0;
p_saobenh = 0;
p_saotu = 0;
p_saomo = 0;
p_saotuyet = 0;
p_saothai = 0;
p_saoduong = 0;
p_saodala = 0;
p_saokinhduong = 0;
p_saodiakhong = 0;
p_saodiakiep = 0;
p_saolinhtinh = 0;
p_saohoatinh = 0;
p_saovanxuong = 0;
p_saovankhuc = 0;
p_saothienkhoi = 0;
p_saothienviet = 0;
p_saotaphu = 0;
p_saohuubat = 0;
p_saolongtri = 0;
p_saophuongcac = 0;
p_saotamthai = 0;
p_saobattoa = 0;
p_saoanquang = 0;
p_saothienquy = 0;
p_saothienkhoc = 0;
p_saothienhu = 0;
p_saothienduc = 0;
p_saonguyetduc = 0;
p_saothienhinh = 0;
p_saothienrieu = 0;
p_saothieny = 0;
p_saoquocan = 0;
p_saoduongphu = 0;
p_saodaohoa = 0;
p_saohongloan = 0;
p_saothienhy = 0;
p_saothiengiai = 0;
p_saodiagiai = 0;
p_saogiaithan = 0;
p_saothaiphu = 0;
p_saophongcao = 0;
p_saothientai = 0;
p_saothientho = 0;
p_saothienthuong = 0;
p_saothiensu = 0;
p_saothienla = 0;
p_saodiavong = 0;
p_saohoaloc = 0;
p_saohoaquyen = 0;
p_saohoakhoa = 0;
p_saohoaky = 0;
p_saocothan = 0;
p_saoquatu = 0;
p_saothienma = 0;
p_saophatoai = 0;
p_saothienquan = 0;
p_saothienphuc = 0;
p_saoluuha = 0;
p_saothientru = 0;
p_saokiepsat = 0;
p_saohoacai = 0;
p_saovantinh = 0;
p_saodauquan = 0;
p_saothienkhong = 0;
p_saolocton = 0;
p_saolhoaloc = 0;
p_saolhoaquyen = 0;
p_saolhoakhoa = 0;
p_saolhoaky = 0;
p_saotuongtinh = 0;
p_saophanan = 0;
p_saotuedich = 0;
p_saotucthan = 0;
p_saotaisat = 0;
p_saothiensat = 0;
p_saochiboi = 0;
p_saohamtri = 0;
p_saonguyetsat = 0;
p_saovongthan = 0;
p_saoamsat = 0;
p_saotuan = 0;
p_saotriet = 0;
p_saoluu_thaitue = 0;
p_saoluu_bachho = 0;
p_saoluu_tangmon = 0;
p_saoluu_thienhu = 0;
p_saoluu_thienkhoc = 0;
p_saoluu_thienma = 0;
p_saoluu_locton = 0;
p_saoluu_kinhduong = 0;
p_saoluu_dala = 0;
p_saoluu_daohoa = 0;
p_saoluu_hongloan = 0;
p_saoluu_vanxuong = 0;
p_saoluu_vankhuc = 0;
p_saoluu_thienkhoi = 0;
p_saoluu_thienviet = 0;
p_saoluu_thienduc = 0;
p_saoluu_nguyetduc = 0;
p_saoluu_longduc = 0;
p_saoluu_kiepsat = 0;
p_saoluu_dauquan = 0;
bangdosang = new Array(40).fill(new Array(13).fill(""));
cuctuoi = 0;
tuoiduongso = 0;
cungdaihan = 0;
cungluudaihan = 0;
cungtieuhan = 0;
cungnguyethan = 0;
plocton = 0;
pluulocton = 0;
pluuthaitue = 0;
pvanxuong = 0;
pvankhuc = 0;
ptaphu = 0;
phuubat = 0;
pthaitue = 0;
pmenh = 0;
pthan = 0;
pphumau = 0;
pphucduc = 0;
pdientrach = 0;
pquanloc = 0;
pnoboc = 0;
pthiendi = 0;
ptatach = 0;
ptaibach = 0;
ptutuc = 0;
pphuthe = 0;
phuynhde = 0;
namxemhan = "";
tuongquanmenhcuc = "";
textlength = 0;
namsinhAL = 0;
cungmenh = "";
cungthan = "";
can_cung = new Array(13).fill("z");
can_cung_full = new Array(13).fill("z");
nguhanh_canchi = new Array(13).fill("z");
pmaunguoi = new Array(3).fill(0);
tencung = new Array(13).fill("z");
ct_post = new Array(19).fill(0);
lucsatinh = new Array(7).fill(0);
pthatue = new Array(13).fill(0);
cungchinhdieu = new Array(13).fill(0);
tuan_post = new Array(3).fill(0);
triet_post = new Array(3).fill(0);
tuhoa = new Array(4).fill("z");
luutuhoa = new Array(4).fill("z");
tensaohoa = new Array(5).fill("z");
BatTu = new Array(9).fill("zzz");
cannam = "";
chinam = "";
canchi_thangsinh = "";
canchi_ngaysinh = "";
canchi_giosinh = "";
tuoiamduong = "";
nguhanhbanmenh = "";
saochumenh = "";
saochuthan = "";
saochumenh_id = 0;
saochuthan_id = 0;
str_lainhan = "";
str_nguyenthan = "";
lainhancung = new Array(3).fill("z");
lainhancung_id = new Array(3).fill(0);
nguyenthancung = new Array(9).fill("z");
nguyenthancung_id = new Array(9).fill(0);
tencaccung = new Array(13).fill("z");
nct = new Array(13).fill(0);
ntt = new Array(13).fill(0);
npt = new Array(13).fill(0);
n6t = new Array(13).fill(0);
nst = new Array(13).fill(0);
lncat = new Array(13).fill(0);
lnsat = new Array(13).fill(0);
giotinhngay = 0;
color_nguHanh = new Array(10);
color_BackGround = "#fffffD";
color_TextDefault = "#f0f0f0";
color_Border = "#E7E4DD";
color_Border1 = "#d7E4DD";
color_cunghoa = "#f9ebeb";
color_nguHanh[0] = "#000000";
color_nguHanh[1] = "#009900";
color_nguHanh[2] = "#858585";
color_nguHanh[3] = "#FF9900";
color_nguHanh[4] = "#FF0000";
color_nguHanh[5] = "#FFFFFF";
color_nguHanh[6] = "#FF3300";
color_nguHanh[7] = "#777777";
color_nguHanh[8] = "#333333";
color_nguHanh[9] = "#009ACD";
color_nguHanh[10] = "#EE1289";
color_nguHanh[11] = "#000022";
color_tuhoa = ["z", "#009ACD", "#EE1289", "#009900", "#000022"];
tt_color = "#FFFFFF";
tuvidientoancolor = "#C57CAC";
tuvidientoancolor1 = "#D2A6C7";
tuvidientoancolor2 = "#00B2BF";
tuvidientoancolor3 = "#ea4335";
thienbancolor = "#EEEEEE";
nghanhnamxem = "";
thangnhuan = false;
thanghan_en = false;
_can_namxem = "";
_chi_namxem = "";
thanghan = 0;
font_name = "";
font_tt = "";
font_155 = "";
font_14 = "";
font_13 = "";
font_13t = "";
font_115 = "";
font_11 = "";
font_11t = "";
font_10 = "";
font_10t = "";
font_9 = "";
font_9t = "";
font_7 = "";
font_7t = "";
font_khochu = "";
nguhanh_th = new Array(13).fill("z");
nguhanh_th_min = new Array(13).fill("z");
nguhanh_th = ["z", "T", "K", "H", "M", "T", "K", "H", "M", "T", "K", "H", "M"];
_ncatt = new Array(13).fill(0);
_nsatt = new Array(13).fill(0);
mDevice = "";
anThongTinLS = false;
quaNhieuCatTinh = false;
cungViBatQuai = "";
thutungaygio = true;
hiensaoluutuhoa = false;
hiencacsaoluukhac = false;
hientuhoaphitinh = false;
hienvongtuongtinh = false;
hienlainhancung = true;
battrachlaso = false;
notethongtinlaso = false;
thongtincannote = "";
cuccualaso = "";
tentrangls = "THẦY HƯNG TỬ VI";
website = "Website: https://tuviphucso.com";
ttlienhe = "Phone / Zalo / Viber: (+84) 086.786.5685";
ngayamlichHT = new Array(4).fill(0);
str_cungansao = new Array(13).fill("");
cungthienban = {hoten: "z", ngaysinh: "z", thangsinh: "z", namsinh: "z", giosinh: "z", phutsinh: "z", gioitinh: "z", ngaysinh_al: "z", thangsinh_al: "z", namsinh_al: "z", giosinh_al: "z", canchingay: "z", canchithang: "z", canchinam: "z", canchigio: "z", namxemhan: "z", cachantuhoa: "", tuoiduongso: "z", tuoiamduong: "z", nguhanhbanmenh: "z", cuccualaso: "z", thuannghichad: "z", tuongquanmenhcuc: "z", saochumenh: "z", saochuthan: "z", menhlaptai: "z", thancu: "z", lainhancung: "z", nguyenthancung: "z"};
cungansao = new Array(13);
cungansaoLA = new Array(13);
for (let _0x227FC = 0; _0x227FC < 13; _0x227FC++) {
	cungansao[_0x227FC] = new Array(63).fill();
	cungansaoLA[_0x227FC] = new Array(63).fill();
};
for (let _0x227FC = 0; _0x227FC < 13; _0x227FC++) {
	for (let _0x22825 = 0; _0x22825 < 63; _0x22825++) {
		cungansao[_0x227FC][_0x22825] = [0, "zzz", "zzz", 99, "zzz", "zzz", "zzz", 99, "zzz"];
		cungansaoLA[_0x227FC][_0x22825] = [0, "zzz", "zzz", 99, "zzz", "zzz", "zzz", 99, "zzz"];
	}
};
tttcung = ["Z", "MỆNH", "PHỤ MẪU", "PHÚC ĐỨC", "ĐIỀN TRẠCH", "QUAN LỘC", "NÔ BỘC", "THIÊN DI", "TẬT ÁCH", "TÀI BẠCH", "TỬ TỨC", "PHU THÊ", "HUYNH ĐỆ"];
tttcung_th = ["Z", "Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"];
tttcung_rg = ["Z", "Mệnh", "Phụ", "Phúc", "Điền", "Quan", "Nô", "Di", "Tật", "Tài", "Tử", "Phu", "Bào"];
tencungluuhan = ["Z", "L.MỆNH", "L.PHỤ", "L.PHÚC", "L.ĐIỀN", "L.QUAN", "L.NÔ", "L.DI", "L.TẬT", "L.TÀI", "L.TỬ", "L.PHU", "L.BÀO"];
tabcung = ["z", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
tabcung_5hanh = ["Z", "T", "O", "M", "M", "O", "H", "H", "O", "K", "K", "O", "T"];
tabcannam = ["z", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
tabllocton = ["z", "Dần", "Mão", "Tỵ", "Ngọ", "Tỵ", "Ngọ", "Thân", "Dậu", "Hợi", "Tý"];
tablthienma = ["z", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ", "Dần", "Hợi", "Thân", "Tỵ"];
tabtuhoa = [["0", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý", "zzz"], ["119", "Liêm Trinh", "Thiên Cơ", "Thiên Đồng", "Thái Âm", "Tham Lang", "Vũ Khúc", "Thái Dương", "Cự Môn", "Thiên Lương", "Phá Quân", "ntt"], ["120", "Phá Quân", "Thiên Lương", "Thiên Cơ", "Thiên Đồng", "Thái Âm", "Tham Lang", "Vũ Khúc", "Thái Dương", "Tử Vi", "Cự Môn", "ntt"], ["121", "Vũ Khúc", "Tử Vi", "Văn Xương", "Thiên Cơ", "Hữu Bật", "Thiên Lương", "Thái Âm", "Văn Khúc", "Thiên Phủ", "Thái Âm", "ntt"], ["122", "Thái Dương", "Thái Âm", "Liêm Trinh", "Cự Môn", "Thiên Cơ", "Văn Khúc", "Thiên Đồng", "Văn Xương", "Vũ Khúc", "Tham Lang", "nst"]];
arrsaotuhoa = ["zzz", "Tử Vi", "Liêm Trinh", "Thiên Đồng", "Vũ Khúc", "Thái Dương", "Thiên Cơ", "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Thất Sát", "Phá Quân", "Văn Xương", "Văn Khúc", "Hữu Bật", "Tả Phụ"];
tuoiad = 0;
tabsaochumenh = ["Z", "Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Liêm Trinh", "Vũ Khúc", "Phá Quân", "Vũ Khúc", "Liêm Trinh", "Văn Khúc", "Lộc Tồn", "Cự Môn"];
tabsaochumenh_id = [0, saothamlang, saocumon, saolocton, saovankhuc, saoliemtrinh, saovukhuc, saophaquan, saovukhuc, saoliemtrinh, saovankhuc, saolocton, saocumon];
tabsaochuthan = ["Z", "Hỏa Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ", "Linh Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ"];
tabsaochuthan_id = [0, saoliemtrinh, saothientuong, saothienluong, saothiendong, saovanxuong, saothienco, saolinhtinh, saothientuong, saothienluong, saothiendong, saovanxuong, saothienco];
begin_ngaycanchi = "Giáp Tý";
vitriCT_LS = new Array(19).fill(new Array(3).fill(0));
PI = Math.PI;
