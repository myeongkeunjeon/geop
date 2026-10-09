// 비닐벽지 칼집: 체크 무늬 위에 굵은 선 4개가 희미하게 빛난다. 차례로 탭하면 칼집이 생긴다.
import { openOverlay, closeOverlay } from '../overlay.js';
import { play, vibrate } from '../audio.js';

const LINES = [
  'M40 40H220', // 위
  'M40 40V220', // 왼쪽
  'M40 220H220', // 아래
  'M130 40V220', // 가운데 세로
];

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
  root.querySelector('.score-wall').addEventListener('click', (e) => {
    const g = e.target.closest('.cut');
    if (!g || cut.has(g.dataset.i)) return;
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
