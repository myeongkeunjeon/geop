// 2014 벽 그림. 탁한 하늘색 꽃무늬 합지, 취준생 수진의 방. 형광등 대신 책상 스탠드.
import {
  W, H, FLOOR_Y, shell, face, moldPatch, waterStain, seams, nailHole, crack, scribble, pts, leakPath, ceilingLeak,
} from './common.js';
import { entry, tear, fibers } from './2026.js';
import { fly, drip, breathe } from './fx.js';

const PAPER = '#d9d4c8';

/* ================= 벽 A · 현관 ================= */

function door(f) {
  return `
  <rect x="140" y="88" width="120" height="390" fill="#3b2e24"/>
  <rect x="150" y="98" width="100" height="374" fill="url(#doorBrown)"/>
  ${face([[150, 98], [150, 472]], 0.07, '#22180f')}
  ${face([[250, 98], [250, 472]], 0.07, '#2c2015')}
  ${face([[150, 98], [250, 98]], 0.07, '#1a120c')}
  <rect x="162" y="114" width="76" height="140" fill="none" stroke="#000" stroke-opacity=".25"/>
  <rect x="162" y="288" width="76" height="168" fill="none" stroke="#000" stroke-opacity=".25"/>
  <circle cx="200" cy="186" r="5" fill="#120d0a" stroke="#a89a82" stroke-width="1.5"/>
  <!-- 오래된 번호키 -->
  <rect x="224" y="262" width="20" height="44" rx="2" fill="#cfc8b6"/>
  <g fill="#8a826f">${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${227.5 + c * 5}" y="${267 + r * 8}" width="3.4" height="4" rx=".6"/>`).join('')).join('')}</g>
  <rect x="214" y="320" width="34" height="6" rx="3" fill="#b5ad9c"/>
  <!-- 문에 붙은 전단 자석 -->
  <g transform="rotate(-6 181 172)">
    <rect x="166" y="150" width="30" height="42" fill="#e9c33c"/>
    <text x="181" y="168" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-weight="500" font-size="9" fill="#a5281d">치킨</text>
    <path d="M170 176h22M170 181h18M170 186h20" stroke="#8a6a20" stroke-width=".8"/>
  </g>
  <g transform="rotate(5 217 190)">
    <rect x="204" y="172" width="26" height="36" fill="#d9483e"/>
    <text x="217" y="188" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-weight="500" font-size="8" fill="#fff4e0">피자</text>
    <path d="M208 196h18M208 201h14" stroke="#fbd" stroke-width=".7"/>
  </g>
  <rect x="150" y="469" width="100" height="6" fill="#0d0b09"/>
  <rect x="152" y="471" width="96" height="2" fill="#e8c97a" opacity=".55"/>`;
}

function sneakers() {
  const shoe = (x, y, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
    <path d="M-16 0c0 -6 4 -11 12 -12c6 0 10 4 14 6l6 2c2 1 2 4 0 4h-32z" fill="#e8e6df"/>
    <path d="M-16 0h32" stroke="#9b978c" stroke-width="2.4"/>
    <path d="M-6 -9l8 4M-3 -10l8 4M0 -11l8 4" stroke="#8d8a82" stroke-width=".8"/>
    <path d="M-16 -2c4 -2 8 -2 12 0" stroke="#c9c4b7" stroke-width="1" fill="none"/>
  </g>`;
  return `<g>
    <ellipse cx="204" cy="524" rx="34" ry="5" fill="#000" opacity=".35"/>
    ${shoe(188, 522, false)}
    <g transform="rotate(-14 222 518)">${shoe(222, 520, true)}</g>
  </g>`;
}

function flyers() {
  const c = ['#e9c33c', '#d9483e', '#f0ede4', '#5d8fc7'];
  return `<g>
    ${[[112, 512, -18], [132, 520, 9], [148, 506, -4], [122, 528, 24]].map(([x, y, r], i) => `<g transform="rotate(${r} ${x} ${y})">
      <rect x="${x - 14}" y="${y - 8}" width="28" height="16" fill="${c[i]}"/>
      <path d="M${x - 10} ${y - 3}h18M${x - 10} ${y + 2}h12" stroke="#000" stroke-opacity=".3" stroke-width=".8"/>
    </g>`).join('')}
  </g>`;
}

function backpack() {
  return `<g>
    ${nailHole(66, 186, 10)}
    <path d="M62 186q4 -4 8 0l-2 10" stroke="#555" stroke-width="2" fill="none"/>
    <path d="M44 202q22 -12 44 0l6 74q-28 10 -56 0z" fill="#33393f"/>
    <rect x="50" y="236" width="40" height="28" rx="4" fill="#2a2f34"/>
    <path d="M52 236h36" stroke="#5b6168" stroke-width="1.2"/>
    <rect x="66" y="230" width="6" height="12" fill="#c0392b"/>
    <text x="69" y="238" text-anchor="middle" font-family="Gowun Batang, serif" font-size="4" fill="#f4d97a">合</text>
    <path d="M44 270q28 8 56 0" stroke="#000" stroke-opacity=".3" stroke-width="2" fill="none"/>
  </g>`;
}

function wallA(f) {
  return `
  ${shell('2014')}
  ${seams([96, 292], 161)}
  ${waterStain(318, 52, 40, 18)}
  ${moldPatch(372, 16, 26, 14, 112)}
  ${crack(268, 110, 50, 17, 70)}
  ${entry()}
  ${door(f)}
  ${backpack()}
  ${sneakers()}
  ${flyers()}`;
}

/* ================= 벽 B · 귀퉁이 (책상) ================= */

function hole() {
  const { l1995, l1974, bare } = tear;
  return `<g>
    <polygon points="${pts(l1995)}" fill="${PAPER}" transform="translate(-1.5 1.5)"/>
    <polygon points="${pts(l1995)}" fill="url(#p1995)" filter="url(#inset)"/>
    <polygon points="${pts(l1974)}" fill="url(#p1974)" filter="url(#inset)"/>
    <polygon points="${pts(l1974.slice(0, 7))} 391,140" fill="url(#pNews)" opacity=".9"/>
    <polygon points="${pts(bare)}" fill="url(#pBare)" filter="url(#inset)"/>
    ${fibers(l1995, 18, PAPER)}
    <path d="M380 150q-10 18 -4 40q6 20 15 26V140z" fill="#3f2219" opacity=".55" filter="url(#soft1)"/>
    <path d="M378 204c-3 40 2 80 -1 120" stroke="url(#drip)" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/>
  </g>`;
}

function radio() {
  return `<g>
    <ellipse cx="111" cy="331" rx="50" ry="4" fill="#000" opacity=".4"/>
    <path d="M150 288L188 232" stroke="#b9bcbf" stroke-width="1.6"/>
    <circle cx="188" cy="232" r="1.6" fill="#ddd"/>
    <path d="M80 286q30 -16 60 0" stroke="#1d1d1f" stroke-width="3" fill="none"/>
    ${face([[156, 288], [156, 330]], 0.1, '#161617')}
    <rect x="64" y="286" width="92" height="44" rx="6" fill="#2c2c2e"/>
    <rect x="64" y="286" width="92" height="3" rx="1.5" fill="#4a4a4d"/>
    <circle cx="88" cy="309" r="15" fill="url(#grille)"/>
    <circle cx="88" cy="309" r="15" fill="none" stroke="#5a5a5d" stroke-width="1.4"/>
    <rect x="110" y="296" width="38" height="13" rx="1.5" fill="#cbb978"/>
    <path d="M113 302v4M118 303v3M123 302v4M128 303v3M133 302v4M138 303v3M143 302v4" stroke="#5e5130" stroke-width=".6"/>
    <rect x="124" y="297" width="1.4" height="11" fill="#b02a1e"/>
    <circle cx="118" cy="320" r="4.5" fill="#444" stroke="#666"/><circle cx="140" cy="320" r="4.5" fill="#444" stroke="#666"/>
  </g>`;
}

function books() {
  return `<g>
    <ellipse cx="208" cy="331" rx="34" ry="3" fill="#000" opacity=".35"/>
    <rect x="178" y="318" width="60" height="12" fill="#2c3e5c"/><text x="208" y="327" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="6.5" fill="#e8e2cf">NCS 직업기초</text>
    <rect x="182" y="307" width="52" height="11" fill="#7a2e2e"/><text x="208" y="315" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="6" fill="#f2e6d0">한국사 능력</text>
    <rect x="186" y="297" width="46" height="10" fill="#3f5c3c"/><text x="209" y="304.5" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="5.5" fill="#e6efd6">TOEIC</text>
  </g>`;
}

function deskLamp() {
  return `<g>
    <polygon points="206,268 242,268 262,330 186,330" fill="url(#lampCone)"/>
    <ellipse cx="240" cy="330" rx="12" ry="3" fill="#1f1f20"/>
    <path d="M240 328L246 290L222 266" stroke="#2b2b2d" stroke-width="3" fill="none"/>
    <path d="M206 270l18 -14l10 8l-18 12z" fill="#2b2b2d"/>
    <ellipse cx="214" cy="272" rx="8" ry="2.5" fill="#fff1c8"/>
  </g>`;
}

function postits() {
  return `<g>
    <g transform="rotate(4 212 244)">
      <rect x="198" y="230" width="32" height="32" fill="#000" opacity=".25" transform="translate(1.5 2)"/>
      <rect x="198" y="230" width="32" height="32" fill="#f0d75a"/>
      <path d="M198 230h32v6h-32z" fill="#e5c84a"/>
      <text x="214" y="253" text-anchor="middle" font-family="Gowun Batang, serif" font-weight="700" font-size="11" fill="#3a2a1a">D-37</text>
    </g>
    <g transform="rotate(-7 164 236)" opacity=".85">
      <rect x="152" y="226" width="24" height="22" fill="#9fd0c4"/>
      <text x="164" y="240" text-anchor="middle" font-family="Gowun Batang, serif" font-size="7" fill="#2a3a36">면접</text>
    </g>
    <g transform="rotate(9 252 222)" opacity=".7">
      <rect x="242" y="212" width="22" height="20" fill="#f3a8b4"/>
      <text x="253" y="225" text-anchor="middle" font-family="Gowun Batang, serif" font-size="6" fill="#4a2a30">5.19</text>
    </g>
  </g>`;
}

function desk(f) {
  const notice = f.placed_notice
    ? `<g transform="rotate(-5 132 322)"><rect x="118" y="314" width="30" height="14" fill="#e3ddd0"/><path d="M118 314l15 8l15 -8" stroke="#a69d8b" fill="none"/><circle cx="142" cy="324" r="2" fill="#8e3b33"/></g>`
    : '';
  return `<g>
    <rect x="54" y="342" width="114" height="134" fill="#000" opacity=".3"/>
    ${face([[38, 330], [254, 330]], 0.1, '#a68a64')}
    <rect x="38" y="330" width="216" height="12" fill="#7d6446"/>
    <rect x="38" y="330" width="216" height="2" fill="#a68a64"/>
    ${face([[54, 342], [54, 474]], 0.06, '#3e3022')}
    <rect x="44" y="342" width="10" height="132" fill="#5e4a33"/>
    ${face([[252, 342], [252, 474]], 0.1, '#4e3f2e')}
    <rect x="168" y="342" width="84" height="132" fill="url(#wood)"/>
    <path d="M168 386H252M168 430H252" stroke="#3b3126" stroke-width="1.4"/>
    <rect x="200" y="404" width="18" height="4" rx="2" fill="#c9b98f"/>
    <rect x="200" y="448" width="18" height="4" rx="2" fill="#c9b98f"/>
    <!-- 서랍 4자리 자물쇠 -->
    <rect x="190" y="352" width="40" height="22" rx="2" fill="#2b2a28"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${194 + i * 9}" y="356" width="7" height="14" fill="${f.drawerOpen ? '#6a6458' : '#cfc8b4'}"/>`).join('')}
    ${f.drawerOpen ? '<rect x="168" y="342" width="84" height="8" fill="#0d0b09"/>' : ''}
    ${notice}
  </g>`;
}

function wallB(f) {
  return `
  ${shell('2014')}
  ${seams([150], 171)}
  ${waterStain(120, 70, 50, 24)}
  ${ceilingLeak(118, 60, 3)}
  ${moldPatch(350, 14, 34, 18, 121)}
  ${moldPatch(60, FLOOR_Y - 20, 40, 14, 122)}
  ${hole()}
  ${postits()}
  ${desk(f)}
  ${deskLamp()}
  ${radio()}
  ${books()}
  ${f.w14Wet ? `<ellipse cx="330" cy="166" rx="80" ry="122" fill="#3c5560" opacity=".3" filter="url(#soft)"/>` : ''}`;
}

/* ================= 벽 C · 창문 (접이식 침대) ================= */

function windowC() {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `M${118 + i * 19} 70V240`).join('');
  const lights = [[132, 110], [150, 150], [236, 96], [258, 180], [212, 206], [170, 120]]
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="5" height="4" fill="#e8c77a" opacity=".6"/>`).join('');
  return `
  <rect x="102" y="62" width="186" height="186" fill="#dcdcd6"/>
  <rect x="110" y="70" width="170" height="170" fill="url(#nightGlass)"/>
  ${lights}
  <path d="${bars}M110 124H280M110 196H280" stroke="#070909" stroke-width="2.4"/>
  <rect x="193" y="70" width="4" height="170" fill="#cfcfc9"/>
  ${face([[110, 70], [110, 240]], 0.14, '#a9a9a2')}
  ${face([[280, 70], [280, 240]], 0.14, '#bebeb7')}
  ${face([[110, 70], [280, 70]], 0.14, '#8c8c85')}
  <rect x="96" y="246" width="198" height="10" fill="#cfcac0"/>
  <path d="M86 54H304" stroke="#8a8780" stroke-width="3"/>
  <!-- 바랜 분홍 꽃무늬 커튼 -->
  <path d="M86 56h34q4 100 -4 214h-34q8 -110 4 -214z" fill="url(#curtain)"/>
  <path d="M270 56h34q-4 104 4 214h-34q-8 -110 -4 -214z" fill="url(#curtain)"/>
  <g fill="#f3e3e4" opacity=".55">${[[96, 90], [108, 140], [94, 200], [100, 250], [284, 100], [296, 160], [282, 220]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>`;
}

function bed() {
  return `<g>
    <ellipse cx="184" cy="532" rx="164" ry="8" fill="#000" opacity=".45"/>
    <path d="M40 528l40 -46M80 528l-40 -46M300 528l40 -46M340 528l-40 -46" stroke="#6d7073" stroke-width="3"/>
    <polygon points="36,470 334,470 350,486 20,486" fill="#8a8d90"/>
    <path d="M42 466q2 -10 14 -10h254q12 0 16 10l10 20H34z" fill="#bcb6c6"/>
    <path d="M150 458q60 -6 120 0q26 6 36 28H140q-4 -18 10 -28z" fill="#c98f9a"/>
    <path d="M168 462q40 6 80 2M190 474q40 4 90 0" stroke="#a46d78" stroke-width="1.2" fill="none"/>
    <g fill="#f0d6da" opacity=".7">${[[176, 470], [214, 466], [252, 474], [286, 470]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join('')}</g>
    <path d="M56 458q4 -14 22 -14h40q14 0 14 14v8H54z" fill="#e8e4dc"/>
    <rect x="20" y="486" width="330" height="5" fill="#5d6064"/>
  </g>`;
}

function wallC(f) {
  return `
  ${shell('2014')}
  ${seams([70, 318], 181)}
  ${moldPatch(372, 14, 26, 14, 131)}
  ${waterStain(56, 330, 26, 34)}
  ${scribble('5.19', 322, 420, { size: 10, rot: -4, opacity: 0.35 })}
  ${windowC()}
  ${bed()}`;
}

/* ================= 벽 D · 부엌 (전기포트, 컵라면) ================= */

function kitchen() {
  return `
  ${face([[28, 206], [226, 210]], 0.12, '#8d8a80')}
  <rect x="28" y="108" width="196" height="98" fill="url(#whiteGloss)"/>
  <path d="M126 110V204" stroke="#8d8a80" stroke-width="1.4"/>
  <rect x="116" y="186" width="2" height="12" fill="#8d8a80"/><rect x="134" y="186" width="2" height="12" fill="#8d8a80"/>
  <rect x="28" y="206" width="196" height="84" fill="url(#pTile)"/>
  <path d="M150 288v-34a10 10 0 0 1 20 0v8" stroke="#c9cccc" stroke-width="5" fill="none"/>
  ${face([[230, 288], [230, 302]], 0.13, '#7d807d')}
  <rect x="22" y="288" width="208" height="14" fill="#b5b8b5"/>
  <rect x="22" y="288" width="208" height="2" fill="#e2e4e2"/>
  ${face([[220, 302], [220, 472]], 0.12, '#8a877d')}
  <rect x="30" y="302" width="190" height="170" fill="url(#whiteGloss)"/>
  <path d="M125 306V470" stroke="#8d8a80" stroke-width="1.6"/>
  <rect x="113" y="322" width="2" height="16" fill="#8d8a80"/><rect x="135" y="322" width="2" height="16" fill="#8d8a80"/>
  <rect x="30" y="466" width="190" height="10" fill="#1b1a17"/>`;
}

function kettle() {
  return `<g>
    <ellipse cx="74" cy="288" rx="24" ry="3" fill="#000" opacity=".35"/>
    <rect x="54" y="282" width="40" height="6" rx="2" fill="#3a3a3c"/>
    <path d="M58 282l4 -34h24l4 34z" fill="#e9e7e0"/>
    <path d="M86 254q14 2 10 22" stroke="#d8d6cf" stroke-width="4" fill="none"/>
    <path d="M58 256l-8 -6" stroke="#e9e7e0" stroke-width="4"/>
    <rect x="60" y="244" width="28" height="5" rx="2" fill="#d4d2cb"/>
    <circle cx="66" cy="278" r="1.6" fill="#4aa3e0"/>
  </g>`;
}

function noodles() {
  const cup = (x, y) => `<g><path d="M${x} ${y}l3 22h18l3 -22z" fill="#f4f1ea"/><rect x="${x}" y="${y + 6}" width="24" height="8" fill="#c8281e"/><text x="${x + 12}" y="${y + 12.5}" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="5" fill="#fff">컵라면</text><ellipse cx="${x + 12}" cy="${y}" rx="12" ry="2.4" fill="#e0dcd2"/></g>`;
  return `<g>
    <ellipse cx="136" cy="289" rx="34" ry="3" fill="#000" opacity=".35"/>
    ${cup(106, 266)}${cup(106, 244)}${cup(134, 266)}
    <g transform="rotate(8 170 276)"><path d="M160 266l3 22h18l3 -22z" fill="#f4f1ea"/><ellipse cx="172" cy="266" rx="12" ry="2.4" fill="#5a3d26"/><path d="M168 262l14 -20M172 262l12 -19" stroke="#c9a46a" stroke-width="1.4"/></g>
  </g>`;
}

function miniFridge() {
  return `<g>
    <rect x="256" y="304" width="96" height="172" rx="6" fill="#000" opacity=".35" transform="translate(4 2)"/>
    ${face([[256, 308], [256, 472]], 0.14, '#9a978d')}
    <rect x="254" y="302" width="96" height="172" rx="6" fill="url(#whiteGloss)"/>
    <rect x="262" y="318" width="5" height="40" rx="2" fill="#9a978d"/>
    <g transform="rotate(-4 312 350)"><rect x="296" y="330" width="34" height="44" fill="#f2e9a6"/><path d="M300 340h26M300 346h22M300 352h24M300 358h18" stroke="#8a7a40" stroke-width=".7"/><circle cx="313" cy="332" r="3" fill="#2e6fb5"/></g>
  </g>`;
}

function wallD(f) {
  return `
  ${shell('2014')}
  ${seams([240], 191)}
  ${waterStain(140, 44, 46, 18)}
  ${moldPatch(20, 14, 26, 14, 141)}
  ${kitchen()}
  ${kettle()}
  ${noodles()}
  ${miniFridge()}`;
}

/* ================= 움직이는 층 ================= */

const fxWall = {
  A: () => `${fly('M300 150C320 180 300 220 320 260S340 300 316 330', 18, 2)}`,
  B: (f) => `
    <circle cx="146" cy="292" r="1.6" fill="#ff5a3c"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
    ${breathe(214, 248, 18, 18, 6)}
    ${f.peel_2014 ? `<g class="fx-tremble" style="transform-origin:316px 210px">
      <path d="M318 196l-22 16l20 10z" fill="#000" opacity=".3" transform="translate(2 4)"/>
      <path d="M318 196q-16 6 -22 18q10 0 20 8z" fill="url(#flapBack14)"/>
    </g>` : ''}`,
  C: () => `${fly('M330 300C350 330 324 362 346 392', 16, 4)}`,
  D: () => `${drip(170, 274, 13, { dur: 3.4 })}`,
};

export function draw2014(wall, state) {
  const f = { ...state.flags, placed_notice: !!state.placed.notice };
  return {
    art: { A: wallA, B: wallB, C: wallC, D: wallD }[wall](f),
    fx: fxWall[wall](f),
  };
}

// 뜯기: 젖은 합지는 느리게, 축축하게. 드러나는 1995 체크 비닐
export const peelArt2014 = {
  r0: 96,
  speed: 0.85,
  curl: 'url(#flapBack14)',
  sound: 'tearWet',
  under: () => {
    const { l1974, bare } = tear;
    return `
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#p1995)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#bulb)"/>
    <rect y="${FLOOR_Y - 170}" width="${W}" height="170" fill="url(#scuff)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="#1c2a28" opacity=".15"/>
    <rect width="${W}" height="60" fill="url(#ceilShade)"/>
    <rect x="${W - 46}" width="46" height="${FLOOR_Y}" fill="url(#cornerR)" opacity=".75"/>
    <rect width="46" height="${FLOOR_Y}" fill="url(#cornerL)" opacity=".75"/>
    <polygon points="${pts(l1974)}" fill="url(#p1974)"/>
    <polygon points="${pts(bare)}" fill="url(#pBare)"/>`;
  },
  front: () => `${desk({})}${deskLamp()}${radio()}${books()}`,
};
