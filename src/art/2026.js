// 2026 벽 그림. 벽 B는 방 시안, 나머지는 임시 그림
import { W, H, FLOOR_Y, shell, mood, moldPatch, waterStain, placeholder, wallTag, jag, pts, rng } from './common.js';
import { hotspotsFor } from '../data/rooms.js';

// 벽 B 귀퉁이 층 (오른쪽 끝 = 방 모서리). 아래 층일수록 덜 찢겨 모서리 쪽으로 좁아진다
const tear = {
  l2014: jag([[391, 46], [334, 52], [304, 92], [300, 150], [284, 204], [312, 252], [352, 266], [391, 272]], 3.2, 21),
  l1995: jag([[391, 70], [344, 80], [324, 122], [328, 172], [316, 206], [342, 236], [391, 246]], 2.6, 32),
  l1974: jag([[391, 96], [356, 106], [344, 146], [352, 186], [360, 214], [391, 222]], 2.2, 43, 6),
  bare: jag([[391, 122], [370, 130], [364, 160], [372, 194], [391, 200]], 1.8, 54, 5),
};

function fibers(points, seed) {
  const r = rng(seed);
  let s = '';
  for (let i = 0; i < points.length; i += 1) {
    if (r() < 0.45) continue;
    const [x, y] = points[i];
    if (x > 388) continue;
    const a = r() * Math.PI * 2;
    const l = 2 + r() * 5;
    s += `M${x.toFixed(1)} ${y.toFixed(1)}l${(Math.cos(a) * l).toFixed(1)} ${(Math.sin(a) * l).toFixed(1)}`;
  }
  return `<path d="${s}" stroke="#f6f3ec" stroke-width=".7" stroke-linecap="round" opacity=".9"/>`;
}

function handprint() {
  // 벽지 안쪽에서 밀어붙인 손 — 희미하게 (더 진하게 하지 말 것)
  const hand = `
    <ellipse cx="0" cy="34" rx="21" ry="25"/>
    <rect x="-20" y="-14" width="9" height="34" rx="4.5" transform="rotate(-12 -15 10)"/>
    <rect x="-9" y="-24" width="9" height="42" rx="4.5" transform="rotate(-3 -4 0)"/>
    <rect x="2" y="-22" width="9" height="40" rx="4.5" transform="rotate(5 6 0)"/>
    <rect x="12" y="-12" width="8" height="32" rx="4" transform="rotate(14 16 6)"/>
    <rect x="16" y="24" width="9" height="28" rx="4.5" transform="rotate(-52 20 36)"/>`;
  return `<g transform="translate(76 168) rotate(-8)" opacity=".16" filter="url(#soft1)">
    <g fill="#000" transform="translate(2.2 2.6)">${hand}</g>
    <g fill="#fff" transform="translate(-1.6 -1.6)">${hand}</g>
    <g fill="#d4d2ca">${hand}</g>
  </g>`;
}

function box(open) {
  const lid = open
    ? `<polygon points="48,368 40,326 118,318 126,360" fill="#9a7a50"/>
       <polygon points="206,368 222,330 140,322 126,360" fill="#7f6340"/>
       <polygon points="48,368 206,368 196,352 58,352" fill="#1b140c"/>`
    : `<polygon points="46,368 206,368 196,350 58,350" fill="#a3825a"/>
       <polygon points="120,350 132,350 134,368 118,368" fill="#c3ab82" opacity=".8"/>`;
  return `<g>
    <ellipse cx="128" cy="504" rx="92" ry="9" fill="#000" opacity=".5" filter="url(#soft)"/>
    <rect x="46" y="368" width="160" height="134" fill="#8a6a44"/>
    <polygon points="206,368 218,356 218,490 206,502" fill="#5e472c"/>
    ${lid}
    <rect x="118" y="368" width="16" height="58" fill="#c3ab82" opacity=".75"/>
    <text x="78" y="414" font-family="Gowun Batang, serif" font-size="15" fill="#2a1f13" opacity=".7" transform="rotate(-4 78 414)">책 · 302</text>
    <rect x="46" y="430" width="172" height="72" fill="url(#rot)" filter="url(#rough)"/>
    <path d="M60 448q20 -8 40 2t44 -4t52 6" stroke="#1c140c" stroke-width="2" fill="none" opacity=".5" filter="url(#rough)"/>
  </g>`;
}

function wallB(state) {
  const f = state.flags;
  const { l2014, l1995, l1974, bare } = tear;
  return `
  ${shell('2026', { cornerRight: true })}
  ${waterStain(150, 70, 66, 30)}
  ${waterStain(250, 330, 30, 22)}
  ${handprint()}
  ${moldPatch(350, 14, 40, 26, 1)}
  ${moldPatch(386, 60, 12, 10, 2)}
  ${moldPatch(60, FLOOR_Y - 20, 60, 22, 3)}
  ${moldPatch(368, FLOOR_Y - 22, 26, 14, 4)}

  <!-- 귀퉁이 주변 실핏줄 같은 금 -->
  <g fill="none" stroke-linecap="round">
    <path d="M300 104l-16 -8l-9 5l-15 -10l-12 3M296 142l-22 4l-10 -6l-18 7M288 196l-20 10l-6 14l-15 6M306 248l-14 18l2 14l-10 12M270 100l-8 -14M262 151l-6 12"
      stroke="#2b2320" stroke-width=".9" opacity=".5"/>
    <path d="M300 104l-16 -8l-9 5M288 196l-20 10l-6 14M306 248l-14 18"
      stroke="#5a2a22" stroke-width=".6" opacity=".55"/>
  </g>

  <!-- 층: 2014 → 1995 → 1974 → 맨 벽 -->
  <g>
    <polygon points="${pts(l2014)}" fill="#f1eee6" transform="translate(-1.5 1.5)"/>
    <polygon points="${pts(l2014)}" fill="url(#p2014)" filter="url(#inset)"/>
    <polygon points="${pts(l1995)}" fill="url(#p1995)" filter="url(#inset)"/>
    <polygon points="${pts(l1974)}" fill="url(#p1974)" filter="url(#inset)"/>
    <polygon points="${pts(l1974.slice(0, 7))} 391,140" fill="url(#pNews)" opacity=".9"/>
    <polygon points="${pts(bare)}" fill="url(#pBare)" filter="url(#inset)"/>
    <path d="M374 138l6 18M378 136l5 16M371 168l9 14" stroke="#4a4844" stroke-width=".8" opacity=".8"/>
    ${fibers(l2014, 7)}
    ${fibers(l1995, 8)}
  </g>

  <!-- 배어 나온 얼룩과 흘러내린 자국 -->
  <g>
    <path d="M380 150q-10 18 -4 40q6 20 15 26V140z" fill="#3f2219" opacity=".8" filter="url(#soft1)"/>
    <path d="M378 204c-3 40 2 80 -1 120s3 90 1 142" stroke="url(#drip)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M386 214c1 50 -2 110 1 160" stroke="url(#drip)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M338 258c2 30 -3 60 0 100s2 40 1 62" stroke="url(#drip)" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="380" cy="${FLOOR_Y - 8}" rx="14" ry="4" fill="#3f2219" opacity=".6" filter="url(#soft1)"/>
  </g>

  <!-- 뜯겨 말려 늘어진 실크 조각 -->
  <g>
    <path d="M300 244c4 22 12 44 30 58c12 8 26 4 26 -8c0 -14 -14 -22 -24 -34z" fill="#000" opacity=".35" filter="url(#soft)" transform="translate(-4 6)"/>
    <path d="M296 232c2 26 12 52 32 66c12 8 26 2 24 -10c-2 -14 -14 -24 -22 -40c-6 -10 -20 -16 -34 -16z" fill="url(#flapBack)"/>
    <path d="M318 290c10 8 22 10 30 4" stroke="#7d786f" stroke-width="1" fill="none"/>
    ${fibers(jag([[296, 232], [330, 248]], 1.5, 9, 4), 10)}
  </g>

  ${f.cornerWet ? `<ellipse cx="326" cy="166" rx="74" ry="118" fill="#55544d" opacity=".32" filter="url(#soft)"/>
    <path d="M300 120q20 10 10 50M334 214q10 14 4 30" stroke="#fff" stroke-width="1.2" opacity=".25" fill="none"/>` : ''}

  ${box(f.boxOpen)}
  ${mood(1)}`;
}

function temp(wall, state, tag, extra = '') {
  return `
  ${shell('2026', { cornerRight: true, cornerLeft: true })}
  ${waterStain(90 + wall.charCodeAt(0) * 3, 60, 40, 18)}
  ${moldPatch(40, 12, 40, 16, wall.charCodeAt(0))}
  ${extra}
  ${placeholder(hotspotsFor('2026', wall, state.flags))}
  ${wallTag(tag)}
  ${mood(1)}`;
}

export function draw2026(wall, state) {
  let svg;
  if (wall === 'B') svg = wallB(state);
  else if (wall === 'A') svg = temp('A', state, '벽 A · 현관 (임시 그림)');
  else if (wall === 'C') svg = temp('C', state, '벽 C · 창문 (임시 그림)');
  else svg = temp('D', state, '벽 D · 부엌 (임시 그림)');

  // 정전: 2단계에서 손전등 원형 마스크로 바뀐다
  if (state.flags.blackout) svg += `<rect width="${W}" height="${H}" fill="#000" opacity=".8"/>`;
  return svg;
}
