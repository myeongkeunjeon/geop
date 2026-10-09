// 실패 순서: 재봉틀 실꽂이 셋에 실패를 꽂는다. 엄마 꽃 순서대로(빨강·노랑·초록)면 서랍이 열린다.
import { openOverlay, closeOverlay } from '../overlay.js';
import { play, vibrate } from '../audio.js';

const SPOOLS = [
  { id: 'green', color: '#5f7a4a', name: '초록' },
  { id: 'red', color: '#b4544a', name: '빨강' },
  { id: 'yellow', color: '#d9b443', name: '노랑' },
];
const spoolSvg = (c) => `<svg viewBox="0 0 30 44"><rect x="3" y="4" width="24" height="5" rx="1.5" fill="#8b6b45"/><rect x="6" y="9" width="18" height="26" fill="${c}"/><path d="M6 14h18M6 20h18M6 26h18M6 32h18" stroke="#000" stroke-opacity=".18"/><rect x="3" y="35" width="24" height="5" rx="1.5" fill="#8b6b45"/></svg>`;

export function openSpools({ order, onSolved, onWrong, wrongText }) {
  const pins = [null, null, null];
  const root = openOverlay(
    `<div class="spools">
      <div class="pins">${pins.map((_, i) => `<button class="pin" data-i="${i}" aria-label="실꽂이 ${i + 1}"><i></i><span>${['一', '二', '三'][i]}</span></button>`).join('')}</div>
      <div class="tray">${SPOOLS.map((s) => `<button class="spool" data-id="${s.id}" aria-label="${s.name} 실패">${spoolSvg(s.color)}</button>`).join('')}</div>
      <p class="pz-sub spools-sub"></p>
      <p class="pz-hint">실패를 누르면 빈 실꽂이에 꽂힌다 · 꽂힌 실패를 누르면 뺀다</p>
    </div>`,
    { cls: 'pz-spools' },
  );
  const sub = root.querySelector('.spools-sub');
  function draw() {
    root.querySelectorAll('.pin').forEach((b, i) => {
      const s = SPOOLS.find((x) => x.id === pins[i]);
      b.querySelector('i').innerHTML = s ? spoolSvg(s.color) : '';
    });
    root.querySelectorAll('.spool').forEach((b) => (b.style.visibility = pins.includes(b.dataset.id) ? 'hidden' : ''));
  }
  root.addEventListener('click', (e) => {
    const sp = e.target.closest('.spool');
    const pin = e.target.closest('.pin');
    if (sp) {
      const i = pins.indexOf(null);
      if (i < 0) return;
      pins[i] = sp.dataset.id;
      play('dial');
    } else if (pin && pins[pin.dataset.i]) {
      pins[pin.dataset.i] = null;
      play('dial');
    } else return;
    sub.textContent = '';
    draw();
    if (pins.includes(null)) return;
    if (pins.join() === order.join()) {
      play('unlock');
      vibrate(20);
      setTimeout(() => {
        closeOverlay();
        onSolved();
      }, 700);
    } else {
      play('rattle');
      vibrate(15);
      sub.textContent = wrongText;
      onWrong();
      setTimeout(() => {
        pins.fill(null);
        draw();
      }, 700);
    }
  });
  draw();
}

// 신문 기사 확대: 신문지 초배 속 기사
export function openNews({ lines, onClose }) {
  openOverlay(
    `<div class="news">
      <div class="news-paper">
        <p class="news-date">${lines.date}</p>
        <h3>${lines.head}</h3>
        <h4>${lines.sub}</h4>
        <p class="news-body">${lines.body}</p>
      </div>
    </div>`,
    { cls: 'pz-news', closed: onClose },
  );
  play('paper');
}
