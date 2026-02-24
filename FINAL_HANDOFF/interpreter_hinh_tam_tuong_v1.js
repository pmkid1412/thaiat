// interpreter_hinh_tam_tuong_v1.js
// Standard auto interpreter for Hình tướng & Tâm tướng.
// It summarizes the stars influencing Mệnh/Thân using STAR_INFO_DB.hinhTuong/tamTuong.
// Safe to call in overall interpretation pipeline.

import { STAR_INFO_DB } from "./constants_stars.js";

export function interpretHinhTamTuong(ctx) {
  if (!ctx || typeof ctx.getStarsInPalace !== "function") return;

  const palaces = ["MENH", "THAN"];
  const starKeys = [];
  for (const p of palaces) {
    const stars = ctx.getStarsInPalace(p) || [];
    for (const s of stars) if (!starKeys.includes(s)) starKeys.push(s);
  }

  const relevant = starKeys.filter(k => {
    const info = STAR_INFO_DB[k];
    return info && (info.hinhTuong || info.tamTuong);
  });

  if (!relevant.length) return;

  ctx.pushSection({
    title: "Hình tướng & Tâm tướng (các sao ảnh hưởng mạnh ở Mệnh/Thân)",
    sentences: []
  });

  for (const k of relevant) {
    const info = STAR_INFO_DB[k] || {};
    const name = info.name || info.ten || k;

    if (info.hinhTuong) {
      ctx.pushSentence(`• ${name} – **Hình tướng:** ${info.hinhTuong}`);
    }
    if (info.tamTuong) {
      ctx.pushSentence(`  **Tâm tướng:** ${info.tamTuong}`);
    }
    if (info.ghiChu) {
      ctx.pushSentence(`  _Ghi chú:_ ${info.ghiChu}`);
    }
  }
}
