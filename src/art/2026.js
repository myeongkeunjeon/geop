// 2026 벽 그림. 흰 실크벽지, 차가운 회색. 화면을 어둡게 누르지 않고 물건과 벽의 낡음으로 음산하게.
import {
  W, H, FLOOR_Y, shell, mood, moldPatch, waterStain, ceilingLeak, seams, bubble, nailHole,
  ghostFrame, crack, scribble, tally, jag, pts, rng, leakPath,
} from './common.js';
import { lamp, motes, fly, drip, doorFeet, breathe, creep, neighborLight } from './fx.js';

/* ================= 벽 A · 현관 ================= */

function door() {
  return `
  <rect x="140" y="88" width="120" height="390" fill="#2c302d"/>
  <rect x="150" y="98" width="100" height="374" fill="url(#steel)"/>
  <rect x="160" y="112" width="80" height="150" fill="none" stroke="#000" stroke-opacity=".28"/>
  <rect x="161" y="113" width="80" height="150" fill="none" stroke="#fff" stroke-opacity=".08"/>
  <rect x="160" y="290" width="80" height="166" fill="none" stroke="#000" stroke-opacity=".28"/>
  <rect x="161" y="291" width="80" height="166" fill="none" stroke="#fff" stroke-opacity=".08"/>
  <!-- 벗겨진 페인트와 녹 -->
  <g fill="#6b4a32" filter="url(#rough)" opacity=".8">
    <ellipse cx="172" cy="430" rx="9" ry="5"/><ellipse cx="232" cy="138" rx="5" ry="4"/><ellipse cx="214" cy="458" rx="12" ry="4"/><ellipse cx="160" cy="300" rx="4" ry="7"/>
  </g>
  <!-- 떼다 만 전단지 자국 -->
  <g fill="#e6e1d3" opacity=".45"><rect x="176" y="236" width="20" height="12" transform="rotate(-5 186 242)"/><rect x="200" y="244" width="9" height="6"/></g>
  <!-- 외시경 -->
  <circle cx="200" cy="188" r="5.5" fill="#141716" stroke="#8b918d" stroke-width="1.6"/>
  <circle cx="198.5" cy="186.5" r="1.2" fill="#cfd5d2" opacity=".6"/>
  <!-- 도어락, 손잡이, 걸쇠 -->
  <rect x="226" y="258" width="18" height="54" rx="3" fill="#1a1d1c"/>
  <g fill="#3a403d">${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<circle cx="${230 + c * 5}" cy="${266 + r * 7}" r="1.4"/>`).join('')).join('')}</g>
  <rect x="216" y="322" width="32" height="6" rx="3" fill="#9aa09b"/>
  <rect x="238" y="316" width="9" height="17" rx="3" fill="#7f857f"/>
  <g fill="none" stroke="#8f938f" stroke-width="1.2"><circle cx="246" cy="226" r="2.3"/><circle cx="244" cy="231" r="2.3"/><circle cx="241" cy="236" r="2.3"/><circle cx="238" cy="240" r="2.3"/></g>
  <!-- 문틈으로 새는 복도 불빛. 가운데가 끊겨 있다 — 누가 서 있는 것처럼 -->
  <rect x="150" y="469" width="100" height="6" fill="#0d0c0a"/>`;
}

function shoeCabinet(f) {
  const onTop = f.gotCutter
    ? ''
    : `<g transform="translate(36 283) rotate(-8)"><rect width="30" height="7" rx="2" fill="#c5a33a"/><rect x="4" y="2" width="5" height="3" fill="#6a5a24"/><polygon points="30,1 41,3.5 30,6" fill="#aab0b4"/></g>
       <g transform="translate(84 282) rotate(5)"><rect width="36" height="13" fill="#ebe6d6"/><path d="M4 4h24M4 8h17" stroke="#6d6655" stroke-width=".8"/></g>`;
  return `
  <rect x="22" y="300" width="110" height="176" fill="#000" opacity=".25" transform="translate(4 2)" filter="url(#soft)"/>
  <rect x="18" y="292" width="118" height="10" fill="#8d7a60"/>
  <rect x="18" y="292" width="118" height="2" fill="#a8977c"/>
  <rect x="22" y="302" width="110" height="170" fill="url(#wood)"/>
  <rect x="22" y="302" width="110" height="5" fill="#000" opacity=".25"/>
  <path d="M77 308V468" stroke="#3b3126" stroke-width="1.6"/>
  <circle cx="70" cy="382" r="2.6" fill="#c9b98f"/><circle cx="84" cy="382" r="2.6" fill="#c9b98f"/>
  <!-- 들뜬 시트지 -->
  <polygon points="22,436 42,450 34,472 22,472" fill="#b8ab90"/>
  <path d="M22 436l20 14l-8 22" stroke="#4a3d2e" stroke-width="1" fill="none"/>
  <rect x="22" y="468" width="110" height="8" fill="#0f0d0b"/>
  ${onTop}`;
}

function mailbox(f) {
  const mail = f.gotMail
    ? ''
    : `<rect x="286" y="194" width="36" height="17" fill="#e3ddd0" transform="rotate(-7 304 202)"/>
       <rect x="304" y="198" width="30" height="14" fill="#d8cfb8" transform="rotate(5 319 205)"/>
       <rect x="324" y="199" width="6" height="7" fill="#b4544a" transform="rotate(5 319 205)"/>`;
  return `
  ${mail}
  <rect x="300" y="266" width="7" height="58" fill="url(#rust)" filter="url(#soft1)"/>
  <rect x="270" y="208" width="80" height="60" rx="3" fill="#6f7572"/>
  <rect x="270" y="208" width="80" height="14" rx="3" fill="#5c625f"/>
  <rect x="282" y="228" width="56" height="4" rx="2" fill="#1a1d1c"/>
  <rect x="299" y="242" width="22" height="11" fill="#d8d2c2"/>
  <text x="310" y="250.5" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="8" fill="#3a3630">302</text>
  <g fill="#6b4a32" opacity=".7" filter="url(#rough)"><ellipse cx="276" cy="262" rx="5" ry="3"/><ellipse cx="344" cy="214" rx="4" ry="2"/></g>`;
}

function wallpaperBag(f) {
  if (f.gotBag) return '';
  return `
  <ellipse cx="320" cy="522" rx="54" ry="7" fill="#000" opacity=".45" filter="url(#soft)"/>
  <g transform="rotate(12 311 445)">
    <rect x="298" y="404" width="24" height="76" rx="3" fill="#e8e6de"/>
    <path d="M302 404v76M307 404v76M312 404v76M317 404v76" stroke="#c9c6bc" stroke-width=".7"/>
    <ellipse cx="310" cy="404" rx="12" ry="3.5" fill="#d4d1c7"/>
  </g>
  <rect x="340" y="414" width="7" height="58" rx="2" fill="#9c7a4c" transform="rotate(-14 343 443)"/>
  <rect x="332" y="456" width="22" height="10" rx="2" fill="#3a332a" transform="rotate(-14 343 461)"/>
  <path d="M290 456c0 -24 22 -24 22 0M330 456c0 -24 22 -24 22 0" stroke="#5e5a4b" stroke-width="3" fill="none"/>
  <path d="M272 454h96l-6 66h-84z" fill="#7a7562"/>
  <path d="M272 454h96" stroke="#5e5a4b" stroke-width="2"/>
  <ellipse cx="300" cy="496" rx="14" ry="9" fill="#3f2219" opacity=".35" filter="url(#rough)"/>`;
}

function shoes() {
  // 내 것이 아닌 낡은 신발 한 켤레가 문을 향해 가지런히
  return `<g>
    <ellipse cx="206" cy="526" rx="30" ry="5" fill="#000" opacity=".4" filter="url(#soft1)"/>
    <path d="M182 524c0 -8 4 -14 10 -14s9 6 9 14z" fill="#2c2520"/>
    <path d="M206 524c0 -8 4 -14 10 -14s9 6 9 14z" fill="#2c2520"/>
    <path d="M186 516c3 -3 8 -3 11 0M210 516c3 -3 8 -3 11 0" stroke="#5a4c40" stroke-width="1" fill="none"/>
  </g>`;
}

function wallA(f) {
  return `
  ${shell('2026', { cornerLeft: true, cornerRight: true })}
  ${seams([96, 292], 61)}
  ${waterStain(322, 46, 46, 22)}
  ${ceilingLeak(330, 130, 5)}
  ${moldPatch(18, 14, 34, 18, 12)}
  ${moldPatch(372, FLOOR_Y - 22, 24, 12, 13)}
  ${crack(262, 96, 70, 7, 60)}
  ${scribble('2:13', 30, 252, { rot: -6, opacity: 0.45 })}
  ${scribble('2:13', 68, 264, { size: 10, rot: 4, opacity: 0.35 })}
  ${scribble('2:13', 44, 280, { size: 12, rot: -2, opacity: 0.3 })}
  ${scribble('2:13', 96, 246, { size: 9, rot: 8, opacity: 0.32 })}
  ${scribble('2:13', 106, 272, { size: 10, rot: -9, opacity: 0.25 })}
  <polygon points="122,${FLOOR_Y} 278,${FLOOR_Y} 300,${H} 100,${H}" fill="url(#pEntry)"/>
  <polygon points="122,${FLOOR_Y} 278,${FLOOR_Y} 300,${H} 100,${H}" fill="url(#floorShade)"/>
  ${door()}
  ${shoes()}
  ${shoeCabinet(f)}
  ${mailbox(f)}
  ${wallpaperBag(f)}
  ${mood(1)}`;
}

/* ================= 벽 B · 귀퉁이 (방 시안) ================= */

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
  for (const [x, y] of points) {
    if (r() < 0.45 || x > 388) continue;
    const a = r() * Math.PI * 2;
    const l = 2 + r() * 5;
    s += `M${x.toFixed(1)} ${y.toFixed(1)}l${(Math.cos(a) * l).toFixed(1)} ${(Math.sin(a) * l).toFixed(1)}`;
  }
  return `<path d="${s}" stroke="#f6f3ec" stroke-width=".7" stroke-linecap="round" opacity=".9"/>`;
}

const HAND = `
  <ellipse cx="0" cy="34" rx="21" ry="25"/>
  <rect x="-20" y="-14" width="9" height="34" rx="4.5" transform="rotate(-12 -15 10)"/>
  <rect x="-9" y="-24" width="9" height="42" rx="4.5" transform="rotate(-3 -4 0)"/>
  <rect x="2" y="-22" width="9" height="40" rx="4.5" transform="rotate(5 6 0)"/>
  <rect x="12" y="-12" width="8" height="32" rx="4" transform="rotate(14 16 6)"/>
  <rect x="17" y="6" width="9" height="28" rx="4.5" transform="rotate(42 21 30)"/>`;

// 손끝 위치와 바깥쪽 방향 (HAND 좌표 기준)
const TIPS = [[-20, -13.5, -102], [-5.8, -24, -93], [8.4, -22, -85], [20.4, -11.5, -76], [36, 14, -40]];

// 벽지 안쪽에서 손바닥을 밀어붙인 자국.
// 손 모양을 높이로 삼아 왼쪽 위 빛으로 음영만 얹는다(벽지 무늬는 그대로 이어짐).
// 손끝에서 벽지가 당겨진 주름, 누런 손끝 자국, 가운데 손가락 끝은 막 찢어지려 한다.
function handprint(x, y, rot, scale, strength, split = false) {
  let creases = '';
  for (const [tx, ty, deg] of TIPS) {
    for (const d of [-9, 9]) {
      const a = ((deg + d) * Math.PI) / 180;
      const l = 13;
      const x1 = tx + Math.cos(a) * 6;
      const y1 = ty + Math.sin(a) * 6;
      const x2 = tx + Math.cos(a) * l;
      const y2 = ty + Math.sin(a) * l;
      creases += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})">
    <g filter="url(#bulge)" opacity="${strength}"><g fill="#000">${HAND}</g></g>
    <path d="${creases}" stroke="#000" stroke-opacity="${(strength * 0.22).toFixed(2)}" stroke-width=".8" transform="translate(.7 .7)" stroke-linecap="round"/>
    <path d="${creases}" stroke="#fff" stroke-opacity="${(strength * 0.4).toFixed(2)}" stroke-width=".6" stroke-linecap="round"/>
    <g fill="#6e5a3a" opacity="${(strength * 0.3).toFixed(2)}" filter="url(#soft1)">
      ${TIPS.slice(0, 4).map(([tx, ty]) => `<ellipse cx="${tx}" cy="${ty + 3}" rx="3.4" ry="3.8"/>`).join('')}
    </g>
    ${split ? `<path d="M-6.6 -27.5q.9 3 .4 6.5q-.9 -3 -.4 -6.5z" fill="#1c120e"/>
      <path d="M-6.4 -26l-2 -1M-5.7 -24l2 -.6M-6.2 -22.6l-2 .8" stroke="#f6f3ec" stroke-width=".4"/>` : ''}
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

function wallB(f) {
  const { l2014, l1995, l1974, bare } = tear;
  return `
  ${shell('2026', { cornerRight: true })}
  ${seams([186], 81)}
  ${waterStain(150, 70, 66, 30)}
  ${ceilingLeak(118, 92, 3)}
  ${waterStain(250, 330, 30, 22)}
  ${handprint(78, 176, -8, 1.2, 0.95, true)}
  ${handprint(42, 272, 18, 0.9, 0.55)}
  ${bubble(214, 214, 16, 11)}
  ${bubble(236, 236, 8, 6)}
  ${nailHole(166, 252, 34)}
  ${moldPatch(348, 14, 42, 26, 1)}
  ${moldPatch(386, 60, 12, 10, 2)}
  ${moldPatch(60, FLOOR_Y - 20, 60, 22, 3)}
  ${moldPatch(368, FLOOR_Y - 22, 26, 14, 4)}

  <!-- 귀퉁이 주변 실핏줄 같은 금 -->
  <g fill="none" stroke-linecap="round">
    <path d="M300 104l-16 -8l-9 5l-15 -10l-12 3M296 142l-22 4l-10 -6l-18 7M288 196l-20 10l-6 14l-15 6M306 248l-14 18l2 14l-10 12M270 100l-8 -14M262 151l-6 12"
      stroke="#2b2320" stroke-width=".9" opacity=".55"/>
    <path d="M300 104l-16 -8l-9 5M288 196l-20 10l-6 14M306 248l-14 18"
      stroke="#5a2a22" stroke-width=".7" opacity=".6"/>
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

  ${f.cornerWet ? `<ellipse cx="326" cy="166" rx="74" ry="118" fill="#55544d" opacity=".32" filter="url(#soft)"/>
    <path d="M300 120q20 10 10 50M334 214q10 14 4 30" stroke="#fff" stroke-width="1.2" opacity=".25" fill="none"/>` : ''}

  ${box(f.boxOpen)}
  ${mood(1)}`;
}

/* ================= 벽 C · 창문 ================= */

function windowFrame() {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `M${118 + i * 19} 70V240`).join('');
  return `
  <path d="M90 54H300" stroke="#6d6a64" stroke-width="3"/>
  <g fill="none" stroke="#6d6a64" stroke-width="1.2"><circle cx="112" cy="58" r="3"/><circle cx="148" cy="58" r="3"/><circle cx="280" cy="58" r="3"/></g>
  <path d="M148 61v14l-3 6" stroke="#b9b4a6" stroke-width="2" fill="none" opacity=".7"/>
  <rect x="102" y="62" width="186" height="186" fill="#c4c5c0"/>
  <rect x="102" y="62" width="186" height="3" fill="#e2e3de"/>
  <rect x="110" y="70" width="170" height="170" fill="url(#nightGlass)"/>
  <rect x="110" y="70" width="170" height="170" fill="url(#pBrick)" opacity=".6"/>
  <rect x="226" y="98" width="24" height="32" fill="#6b5a32" opacity=".3"/>
  <path d="${bars}M110 124H280M110 196H280" stroke="#070909" stroke-width="3"/>
  <rect x="193" y="70" width="4" height="170" fill="#b2b3ae"/>
  <polygon points="118,70 160,70 118,150" fill="#fff" opacity=".05"/>
  <path d="M130 200v34M146 214v22M214 190v46M262 206v30M240 222v14" stroke="#cfd8da" stroke-width="1" opacity=".25"/>
  ${moldPatch(116, 236, 18, 12, 21, '#1b231d')}
  ${moldPatch(276, 76, 14, 9, 22, '#1b231d')}
  ${moldPatch(114, 76, 12, 8, 23, '#1b231d')}
  <rect x="96" y="246" width="198" height="10" fill="#b8b4a8"/>
  <rect x="96" y="256" width="198" height="4" fill="#000" opacity=".25"/>
  <rect x="110" y="260" width="170" height="60" fill="url(#rust)" opacity=".35" filter="url(#rough)"/>
  <!-- 말라 죽은 화분 -->
  <path d="M252 246l3 -22h22l3 22z" fill="#7a4a32"/>
  <path d="M260 224c-2 -16 -10 -20 -14 -30M266 224c2 -14 8 -16 6 -30c-1 -6 -6 -6 -8 -2M270 224c4 -8 12 -6 16 2" stroke="#5a4a30" stroke-width="1.4" fill="none"/>`;
}

function mattress(f) {
  if (!f.mattressMoved) {
    return `
    <ellipse cx="182" cy="548" rx="168" ry="9" fill="#000" opacity=".5" filter="url(#soft)"/>
    <path d="M40 482q2 -10 14 -10h256q12 0 16 10l12 46q2 12 -12 12H38q-14 0 -12 -12z" fill="#7d7768"/>
    <path d="M42 478q2 -8 12 -8h256q10 0 14 8l12 44q2 8 -10 8H40q-12 0 -10 -8z" fill="url(#mattressTop)"/>
    <path d="M100 472q-6 30 -16 58M166 472q-2 30 -6 58M232 472q4 30 8 58M296 472q8 30 18 58M32 502q150 6 300 0" stroke="#7c7565" stroke-width="1" fill="none" opacity=".6"/>
    <!-- 사람 모양 같기도 한 누런 얼룩 -->
    <path d="M110 488c30 -8 92 -6 132 4c14 8 -2 26 -32 26c-34 0 -74 -4 -96 -12c-12 -6 -12 -16 -4 -18z" fill="#7a6236" opacity=".45" filter="url(#rough)"/>
    <ellipse cx="96" cy="496" rx="14" ry="10" fill="#7a6236" opacity=".35" filter="url(#rough)"/>
    <!-- 구겨진 이불 -->
    <path d="M232 472q30 -8 70 -2q20 6 24 30q-4 20 -40 24q-30 -4 -44 -20q-14 -18 -10 -32z" fill="#5f6a6c"/>
    <path d="M246 480q24 4 40 20M262 474q10 14 34 18M300 504q-10 10 -30 10" stroke="#3e4749" stroke-width="1.4" fill="none"/>`;
  }
  return `
  <!-- 벽에 세워 둔 매트리스 (밑면에 곰팡이) -->
  <rect x="24" y="202" width="90" height="280" rx="6" fill="#000" opacity=".35" transform="translate(6 2) rotate(-3 66 340)" filter="url(#soft)"/>
  <rect x="20" y="200" width="92" height="282" rx="10" fill="#958f80" transform="rotate(-3 66 340)"/>
  <g transform="rotate(-3 66 340)">${moldPatch(64, 330, 30, 14, 41, '#2a3328')}${moldPatch(56, 430, 24, 10, 42, '#2a3328')}</g>
  <!-- 매트리스가 있던 자리와 들뜬 장판 -->
  <polygon points="44,476 318,476 338,530 24,530" fill="#8a7550" opacity=".3"/>
  <polygon points="44,476 318,476 338,530 24,530" fill="none" stroke="#3a3020" stroke-opacity=".35" stroke-width="2" filter="url(#soft1)"/>
  <polygon points="248,548 334,548 334,586" fill="#1d1a15"/>
  ${f.gotRing ? '' : '<circle cx="306" cy="564" r="3.4" fill="none" stroke="#c9ccd1" stroke-width="1.6"/><circle cx="304.5" cy="562.5" r=".8" fill="#fff"/>'}
  <polygon points="248,548 334,548 304,516" fill="#000" opacity=".35" transform="translate(4 6)" filter="url(#soft1)"/>
  <polygon points="248,548 334,548 304,516" fill="#a08a62"/>
  <path d="M248 548L304 516" stroke="#c8b48a" stroke-width="1"/>`;
}

function wallC(f) {
  return `
  ${shell('2026', { cornerLeft: true, cornerRight: true })}
  ${seams([70, 318], 71)}
  ${moldPatch(372, 14, 30, 16, 24)}
  ${waterStain(52, 120, 30, 46)}
  ${crack(300, 250, 80, 17, 70)}
  ${ghostFrame(320, 150, 46, 60)}
  ${tally(300, 420, 3, 31)}
  ${tally(306, 442, 2, 32)}
  ${windowFrame()}
  ${mattress(f)}
  ${mood(1)}`;
}

/* ================= 벽 D · 부엌 ================= */

function upperCabinet() {
  return `
  <rect x="28" y="108" width="196" height="98" fill="#000" opacity=".3" transform="translate(3 4)" filter="url(#soft)"/>
  <rect x="28" y="108" width="196" height="98" fill="url(#wood)"/>
  <rect x="28" y="108" width="98" height="98" fill="none" stroke="#3b3126" stroke-width="1.4"/>
  <!-- 오른쪽 문이 조금 열려 있다. 안은 새까맣다 -->
  <polygon points="126,108 132,110 132,204 126,206" fill="#0a0806"/>
  <polygon points="132,110 226,104 226,210 132,204" fill="url(#wood)"/>
  <polygon points="132,110 226,104 226,210 132,204" fill="#fff" opacity=".05"/>
  <circle cx="116" cy="190" r="2.4" fill="#c9b98f"/><circle cx="142" cy="190" r="2.4" fill="#c9b98f"/>`;
}

function sinkUnit() {
  return `
  <rect x="28" y="206" width="196" height="84" fill="url(#pTile)"/>
  <rect x="28" y="250" width="196" height="40" fill="#6b5a3a" opacity=".22" filter="url(#soft1)"/>
  ${moldPatch(70, 284, 34, 12, 51, '#1d261f')}
  <path d="M150 288v-34a10 10 0 0 1 20 0v8" stroke="#b9bcbc" stroke-width="5" fill="none"/>
  <rect x="140" y="280" width="20" height="8" rx="2" fill="#9ea2a2"/>
  <ellipse cx="170" cy="273" rx="1.8" ry="2.6" fill="#9fc0c8" opacity=".7"/>
  <rect x="22" y="288" width="208" height="14" fill="#a9aca9"/>
  <rect x="22" y="288" width="208" height="2" fill="#d8dad8"/>
  <rect x="30" y="302" width="190" height="170" fill="url(#wood)"/>
  <path d="M125 306V470" stroke="#3b3126" stroke-width="1.6"/>
  <path d="M124 420l2 50" stroke="#050403" stroke-width="3"/>
  <circle cx="116" cy="330" r="2.6" fill="#c9b98f"/><circle cx="134" cy="330" r="2.6" fill="#c9b98f"/>
  <rect x="30" y="432" width="190" height="40" fill="url(#rot)" opacity=".7" filter="url(#rough)"/>
  <rect x="30" y="468" width="190" height="8" fill="#0d0b09"/>`;
}

function fridge() {
  return `
  <rect x="254" y="144" width="116" height="336" rx="8" fill="#000" opacity=".35" transform="translate(4 2)" filter="url(#soft)"/>
  <rect x="252" y="140" width="116" height="336" rx="8" fill="url(#enamel)"/>
  <path d="M252 232H368" stroke="#7d7a70" stroke-width="1.6"/>
  <rect x="258" y="162" width="5" height="50" rx="2" fill="#8d8a80"/>
  <rect x="258" y="250" width="5" height="70" rx="2" fill="#8d8a80"/>
  <g transform="rotate(4 334 284)">
    <rect x="316" y="260" width="34" height="46" fill="#e9e5d8"/>
    <path d="M321 272h22M321 278h18M321 284h22M321 290h12" stroke="#8a857a" stroke-width=".8"/>
    <circle cx="333" cy="262" r="3.6" fill="#8e3b33"/>
  </g>
  <rect x="252" y="430" width="116" height="46" rx="6" fill="url(#rust)" opacity=".7" transform="rotate(180 310 453)" filter="url(#rough)"/>
  <rect x="262" y="470" width="96" height="6" fill="#151311"/>`;
}

function calendar() {
  // 10월 달력. 13일에 검붉은 동그라미
  const cells = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) cells.push(`<rect x="${274 + c * 7.4}" y="${64 + r * 7.4}" width="6" height="6" fill="#c9c3b2"/>`);
  return `
  ${nailHole(304, 34, 8)}
  <rect x="270" y="38" width="60" height="104" fill="#000" opacity=".2" transform="translate(2 2)" filter="url(#soft1)"/>
  <rect x="270" y="38" width="60" height="100" fill="#e8e4d8"/>
  <text x="300" y="58" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="14" fill="#8e3b33">10</text>
  ${cells.join('')}
  <circle cx="${274 + 5 * 7.4 + 3}" cy="${64 + 1 * 7.4 + 3}" r="5" fill="none" stroke="#5a1e1a" stroke-width="1.4"/>`;
}

function wallD(f) {
  return `
  ${shell('2026', { cornerLeft: true, cornerRight: true })}
  ${seams([240], 91)}
  ${waterStain(120, 46, 56, 22)}
  ${ceilingLeak(96, 100, 11)}
  ${moldPatch(20, 14, 30, 16, 52)}
  ${crack(236, 210, 90, 23, 100)}
  ${calendar()}
  ${upperCabinet()}
  ${sinkUnit(f)}
  ${fridge()}
  ${mood(1)}`;
}

/* ================= 움직이는 층 ================= */

const leakA = leakPath(330, 130, 5);
const leakB = leakPath(118, 92, 3);
const leakD = leakPath(96, 100, 11);

const fxWall = {
  A: () => `
    ${drip(leakA.ex, leakA.ey + 4, 300, { dur: 5.5, color: '#8a7a55' })}
    ${fly('M64 140C94 118 116 182 82 212S40 262 72 300', 17)}`,
  B: () => `
    <g class="fx-sway" style="transform-origin:300px 236px">
  <!-- 뜯겨 말려 늘어진 실크 조각 -->
  <g>
    <path d="M300 244c4 22 12 44 30 58c12 8 26 4 26 -8c0 -14 -14 -22 -24 -34z" fill="#000" opacity=".35" filter="url(#soft)" transform="translate(-4 6)"/>
    <path d="M296 232c2 26 12 52 32 66c12 8 26 2 24 -10c-2 -14 -14 -24 -22 -40c-6 -10 -20 -16 -34 -16z" fill="url(#flapBack)"/>
    <path d="M318 290c10 8 22 10 30 4" stroke="#7d786f" stroke-width="1" fill="none"/>
    ${fibers(jag([[296, 232], [330, 248]], 1.5, 9, 4), 10)}
  </g>

    </g>
    ${breathe(208, 208, 10, 6, 5)}
    ${breathe(233, 233, 5, 3, 3.6)}
    ${creep('M378 204c-3 40 2 80 -1 120s3 90 1 142', 31)}
    ${drip(leakB.ex, leakB.ey + 4, 260, { dur: 6.5, begin: 1.2, color: '#8a7a55' })}
    ${fly('M252 384C272 352 302 362 292 332S252 300 272 280', 19, 3)}`,
  C: () => `
    ${neighborLight(226, 98, 24, 32)}
    ${fly('M332 300C352 332 322 360 346 390S372 412 352 440', 15, 5)}`,
  D: () => `
    ${drip(170, 274, 13, { dur: 2.8 })}
    ${drip(leakD.ex, leakD.ey + 4, 0.1, { dur: 7, color: '#8a7a55' })}
    ${fly('M240 120C236 160 248 200 240 246', 14, 2)}`,
};

export function draw2026(wall, state) {
  const f = state.flags;
  const art = { A: wallA, B: wallB, C: wallC, D: wallD }[wall](f);
  let fx = `${lamp({ off: f.blackout })}${f.blackout ? '' : motes(wall.charCodeAt(0))}${fxWall[wall]()}`;
  // 정전: 2단계에서 손전등 원형 마스크로 바뀐다. 현관 문틈 불빛만은 꺼지지 않는다
  if (f.blackout) fx += `<rect width="${W}" height="${H}" fill="#000" opacity=".82"/>${wall === 'A' ? doorFeet() : ''}`;
  else if (wall === 'A') fx += doorFeet();
  return { art, fx };
}
