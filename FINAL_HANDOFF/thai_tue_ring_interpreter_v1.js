
// thai_tue_ring_interpreter_v1.js
// Ring-specific interpreter for Vòng Thái Tuế (Nam phái style)
// Depends on STAR_INFO_PATCH_THAI_TUE_RING_V1 (data layer) and generic ctx helpers.
//
// Expected ctx interface (duck-typed):
// - hasStar(key)
// - hasStars([keys])
// - hasAnyStar([keys])
// - getPalaceOf(key) -> palaceKey string
// - getStarsInPalace(palaceKey) -> [starKeys]
// - getOppositePalace(palaceKey) -> palaceKey
// - getTamHopPalaces(palaceKey) -> [palaceKey, palaceKey, palaceKey]
// - addPalaceTag(palaceKey, tag)
// - addStarModifier(starKey, modifierObj)
// - pushSection({title, body, tags?, weight?})
// - pushSentence(text, {weight?, tags?})
// - matchSpecialPatterns(starKey|groupKey) -> [{name, meaning, matchedStars, palace?}, ...]
// - isStrongPalace(palaceKey) / isWeakPalace(palaceKey) (optional)
// - getBranchOf(starKey) (optional for some rules)
//
// Output format: ctx.sections[] appended in reading order.

import { STAR_INFO_PATCH_THAI_TUE_RING_V1 as TT } from "./star_info_patch_thai_tue_ring_v1.js";

const RING_STARS = [
  "THAI_TUE", "THIEU_DUONG", "TANG_MON", "THIEU_AM", "QUAN_PHU", "TU_PHU",
  "TUE_PHA", "LONG_DUC", "BACH_HO", "PHUC_DUC", "DIEU_KHACH", "TRUC_PHU"
];

const TAM_HOP_GROUPS = {
  TUE_HO_PHU: ["THAI_TUE", "QUAN_PHU", "BACH_HO"],
  TANG_TUE_DIEU: ["TANG_MON", "TUE_PHA", "DIEU_KHACH"],
  DUONG_TU_PHUC: ["THIEU_DUONG", "TU_PHU", "PHUC_DUC"],
  AM_LONG_TRUC: ["THIEU_AM", "LONG_DUC", "TRUC_PHU"]
};

function ringPresent(ctx) {
  const names = RING_STARS.map(k => TT[k]?.name || k);
  return ctx.hasAnyStar(names);
}

function gatherRingPositions(ctx) {
  const pos = {};
  RING_STARS.forEach(k => {
    const name = TT[k]?.name || k;
    if (ctx.hasStar(name)) pos[k] = ctx.getPalaceOf(name);
  });
  return pos;
}

function amplifyCoLocated(ctx, thaiTuePalace) {
  const colocated = ctx.getStarsInPalace(thaiTuePalace).filter(k => k !== "THAI_TUE");
  colocated.forEach(k => ctx.addStarModifier(k, { amplifyBy: "THAI_TUE", weightBoost: 0.25 }));
  return colocated;
}

function addGravityTag(ctx, palace) {
  ctx.addPalaceTag(palace, "gravity_point_thai_tue");
}

function readThaiTueAxis(ctx, pos) {
  if (!pos.THAI_TUE) return;

  const thaiTuePalace = pos.THAI_TUE;
  addGravityTag(ctx, thaiTuePalace);

  const opposite = ctx.getOppositePalace(thaiTuePalace);
  const rightWing = ctx.getPalaceOf("BACH_HO");
  const leftWing = ctx.getPalaceOf("QUAN_PHU");

  const colocated = amplifyCoLocated(ctx, thaiTuePalace);

  ctx.pushSection({
    title: "Trục Thái Tuế (Điểm trọng lực của năm)",
    weight: 1.0,
    tags: ["thai_tue_axis"],
    body: [
      `Thái Tuế đóng tại cung ${thaiTuePalace} → đây là **điểm trọng lực** của toàn năm/toàn đời: chuyện lớn, việc nghiêm túc và trọng trách dồn về lĩnh vực cung này.`,
      colocated.length
        ? `Các sao đồng cung với Thái Tuế (${colocated.join(", ")}) bị **khuếch đại**: cát càng cát, hung càng hung.`
        : `Cung Thái Tuế không có sao chính khác đồng cung nên trọng lực nằm ở chính trục cung này.`,
      opposite
        ? `Cung đối xung là ${opposite} ứng **Tuế Phá**: thế lực/chủ đề chống đối hoặc phản biện trục năm.`
        : "",
      leftWing
        ? `Bên tả (Thanh Long) là ${leftWing} có **Quan Phù**: tượng công đường, văn quyền, luật lệ.`
        : "",
      rightWing
        ? `Bên hữu (Bạch Hổ) là ${rightWing} có **Bạch Hổ/Tuế Hổ**: tượng quan võ, sát khí, binh quyền – tài lực.`
        : ""
    ].filter(Boolean).join("\n")
  });
}

function readTamHopGroup(ctx, groupKey, starKeys) {
  const presentStars = starKeys.filter(k => ctx.hasStar(k));
  if (presentStars.length === 0) return;

  const palaces = presentStars.map(k => ctx.getPalaceOf(k));
  const patterns = [];
  presentStars.forEach(k => patterns.push(...(ctx.matchSpecialPatterns?.(k) || [])));

  let title = "";
  let bodyLines = [];

  switch (groupKey) {
    case "TUE_HO_PHU":
      title = "Tam hợp Tuế–Hổ–Phù (Nắm quyền)";
      bodyLines.push(
        "Đây là tam hợp trục quyền lực: **Thái Tuế** (vua/trọng lực) – **Quan Phù** (công đường/lệnh văn) – **Bạch Hổ** (quan võ/sát khí).",
        "Nếu hội cát tinh/quý tinh → danh quyền lớn, làm việc trọng yếu. Nếu hội hình-sát/hao-kỵ → quyền lực trở thành áp lực, dễ sinh quan tụng hoặc tai hoạ."
      );
      break;

    case "TANG_TUE_DIEU":
      title = "Tam hợp Tang–Tuế–Điếu (Chống đối/biến hoá)";
      bodyLines.push(
        "Đây là tam hợp đối diện trục quyền: **Tang Môn** (tang – nhưng là chữ Mãn tích luỹ) – **Tuế Phá** (đối đầu vua/đại hao hoặc cải cách) – **Điếu Khách** (chữ Khai/sinh khí hoặc bóng tang).",
        "Thế này có nghĩa **phản biện để sinh biến**, phá cái cũ để theo kịp thời thế. Hung–cát phân minh tuỳ sao hội."
      );
      break;

    case "DUONG_TU_PHUC":
      title = "Tam hợp Dương–Tử–Phúc (Minh đường – hỷ khí)";
      bodyLines.push(
        "Đây là tam hợp ở phía trước Thái Tuế: **Thiếu Dương** (hỷ khí, kẻ sĩ cận vua) – **Tử Phù** (tiểu hao/ẩn nguy trong chỗ sáng) – **Phúc Đức** (phúc lớn, quý khí, cứu giải).",
        "Tam hợp này thường kéo **Tam Minh Đào–Hồng–Hỷ** cùng Thiên/Nguyệt Đức. Nếu văn tinh hội chiếu → đắc cách sáng sủa. Nếu sát tinh trùng → đẹp mà nguy, vui ít lo nhiều."
      );
      break;

    case "AM_LONG_TRUC":
      title = "Tam hợp Âm–Long–Trực (Hậu trường – tiềm phục hồi)";
      bodyLines.push(
        "Đây là tam hợp sau lưng Thái Tuế: **Thiếu Âm** (lục hợp/hoà khí) – **Long Đức** (an cư/tuế mộ, giữ đức) – **Trực Phù/Bệnh Phù** (cựu khí/bệnh/cũ).",
        "Thế này chủ **tiềm ẩn – hồi phục – giữ đức**. Yên phận thì tốt, cưỡng tiến dễ sinh chuyện cũ tái lại hoặc rối mộ–trạch."
      );
      break;
  }

  // Attach palace mapping info
  bodyLines.push(
    `Các sao hiện diện trong tam hợp này: ${presentStars.map(k => `${TT[k]?.name || k} @ ${ctx.getPalaceOf(k)}`).join("; ")}.`
  );

  if (patterns.length) {
    bodyLines.push(
      "Cách cục đặc thù đang kích hoạt:",
      ...patterns.map(p => `- ${p.name}: ${p.meaning}`)
    );
  }

  ctx.pushSection({
    title,
    weight: 0.8,
    tags: ["thai_tue_tam_hop", groupKey.toLowerCase()],
    body: bodyLines.join("\n")
  });
}

function readIndividualRingStars(ctx) {
  RING_STARS.forEach(k => {
    if (!ctx.hasStar(k)) return;
    const info = TT[k];
    const palace = ctx.getPalaceOf(k);
    const patterns = ctx.matchSpecialPatterns?.(k) || [];

    const line = [
      `**${info?.name || k}** đóng tại cung **${palace}**.`,
      info?.coreMeaning?.[0] ? info.coreMeaning[0] : "",
      info?.interpretRules?.[0]?.detail ? info.interpretRules[0].detail : ""
    ].filter(Boolean).join(" ");

    ctx.pushSentence(line, { weight: 0.45, tags: ["thai_tue_star", k.toLowerCase()] });

    if (patterns.length) {
      patterns.forEach(p => {
        ctx.pushSentence(`→ Cách cục **${p.name}**: ${p.meaning}`, { weight: 0.55, tags: ["thai_tue_pattern"] });
      });
    }
  });
}

/**
 * Main entry
 */
export function interpretThaiTueRing(ctx) {
  if (!ringPresent(ctx)) return ctx;

  const pos = gatherRingPositions(ctx);

  // 1) Trục Thái Tuế trước
  readThaiTueAxis(ctx, pos);

  // 2) 4 tam hợp theo vòng
  readTamHopGroup(ctx, "TUE_HO_PHU", TAM_HOP_GROUPS.TUE_HO_PHU);
  readTamHopGroup(ctx, "TANG_TUE_DIEU", TAM_HOP_GROUPS.TANG_TUE_DIEU);
  readTamHopGroup(ctx, "DUONG_TU_PHUC", TAM_HOP_GROUPS.DUONG_TU_PHUC);
  readTamHopGroup(ctx, "AM_LONG_TRUC", TAM_HOP_GROUPS.AM_LONG_TRUC);

  // 3) Điểm sao lẻ theo cung chức
  ctx.pushSection({
    title: "Chi tiết từng sao trong Vòng Thái Tuế",
    weight: 0.6,
    tags: ["thai_tue_details"],
    body: "Sau đây là các sao của vòng Thái Tuế luận theo cung chức và cách cục hội tụ:"
  });
  readIndividualRingStars(ctx);

  return ctx;
}

export default interpretThaiTueRing;
