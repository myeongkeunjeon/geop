// 장면 공통 조각: 방 껍데기, 음산함 레이어, 임시 그림

export const W = 390;
export const H = 600;
export const FLOOR_Y = 476;

export const eraWall = { 2026: 'p2026', 2014: 'p2014', 1995: 'p1995', 1974: 'p1974', bare: 'pBare' };

// 같은 그림이 매번 같게 나오도록 씨앗 있는 난수
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// 다각형 변을 잘게 나눠 손으로 뜯은 듯 들쭉날쭉하게
export function jag(points, amp, seed, step = 7) {
  const r = rng(seed);
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const a = k === 0 ? 0 : (r() - 0.5) * 2 * amp;
      out.push([x1 + (x2 - x1) * t + nx * a, y1 + (y2 - y1) * t + ny * a]);
    }
  }
  return out;
}

export const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

// 벽 + 걸레받이 + 장판
export function shell(era, { cornerRight = false, cornerLeft = false } = {}) {
  return `
  <rect width="${W}" height="${FLOOR_Y}" fill="url(#${eraWall[era]})"/>
  <rect width="${W}" height="70" fill="url(#ceilShade)"/>
  <rect y="${FLOOR_Y}" width="${W}" height="${H - FLOOR_Y}" fill="url(#pFloor)"/>
  <rect y="${FLOOR_Y}" width="${W}" height="${H - FLOOR_Y}" fill="url(#floorShade)"/>
  <rect y="${FLOOR_Y - 14}" width="${W}" height="14" fill="#4a443b"/>
  <rect y="${FLOOR_Y - 14}" width="${W}" height="2" fill="#6a6358"/>
  <rect y="${FLOOR_Y}" width="${W}" height="3" fill="#000" opacity=".45"/>
  ${cornerRight ? `<rect x="${W - 70}" width="70" height="${H}" fill="url(#cornerR)"/><path d="M${W - .5} 0V${H}" stroke="#000" stroke-opacity=".5"/>` : ''}
  ${cornerLeft ? `<rect width="70" height="${H}" fill="url(#cornerL)"/>` : ''}`;
}

// 필름 입자, 탁한 녹색, 비네트. strength 0~1
export function mood(strength = 1) {
  return `
  <rect width="${W}" height="${H}" fill="#24331f" opacity="${0.2 * strength}" style="mix-blend-mode:multiply"/>
  <rect width="${W}" height="${H}" fill="#1d2a1c" opacity="${0.12 * strength}"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${0.3 * strength}"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)" opacity="${0.6 + 0.4 * strength}"/>`;
}

// 곰팡이 덩어리 (가장자리 일그러짐)
export function moldPatch(cx, cy, spread, count, seed, color = '#1c2723') {
  const r = rng(seed);
  let s = '';
  for (let i = 0; i < count; i++) {
    const x = cx + (r() - 0.5) * spread * 2;
    const y = cy + (r() - 0.5) * spread * 0.6;
    const rad = 3 + r() * spread * 0.35;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rad.toFixed(1)}" ry="${(rad * (0.6 + r() * 0.5)).toFixed(1)}" opacity="${(0.25 + r() * 0.45).toFixed(2)}"/>`;
  }
  return `<g fill="${color}" filter="url(#mold)">${s}</g>`;
}

// 누렇게 번진 물자국 테
export function waterStain(cx, cy, rx, ry) {
  return `<g filter="url(#rough)">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#9a8455" opacity=".1"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#8a7346" stroke-width="2.4" opacity=".35"/>
    <ellipse cx="${cx + 6}" cy="${cy - 3}" rx="${rx * 0.62}" ry="${ry * 0.6}" fill="none" stroke="#8a7346" stroke-width="1.4" opacity=".22"/>
  </g>`;
}

// 임시 그림: 핫스팟 자리에 단순 도형 + 이름표
export function placeholder(hotspots) {
  return hotspots
    .map(({ x, y, w, h, label }) => `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#000" fill-opacity=".22" stroke="#000" stroke-opacity=".55"/>
      <rect x="${x + w / 2 - label.length * 7 - 8}" y="${y + h / 2 - 12}" width="${label.length * 14 + 16}" height="24" rx="12" fill="#0e0e11" opacity=".8"/>
      <text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="13" fill="#d6d2c8">${label}</text>
    </g>`)
    .join('');
}

export function wallTag(text) {
  return `<text x="${W / 2}" y="34" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="12" letter-spacing="2" fill="#000" opacity=".45">${text}</text>`;
}
