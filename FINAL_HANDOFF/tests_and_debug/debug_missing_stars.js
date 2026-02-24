import { getTuHoaMap, placeXuongKhuc, placeAnQuangThienQuy } from "../utils_placements.js";
import { placeMainStars } from "../main_stars_and_palaces_v51.js";

const yearStem = "Ất";
const tuHoa = getTuHoaMap(yearStem);
console.log("Tu Hoa map for At:", tuHoa);

const day = 14;
// Giáp Dần hour -> Dần is index 2? No, Tý=0, Sửu=1, Dần=2.
const hourChiIndex = 2;
const xuongKhuc = placeXuongKhuc(hourChiIndex);
console.log("Xuong Khuc for hour Dan:", xuongKhuc);

const anQuang = placeAnQuangThienQuy(day, xuongKhuc["Văn Xương"], xuongKhuc["Văn Khúc"]);
console.log("An Quang for Day 14:", anQuang);
