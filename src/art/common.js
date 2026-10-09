// 장면 공통 조각: 방 껍데기, 빛, 벽지의 낡음·기괴함, 임시 그림

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

// 뒷벽 + 걸레받이. 바닥·천장·옆벽은 room.js가 원근으로 그린다.
// 양쪽 끝은 방 모서리라 어둡게 가라앉힌다.
export function shell(era) {
  return `
  <rect width="${W}" height="${FLOOR_Y}" fill="url(#${eraWall[era]})"/>
  <rect width="${W}" height="${FLOOR_Y}" filter="url(#grime)" opacity=".3"/>
  <rect width="${W}" height="${FLOOR_Y}" filter="url(#grime2)" opacity=".22"/>
  <rect y="${FLOOR_Y - 170}" width="${W}" height="170" fill="url(#scuff)"/>
  <rect width="${W}" height="${FLOOR_Y}" fill="url(#bulb)"/>
  <rect width="${W}" height="60" fill="url(#ceilShade)"/>
  <rect y="${FLOOR_Y - 14}" width="${W}" height="14" fill="#5a5247"/>
  <rect y="${FLOOR_Y - 14}" width="${W}" height="2" fill="#7a7266"/>
  <rect x="${W - 46}" width="46" height="${FLOOR_Y}" fill="url(#cornerR)" opacity=".75"/>
  <rect width="46" height="${FLOOR_Y}" fill="url(#cornerL)" opacity=".75"/>`;
}

// 물건의 옆면·윗면·밑면: 앞 모서리를 소실점(벽 좌표) 쪽으로 depth만큼 끌어 면을 만든다
export const VP = [195, 295];
export function face(edge, depth, fill, extra = '') {
  const back = edge.map(([x, y]) => [x + (VP[0] - x) * depth, y + (VP[1] - y) * depth]);
  return `<polygon points="${pts([...edge, ...back.reverse()])}" fill="${fill}" ${extra}/>`;
}

// 필름 입자, 탁한 녹색, 가벼운 비네트. 화면 전체를 누르지 않고 결만 더한다
export function mood(strength = 1) {
  return `
  <rect width="${W}" height="${H}" fill="#1c3532" opacity="${0.13 * strength}"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${0.2 * strength}"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

// 곰팡이: 번진 얼룩 + 점점이 포자
export function moldPatch(cx, cy, spread, count, seed, color = '#1e2a22') {
  const r = rng(seed);
  let blots = '';
  let dots = '';
  for (let i = 0; i < count; i++) {
    const x = cx + (r() - 0.5) * spread * 2;
    const y = cy + (r() - 0.5) * spread * 0.7;
    const rad = 3 + r() * spread * 0.32;
    blots += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rad.toFixed(1)}" ry="${(rad * (0.6 + r() * 0.5)).toFixed(1)}" opacity="${(0.3 + r() * 0.45).toFixed(2)}"/>`;
  }
  for (let i = 0; i < count * 3; i++) {
    const x = cx + (r() - 0.5) * spread * 2.6;
    const y = cy + (r() - 0.5) * spread * 1.1;
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.5 + r() * 1.3).toFixed(1)}" opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
  }
  return `<g fill="${color}"><g filter="url(#mold)">${blots}</g>${dots}</g>`;
}

// 누렇게 번진 물자국 테
export function waterStain(cx, cy, rx, ry) {
  return `<g filter="url(#rough)">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#a08850" opacity=".16"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#7d6538" stroke-width="2.4" opacity=".5"/>
    <ellipse cx="${cx + 6}" cy="${cy - 3}" rx="${rx * 0.62}" ry="${ry * 0.6}" fill="none" stroke="#7d6538" stroke-width="1.4" opacity=".35"/>
  </g>`;
}

// 천장에서 흘러내린 누런 물줄기. 끝점(ex, ey)은 fx 물방울이 쓴다
export function leakPath(x, len, seed) {
  const r = rng(seed);
  let d = `M${x} 0`;
  let cx = x;
  for (let y = 20; y <= len; y += 20) {
    cx += (r() - 0.5) * 6;
    d += ` L${cx.toFixed(1)} ${y}`;
  }
  return { d, ex: +cx.toFixed(1), ey: len + 3 };
}

export function ceilingLeak(x, len, seed) {
  const { d, ex, ey } = leakPath(x, len, seed);
  return `<g opacity=".55">
    <path d="${d}" stroke="#8a7140" stroke-width="7" fill="none" opacity=".35" filter="url(#soft1)"/>
    <path d="${d}" stroke="#6e5530" stroke-width="1.6" fill="none"/>
    <ellipse cx="${ex}" cy="${ey}" rx="3" ry="4.5" fill="#6e5530"/>
  </g>`;
}

// 도배지 이음매: 살짝 벌어지고 위쪽이 들뜸
export function seams(xs, seed) {
  const r = rng(seed);
  return xs
    .map((x) => {
      const lift = 14 + r() * 26;
      return `<g>
      <path d="M${x} 0V${FLOOR_Y - 14}" stroke="#000" stroke-opacity=".22" stroke-width="1"/>
      <path d="M${x + 1} 0V${FLOOR_Y - 14}" stroke="#fff" stroke-opacity=".25" stroke-width=".8"/>
      <path d="M${x} 4q${4 + r() * 3} ${lift / 2} 1 ${lift}" stroke="#000" stroke-opacity=".3" stroke-width="2" fill="none" filter="url(#soft1)"/>
      <path d="M${x + 1} 4q${3 + r() * 3} ${lift / 2} 0 ${lift}" stroke="#f3f0e8" stroke-opacity=".7" stroke-width="1" fill="none"/>
    </g>`;
    })
    .join('');
}

// 벽지 속 기포: 무언가 밀고 있는 듯 부푼 자리
export function bubble(x, y, rx, ry, pattern = 'p2026') {
  return `<g>
    <ellipse cx="${x + 2}" cy="${y + 3}" rx="${rx}" ry="${ry}" fill="#000" opacity=".22" filter="url(#soft1)"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${pattern})"/>
    <ellipse cx="${x - rx * 0.3}" cy="${y - ry * 0.35}" rx="${rx * 0.5}" ry="${ry * 0.4}" fill="#fff" opacity=".28" filter="url(#soft1)"/>
  </g>`;
}

// 못 자국과 녹물
export function nailHole(x, y, len = 30) {
  return `<g>
    <rect x="${x - 3}" y="${y}" width="6" height="${len}" fill="url(#rust)" filter="url(#soft1)"/>
    <circle cx="${x}" cy="${y}" r="1.8" fill="#1a1512"/>
  </g>`;
}

// 액자를 떼어 낸 자리: 그 부분만 덜 바랬다
export function ghostFrame(x, y, w, h) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f4f1e6" opacity=".22"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#5e5444" stroke-opacity=".3" stroke-width="2" filter="url(#soft1)"/>
    ${nailHole(x + w / 2, y - 10, 24)}
  </g>`;
}

// 머리카락 같은 금
export function crack(x, y, len, seed, angle = 90) {
  const r = rng(seed);
  let d = `M${x} ${y}`;
  let cx = x;
  let cy = y;
  let a = (angle * Math.PI) / 180;
  let branches = '';
  for (let i = 0; i < len / 6; i++) {
    a += (r() - 0.5) * 0.9;
    cx += Math.cos(a) * 6;
    cy += Math.sin(a) * 6;
    d += ` L${cx.toFixed(1)} ${cy.toFixed(1)}`;
    if (r() < 0.15) {
      const b = a + (r() < 0.5 ? 0.9 : -0.9);
      branches += `M${cx.toFixed(1)} ${cy.toFixed(1)}l${(Math.cos(b) * 10).toFixed(1)} ${(Math.sin(b) * 10).toFixed(1)}`;
    }
  }
  return `<path d="${d}${branches}" stroke="#2c2622" stroke-width=".8" fill="none" opacity=".55" stroke-linecap="round"/>`;
}

// 연필 낙서
export function scribble(text, x, y, { size = 11, rot = 0, opacity = 0.4 } = {}) {
  return `<text x="${x}" y="${y}" font-family="Gowun Batang, serif" font-size="${size}" fill="#3a3630" opacity="${opacity}" transform="rotate(${rot} ${x} ${y})">${text}</text>`;
}

// 다섯 개씩 묶어 그은 날짜 세기
export function tally(x, y, groups, seed) {
  const r = rng(seed);
  let d = '';
  for (let g = 0; g < groups; g++) {
    const gx = x + g * 22;
    for (let i = 0; i < 4; i++) {
      const lx = gx + i * 4 + (r() - 0.5);
      d += `M${lx.toFixed(1)} ${(y + r() * 2).toFixed(1)}l${(r() - 0.5).toFixed(1)} 16`;
    }
    d += `M${gx - 2} ${y + 13}l19 -10`;
  }
  return `<path d="${d}" stroke="#3a3530" stroke-width="1" fill="none" opacity=".55" stroke-linecap="round"/>`;
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
  return `<text x="${W / 2}" y="44" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="12" letter-spacing="2" fill="#000" opacity=".45">${text}</text>`;
}
