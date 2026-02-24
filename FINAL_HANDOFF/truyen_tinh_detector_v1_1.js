
// truyen_tinh_detector_v1_1.js
// Detect "Truyền Tinh" giữa hai lá số theo Tam Hợp phái.
// Hỗ trợ:
// 1) Truyền thẳng (direct) theo trục đối ứng.
// 2) Truyền qua Nhị Hợp (indirect).
// 3) Truyền theo "signature pairs" (bộ sao dấu tay).
//
// Duck-typed: có hooks để adapter sang schema core.
//
// Output: { links:[], level, summary, advice }

import { CHI_NHI_HOP } from "./constants_mappings.js"; // nếu core không có, hooks có thể override
import { uniqStars, hasAll, hasAny, overlapCount } from "./utils_placements.js";

// ---------- Default configs ----------
const DEFAULT_AXES = [
  { from: "TU_TUC", to: "MENH", label: "Mẹ/Cha → Con (khí chất/đường đời)" },
  { from: "MENH", to: "DIEN", label: "Mệnh cha/mẹ → Điền con (phúc–nền nhà)" },
  { from: "PHUC", to: "PHUC", label: "Phúc truyền phúc" },
  { from: "TAT", to: "TAT", label: "Sức khỏe truyền sức khỏe" }
];

// signature pairs có thể mở rộng theo phái
export const SIGNATURE_PAIRS = [
  ["TU_VI","THAM_LANG"],
  ["TU_VI","THIEN_PHU"],
  ["SAT","PHA_QUAN","THAM_LANG"], // Sát Phá Tham
  ["TU_VI","KHONG_KIEP"], // dấu tay Tử Vi + Không Kiếp
  ["LIEM_TRINH","HOA_TINH"],
  ["LIEM_TRINH","LINH_TINH"]
];

// trọng số điểm
const SCORE = {
  direct_pair: 5,
  direct_set: 4,
  nhi_hop: 4,
  signature_pair: 4,
  signature_set: 5,
  star_single: 2
};

// ---------- Adapters ----------
function getStarsInPalace(chart, palaceKey, hooks={}){
  if(hooks.getStarsInPalace) return hooks.getStarsInPalace(chart, palaceKey);
  if(chart?.starsByPalace?.[palaceKey]) return chart.starsByPalace[palaceKey];
  if(chart?.palaces?.[palaceKey]?.stars) return chart.palaces[palaceKey].stars;
  return [];
}
function getPalaceChi(chart, palaceKey, hooks={}){
  if(hooks.getPalaceChi) return hooks.getPalaceChi(chart, palaceKey);
  if(chart?.palaceChiMap?.[palaceKey]) return chart.palaceChiMap[palaceKey];
  if(chart?.palaces?.[palaceKey]?.chi) return chart.palaces[palaceKey].chi;
  return null;
}
function getTamHopStars(chart, palaceKey, hooks={}){
  if(hooks.getTamHopStars) return hooks.getTamHopStars(chart, palaceKey);
  if(chart?.tamHopStars?.[palaceKey]) return chart.tamHopStars[palaceKey];
  return [];
}
function getNhiHopChi(chi, hooks={}){
  if(hooks.getNhiHopChi) return hooks.getNhiHopChi(chi);
  return CHI_NHI_HOP?.[chi] || null;
}

// ---------- Helpers ----------
function palaceStarSet(chart, palaceKey, hooks={}){
  const direct = getStarsInPalace(chart, palaceKey, hooks);
  const tamHop = getTamHopStars(chart, palaceKey, hooks);
  return uniqStars([...(direct||[]), ...(tamHop||[])]);
}

function matchSignaturePairs(starSetA, starSetB){
  const hits = [];
  for(const pair of SIGNATURE_PAIRS){
    const aHas = pair.every(s => starSetA.includes(s));
    const bHas = pair.every(s => starSetB.includes(s));
    if(aHas && bHas) hits.push(pair);
  }
  return hits;
}

// ---------- Core detection ----------
export function detectTruyenTinh({
  parentChart,
  childChart,
  relation="parent-child",
  axes=DEFAULT_AXES,
  hooks={}
}){
  const links = [];
  let totalScore = 0;

  // 1) Direct axes
  for(const ax of axes){
    const fromSet = palaceStarSet(parentChart, ax.from, hooks);
    const toSet = palaceStarSet(childChart, ax.to, hooks);

    const overlap = overlapCount(fromSet, toSet);
    if(overlap >= 2){
      links.push({
        code: "TRUYEN_TINH_DIRECT",
        axis: ax,
        stars: fromSet.filter(s => toSet.includes(s)),
        level: SCORE.direct_set,
        reason: `Bộ sao ở cung ${ax.from} của cha/mẹ trùng mạnh với cung ${ax.to} của con.`
      });
      totalScore += SCORE.direct_set;
    } else if(overlap === 1){
      links.push({
        code: "TRUYEN_TINH_DIRECT_SINGLE",
        axis: ax,
        stars: fromSet.filter(s => toSet.includes(s)),
        level: SCORE.star_single,
        reason: `Có sao trùng nhẹ giữa ${ax.from} (cha/mẹ) và ${ax.to} (con).`
      });
      totalScore += SCORE.star_single;
    }
  }

  // 2) Nhi hop transmission: Parent.TuTuc (chi) -> NhiHop(TuTuc) starSet matches Child.Menh/Than
  const tuTucChi = getPalaceChi(parentChart, "TU_TUC", hooks);
  const nhiHopChi = tuTucChi ? getNhiHopChi(tuTucChi, hooks) : null;

  if(nhiHopChi){
    const parentNhiHopKey = nhiHopChi; // in core we may map chi->palaceKey; hooks can override by returning palaceKey in getNhiHopChi
    const parentNhiHopSet = palaceStarSet(parentChart, parentNhiHopKey, hooks);
    const childMenhSet = palaceStarSet(childChart, "MENH", hooks);
    const childThanSet = palaceStarSet(childChart, "THAN", hooks);
    const overlapMenh = overlapCount(parentNhiHopSet, childMenhSet);
    const overlapThan = overlapCount(parentNhiHopSet, childThanSet);

    if(overlapMenh >= 2 || overlapThan >= 2){
      links.push({
        code: "TRUYEN_TINH_NHI_HOP",
        axis: { from: `NHI_HOP(TU_TUC:${tuTucChi})`, to: overlapMenh>=2 ? "MENH" : "THAN", label:"Truyền tinh nhị hợp" },
        stars: parentNhiHopSet.filter(s => (overlapMenh>=2?childMenhSet:childThanSet).includes(s)),
        level: SCORE.nhi_hop,
        reason: "Đường truyền đi qua nhị hợp của cung Tử Tức (truyền tinh ngầm)."
      });
      totalScore += SCORE.nhi_hop;
    }
  }

  // 3) Signature pairs match across key axes (TuTuc/Menh/Than/NhiHop)
  const parentKeySets = {
    TU_TUC: palaceStarSet(parentChart, "TU_TUC", hooks),
    MENH: palaceStarSet(parentChart, "MENH", hooks),
    NHI_HOP_TU_TUC: nhiHopChi ? palaceStarSet(parentChart, nhiHopChi, hooks) : []
  };
  const childKeySets = {
    MENH: palaceStarSet(childChart, "MENH", hooks),
    THAN: palaceStarSet(childChart, "THAN", hooks)
  };

  for(const [pKey, pSet] of Object.entries(parentKeySets)){
    for(const [cKey, cSet] of Object.entries(childKeySets)){
      const sigHits = matchSignaturePairs(pSet, cSet);
      for(const pair of sigHits){
        links.push({
          code: "TRUYEN_TINH_SIGNATURE",
          axis: { from: pKey, to: cKey, label:"Truyền tinh dấu tay" },
          stars: pair,
          level: pair.length>=3 ? SCORE.signature_set : SCORE.signature_pair,
          reason: `Trùng bộ sao dấu tay ${pair.join("–")} giữa ${pKey} (cha/mẹ) và ${cKey} (con).`
        });
        totalScore += (pair.length>=3 ? SCORE.signature_set : SCORE.signature_pair);
      }
    }
  }

  // Normalize level 1-5
  let level = 1;
  if(totalScore >= 12) level = 5;
  else if(totalScore >= 9) level = 4;
  else if(totalScore >= 6) level = 3;
  else if(totalScore >= 3) level = 2;

  const summary = (level>=4)
    ? "Liên hệ Truyền tinh rất mạnh giữa hai lá số."
    : (level>=3)
      ? "Hai lá số có Truyền tinh rõ, ảnh hưởng nhau đáng kể."
      : (level>=2)
        ? "Có dấu hiệu Truyền tinh nhẹ."
        : "Ít thấy Truyền tinh đáng kể.";

  const advice = [
    "Truyền tinh là đường ảnh hưởng mệnh–nghiệp, không phải định mệnh cố định.",
    "Giữ quan hệ gia đình hoà thuận và đồng hành đúng cách sẽ làm đường truyền tốt lên."
  ];

  return { relation, links, level, totalScore, summary, advice };
}

export default detectTruyenTinh;
