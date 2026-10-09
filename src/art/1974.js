// 1974 벽 그림. 누런 종이 꽃벽지 아래 신문지 초배. 재봉사 순례와 딸 은하의 셋방.
import { W, FLOOR_Y, shell, face, moldPatch, waterStain, seams, crack, pts, nailHole, scribble } from './common.js';
import { tear, fibers } from './2026.js';
import { fly } from './fx.js';

/* ================= 벽 A · 현관 (연탄 쌓인 부뚜막) ================= */

function door() {
  return `
  <rect x="146" y="92" width="108" height="386" fill="#3a2a1a"/>
  <rect x="154" y="100" width="92" height="372" fill="#6a4a2e"/>
  ${face([[154, 100], [154, 472]], 0.07, '#24180e')}
  ${face([[246, 100], [246, 472]], 0.07, '#2c1f13')}
  <!-- 창호지 바른 문살 -->
  <rect x="164" y="112" width="72" height="150" fill="url(#pHanji)"/>
  <path d="M164 150H236M164 188H236M164 226H236M188 112V262M212 112V262" stroke="#5a3e24" stroke-width="3"/>
  <path d="M176 200l8 12l-6 4z" fill="#3a2a1a" opacity=".6"/>
  <rect x="164" y="280" width="72" height="176" fill="none" stroke="#3a2a1a" stroke-width="2"/>
  <path d="M232 300h10v14h-10" stroke="#8a8478" stroke-width="2.4" fill="none"/>
  <rect x="154" y="468" width="92" height="7" fill="#0d0b09"/>`;
}

// 댓돌: 문 앞 넓적한 돌과 고무신 한 켤레
function stoneStep() {
  return `<g>
    <path d="M118 488q82 -10 166 0l10 34q-94 14 -188 0z" fill="#7e7a72"/>
    <path d="M118 488q82 -10 166 0" stroke="#a29e95" stroke-width="2" fill="none"/>
    <path d="M110 522q94 14 188 0v8q-94 12 -188 0z" fill="#4e4b45"/>
    <g fill="#2b2b2d">
      <path d="M176 506c0 -6 10 -9 22 -6c4 1 4 6 0 7c-10 3 -22 3 -22 -1z"/>
      <path d="M206 508c0 -6 10 -9 22 -6c4 1 4 6 0 7c-10 3 -22 3 -22 -1z"/>
    </g>
    <path d="M140 512c0 -3 5 -5 11 -3c2 1 2 3 0 3.5c-5 1.5 -11 1.5 -11 -.5z" fill="#b4544a"/>
  </g>`;
}

// 부뚜막과 연탄
function hearth() {
  const briquette = (x, y) => `<g><rect x="${x}" y="${y}" width="30" height="20" rx="3" fill="#1c1c1e"/><ellipse cx="${x + 15}" cy="${y}" rx="15" ry="4" fill="#2a2a2c"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<circle cx="${x + 6 + (i % 3) * 9}" cy="${y - 1 + Math.floor(i / 3) * 1.2 - 1.2}" r="1.1" fill="#0b0b0c"/>`).join('')}</g>`;
  return `<g>
    ${face([[138, 380], [138, 474]], 0.12, '#5a5048')}
    <rect x="14" y="380" width="124" height="94" fill="#8a7f72"/>
    <rect x="14" y="380" width="124" height="8" fill="#a59a8b"/>
    <path d="M14 410H138M14 440H138M46 388V410M100 388V410M30 410V440M76 410V440M120 410V440M50 440V474M96 440V474" stroke="#6a6158" stroke-width="1.4"/>
    <rect x="44" y="446" width="44" height="28" rx="6" fill="#120b07"/>
    <ellipse cx="66" cy="474" rx="22" ry="4" fill="#3a1a0a" opacity=".6"/>
    <!-- 무쇠솥 -->
    <path d="M40 380q0 -30 40 -30t40 30z" fill="#1a1918"/>
    <rect x="34" y="374" width="92" height="7" rx="3" fill="#2a2826"/>
    <ellipse cx="80" cy="352" rx="10" ry="4" fill="#2a2826"/>
    <!-- 쌓아 둔 연탄 -->
    ${briquette(290, 450)}${briquette(322, 450)}${briquette(306, 428)}${briquette(338, 428)}${briquette(322, 406)}
  </g>`;
}

function wallA() {
  return `
  ${shell('1974')}
  ${seams([96, 292], 361)}
  ${waterStain(320, 52, 42, 20)}
  ${moldPatch(20, 16, 34, 18, 312)}
  ${moldPatch(372, FLOOR_Y - 22, 22, 12, 313)}
  ${crack(270, 120, 60, 37, 70)}
  ${door()}
  ${stoneStep()}
  ${hearth()}`;
}

/* ================= 벽 B · 귀퉁이 (재봉틀, 큰 꽃) ================= */

// 귀퉁이: 종이 꽃벽지가 찢겨 신문지 초배가 보이고, 그 아래 맨 벽
function cornerHole(f) {
  const { l1974, bare } = tear;
  return `<g>
    <polygon points="${pts(l1974)}" fill="url(#pNews)" filter="url(#inset)"/>
    <g opacity=".5" font-family="Gowun Batang, serif" font-size="9" fill="#3a3326">
      <text x="352" y="128" transform="rotate(90 352 128)">行方不明</text>
    </g>
    <polygon points="${pts(bare)}" fill="url(#pBare)" filter="url(#inset)"/>
    ${fibers(l1974, 38, '#bfb08a')}
    ${f.w74Wet ? `<ellipse cx="340" cy="160" rx="70" ry="104" fill="#6a5a3a" opacity=".3" filter="url(#soft)"/>` : ''}
  </g>`;
}

// 단서: 벽지에 크게 그려진 꽃 한 송이 (위에서부터 빨간 꽃잎, 노란 꽃술, 초록 줄기)
function bigFlower() {
  return `<g opacity=".92">
    <rect x="44" y="80" width="78" height="138" fill="#e3d6b2" opacity=".55"/>
    <path d="M83 156V212" stroke="#4f7a3a" stroke-width="4"/>
    <path d="M83 186q-18 -6 -24 -18q16 0 24 12M83 196q16 -8 24 -18q-16 0 -24 12" fill="#5f8a46"/>
    <g fill="#b4544a">
      <ellipse cx="83" cy="104" rx="10" ry="14"/><ellipse cx="101" cy="120" rx="14" ry="10"/><ellipse cx="65" cy="120" rx="14" ry="10"/>
      <ellipse cx="73" cy="140" rx="11" ry="12"/><ellipse cx="93" cy="140" rx="11" ry="12"/>
    </g>
    <circle cx="83" cy="124" r="9" fill="#d9b443"/>
    <circle cx="80" cy="121" r="2.5" fill="#f0d27a"/>
  </g>`;
}

// 재봉틀: 무쇠 다리 위 검은 재봉틀, 위에 실꽂이 셋, 잠긴 서랍
function sewingMachine(f) {
  const pins = [174, 192, 210];
  const colors = ['#b4544a', '#d9b443', '#5f7a4a'];
  const spools = f.spoolsDone
    ? pins.map((x, i) => `<rect x="${x - 5}" y="270" width="10" height="14" rx="2" fill="${colors[i]}"/><rect x="${x - 6}" y="268" width="12" height="3" fill="#8b6b45"/><rect x="${x - 6}" y="283" width="12" height="3" fill="#8b6b45"/>`).join('')
    : '';
  return `<g>
    <ellipse cx="150" cy="478" rx="120" ry="7" fill="#000" opacity=".45"/>
    <!-- 무쇠 다리와 발판 -->
    <path d="M50 470l20 -110h14l-12 110zM230 470l-20 -110h-14l12 110z" fill="url(#iron)"/>
    <path d="M66 420q74 -30 148 0" stroke="#2a2826" stroke-width="5" fill="none"/>
    <circle cx="140" cy="410" r="26" fill="none" stroke="#2a2826" stroke-width="5"/>
    <path d="M140 384v52M114 410h52" stroke="#2a2826" stroke-width="2.4"/>
    <rect x="80" y="452" width="120" height="12" rx="2" fill="#2a2826"/>
    <!-- 나무 상판과 서랍 -->
    ${face([[250, 336], [250, 362]], 0.1, '#3a2614')}
    ${face([[34, 336], [250, 336]], 0.1, '#8a6a46')}
    <rect x="34" y="336" width="216" height="26" fill="#6a4a2c"/>
    <rect x="186" y="340" width="56" height="18" fill="#5a3e24" stroke="#2e1f10"/>
    <circle cx="214" cy="349" r="2.6" fill="#b8913c"/>
    ${f.spoolsDone ? '<rect x="186" y="358" width="56" height="5" fill="#0d0905"/>' : '<rect x="208" y="344" width="12" height="9" rx="1" fill="#8f7230"/>'}
    <!-- 재봉틀 몸체 -->
    <path d="M70 336v-38q0 -14 14 -14h120q12 0 12 12v14h-26v26z" fill="#141414"/>
    <rect x="70" y="326" width="146" height="10" fill="#1d1d1d"/>
    <path d="M96 288h96" stroke="#c9a54a" stroke-width="1.4" opacity=".8"/>
    <text x="146" y="303" text-anchor="middle" font-family="Gowun Batang, serif" font-size="8" fill="#c9a54a" opacity=".85">刺繡</text>
    <rect x="200" y="300" width="10" height="26" fill="#1d1d1d"/><path d="M205 326v8" stroke="#bbb" stroke-width="1.2"/>
    <circle cx="80" cy="304" r="12" fill="#2a2a2a" stroke="#555" stroke-width="2"/>
    <!-- 실꽂이 셋 -->
    ${pins.map((x) => `<path d="M${x} 284v-18" stroke="#bbb" stroke-width="2"/>`).join('')}
    ${spools}
    <!-- 상판 위 연필 낙서 -->
    <text x="60" y="352" font-family="Gowun Batang, serif" font-size="8" fill="#e6d8b4" opacity=".55" transform="rotate(-3 60 352)">엄마 꽃 순서대로</text>
  </g>`;
}

function wallB(f) {
  return `
  ${shell('1974')}
  ${seams([150], 371)}
  ${waterStain(200, 64, 50, 22)}
  ${moldPatch(350, 14, 34, 18, 321)}
  ${moldPatch(60, FLOOR_Y - 20, 40, 14, 322)}
  ${cornerHole(f)}
  ${bigFlower()}
  ${sewingMachine(f)}`;
}

/* ================= 벽 C · 창문 (이불장) ================= */

function windowC() {
  return `
  <rect x="112" y="70" width="166" height="150" fill="#5a3e24"/>
  <rect x="120" y="78" width="150" height="134" fill="url(#nightGlass)"/>
  <rect x="120" y="78" width="72" height="66" fill="url(#pNews)" opacity=".85"/>
  <path d="M195 78V212M120 145H270M157 78V212M233 78V212" stroke="#5a3e24" stroke-width="4"/>
  ${face([[120, 78], [120, 212]], 0.12, '#3a2614')}
  ${face([[120, 78], [270, 78]], 0.12, '#2e1f10')}`;
}

function quiltChest() {
  const quilt = (y, h, c, c2) => `<rect x="190" y="${y}" width="150" height="${h}" rx="5" fill="${c}"/><path d="M196 ${y + h / 2}h138" stroke="${c2}" stroke-width="2" stroke-dasharray="6 5"/>`;
  return `<g>
    <ellipse cx="266" cy="478" rx="96" ry="7" fill="#000" opacity=".45"/>
    ${face([[360, 230], [360, 474]], 0.1, '#3a2614')}
    <rect x="176" y="230" width="184" height="244" fill="#6a4a2c"/>
    <rect x="176" y="230" width="184" height="8" fill="#8a6a46"/>
    ${quilt(244, 30, '#b4544a', '#e8c46a')}${quilt(276, 26, '#2f6a5a', '#e0d6b0')}${quilt(304, 28, '#d9b443', '#8a4a3a')}
    <rect x="300" y="336" width="40" height="16" rx="3" fill="#e8e0cc"/>
    <path d="M304 344h32" stroke="#b4544a" stroke-width="1.6" stroke-dasharray="2 3"/>
    <rect x="182" y="360" width="172" height="108" fill="#5a3e24" stroke="#2e1f10"/>
    <path d="M268 362V466" stroke="#2e1f10" stroke-width="2"/>
    <circle cx="258" cy="414" r="3" fill="#b8913c"/><circle cx="278" cy="414" r="3" fill="#b8913c"/>
  </g>`;
}

// 아이의 크레파스 낙서: 집, 해, 그리고 문만 있는 벽
function crayons() {
  return `<g opacity=".75" stroke-linecap="round" fill="none">
    <path d="M40 420l20 -20l20 20v30h-40z" stroke="#c0392b" stroke-width="2.4"/>
    <path d="M54 450v-14h12v14" stroke="#2e5a8a" stroke-width="2"/>
    <circle cx="112" cy="380" r="10" stroke="#e0a72a" stroke-width="2.4"/>
    <path d="M112 362v-6M126 368l5 -4M130 380h6M98 368l-5 -4" stroke="#e0a72a" stroke-width="2"/>
    <path d="M100 440h50v-30h-50z" stroke="#555" stroke-width="2.4"/>
    <path d="M118 440v-18h10v18" stroke="#555" stroke-width="2"/>
  </g>`;
}

function wallC(f) {
  return `
  ${shell('1974')}
  ${seams([70, 318], 381)}
  ${moldPatch(372, 14, 26, 14, 331)}
  ${waterStain(56, 120, 26, 34)}
  ${windowC()}
  ${crayons()}
  ${quiltChest()}`;
}

/* ================= 벽 D · 부엌 (연탄난로, 냄비) ================= */

function stove(f) {
  const lit = f.stoveLit;
  return `<g>
    <ellipse cx="200" cy="478" rx="80" ry="8" fill="#000" opacity=".5"/>
    <!-- 연통: 벽을 타고 천장으로 -->
    <path d="M200 300V150q0 -16 16 -16h60" stroke="#2a2826" stroke-width="16" fill="none"/>
    <path d="M200 300V150q0 -16 16 -16h60" stroke="#4a4744" stroke-width="2" fill="none" transform="translate(-5 0)"/>
    <rect x="270" y="122" width="14" height="24" fill="#2a2826"/>
    ${moldPatch(276, 120, 16, 8, 341, '#1a1612')}
    <!-- 난로 몸통 -->
    ${face([[244, 330], [244, 470]], 0.1, '#111')}
    <rect x="156" y="330" width="88" height="140" rx="10" fill="url(#iron)"/>
    <rect x="150" y="318" width="100" height="14" rx="4" fill="#2a2826"/>
    <rect x="176" y="400" width="48" height="30" rx="4" fill="${lit ? '#3a1408' : '#0d0c0b'}"/>
    ${lit ? `<ellipse cx="200" cy="415" rx="22" ry="12" fill="url(#ember)"/>` : ''}
    <path d="M176 400h48" stroke="#555" stroke-width="2"/>
    <rect x="162" y="466" width="76" height="8" fill="#111"/>
    <!-- 양은 냄비 -->
    <path d="M160 318v-30q0 -6 6 -6h68q6 0 6 6v30z" fill="url(#tin)"/>
    <rect x="152" y="290" width="12" height="5" rx="2" fill="#7a7466"/><rect x="236" y="290" width="12" height="5" rx="2" fill="#7a7466"/>
    <ellipse cx="200" cy="282" rx="40" ry="6" fill="${f.gotPaste ? '#6a6458' : f.floured ? '#ece6d4' : '#3a3630'}"/>
    ${f.floured && !f.gotPaste ? '<ellipse cx="200" cy="282" rx="30" ry="4" fill="#f6f1e2"/>' : ''}
  </g>`;
}

function table() {
  return `<g>
    <ellipse cx="62" cy="478" rx="50" ry="6" fill="#000" opacity=".4"/>
    <path d="M22 440h84l-6 6H28z" fill="#8a6a46"/>
    <rect x="28" y="446" width="78" height="6" fill="#6a4a2c"/>
    <path d="M34 452v24M100 452v24" stroke="#5a3e24" stroke-width="4"/>
    <path d="M44 440q8 -14 16 0zM66 440q8 -14 16 0z" fill="#e8e2d2"/>
    <path d="M86 438l14 -18M90 438l14 -17" stroke="#c9a46a" stroke-width="1.4"/>
  </g>`;
}

function wallD(f) {
  return `
  ${shell('1974')}
  ${seams([240], 391)}
  ${waterStain(100, 50, 50, 20)}
  ${moldPatch(20, 14, 26, 14, 351)}
  ${nailHole(320, 220, 30)}
  ${scribble('은하 키', 330, 330, { size: 9, opacity: 0.45 })}
  <path d="M320 336h22M320 350h22M320 366h22" stroke="#3a3326" stroke-width="1" opacity=".5"/>
  ${table()}
  ${stove(f)}`;
}

/* ================= 움직이는 층 ================= */

const fxWall = {
  A: () => `${fly('M300 140C320 180 300 220 322 260', 17, 2)}`,
  B: (f) => `${f.peel_1974 ? `<g class="fx-tremble" style="transform-origin:300px 200px">
      <path d="M302 186l-24 14l22 10z" fill="#000" opacity=".3" transform="translate(2 4)"/>
      <path d="M302 186q-16 4 -24 16q12 0 22 8z" fill="url(#flapBack74)"/>
    </g>` : ''}`,
  C: () => `${fly('M60 300C80 330 60 360 84 392', 16, 4)}`,
  D: (f) => (f.stoveLit
    ? `<ellipse cx="200" cy="415" rx="22" ry="12" fill="url(#ember)"><animate attributeName="opacity" values="1;.6;.9;.7;1" dur="1.3s" repeatCount="indefinite"/></ellipse>
       <g fill="#cfc8bb" opacity=".25">${[0, 1, 2].map((i) => `<circle cx="200" cy="270" r="8"><animate attributeName="cy" values="270;200" dur="3s" begin="${i}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0" dur="3s" begin="${i}s" repeatCount="indefinite"/><animate attributeName="r" values="6;16" dur="3s" begin="${i}s" repeatCount="indefinite"/></circle>`).join('')}</g>`
    : ''),
};

// 연탄불이 붙으면 방 전체가 주황빛으로 물든다
function glow(f) {
  if (!f.stoveLit) return '';
  return `<rect x="-80" y="-120" width="560" height="900" fill="#ff8a3a" opacity=".1">
    <animate attributeName="opacity" values=".1;.07;.11;.08;.1" dur="2.4s" repeatCount="indefinite"/>
  </rect>`;
}

export function draw1974(wall, state) {
  const f = state.flags;
  return {
    art: { A: wallA, B: wallB, C: wallC, D: wallD }[wall](f),
    fx: fxWall[wall](f),
    after: glow(f),
  };
}

// 뜯기: 신문지는 바스락 잘게 부서지며 종잇조각이 흩날린다. 드러나는 맨 시멘트
export const peelArt1974 = {
  r0: 74,
  speed: 1.0,
  curl: 'url(#flapBack74)',
  sound: 'tearPaper',
  crumbs: '#cfc4a6',
  under: () => `
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#pBare)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="url(#bulb)"/>
    <rect width="${W}" height="${FLOOR_Y}" fill="#1a1a18" opacity=".18"/>
    <rect width="${W}" height="60" fill="url(#ceilShade)"/>
    <rect x="${W - 46}" width="46" height="${FLOOR_Y}" fill="url(#cornerR)" opacity=".75"/>
    <rect width="46" height="${FLOOR_Y}" fill="url(#cornerL)" opacity=".75"/>
    <path d="M60 300l8 30M70 296l8 30M80 300l6 26M230 120l10 24M240 118l8 26" stroke="#4a4844" stroke-width="1" opacity=".7"/>`,
  front: () => sewingMachine({ spoolsDone: true }),
};
