// 자개장 학 문양: 3×2 자개 조각을 탭해 90도씩 돌린다. 여섯 조각이 모두 맞으면 학 한 마리.
import { openOverlay, closeOverlay } from '../overlay.js';
import { play, vibrate } from '../audio.js';

// 학 한 마리 (300×200). 자개장 문의 무늬와 퍼즐이 같은 그림을 쓴다
export const CRANE = `<g fill="none" stroke="url(#pearl)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M120 110c-40 -30 -70 -70 -86 -96M120 110c-34 -18 -64 -20 -92 -10M44 22l14 22M30 40l22 18M30 66l24 10"/>
  <path d="M150 100c-6 -40 -12 -70 -40 -92M150 100c4 -30 18 -60 46 -80M118 18l14 22M150 14l2 26M178 22l-10 20"/>
  <ellipse cx="150" cy="118" rx="42" ry="20" transform="rotate(-12 150 118)"/>
  <path d="M186 104c18 -10 24 -36 30 -58c4 -12 14 -18 24 -14"/>
  <path d="M244 32l34 12"/>
  <path d="M110 124l-46 22M112 132l-40 34"/>
  <path d="M146 136l-10 52M162 134l14 54M130 188h18M168 188h18"/>
  <path d="M212 168q20 -8 40 0t40 0M220 184q16 -6 32 0t32 0"/>
</g>
<circle cx="242" cy="32" r="6" fill="#c2453c"/>`;

export function openCrane({ onSolved }) {
  const rot = [1, 3, 2, 3, 1, 2]; // 처음 돌아가 있는 정도 (0이 맞는 방향)
  const tiles = rot
    .map((r, i) => {
      const cx = (i % 3) * 100;
      const cy = Math.floor(i / 3) * 100;
      return `<button class="tile" data-i="${i}" aria-label="자개 조각 ${i + 1}">
        <svg viewBox="${cx} ${cy} 100 100" style="transform:rotate(${r * 90}deg)">
          <rect x="${cx}" y="${cy}" width="100" height="100" fill="#120b09"/>${CRANE}
        </svg></button>`;
    })
    .join('');
  const root = openOverlay(
    `<div class="crane"><div class="crane-grid">${tiles}</div><p class="pz-sub crane-sub"></p><p class="pz-hint">조각을 눌러 돌린다</p></div>`,
    { cls: 'pz-crane' },
  );
  let done = false;
  root.querySelector('.crane-grid').addEventListener('click', (e) => {
    const b = e.target.closest('.tile');
    if (!b || done) return;
    const i = Number(b.dataset.i);
    rot[i] = (rot[i] + 1) % 4;
    // 각도를 누적해 늘 같은 방향으로 돈다
    const svg = b.querySelector('svg');
    const deg = (Number(svg.dataset.deg ?? rot[i] * 90 - 90) + 90);
    svg.dataset.deg = deg;
    svg.style.transform = `rotate(${deg}deg)`;
    play('dial');
    if (rot.every((r) => r === 0)) {
      done = true;
      root.querySelector('.crane-grid').classList.add('solved');
      play('chime');
      vibrate(20);
      setTimeout(() => {
        closeOverlay();
        onSolved();
      }, 1300);
    }
  });
}
