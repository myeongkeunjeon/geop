// 비닐벽지 칼집: 체크 무늬 위에 굵은 선 4개가 희미하게 빛난다. 차례로 탭하면 칼집이 생긴다.
import { openOverlay, closeOverlay } from '../overlay.js';
import { play, vibrate } from '../audio.js';

const LINES = [
  'M40 40H220', // 위
  'M40 40V220', // 왼쪽
  'M40 220H220', // 아래
  'M130 40V220', // 가운데 세로
];
// 선분 [x1,y1,x2,y2]: 손가락에서 가장 가까운 선을 찾는다
const SEG = [[40, 40, 220, 40], [40, 40, 40, 220], [40, 220, 220, 220], [130, 40, 130, 220]];
function dist([x1, y1, x2, y2], x, y) {
  const cx = Math.max(Math.min(x, Math.max(x1, x2)), Math.min(x1, x2));
  const cy = Math.max(Math.min(y, Math.max(y1, y2)), Math.min(y1, y2));
  return Math.hypot(x - cx, y - cy);
}

export function openScore({ onDone }) {
  const root = openOverlay(
    `<div class="score">
      <svg class="score-wall" viewBox="0 0 260 260">
        <rect width="260" height="260" fill="url(#p1995)" transform="scale(1)"/>
        <rect width="260" height="260" fill="#000" opacity=".15"/>
        ${LINES.map((d, i) => `<g class="cut" data-i="${i}"><path class="glow" d="${d}"/><path class="slit" d="${d}"/><path class="hit" d="${d}"/></g>`).join('')}
      </svg>
      <p class="pz-sub score-sub"></p>
      <p class="pz-hint">빛나는 선을 따라 커터칼로 긋는다</p>
    </div>`,
    { cls: 'pz-score' },
  );
  const cut = new Set();
  const wall = root.querySelector('.score-wall');
  wall.addEventListener('pointerdown', (e) => {
    const m = wall.getScreenCTM();
    if (!m) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    let best = -1;
    let bd = 34;
    SEG.forEach((s, i) => {
      const d = dist(s, p.x, p.y);
      if (!cut.has(String(i)) && d < bd) (bd = d), (best = i);
    });
    if (best < 0) return;
    const g = root.querySelector(`.cut[data-i="${best}"]`);
    cut.add(g.dataset.i);
    g.classList.add('done');
    play('cut');
    vibrate(8);
    if (cut.size === LINES.length) {
      root.querySelector('.score-sub').textContent = '칼집 네 줄. 비닐이 네모로 들릴 것 같다.';
      setTimeout(() => {
        closeOverlay();
        onDone();
      }, 1000);
    }
  });
}
