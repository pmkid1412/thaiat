ANSAOTUV -- HARD SSOT MASTER FILE Unified Deterministic Export
Generated: 2026-02-24 01:42:10 UTC

====================================================================
PHẦN I -- SSOT GỐC (VERBATIM)
====================================================================

SSOT PHASE A (LOCKED) -- BẢNG TỔNG HỢP AN SAO 0) Quy tắc toàn cục

1)  Chính tinh (14 sao) -- Natal bắt buộc LN: Không (tác động LN đi qua
    "Tứ Hóa LN" + "hội sao LN" của các sao được phép LN)

2)  Sao trung tâm (Sao Chủ Mệnh / Sao Chủ Thân) -- Natal bắt buộc

3)  Vòng theo Can năm -- Natal bắt buộc 3.1 Vòng Bác Sỹ (12 sao) --
    Natal bắt buộc, không LN LN: Không 3.2 Lộc Tồn -- Kình Dương -- Đà
    La -- Natal bắt buộc + LN ENABLED 3.3 Quốc Ấn -- Đường Phù -- Natal
    bắt buộc + LN ENABLED 3.4 Thiên Khôi -- Thiên Việt -- Natal bắt
    buộc, không LN (CẬP NHẬT) 3.5 Thiên Quan -- Thiên Phúc -- Natal bắt
    buộc, không LN (đã chốt) 3.6 Lưu Niên Văn Tinh -- Thiên Trù -- Lưu
    Hà -- Natal bắt buộc, không LN

4)  Vòng theo Chi năm -- Natal bắt buộc 4.1 Vòng Thái Tuế (12 sao) --
    Natal bắt buộc + LN ENABLED 4.2 Nhóm theo Chi năm -- Natal bắt
    buộc + LN ENABLED 4.3 Nhóm theo Chi năm -- Natal bắt buộc, không LN
    LN: Không cho toàn bộ nhóm này

5)  Theo Tháng âm -- Natal bắt buộc, không LN (Đẩu Quân/Thiên Giải/Địa
    Giải: nếu đã có trong SSOT catalog thì giữ; nếu chưa đưa công thức
    thì vẫn liệt kê natal nhưng cần bổ sung rule cụ thể khi triển khai.)

6)  Theo Giờ sinh -- Natal bắt buộc, không LN

7)  Tuần -- Triệt -- Natal bắt buộc, không LN

8)  Trường Sinh theo Cục -- Natal bắt buộc, không LN

9)  Tứ Hoá -- Natal bắt buộc + LN ENABLED

LN ENABLED (DANH SÁCH CHỐT) Ngoài danh sách này: không an LN

TRẠNG THÁI: SSOT PHASE A -- LOCK Thiên Khôi/Thiên Việt: Engine bắt buộc
an natal; không LN (đã cập nhật) Thiên Quan/Thiên Phúc: natal theo Can
năm sinh, không LN Quy tắc "tất cả sao trong bảng là natal" đã chốt rõ,
giảm rủi ro bỏ sót. SSOT --- DANH SÁCH SAO & GROUPING (P3 -- HỌC THUẬT)
Trạng thái: DRAFT --- CHỜ DUYỆT Phạm vi: Chuẩn hoá danh sách sao Tử Vi
và quy tắc grouping/hiển thị để bơm vào Engine vNext và UI, áp dụng cho
Natal và Lưu Niên theo SSOT hiện hành.

I. NGUYÊN TẮC HIỂN THỊ TỔNG QUÁT (ENFORCED) Trục hiển thị: Bên trái
cung: Cát tinh, trợ lực. Bên phải cung: Hung tinh, sát tinh. Thứ tự dọc
(từ trên xuống): Trái trên: Bát Trợ Tinh (ưu tiên cao nhất). Trái dưới:
Các Cát tinh khác. Phải trên: Lục Sát + Hình tinh. Phải dưới: Các Hung
tinh khác. Đáy cung (footer): Trái: Vòng Thái Tuế (Natal/LN). Giữa: Tuần
/ Triệt. Phải: Vòng Trường Sinh. Cùng hàng Tuần/Triệt: Thiên Sứ, Thiên
Thương, Địa Võng, Thiên La. Tứ Hoá: Không render độc lập. Gắn trực tiếp
vào chính tinh sinh ra Hoá. Hiển thị dạng chữ nhỏ: (Hoá Lộc / Hoá Quyền
/ Hoá Khoa / Hoá Kỵ).

II. SCHEMA GROUPING CHUẨN (ENGINE → UI) Mỗi sao khi xuất từ engine phải
    có metadata: { name: string, kind: "chinh" \| "phu" \| "ring" \|
    "position" \| "hoa", group: \| "main" \| "assistant_core" \|
    "assistant" \| "malefic_core" \| "malefic" \| "rings" \|
    "position_problem" \| "transformation", uiZone: \| "left-top" \|
    "left-bottom" \| "right-top" \| "right-bottom" \| "footer-left" \|
    "footer-center" \| "footer-right" \| "attached-to-main", ln: boolean
    }

III. DANH SÁCH SAO CHUẨN & GROUPING III.1 --- 14 CHÍNH TINH
     (group="main") Tứ Hoá gắn vào chính tinh theo Can năm (Natal/LN).

III.2 --- BÁT TRỢ TINH (group="assistant_core", uiZone="left-top") Lộc
Tồn Thiên Mã Thiên Khôi Thiên Việt Văn Xương Văn Khúc Tả Phù Hữu Bật

III.3 --- CÁT TINH KHÁC (group="assistant", uiZone="left-bottom") Long
Trì Phượng Các Ân Quang Thiên Quý Tam Thai Bát Toạ Thai Phụ Phong Cáo
Hồng Loan Thiên Hỷ Nguyệt Đức Thiên Đức Giải Thần Hoa Cái Đào Hoa Thiên
Quan Thiên Phúc Thiên Trù Lưu ý: Nhóm này KHÔNG bao gồm các sao thuộc
vòng Thái Tuế hoặc vòng Bác Sỹ.

III.4 --- LỤC SÁT + HÌNH TINH (group="malefic_core", uiZone="right-top")
Kình Dương Đà La Hoả Tinh Linh Tinh Địa Không Địa Kiếp Thiên Hình Thiên
Diêu

III.5 --- HUNG TINH KHÁC (group="malefic", uiZone="right-bottom") Thiên
Khốc Thiên Hư Cô Thần Quả Tú Phá Toái Lưu Hà Loại trừ: Tang Môn, Bạch
Hổ, Quan Phù, Tử Phù, Tuế Phá, Điếu Khách thuộc vòng Thái Tuế, KHÔNG xếp
vào cột hung tinh này.

III.6 --- VÒNG SAO (group="rings") Vòng Thái Tuế (uiZone="footer-left")
Thái Tuế Thiếu Dương Tang Môn (hung -- font nhấn) Thiếu Âm Quan Phù
(hung -- font nhấn) Tử Phù (hung -- font nhấn) Tuế Phá (hung -- font
nhấn) Long Đức Bạch Hổ (hung -- font nhấn) Phúc Đức Điếu Khách (hung --
font nhấn) Trực Phù Quy ước hiển thị: Toàn bộ sao vòng Thái Tuế luôn nằm
ở đáy cung bên trái. Các sao Hung trong vòng (Tang Môn, Quan Phù, Tử
Phù, Tuế Phá, Bạch Hổ, Điếu Khách) KHÔNG tách ra cột hung, mà được nhấn
bằng font/weight để nổi bật mức độ hung. Vòng Trường Sinh
(uiZone="footer-right") Trường Sinh Mộc Dục Quan Đới Lâm Quan Đế Vượng
Suy Bệnh Tử Mộ Tuyệt Thai Dưỡng Quy ước hiển thị: Toàn bộ sao vòng
Trường Sinh luôn nằm ở đáy cung bên phải.

III.7 --- SAO VỊ TRÍ / VẤN ĐỀ (group="position_problem",
uiZone="footer-center") Tuần Triệt Thiên Sứ Thiên Thương Địa Võng Thiên
La

IV. GHI CHÚ ÁP DỤNG Vòng Thái Tuế: Giữ nguyên như một vòng độc lập ở đáy
    trái. Hung tinh trong vòng được nhấn thị giác, không tách khỏi vòng.
    Vòng Trường Sinh: Giữ nguyên như một vòng độc lập ở đáy phải. Vòng
    Bác Sỹ: KHÔNG hiển thị ở đáy. Phân Cát/Hung để nhập vào cột trái /
    cột phải: Cát tinh: bên trái, dưới Bát Trợ Tinh. Hung tinh (Đại Hao,
    Tiểu Hao, Phục Binh...): bên phải, dưới Lục Sát + Hình tinh. UI
    không được tự ý đổi vị trí sao giữa các vòng. SSOT -- App Thư Ký Cho
    Thầy Tử Vi (vNext) SSOT OFFICIAL EXPORT --- LOCK FULL --- 2026-01-29
    (VN)

Ghi chú: - Canvas là nguồn chân lý hoạt động. - File này là bản export
để lưu trên PC (chứa LOCK FULL tables theo yêu cầu). APPENDIX C --- Hệ
thống Mệnh/Thân/Cục/Tử Vi & Hạn/Vận (LOCKED) Phần này được chuẩn hoá để
máy hiểu; UI chỉ render, không suy diễn.

C11. LOCK FULL TABLES (BẢNG KHÓA -- CHÉP ĐẦY ĐỦ)

C11.1 BẢNG 2 (FULL MATRIX) --- (yearStem, menhSlotIndex) → cucElement
Quy ước menhSlotIndex theo vòng chi CW: Tý=1, Sửu=2, Dần=3, Mão=4,
Thìn=5, TỴ=6, Ngọ=7, Mùi=8, Thân=9, Dậu=10, Tuất=11, Hợi=12.

Giáp: 1 Hỏa; 2 Hỏa; 3 Mộc; 4 Mộc; 5 Thổ; 6 Thổ; 7 Kim; 8 Kim; 9 Hỏa; 10
Hỏa; 11 Thủy; 12 Thủy Ất: 1 Thổ; 2 Thổ; 3 Kim; 4 Kim; 5 Mộc; 6 Mộc; 7
Thủy; 8 Thủy; 9 Thổ; 10 Thổ; 11 Hỏa; 12 Hỏa Bính: 1 Mộc; 2 Mộc; 3 Thủy;
4 Thủy; 5 Kim; 6 Kim; 7 Hỏa; 8 Hỏa; 9 Mộc; 10 Mộc; 11 Thổ; 12 Thổ Đinh:
1 Kim; 2 Kim; 3 Hỏa; 4 Hỏa; 5 Thủy; 6 Thủy; 7 Thổ; 8 Thổ; 9 Kim; 10 Kim;
11 Mộc; 12 Mộc Mậu: 1 Thủy; 2 Thủy; 3 Thổ; 4 Thổ; 5 Hỏa; 6 Hỏa; 7 Mộc; 8
Mộc; 9 Thủy; 10 Thủy; 11 Kim; 12 Kim Kỷ: (Giống Giáp) 1 Hỏa; 2 Hỏa; 3
Mộc; 4 Mộc; 5 Thổ; 6 Thổ; 7 Kim; 8 Kim; 9 Hỏa; 10 Hỏa; 11 Thủy; 12 Thủy
Canh: (Giống Ất) 1 Thổ; 2 Thổ; 3 Kim; 4 Kim; 5 Mộc; 6 Mộc; 7 Thủy; 8
Thủy; 9 Thổ; 10 Thổ; 11 Hỏa; 12 Hỏa Tân: (Giống Bính) 1 Mộc; 2 Mộc; 3
Thủy; 4 Thủy; 5 Kim; 6 Kim; 7 Hỏa; 8 Hỏa; 9 Mộc; 10 Mộc; 11 Thổ; 12 Thổ
Nhâm: (Giống Đinh) 1 Kim; 2 Kim; 3 Hỏa; 4 Hỏa; 5 Thủy; 6 Thủy; 7 Thổ; 8
Thổ; 9 Kim; 10 Kim; 11 Mộc; 12 Mộc Quý: (Giống Mậu) 1 Thủy; 2 Thủy; 3
Thổ; 4 Thổ; 5 Hỏa; 6 Hỏa; 7 Mộc; 8 Mộc; 9 Thủy; 10 Thủy; 11 Kim; 12 Kim

Quy đổi cucNumber: Thủy=2, Mộc=3, Kim=4, Thổ=5, Hỏa=6.

C11.2 BẢNG 3 (FULL MATRIX) --- Ngày âm × Cục → vị trí Tử Vi Ngày 1: Thủy
Sửu \| Mộc Thìn \| Kim Hợi \| Thổ Ngọ \| Hỏa Dậu Ngày 2: Thủy Dần \| Mộc
Sửu \| Kim Thìn \| Thổ Hợi \| Hỏa Ngọ Ngày 3: Thủy Dần \| Mộc Dần \| Kim
Sửu \| Thổ Thìn \| Hỏa Hợi Ngày 4: Thủy Mão \| Mộc TỴ \| Kim Dần \| Thổ
Sửu \| Hỏa Thìn Ngày 5: Thủy Mão \| Mộc Dần \| Kim Tý \| Thổ Dần \| Hỏa
Sửu Ngày 6: Thủy Thìn \| Mộc Mão \| Kim TỴ \| Thổ Mùi \| Hỏa Dần Ngày 7:
Thủy Thìn \| Mộc Ngọ \| Kim Dần \| Thổ Tý \| Hỏa Tuất Ngày 8: Thủy TỴ \|
Mộc Mão \| Kim Mão \| Thổ TỴ \| Hỏa Mùi Ngày 9: Thủy TỴ \| Mộc Thìn \|
Kim Sửu \| Thổ Dần \| Hỏa Tý Ngày 10: Thủy Ngọ \| Mộc Mùi \| Kim Ngọ \|
Thổ Mão \| Hỏa TỴ Ngày 11: Thủy Ngọ \| Mộc Thìn \| Kim Mão \| Thổ Thân
\| Hỏa Dần Ngày 12: Thủy Mùi \| Mộc TỴ \| Kim Thìn \| Thổ Sửu \| Hỏa Mão
Ngày 13: Thủy Mùi \| Mộc Thân \| Kim Dần \| Thổ Ngọ \| Hỏa Hợi Ngày 14:
Thủy Thân \| Mộc TỴ \| Kim Mùi \| Thổ Mão \| Hỏa Thân Ngày 15: Thủy Thân
\| Mộc Ngọ \| Kim Thìn \| Thổ Thìn \| Hỏa Sửu Ngày 16: Thủy Dậu \| Mộc
Dậu \| Kim TỴ \| Thổ Dậu \| Hỏa Ngọ Ngày 17: Thủy Dậu \| Mộc Ngọ \| Kim
Mão \| Thổ Dần \| Hỏa Mão Ngày 18: Thủy Tuất \| Mộc Mùi \| Kim Thân \|
Thổ Mùi \| Hỏa Thìn Ngày 19: Thủy Tuất \| Mộc Tuất \| Kim TỴ \| Thổ Thìn
\| Hỏa Tý Ngày 20: Thủy Hợi \| Mộc Mùi \| Kim Ngọ \| Thổ TỴ \| Hỏa Dậu
Ngày 21: Thủy Hợi \| Mộc Thân \| Kim Thìn \| Thổ Tuất \| Hỏa Dần Ngày
22: Thủy Tý \| Mộc Hợi \| Kim Dậu \| Thổ Mão \| Hỏa Mùi Ngày 23: Thủy Tý
\| Mộc Thân \| Kim Ngọ \| Thổ Thân \| Hỏa Thìn Ngày 24: Thủy Sửu \| Mộc
Dậu \| Kim Mùi \| Thổ TỴ \| Hỏa TỴ Ngày 25: Thủy Sửu \| Mộc Tý \| Kim TỴ
\| Thổ Ngọ \| Hỏa Sửu Ngày 26: Thủy Dần \| Mộc Dậu \| Kim Tuất \| Thổ
Hợi \| Hỏa Tuất Ngày 27: Thủy Dần \| Mộc Tuất \| Kim Mùi \| Thổ Thìn \|
Hỏa Mão Ngày 28: Thủy Mão \| Mộc Sửu \| Kim Thân \| Thổ Dậu \| Hỏa Thân
Ngày 29: Thủy Mão \| Mộc Tuất \| Kim Ngọ \| Thổ Ngọ \| Hỏa TỴ Ngày 30:
Thủy Thìn \| Mộc Hợi \| Kim Hợi \| Thổ Mùi \| Hỏa Ngọ

C11.4 BẢNG 8 (FULL) --- 60 hoa giáp → tuổi mụ 1 Giáp Tý→10; 2 Ất Sửu→11;
3 Bính Dần→12; 4 Đinh Mão→13; 5 Mậu Thìn→14; 6 Kỷ TỴ→15; 7 Canh Ngọ→16;
8 Tân Mùi→17; 9 Nhâm Thân→18; 10 Quý Dậu→19 11 Giáp Tuất→20; 12 Ất
Hợi→21; 13 Bính Tý→22; 14 Đinh Sửu→23; 15 Mậu Dần→24; 16 Kỷ Mão→25; 17
Canh Thìn→26; 18 Tân TỴ→27; 19 Nhâm Ngọ→28; 20 Quý Mùi→29 21 Giáp
Thân→30; 22 Ất Dậu→31; 23 Bính Tuất→32; 24 Đinh Hợi→33; 25 Mậu Tý→34; 26
Kỷ Sửu→35; 27 Canh Dần→36; 28 Tân Mão→37; 29 Nhâm Thìn→38; 30 Quý TỴ→39
31 Giáp Ngọ→40; 32 Ất Mùi→41; 33 Bính Thân→42; 34 Đinh Dậu→43; 35 Mậu
Tuất→44; 36 Kỷ Hợi→45; 37 Canh Tý→46; 38 Tân Sửu→47; 39 Nhâm Dần→48; 40
Quý Mão→49 41 Giáp Thìn→50; 42 Ất TỴ→51; 43 Bính Ngọ→52; 44 Đinh Mùi→53;
45 Mậu Thân→54; 46 Kỷ Dậu→55; 47 Canh Tuất→56; 48 Tân Hợi→57; 49 Nhâm
Tý→58; 50 Quý Sửu→59 51 Giáp Dần→60; 52 Ất Mão→1; 53 Bính Thìn→2; 54
Đinh TỴ→3; 55 Mậu Ngọ→4; 56 Kỷ Mùi→5; 57 Canh Thân→6; 58 Tân Dậu→7; 59
Nhâm Tuất→8; 60 Quý Hợi→9

BẢNG PHÂN LOẠI SAO

DANH MỤC SAO

HARD SSOT -- AN SAO TỬ VI TAM HỢP PHÁI (FINAL) SINGLE SOURCE OF TRUTH
(SSOT) -- PHẦN AN SAO Phiên bản: FINAL -- LOCKED Mục đích: Là nguồn chân
lý duy nhất cho Engine & UI khi an sao Tử Vi Tam Hợp Phái. Mọi sai lệch
với tài liệu này ⇒ P0 FAIL.

I. DANH SÁCH SAO BẮT BUỘC (ENGINE PHẢI AN -- UI PHẢI HIỂN THỊ) 1. 14
CHÍNH TINH (Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm
Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương,
Thất Sát, Phá Quân) Nguồn an: theo Cục + Ngày sinh âm lịch (đã khoá ở
SSOT Engine vNext).

2.  CÁC SAO THEO CAN NĂM 2.1 VÒNG SAO BÁC SỸ (theo Can năm + Giới tính)
    An theo bảng 12 Địa chi × 10 Can × Nam/Nữ (bảng đầy đủ đã được cung
    cấp và khoá cứng). Các sao gồm: Bác Sỹ, Lực Sỹ, Thanh Long, Tiểu
    Hao, Tướng Quân, Tấu Thư, Phi Liêm, Hỷ Thần, Bệnh Phù, Đại Hao, Phục
    Binh, Quan Phủ.

2.2 SAO LỘC TỒN & CÁC SAO PHỤ THUỘC Lộc Tồn theo Can năm: Giáp → Dần Ất
→ Mão Bính → Tị Đinh → Ngọ Mậu → Tị Kỷ → Ngọ Canh → Thân Tân → Dậu Nhâm
→ Hợi Quý → Tý Từ Lộc Tồn suy ra: Kình Dương: đứng trước Lộc Tồn 1 cung
Đà La: đứng sau Lộc Tồn 1 cung Quốc Ấn: gọi Lộc Tồn là 1, đếm thuận tới
9 Đường Phù: gọi Lộc Tồn là 1, đếm nghịch tới 8

2.3 THIÊN KHÔI -- THIÊN VIỆT (theo Can năm)

2.4 THIÊN QUAN -- THIÊN PHÚC (theo Can năm)

2.5 LƯU NIÊN VĂN TINH -- THIÊN TRÙ -- LƯU HÀ

2.6 TỨ HOÁ (theo Can năm)

III. SAO THEO CHI NĂM 3.1 VÒNG THÁI TUẾ Khởi tại Chi năm sinh, đi thuận:
     Thái Tuế Thiếu Dương Tang Môn Thiếu Âm Quan Phù Tử Phù Tuế Phá Long
     Đức Bạch Hổ Phúc Đức Điếu Khách Trực Phù

3.2 VÒNG TƯỚNG TINH Theo bảng Chi năm → Thiên Mã, Đào Hoa, Hoa Cái, Kiếp
Sát, Tướng Tinh (đã khoá cứng bảng).

3.3 NGUYỆT ĐỨC -- THIÊN ĐỨC -- THIÊN KHÔNG Nguyệt Đức: từ Tị = Tý, đếm
thuận Thiên Đức: từ Dậu = Tý, đếm thuận Thiên Không: từ Sửu = Tý, đếm
thuận

3.4 LONG TRÌ -- PHƯỢNG CÁC -- GIẢI THẦN Long Trì: từ Thìn = Tý, đếm
thuận Phượng Các: từ Tuất = Tý, đếm nghịch Giải Thần: đóng cùng Phượng
Các

3.5 HỒNG LOAN -- THIÊN HỶ Hồng Loan: từ Mão = Tý, đếm nghịch Thiên Hỷ:
đối xung Hồng Loan

3.6 THIÊN KHỐC -- THIÊN HƯ (An theo bảng cố định Chi năm → cung)

3.7 CÔ THẦN -- QUẢ TÚ Dần Mão Thìn → Tị / Sửu Tị Ngọ Mùi → Thân / Thìn
Thân Dậu Tuất → Hợi / Mùi Hợi Tý Sửu → Dần / Tuất

3.8 PHÁ TOÁI SÁT Dần Thân Tị Hợi → Dậu Tý Ngọ Mão Dậu → Tị Thìn Tuất Sửu
Mùi → Sửu

IV. SAO THEO THÁNG SINH 4.1 THIÊN HÌNH -- THIÊN DIÊU -- TẢ PHÙ -- HỮU
    BẬT (An theo bảng 12 tháng âm -- khoá cứng) 4.2 THIÊN GIẢI -- ĐỊA
    GIẢI Thiên Giải: từ Thân, đếm thuận tới tháng Địa Giải: từ Mùi, đếm
    thuận tới tháng 4.3 ĐẨU QUÂN Từ cung có Thái Tuế, đếm nghịch tới
    tháng → gọi là giờ Tý Từ đó đếm thuận tới giờ sinh → an Đẩu Quân

V. SAO THEO GIỜ SINH 5.1 VĂN XƯƠNG -- VĂN KHÚC Văn Khúc: từ Thìn = giờ
Tý, đếm thuận Văn Xương: từ Tuất = giờ Tý, đếm nghịch 5.2 ĐỊA KHÔNG --
ĐỊA KIẾP Địa Kiếp: từ Hợi = giờ Tý, đếm thuận Địa Không: từ Hợi = giờ
Tý, đếm nghịch 5.3 LINH TINH -- HOẢ TINH Thân Tý Thìn nhân Dần Tuất
thượng Dần Ngọ Tuất nhân Sửu Mão phương Tị Dậu Sửu nhân Mão Tuất vị Hợi
Mão Mùi nhân Dậu Tuất phương Tiên thì khởi Hỏa, hậu khởi Linh

Có nghĩa là hai sao Hoả tinh và Linh tinh khởi theo tam hợp năm sinh và
giờ sinh, sinh năm Dần Ngọ Tuất thì hoả ở Sửu còn linh ở Mão; sinh năm
Thân Tý Thìn thì hoả ở Dần linh ở Tuất; sinh năm Hợi Mão Mùi thì Hoả ở
Dậu, linh ở Tuất; sinh năm Tị Dậu Sửu thì hoả ở Mão linh ở Tuất. Rồi sau
đó phải an theo lý tính âm dương -- trước an Hoả tinh, sau an Linh tinh:
Dương nam, âm nữ là thuận lý: an hoả thuận linh nghịch -- đếm từ vị trí
quy định thuận tới giờ sinh an Hoả tinh, đếm từ vị trí quy định nghịch
tới giờ sinh an sao Linh tinh. Âm nam, dương nữ là nghịch lý: an hoả
nghịch, linh thuận -- đếm từ vị trí quy định đếm nghịch tới giờ sinh an
Hoả tinh; đếm từ vị trí quy định thuận tới giờ sinh an Linh tinh. Ví dụ:
một người nam sinh năm Mão tức là khởi Hoả tinh tại Dậu, khởi Linh tinh
tại Tuất; anh ta sinh vào giờ Tuất cho nên từ vị trí cung Dậu gọi là giờ
Tý đếm ngược tới giờ Tuất gặp cung Hợi an Hoả tinh vào Hợi; từ vị trí
cung Tuất gọi là giờ Tý đếm thuận chiều đến giờ Tuất gặp cung Thân, an
Linh tinh vào Thân. Khởi theo tam hợp năm sinh Dương nam / Âm nữ: Hoả
thuận -- Linh nghịch Âm nam / Dương nữ: Hoả nghịch -- Linh thuận

VI. SAO THEO NGÀY SINH 6.1 ÂN QUANG -- THIÊN QUÝ Ân Quang: từ Văn Xương,
    thuận tới ngày, lùi 1 cung Thiên Quý: từ Văn Khúc, nghịch tới ngày,
    lùi 1 cung 6.2 TAM THAI -- BÁT TOẠ Tam Thai: từ Tả Phù, thuận tới
    ngày Bát Toạ: từ Hữu Bật, nghịch tới ngày 6.3 THAI PHỤ -- PHONG CÁO
    Thai Phụ: từ Văn Khúc, thuận tới 3 Phong Cáo: từ Văn Khúc, nghịch
    tới 3

VII. TUẦN -- TRIỆT 7.1 TUẦN KHÔNG (6 Tuần Giáp)

(An theo bảng 60 Hoa Giáp → 2 cung Tuần Không, đã khoá cứng) 7.2 TRIỆT
LỘ KHÔNG VONG (theo Can năm) Giáp, Kỷ → Thân, Dậu Ất, Canh → Ngọ, Mùi
Bính, Tân → Thìn, Tị Đinh, Nhâm → Dần, Mão Mậu, Quý → Tý, Sửu

VIII. SAO ĐÓNG CỐ ĐỊNH THEO CUNG Thiên Sứ: cung Tật Ách Thiên Thương:
      cung Nô Bộc Thiên La: cung Thìn Địa Võng: cung Tuất

KẾT LUẬN Tài liệu này là HARD SSOT -- AN SAO (FINAL). Engine phải an
đúng -- đủ -- không suy diễn. UI chỉ render. Mọi thay đổi sau thời điểm
này phải có Decision Log + Snapshot mới.

/\*\* \* HARD SSOT MACHINE -- ROOT (CJS) \* Source of Truth for all star
placement rules \* Engine MUST load this pack (or its snapshot
build) * * Status: LOCKED ACADEMIC SSOT \*/

'use strict';

// ================================ // META //
================================ const \_\_meta = { name:
'hard-ssot-machine-tuvi-tam-hop-phai', version: '1.0.0', lockedAt:
'2026-01-29', authority: 'Johnny Nam -- Academic SSOT', invariant: true,
};

// ================================ // ENUMS / CANONICAL //
================================ const CAN =
\['GIAP','AT','BINH','DINH','MAU','KY','CANH','TAN','NHAM','QUY'\];
const CHI =
\['TY','SUU','DAN','MAO','THIN','TI','NGO','MUI','THAN','DAU','TUAT','HOI'\];

// ================================ // HELPERS (NO BUSINESS LOGIC) //
================================ function assert(cond, msg){ if(!cond)
throw new Error('\[SSOT\]'+msg); }

// ================================ // SSOT BLOCKS (IMPORT SPLIT LATER)
// ================================ const ssot = { \_\_meta,

// ------------------------------ // 1. CAN YEAR RULES //
------------------------------ can_year: { loc_ton: { GIAP:'DAN',
AT:'MAO', BINH:'TI', DINH:'NGO', MAU:'TI', KY:'NGO', CANH:'THAN',
TAN:'DAU', NHAM:'HOI', QUY:'TY' },

    kinh_duong_offset: +1, // đứng trước Lộc Tồn
    da_la_offset: -1,      // đứng sau Lộc Tồn

    quoc_an_offset: +8,    // Lộc = 1, thuận tới 9
    duong_phu_offset: -7,  // Lộc = 1, nghịch tới 8

    thien_khoi_viet: {
      GIAP:{viet:'MUI',khoi:'SUU'}, AT:{viet:'THAN',khoi:'TY'}, BINH:{viet:'DAU',khoi:'HOI'}, DINH:{viet:'HOI',khoi:'DAU'},
      MAU:{viet:'SUU',khoi:'MUI'}, KY:{viet:'TY',khoi:'THAN'}, CANH:{viet:'SUU',khoi:'MUI'}, TAN:{viet:'DAN',khoi:'NGO'},
      NHAM:{viet:'MAO',khoi:'TI'}, QUY:{viet:'TI',khoi:'MAO'}
    },

    thien_quan_phuc: {
      GIAP:{quan:'MUI',phuc:'DAU'}, AT:{quan:'THIN',phuc:'THAN'}, BINH:{quan:'TI',phuc:'TY'}, DINH:{quan:'DAN',phuc:'HOI'},
      MAU:{quan:'MAO',phuc:'MAO'}, KY:{quan:'TUAT',phuc:'DAN'}, CANH:{quan:'HOI',phuc:'NGO'}, TAN:{quan:'THAN',phuc:'TI'},
      NHAM:{quan:'DAU',phuc:'NGO'}, QUY:{quan:'NGO',phuc:'TI'}
    },

    ln_van_tinh_tru_luuha: {
      GIAP:{van:'TI',tru:'TI',ha:'DAU'}, AT:{van:'NGO',tru:'NGO',ha:'TUAT'}, BINH:{van:'THAN',tru:'TI',ha:'MUI'},
      DINH:{van:'NGO',tru:'NGO',ha:'THAN'}, MAU:{van:'THAN',tru:'THAN',ha:'TI'}, KY:{van:'DAU',tru:'DAU',ha:'NGO'},
      CANH:{van:'HOI',tru:'HOI',ha:'MAO'}, TAN:{van:'TY',tru:'TY',ha:'THIN'}, NHAM:{van:'DAN',tru:'DAN',ha:'HOI'},
      QUY:{van:'MAO',tru:'MAO',ha:'DAN'}
    },

    tu_hoa: {
      GIAP:{loc:'LIEM_TRINH',quyen:'PHA_QUAN',khoa:'VU_KHUC',ky:'THAI_DUONG'},
      AT:{loc:'THIEN_CO',quyen:'THIEN_LUONG',khoa:'TU_VI',ky:'THAI_AM'},
      BINH:{loc:'THIEN_DONG',quyen:'THIEN_CO',khoa:'VAN_XUONG',ky:'LIEM_TRINH'},
      DINH:{loc:'THAI_AM',quyen:'THIEN_DONG',khoa:'THIEN_CO',ky:'CU_MON'},
      MAU:{loc:'THAM_LANG',quyen:'THAI_AM',khoa:'HUU_BAT',ky:'THIEN_CO'},
      KY:{loc:'VU_KHUC',quyen:'THAM_LANG',khoa:'THIEN_LUONG',ky:'VAN_KHUC'},
      CANH:{loc:'THAI_DUONG',quyen:'VU_KHUC',khoa:'THAI_AM',ky:'THIEN_DONG'},
      TAN:{loc:'CU_MON',quyen:'THAI_DUONG',khoa:'VAN_KHUC',ky:'VAN_XUONG'},
      NHAM:{loc:'THIEN_LUONG',quyen:'TU_VI',khoa:'TA_PHU',ky:'VU_KHUC'},
      QUY:{loc:'PHA_QUAN',quyen:'CU_MON',khoa:'THAI_AM',ky:'THAM_LANG'}
    }

},

// ------------------------------ // 2. FIXED PALACE STARS //
------------------------------ fixed_palace: { thien_su:'TAT_ACH',
thien_thuong:'NO_BOC', thien_la:'THIN', dia_vong:'TUAT' } };

// ================================ // EXPORT //
================================ module.exports = ssot;

/\*\* \* HARD SSOT MACHINE -- ROOT (CJS) \* Source of Truth for all star
placement rules \* Engine MUST load this pack (or its snapshot
build) * * Status: LOCKED ACADEMIC SSOT \*/

'use strict';

// ================================ // META //
================================ const \_\_meta = { name:
'hard-ssot-machine-tuvi-tam-hop-phai', version: '1.0.0', lockedAt:
'2026-01-29', authority: 'Johnny Nam -- Academic SSOT', invariant: true,
};

// ================================ // ENUMS / CANONICAL //
================================ const CAN =
\['GIAP','AT','BINH','DINH','MAU','KY','CANH','TAN','NHAM','QUY'\];
const CHI =
\['TY','SUU','DAN','MAO','THIN','TI','NGO','MUI','THAN','DAU','TUAT','HOI'\];

// ================================ // HELPERS (NO BUSINESS LOGIC) //
================================ function assert(cond, msg){ if(!cond)
throw new Error('\[SSOT\]'+msg); }

// ================================ // SSOT BLOCKS (IMPORT SPLIT LATER)
// ================================ const ssot = { \_\_meta,

// ------------------------------ // 1. CAN YEAR RULES //
------------------------------ can_year: { loc_ton: { GIAP:'DAN',
AT:'MAO', BINH:'TI', DINH:'NGO', MAU:'TI', KY:'NGO', CANH:'THAN',
TAN:'DAU', NHAM:'HOI', QUY:'TY' },

    kinh_duong_offset: +1, // đứng trước Lộc Tồn
    da_la_offset: -1,      // đứng sau Lộc Tồn

    quoc_an_offset: +8,    // Lộc = 1, thuận tới 9
    duong_phu_offset: -7,  // Lộc = 1, nghịch tới 8

    thien_khoi_viet: {
      GIAP:{viet:'MUI',khoi:'SUU'}, AT:{viet:'THAN',khoi:'TY'}, BINH:{viet:'DAU',khoi:'HOI'}, DINH:{viet:'HOI',khoi:'DAU'},
      MAU:{viet:'SUU',khoi:'MUI'}, KY:{viet:'TY',khoi:'THAN'}, CANH:{viet:'SUU',khoi:'MUI'}, TAN:{viet:'DAN',khoi:'NGO'},
      NHAM:{viet:'MAO',khoi:'TI'}, QUY:{viet:'TI',khoi:'MAO'}
    },

    thien_quan_phuc: {
      GIAP:{quan:'MUI',phuc:'DAU'}, AT:{quan:'THIN',phuc:'THAN'}, BINH:{quan:'TI',phuc:'TY'}, DINH:{quan:'DAN',phuc:'HOI'},
      MAU:{quan:'MAO',phuc:'MAO'}, KY:{quan:'TUAT',phuc:'DAN'}, CANH:{quan:'HOI',phuc:'NGO'}, TAN:{quan:'THAN',phuc:'TI'},
      NHAM:{quan:'DAU',phuc:'NGO'}, QUY:{quan:'NGO',phuc:'TI'}
    },

    ln_van_tinh_tru_luuha: {
      GIAP:{van:'TI',tru:'TI',ha:'DAU'}, AT:{van:'NGO',tru:'NGO',ha:'TUAT'}, BINH:{van:'THAN',tru:'TI',ha:'MUI'},
      DINH:{van:'NGO',tru:'NGO',ha:'THAN'}, MAU:{van:'THAN',tru:'THAN',ha:'TI'}, KY:{van:'DAU',tru:'DAU',ha:'NGO'},
      CANH:{van:'HOI',tru:'HOI',ha:'MAO'}, TAN:{van:'TY',tru:'TY',ha:'THIN'}, NHAM:{van:'DAN',tru:'DAN',ha:'HOI'},
      QUY:{van:'MAO',tru:'MAO',ha:'DAN'}
    },

    tu_hoa: {
      GIAP:{loc:'LIEM_TRINH',quyen:'PHA_QUAN',khoa:'VU_KHUC',ky:'THAI_DUONG'},
      AT:{loc:'THIEN_CO',quyen:'THIEN_LUONG',khoa:'TU_VI',ky:'THAI_AM'},
      BINH:{loc:'THIEN_DONG',quyen:'THIEN_CO',khoa:'VAN_XUONG',ky:'LIEM_TRINH'},
      DINH:{loc:'THAI_AM',quyen:'THIEN_DONG',khoa:'THIEN_CO',ky:'CU_MON'},
      MAU:{loc:'THAM_LANG',quyen:'THAI_AM',khoa:'HUU_BAT',ky:'THIEN_CO'},
      KY:{loc:'VU_KHUC',quyen:'THAM_LANG',khoa:'THIEN_LUONG',ky:'VAN_KHUC'},
      CANH:{loc:'THAI_DUONG',quyen:'VU_KHUC',khoa:'THAI_AM',ky:'THIEN_DONG'},
      TAN:{loc:'CU_MON',quyen:'THAI_DUONG',khoa:'VAN_KHUC',ky:'VAN_XUONG'},
      NHAM:{loc:'THIEN_LUONG',quyen:'TU_VI',khoa:'TA_PHU',ky:'VU_KHUC'},
      QUY:{loc:'PHA_QUAN',quyen:'CU_MON',khoa:'THAI_AM',ky:'THAM_LANG'}
    }

},

// ------------------------------ // 2. CAN YEAR -- BAC SY RING
(GENDERED) // ------------------------------ bac_sy_ring: { // key =
CAN_YEAR, value = { NAM:{CHI:STAR}, NU:{CHI:STAR} } GIAP:{
NAM:{DAN:'BAC_SY',MAO:'LUC_SY',THIN:'THANH_LONG',TI:'TIEU_HAO',NGO:'TUONG_QUAN',MUI:'TAU_THU',THAN:'PHI_LIEM',DAU:'HY_THAN',TUAT:'BENH_PHU',HOI:'DAI_HAO',TY:'PHUC_BINH',SUU:'QUAN_PHU'},
NU
:{DAN:'BAC_SY',MAO:'QUAN_PHU',THIN:'PHUC_BINH',TI:'DAI_HAO',NGO:'BENH_PHU',MUI:'HY_THAN',THAN:'PHI_LIEM',DAU:'TAU_THU',TUAT:'TUONG_QUAN',HOI:'TIEU_HAO',TY:'THANH_LONG',SUU:'LUC_SY'}
} // NOTE: other CAN (AT..QUY) must be filled verbatim from SSOT table
},

// ------------------------------ // 3. CAN YEAR -- TUAN / TRIET //
------------------------------ tuan_khong: { GIAP_TY:\['TUAT','HOI'\],
GIAP_TUAT:\['THAN','DAU'\], GIAP_THAN:\['NGO','MUI'\],
GIAP_NGO:\['THIN','TI'\], GIAP_THIN:\['DAN','MAO'\],
GIAP_DAN:\['TY','SUU'\] },

triet: { GIAP:\['THAN','DAU'\], KY:\['THAN','DAU'\], AT:\['NGO','MUI'\],
CANH:\['NGO','MUI'\], BINH:\['THIN','TI'\], TAN:\['THIN','TI'\],
DINH:\['DAN','MAO'\], NHAM:\['DAN','MAO'\], MAU:\['TY','SUU'\],
QUY:\['TY','SUU'\] },

// ------------------------------ // 4. FIXED PALACE STARS //
------------------------------ fixed_palace: { thien_su:'TAT_ACH',
thien_thuong:'NO_BOC', thien_la:'THIN', dia_vong:'TUAT' } };

// ================================ // EXPORT //
================================ module.exports = ssot;

==================================================================== BỔ
SUNG SSOT -- KHỐI HỌC THUẬT MỆNH / CỤC / ĐẠI VẬN / TIỂU VẬN
====================================================================

\[BẢNG A\] KHỞI CUNG MỆNH -- CUNG THÂN

Tháng 1 → Dần Tháng 2 → Mão Tháng 3 → Thìn Tháng 4 → Tị Tháng 5 → Ngọ
Tháng 6 → Mùi Tháng 7 → Thân Tháng 8 → Dậu Tháng 9 → Tuất Tháng 10 → Hợi
Tháng 11 → Tý Tháng 12 → Sửu

MỆNH: đếm nghịch từ cung khởi giờ Tý tới giờ sinh. THÂN: đếm thuận từ
cung khởi giờ Tý tới giờ sinh.

12 cung chức năng (nghịch chiều kim đồng hồ): Mệnh → Huynh Đệ → Phu Thê
→ Tử Tức → Tài Bạch → Tật Ách → Thiên Di → Nô Bộc → Quan Lộc → Điền
Trạch → Phúc Đức → Phụ Mẫu

====================================================================
\[BẢNG B\] XÁC ĐỊNH CỤC SỐ
====================================================================

Thuỷ = 2 Mộc = 3 Kim = 4 Thổ = 5 Hoả = 6

Cục số = Nạp âm của Can Chi tại cung Mệnh.

Đại vận: Dương Nam / Âm Nữ → Thuận chiều kim đồng hồ Âm Nam / Dương Nữ →
Nghịch chiều kim đồng hồ

====================================================================
\[GÓI C\] XÁC ĐỊNH SAO TỬ VI
====================================================================

Tử Vi xác định theo: 1. Cục số 2. Ngày sinh âm lịch

(Bảng 30 ngày × 5 cục giữ nguyên theo học thuật người dùng cung cấp --
LOCKED)

==================================================================== AN
ĐẠI VẬN
====================================================================

Mỗi cung = 10 năm. Ghi số đầu của chu kỳ (ví dụ: 5, 15, 25...)

==================================================================== LƯU
NIÊN ĐẠI VẬN
====================================================================

Năm 1 → gốc đại vận Năm 2 → đối xung Năm 3 → lùi 1 cung Năm 4 → quay lại
đối xung Năm 5-9 → tiến dần Năm 10 → quay về gốc

==================================================================== LƯU
NIÊN TIỂU VẬN
====================================================================

Nam → thuận Nữ → nghịch

Dần Ngọ Tuất → Thìn Thân Tý Thìn → Tuất Hợi Mão Mùi → Sửu Tị Dậu Sửu →
Mùi

==================================================================== AN
TRIỆT
====================================================================

Giáp, Kỷ → Thân Dậu Ất, Canh → Ngọ Mùi Bính, Tân → Thìn Tị Đinh, Nhâm →
Dần Mão Mậu, Quý → Tý Sửu

====================================================================
TÍNH TUỔI ÂM LỊCH
====================================================================

Tuổi 1 tại năm sinh âm lịch. Đếm thuận theo 60 Hoa Giáp (bảng giữ nguyên
theo SSOT).

==================================================================== END
OF ACADEMIC EXPANSION
====================================================================

==================================================================== END
OF MASTER SSOT
====================================================================
