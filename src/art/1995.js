// 1995 벽 그림. 갈색 체크 비닐벽지, 신혼부부 정호·미숙의 방. 자개장, 멈춘 벽시계, 브라운관 TV.
import { W, FLOOR_Y, shell, face, moldPatch, waterStain, seams, crack, pts, nailHole } from './common.js';
import { entry, tear, fibers } from './2026.js';
import { fly, drip } from './fx.js';
import { CRANE } from '../puzzles/crane.js';

/* ================= 벽 A · 현관 (신발장, 우산꽂이) ================= */

function door() {
  return `
  <rect x="140" y="88" width="120" height="390" fill="#2e241b"/>
  <rect x="150" y="98" width="100" height="374" fill="url(#doorBrown)"/>
  ${face([[150, 98], [150, 472]], 0.07, '#1d150e')}
  ${face([[250, 98], [250, 472]], 0.07, '#261b12')}
  ${face([[150, 98], [250, 98]], 0.07, '#140e09')}
  <rect x="160" y="110" width="80" height="350" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="2"/>
  <rect x="170" y="122" width="60" height="140" fill="#000" opacity=".12"/>
  <circle cx="234" cy="300" r="7" fill="#b8913c"/><circle cx="232" cy="298" r="2.5" fill="#f0d27a" opacity=".7"/>
  <rect x="228" y="240" width="12" height="20" rx="2" fill="#8f7230"/>
  <circle cx="200" cy="180" r="4.5" fill="#120d0a" stroke="#b8913c" stroke-width="1.4"/>
  <!-- 1995년 달력 한 장이 문에 -->
  <g transform="rotate(-2 200 340)"><rect x="180" y="316" width="40" height="52" fill="#efe9d8"/><text x="200" y="330" text-anchor="middle" font-family="IBM Plex Sans KR, sans-serif" font-size="7" fill="#8e3b33">1995 · 6</text>
  <path d="M184 336h32M184 342h32M184 348h32M184 354h32M184 360h32" stroke="#a9a08a" stroke-width=".6"/></g>
  <rect x="150" y="469" width="100" height="6" fill="#0d0b09"/>`;
}

function shoeCabinet() {
  return `
  ${face([[136, 300], [136, 474]], 0.13, '#3a2c20')}
  <rect x="18" y="292" width="118" height="10" fill="#6d5034"/>
  <rect x="22" y="302" width="110" height="170" fill="#5d4330"/>
  <path d="M77 306V468" stroke="#2b1f15" stroke-width="2"/>
  <rect x="28" y="308" width="44" height="156" fill="none" stroke="#2b1f15" stroke-opacity=".6"/>
  <rect x="82" y="308" width="44" height="156" fill="none" stroke="#2b1f15" stroke-opacity=".6"/>
  <circle cx="68" cy="384" r="3" fill="#b8913c"/><circle cx="86" cy="384" r="3" fill="#b8913c"/>
  <rect x="22" y="468" width="110" height="8" fill="#0f0d0b"/>
  <!-- 신발장 위: 흰 레이스 깔개와 조화 -->
  <path d="M24 292h104l-4 8h-96z" fill="#efe9dc"/>
  <path d="M28 300q4 4 8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0" stroke="#efe9dc" fill="none"/>
  <path d="M60 292v-30M66 292v-24M72 292v-34" stroke="#5d6b43" stroke-width="1.4"/>
  <circle cx="60" cy="260" r="6" fill="#c6646a"/><circle cx="66" cy="266" r="5" fill="#d98b8f"/><circle cx="73" cy="256" r="6" fill="#b84d55"/>
  <rect x="56" y="276" width="22" height="16" rx="3" fill="#2f5b6b"/>`;
}

function umbrellas() {
  return `<g>
    <ellipse cx="300" cy="476" rx="28" ry="5" fill="#000" opacity=".4"/>
    <path d="M286 400l-6 -60q12 -10 18 2l-4 58z" fill="#3a5a8a"/>
    <path d="M306 400l14 -70q10 -4 12 6l-16 64z" fill="#7a2e2e"/>
    <path d="M281 340q-6 -10 -2 -16M326 330q4 -10 -2 -14" stroke="#555" stroke-width="2" fill="none"/>
    <rect x="276" y="398" width="48" height="76" rx="4" fill="#8a8d90"/>
    <rect x="276" y="398" width="48" height="6" fill="#a9acaf"/>
    <path d="M286 410v58M300 410v58M314 410v58" stroke="#6e7174" stroke-width="1.4"/>
  </g>`;
}

function wallA() {
  return `
  ${shell('1995')}
  ${seams([96, 292], 261)}
  ${waterStain(318, 48, 40, 18)}
  ${moldPatch(20, 14, 30, 16, 212)}
  ${entry()}
  ${door()}
  ${shoeCabinet()}
  ${umbrellas()}`;
}

/* ================= 벽 B · 귀퉁이 (자개장, 멈춘 벽시계) ================= */

function upperHole() {
  const { l1974, bare } = tear;
  return `<g>
    <polygon points="${pts(l1974)}" fill="#a39272" transform="translate(-1.5 1.5)"/>
    <polygon points="${pts(l1974)}" fill="url(#p1974)" filter="url(#inset)"/>
    <polygon points="${pts(l1974.slice(0, 7))} 391,140" fill="url(#pNews)" opacity=".9"/>
    <polygon points="${pts(bare)}" fill="url(#pBare)" filter="url(#inset)"/>
    ${fibers(l1974, 28, '#4a3826')}
  </g>`;
}

// 벽시계: 2시 13분이 되면 시계추 칸이 열린 채로
export function wallClock(f, x = 78, y = 120) {
  const h = f.gotKey ? 2 + 13 / 60 : 7 + 40 / 60;
  const m = f.gotKey ? 13 : 40;
  const ha = (h / 12) * 360;
  const ma = (m / 60) * 360;
  return `<g>
    ${nailHole(x, y - 46, 6)}
    <rect x="${x - 22}" y="${y + 38}" width="44" height="90" rx="6" fill="#000" opacity=".3" transform="translate(3 3)"/>
    <rect x="${x - 22}" y="${y + 38}" width="44" height="90" rx="6" fill="#5a3a22"/>
    <rect x="${x - 16}" y="${y + 46}" width="32" height="72" rx="3" fill="${f.gotKey ? '#0f0a07' : '#2a1d14'}"/>
    ${f.gotKey ? '' : `<rect x="${x - 16}" y="${y + 46}" width="32" height="72" rx="3" fill="#d9c79a" opacity=".12"/>`}
    <circle cx="${x}" cy="${y}" r="40" fill="#000" opacity=".3" transform="translate(3 3)"/>
    <circle cx="${x}" cy="${y}" r="40" fill="#6b4529"/>
    <circle cx="${x}" cy="${y}" r="33" fill="url(#clockFace)"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<rect x="${x - 1}" y="${y - 31}" width="2" height="5" fill="#3a2a1a" transform="rotate(${i * 30} ${x} ${y})"/>`;
    }).join('')}
    <path d="M${x} ${y}V${y - 18}" stroke="#1a120b" stroke-width="3" stroke-linecap="round" transform="rotate(${ha} ${x} ${y})"/>
    <path d="M${x} ${y}V${y - 27}" stroke="#1a120b" stroke-width="1.8" stroke-linecap="round" transform="rotate(${ma} ${x} ${y})"/>
    <circle cx="${x}" cy="${y}" r="2.5" fill="#b8913c"/>
  </g>`;
}

// 자개장: 검은 옻칠에 자개 학. 퍼즐을 풀면 왼쪽으로 밀려나 문이 열린다
export function cabinet(f) {
  const x = f.cabinetOpen ? 146 : 208;
  const crane = `<g transform="translate(${x + 30} 210) scale(.38)" opacity=".85">${CRANE}</g>`;
  const doors = f.cabinetOpen
    ? `<rect x="${x + 8}" y="166" width="162" height="150" fill="#0a0605"/>
       <path d="M${x + 8} 240H${x + 170}" stroke="#2a1915" stroke-width="3"/>
       <polygon points="${x + 8},166 ${x - 20},160 ${x - 20},320 ${x + 8},316" fill="url(#lacquer)"/>
       <polygon points="${x + 170},166 ${x + 206},158 ${x + 206},322 ${x + 170},316" fill="url(#lacquer)"/>
       <g transform="translate(${x - 18} 206) scale(.16)" opacity=".8">${CRANE}</g>`
    : `<rect x="${x + 8}" y="166" width="162" height="150" fill="url(#lacquer)"/>
       <path d="M${x + 89} 166V316" stroke="#000" stroke-width="2"/>
       ${crane}
       <rect x="${x + 84}" y="232" width="10" height="16" rx="2" fill="#b8913c"/>
       <circle cx="${x + 89}" cy="242" r="2" fill="#1a120b"/>`;
  return `<g>
    <rect x="${x}" y="150" width="178" height="326" fill="#000" opacity=".4" transform="translate(5 3)"/>
    ${face([[x + 178, 150], [x + 178, 474]], 0.1, '#0b0706')}
    <rect x="${x}" y="150" width="178" height="326" fill="url(#lacquer)"/>
    <rect x="${x}" y="150" width="178" height="10" fill="#3a241d"/>
    ${doors}
    <rect x="${x + 8}" y="326" width="162" height="64" fill="#1a100d" stroke="#3a241d"/>
    <rect x="${x + 8}" y="398" width="162" height="64" fill="#1a100d" stroke="#3a241d"/>
    <g fill="url(#pearl)" opacity=".75">
      ${[[40, 356], [89, 352], [138, 356], [40, 428], [89, 424], [138, 428]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${dy}" r="3.4"/><circle cx="${x + dx + 6}" cy="${dy + 3}" r="2"/><circle cx="${x + dx - 5}" cy="${dy + 4}" r="2"/>`).join('')}
    </g>
    <rect x="${x + 80}" y="352" width="18" height="4" rx="2" fill="#b8913c"/><rect x="${x + 80}" y="424" width="18" height="4" rx="2" fill="#b8913c"/>
    <rect x="${x}" y="466" width="178" height="10" fill="#050303"/>
  </g>`;
}

// 자개장이 밀려난 뒤 드러난 귀퉁이: 바래지 않은 자리, 곰팡이, 들뜬 비닐
function exposed(f) {
  if (!f.cabinetOpen) return '';
  return `<g>
    <rect x="300" y="150" width="90" height="316" fill="#8a6848" opacity=".35"/>
    ${moldPatch(350, 300, 30, 18, 231, '#1d1a13')}
    ${moldPatch(372, 440, 20, 12, 232, '#1d1a13')}
    <path d="M392 380q-22 6 -30 30q-4 24 4 50h26z" fill="#3a2a1a" opacity=".35"/>
    ${f.scored ? `<g stroke="#2a1b0f" stroke-width="2" fill="none"><path d="M330 362H390M330 362V466M330 466H390M360 362V466"/></g>
       <g stroke="#c9a77a" stroke-width=".7" fill="none" opacity=".7"><path d="M330 364H390M332 362V466"/></g>` : ''}
    ${f.check95Wet ? `<ellipse cx="364" cy="414" rx="44" ry="60" fill="#5d4a36" opacity=".35" filter="url(#soft)"/>` : ''}
  </g>`;
}

function wallB(f) {
  return `
  ${shell('1995')}
  ${seams([150], 271)}
  ${waterStain(160, 64, 54, 24)}
  ${moldPatch(350, 14, 34, 18, 221)}
  ${upperHole()}
  ${exposed(f)}
  ${wallClock(f)}
  ${cabinet(f)}`;
}

/* ================= 벽 C · 창문 (결혼사진, 브라운관 TV, 빈 반지함) ================= */

function windowC() {
  return `
  <rect x="102" y="62" width="186" height="186" fill="#cfc6b2"/>
  <rect x="110" y="70" width="170" height="170" fill="url(#nightGlass)"/>
  <rect x="193" y="70" width="4" height="170" fill="#c1b8a3"/>
  ${face([[110, 70], [110, 240]], 0.14, '#9a917d')}
  ${face([[280, 70], [280, 240]], 0.14, '#aba28d')}
  ${face([[110, 70], [280, 70]], 0.14, '#7d7563')}
  <rect x="96" y="246" width="198" height="10" fill="#bdb39c"/>
  <!-- 흰 레이스 커튼 -->
  <path d="M104 64h70q-4 90 4 180h-74z" fill="#efe9dc" opacity=".55"/>
  <path d="M110 70q10 80 0 170M128 70q10 80 0 170M146 70q10 80 0 170M164 70q8 80 0 170" stroke="#fff" stroke-opacity=".4" fill="none"/>`;
}

// 결혼사진: 액자는 그대로인데, 사람이 있어야 할 자리만 하얗게 바랬다
function weddingPhoto() {
  return `<g>
    ${nailHole(310, 254, 6)}
    <rect x="272" y="262" width="78" height="96" fill="#000" opacity=".35" transform="translate(3 3)"/>
    <rect x="272" y="262" width="78" height="96" fill="#b8913c"/>
    <rect x="278" y="268" width="66" height="84" fill="#7c8a96"/>
    <rect x="278" y="320" width="66" height="32" fill="#a5967a"/>
    <path d="M296 352q2 -40 12 -52q8 8 10 52zM318 352q2 -36 10 -48q10 6 10 48z" fill="#f2efe8"/>
    <ellipse cx="303" cy="294" rx="7" ry="8" fill="#f2efe8"/><ellipse cx="327" cy="298" rx="7" ry="8" fill="#f2efe8"/>
    <rect x="278" y="268" width="66" height="84" fill="#fff" opacity=".12"/>
    <text x="311" y="364" text-anchor="middle" font-family="Gowun Batang, serif" font-size="5" fill="#3a2a1a">1995. 6. 3.</text>
  </g>`;
}

function tvSet(f) {
  const ringbox = `<g>
    <ellipse cx="218" cy="398" rx="16" ry="3" fill="#000" opacity=".4"/>
    <rect x="204" y="384" width="28" height="14" rx="3" fill="#6d1f2a"/>
    <path d="M204 384l2 -14h24l2 14z" fill="#8a2a36"/>
    <rect x="208" y="386" width="20" height="6" fill="#3a0f16"/>
    ${f.placed_ring ? '<circle cx="218" cy="388" r="3" fill="none" stroke="#d4d7dc" stroke-width="1.4"/>' : '<path d="M214 389h8" stroke="#1d070b" stroke-width="2"/>'}
  </g>`;
  return `<g>
    <ellipse cx="160" cy="478" rx="140" ry="7" fill="#000" opacity=".45"/>
    ${face([[260, 400], [260, 474]], 0.1, '#2a1d13')}
    <rect x="30" y="400" width="230" height="74" fill="#5a3f28"/>
    <rect x="30" y="400" width="230" height="5" fill="#7a5a3c"/>
    <rect x="38" y="414" width="104" height="52" fill="none" stroke="#2e2015"/>
    <rect x="150" y="414" width="102" height="52" fill="none" stroke="#2e2015"/>
    <circle cx="136" cy="440" r="2.4" fill="#b8913c"/><circle cx="156" cy="440" r="2.4" fill="#b8913c"/>
    <!-- 브라운관 TV -->
    ${face([[176, 296], [176, 398]], 0.12, '#1f1f1f')}
    <rect x="52" y="292" width="124" height="108" rx="8" fill="#2c2c2c"/>
    <rect x="62" y="302" width="88" height="70" rx="10" fill="url(#crt)"/>
    <rect x="156" y="306" width="14" height="40" fill="#1f1f1f"/>
    <circle cx="163" cy="356" r="3.4" fill="#444"/><circle cx="163" cy="368" r="3.4" fill="#444"/>
    <rect x="62" y="380" width="104" height="12" fill="#1f1f1f"/>
    <path d="M100 292l-16 -36M120 292l22 -40" stroke="#888" stroke-width="1.4"/>
    ${ringbox}
  </g>`;
}

function wallC(f) {
  return `
  ${shell('1995')}
  ${seams([70, 318], 281)}
  ${moldPatch(372, 14, 26, 14, 241)}
  ${crack(60, 300, 60, 31, 80)}
  ${windowC()}
  ${weddingPhoto()}
  ${tvSet(f)}`;
}

/* ================= 벽 D · 부엌 (곤로, 찬장) ================= */

function cupboard() {
  const bowl = (x, y, c) => `<path d="M${x} ${y}q10 10 20 0z" fill="${c}"/>`;
  return `<g>
    <rect x="30" y="110" width="180" height="186" fill="#000" opacity=".35" transform="translate(4 3)"/>
    ${face([[210, 110], [210, 296]], 0.12, '#2f2318')}
    <rect x="30" y="110" width="180" height="186" fill="#6a4c32"/>
    <rect x="40" y="120" width="76" height="120" fill="#2a3a3a" opacity=".55"/>
    <rect x="124" y="120" width="76" height="120" fill="#2a3a3a" opacity=".55"/>
    <path d="M40 180H116M124 180H200" stroke="#6a4c32" stroke-width="3"/>
    ${bowl(48, 166, '#e8e2d2')}${bowl(72, 166, '#e8e2d2')}${bowl(132, 166, '#c9d6d2')}${bowl(156, 166, '#c9d6d2')}
    <rect x="52" y="210" width="10" height="20" fill="#b8913c" opacity=".7"/><rect x="66" y="214" width="10" height="16" fill="#8a4a3a" opacity=".7"/>
    <path d="M46 126l20 60M136 126l26 70" stroke="#fff" stroke-opacity=".12" stroke-width="5"/>
    <rect x="40" y="248" width="160" height="40" fill="#5a3f28" stroke="#2e2015"/>
    <path d="M120 248V288" stroke="#2e2015"/>
    <rect x="112" y="264" width="4" height="10" fill="#b8913c"/><rect x="124" y="264" width="4" height="10" fill="#b8913c"/>
  </g>`;
}

function stove() {
  return `<g>
    <ellipse cx="290" cy="478" rx="56" ry="7" fill="#000" opacity=".45"/>
    <rect x="248" y="410" width="84" height="66" rx="8" fill="#3d5a4e"/>
    <rect x="248" y="410" width="84" height="8" rx="4" fill="#577a6b"/>
    <rect x="258" y="440" width="22" height="16" fill="#1a2a24"/><circle cx="306" cy="448" r="7" fill="#c9c6bc"/>
    <path d="M256 410l8 -14h52l8 14z" fill="#2a2a2a"/>
    <!-- 곤로 위 양은 주전자 -->
    <path d="M266 396q2 -28 24 -28t24 28z" fill="#c4b98f"/>
    <path d="M312 382q16 -4 14 -18" stroke="#c4b98f" stroke-width="5" fill="none"/>
    <path d="M276 368q14 -18 28 0" stroke="#7a6c48" stroke-width="2.4" fill="none"/>
  </g>`;
}

function wallD() {
  return `
  ${shell('1995')}
  ${seams([240], 291)}
  ${waterStain(300, 60, 40, 20)}
  ${moldPatch(20, 14, 26, 14, 251)}
  ${cupboard()}
  <rect x="22" y="300" width="208" height="12" fill="#a59a84"/>
  <rect x="30" y="312" width="190" height="160" fill="#6a4c32"/>
  <path d="M125 316V468" stroke="#2e2015" stroke-width="1.6"/>
  <rect x="30" y="466" width="190" height="10" fill="#0d0b09"/>
  ${stove()}`;
}

/* ================= 움직이는 층 ================= */

const fxWall = {
  A: () => `${fly('M340 140C356 180 330 220 352 256', 18, 1)}`,
  B: (f) => `
    ${f.gotKey ? `<g style="transform-origin:78px 166px" class="fx-pendulum"><path d="M78 166V222" stroke="#b8913c" stroke-width="1.6"/><circle cx="78" cy="226" r="7" fill="#b8913c"/></g>` : ''}
    ${f.peel_1995 ? `<g class="fx-tremble" style="transform-origin:378px 400px">
      <path d="M390 384l-26 12l24 14z" fill="#000" opacity=".3" transform="translate(2 4)"/>
      <path d="M390 384q-18 2 -26 14q12 2 24 12z" fill="url(#flapBack95)"/>
    </g>` : ''}`,
  C: () => `
    <rect x="62" y="302" width="88" height="70" rx="10" fill="url(#pNoise)" opacity=".55">
      <animate attributeName="opacity" values=".55;.35;.6;.4;.55" dur=".35s" repeatCount="indefinite"/>
      <animate attributeName="y" values="302;300;303;301;302" dur=".2s" repeatCount="indefinite"/>
    </rect>
    <rect x="62" y="330" width="88" height="3" fill="#fff" opacity=".25"><animate attributeName="y" values="302;370" dur="2.2s" repeatCount="indefinite"/></rect>
    ${fly('M340 120C360 150 340 190 356 220', 15, 3)}`,
  D: () => `${drip(80, 314, 0.1, { dur: 8, color: '#8a7a55' })}`,
};

export function draw1995(wall, state) {
  const f = { ...state.flags, placed_ring: !!state.placed.ring };
  return {
    art: { A: wallA, B: wallB, C: wallC, D: wallD }[wall](f),
    fx: fxWall[wall](f),
  };
}

// 뜯기: 비닐은 칼집을 따라 네모로, 바삭하게. 드러나는 1974 종이 꽃벽지
export const peelArt1995 = {
  r0: 42,
  rf: 590,
  center: [392, 414],
  hs: 'check',
  speed: 1.2,
  curl: 'url(#flapBack95)',
  sound: 'tearVinyl',
  under: () => {
    const { bare } = tear;
    return `
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#p1974)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#bulb)"/>
    <rect y="${FLOOR_Y - 170}" width="${W}" height="170" fill="url(#scuff)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="#2a1c10" opacity=".14"/>
    <rect width="${W}" height="60" fill="url(#ceilShade)"/>
    <rect x="${W - 46}" width="46" height="${FLOOR_Y}" fill="url(#cornerR)" opacity=".75"/>
    <rect width="46" height="${FLOOR_Y}" fill="url(#cornerL)" opacity=".75"/>
    <polygon points="${pts(bare)}" fill="url(#pBare)"/>`;
  },
  front: () => `${wallClock({ gotKey: true })}${cabinet({ cabinetOpen: true })}`,
};
