// 맨 벽: 가구 하나 없는 시멘트 방. 벽 B에 사라진 사람들의 이름. 마지막 줄은 내 이름, 아직 마르지 않았다.
import { W, FLOOR_Y, shell, face, moldPatch, waterStain, crack, scribble } from './common.js';
import { fly } from './fx.js';

// 사용자가 쓴 이름이 SVG를 깨지 않게
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 시멘트에 손톱으로 그은 자국
function claw(x, y, n, len, rot, seed) {
  let d = '';
  for (let i = 0; i < n; i++) d += `M${x + i * 5} ${y + (seed * i) % 4}l${(i % 2) - 0.5} ${len - i * 2}`;
  return `<path d="${d}" stroke="#4a4844" stroke-width="1.1" stroke-linecap="round" opacity=".75" transform="rotate(${rot} ${x} ${y})"/>
    <path d="${d}" stroke="#b8b5ae" stroke-width=".5" stroke-linecap="round" opacity=".5" transform="translate(.8 .4) rotate(${rot} ${x} ${y})"/>`;
}

function door() {
  return `
  <rect x="146" y="92" width="108" height="386" fill="#3e3c38"/>
  <rect x="154" y="100" width="92" height="372" fill="#5a5753"/>
  ${face([[154, 100], [154, 472]], 0.07, '#2a2826')}
  ${face([[246, 100], [246, 472]], 0.07, '#33312e')}
  <rect x="166" y="116" width="68" height="340" fill="none" stroke="#000" stroke-opacity=".25"/>
  <circle cx="232" cy="300" r="5" fill="#2a2826"/>
  ${claw(170, 380, 4, 40, -6, 3)}
  <!-- 문틈: 바깥 복도 불빛, 그 앞 그림자 -->
  <rect x="154" y="466" width="92" height="9" fill="#0b0a09"/>
  <rect x="156" y="469" width="88" height="2.4" fill="#e8c97a" opacity=".75"/>`;
}

// 벽 B의 이름들
function names(player) {
  const rows = [
    ['순례', '1974', 150, -3],
    ['미숙', '1995', 196, 2],
    ['수진', '2014', 242, -1],
  ];
  return `<g font-family="Gowun Batang, serif">
    ${rows.map(([n, y, ty, r]) => `<text x="96" y="${ty}" font-size="26" fill="#2b2a28" opacity=".85" transform="rotate(${r} 96 ${ty})">${n}<tspan dx="18" font-size="18">${y}</tspan></text>`).join('')}
    <text x="96" y="296" font-size="28" fill="#5a1e1a" transform="rotate(1.5 96 296)">${esc(player)}<tspan dx="18" font-size="19">2026</tspan></text>
    <path d="M104 300c1 18 -1 30 1 44M140 302c0 10 1 16 0 26M182 300c1 22 -2 40 0 58" stroke="#5a1e1a" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>`;
}

function wallA() {
  return `
  ${shell('bare')}
  ${waterStain(318, 52, 40, 18)}
  ${moldPatch(372, FLOOR_Y - 22, 22, 12, 412)}
  ${crack(60, 200, 80, 41, 80)}
  ${door()}
  ${claw(70, 320, 5, 50, 4, 2)}`;
}

function wallB(f, player) {
  return `
  ${shell('bare')}
  ${moldPatch(350, 14, 34, 18, 421)}
  ${moldPatch(40, FLOOR_Y - 20, 30, 14, 422)}
  ${crack(300, 80, 120, 43, 100)}
  ${names(player)}
  ${claw(300, 330, 5, 60, -8, 1)}
  ${claw(60, 380, 4, 40, 6, 3)}
  ${f.pasted ? `<rect x="40" y="60" width="310" height="390" fill="#efe9da" opacity=".28"/>
    <path d="M50 70q150 -6 290 0M50 430q150 6 290 0" stroke="#fff" stroke-width="2" opacity=".35" fill="none"/>` : ''}`;
}

function wallC() {
  return `
  ${shell('bare')}
  ${waterStain(56, 120, 26, 34)}
  ${moldPatch(372, 14, 26, 14, 431)}
  <rect x="120" y="80" width="150" height="130" fill="#262624"/>
  <rect x="128" y="88" width="134" height="114" fill="url(#nightGlass)"/>
  ${face([[128, 88], [128, 202]], 0.12, '#4a4844')}
  ${face([[128, 88], [262, 88]], 0.12, '#3a3836')}
  <path d="M150 88V202M172 88V202M194 88V202M216 88V202M238 88V202" stroke="#0a0a0a" stroke-width="3"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => claw(70 + i * 46, 300 + (i % 2) * 16, 4, 30 + (i % 3) * 10, (i % 2 ? 6 : -5), i + 1)).join('')}
  ${scribble('2:13', 280, 420, { size: 12, rot: -6, opacity: 0.5 })}`;
}

function wallD() {
  return `
  ${shell('bare')}
  ${waterStain(120, 50, 50, 20)}
  ${moldPatch(20, 14, 26, 14, 441)}
  <!-- 뜯겨 나간 싱크대 자리: 녹슨 수도관 끝 -->
  <rect x="30" y="200" width="200" height="270" fill="#7a7872" opacity=".5"/>
  <path d="M120 470V360q0 -10 10 -10h20" stroke="#5a4636" stroke-width="7" fill="none"/>
  <circle cx="152" cy="350" r="5" fill="#3a2c22"/>
  <rect x="140" y="355" width="6" height="40" fill="url(#rust)"/>
  <path d="M60 470V420" stroke="#5a4636" stroke-width="6"/>
  ${claw(260, 260, 5, 70, 3, 2)}`;
}

const fxWall = {
  A: () => '',
  // 마지막 줄 글씨에서 검붉은 방울이 천천히 흘러내린다
  B: () => `<g fill="#5a1e1a">
    <ellipse cx="182" cy="358" rx="2" ry="3"><animate attributeName="cy" values="358;420;420" keyTimes="0;.85;1" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="9s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="104" cy="344" rx="1.6" ry="2.4"><animate attributeName="cy" values="344;390;390" keyTimes="0;.9;1" dur="13s" begin="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.9;1" dur="13s" begin="3s" repeatCount="indefinite"/></ellipse>
  </g>`,
  C: () => `${fly('M300 300C320 330 300 360 320 392', 17, 1)}`,
  D: () => '',
};

export function drawBare(wall, state) {
  const f = state.flags;
  const player = state.playerName || '세입자';
  return {
    art: { A: wallA, B: wallB, C: wallC, D: wallD }[wall](f, player),
    fx: fxWall[wall](f),
  };
}
