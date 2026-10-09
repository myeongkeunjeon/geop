// 숫자 자물쇠, 라디오 다이얼 (시계 맞추기는 4단계)
import { openOverlay, closeOverlay } from '../overlay.js';
import { play, radioSound, vibrate } from '../audio.js';

/* ---------------- 라디오: 87.5 ~ 108.0, 0.1 단위 ---------------- */

const FMIN = 87.5;
const FMAX = 108.0;
let freq = 99.1;

// 정답 주파수에 맞추면 사연이 자막으로 나온다 (소리를 꺼도 풀 수 있게)
export function openRadio({ target, story, staticText, nearText, onHeard }) {
  const ticks = [];
  for (let f = 88; f <= 108; f += 2) ticks.push(`<span style="left:${((f - FMIN) / (FMAX - FMIN)) * 100}%">${f}</span>`);
  const root = openOverlay(
    `<div class="radio">
      <div class="radio-face">
        <div class="radio-window"><div class="radio-scale">${ticks.join('')}</div><div class="radio-needle"></div></div>
        <div class="radio-freq">FM <b></b> MHz</div>
        <div class="radio-meter"><i></i></div>
      </div>
      <div class="radio-buttons">
        <button data-d="-1">◀◀</button><button data-d="-0.1">◀</button><button data-d="0.1">▶</button><button data-d="1">▶▶</button>
      </div>
      <p class="pz-sub radio-sub"></p>
      <p class="pz-hint">눈금을 좌우로 끌거나 버튼으로 맞춘다</p>
    </div>`,
    { cls: 'pz-radio', closed: () => { radioSound.stop(); clearTimeout(storyTimer); } },
  );
  const $ = (s) => root.querySelector(s);
  const sub = $('.radio-sub');
  let storyTimer = 0;
  let storyAt = -1;
  radioSound.start();

  function tell(i) {
    storyAt = i;
    if (i >= story.length) {
      onHeard();
      return;
    }
    sub.textContent = story[i];
    sub.classList.remove('show');
    void sub.offsetWidth;
    sub.classList.add('show');
    storyTimer = setTimeout(() => tell(i + 1), 2600);
  }

  function update() {
    freq = Math.round(Math.min(FMAX, Math.max(FMIN, freq)) * 10) / 10;
    $('.radio-freq b').textContent = freq.toFixed(1);
    $('.radio-needle').style.left = `${((freq - FMIN) / (FMAX - FMIN)) * 100}%`;
    const dist = Math.abs(freq - target);
    const signal = dist < 0.05 ? 1 : Math.max(0, 1 - dist / 0.6) * 0.5;
    $('.radio-meter i').style.width = `${signal * 100}%`;
    radioSound.set(signal);
    if (signal === 1) {
      if (storyAt < 0) tell(0);
    } else {
      clearTimeout(storyTimer);
      storyAt = -1;
      sub.textContent = dist < 0.6 ? nearText : staticText;
    }
  }

  root.querySelector('.radio-buttons').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    freq += Number(b.dataset.d);
    play('dial');
    update();
  });

  // 눈금 끌기: 4px마다 0.1
  const win = $('.radio-window');
  let drag = null;
  win.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, f: freq };
    win.setPointerCapture(e.pointerId);
  });
  win.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const before = freq;
    freq = drag.f - (e.clientX - drag.x) / 40;
    update();
    if (freq !== before) play('dial');
  });
  win.addEventListener('pointerup', () => (drag = null));
  win.addEventListener('pointercancel', () => (drag = null));

  update();
}

/* ---------------- 4자리 숫자 자물쇠 ---------------- */

export function openLock({ code, onOpen, onWrong, wrongText }) {
  const digits = [0, 0, 0, 0];
  const root = openOverlay(
    `<div class="lock">
      <div class="lock-plate">
        ${digits.map((_, i) => `<div class="wheel" data-i="${i}"><button data-d="1" aria-label="올리기">▲</button><div class="digit">0</div><button data-d="-1" aria-label="내리기">▼</button></div>`).join('')}
      </div>
      <button class="lock-pull">당긴다</button>
      <p class="pz-sub lock-sub"></p>
    </div>`,
    { cls: 'pz-lock' },
  );
  root.querySelector('.lock-plate').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = Number(b.closest('.wheel').dataset.i);
    digits[i] = (digits[i] + Number(b.dataset.d) + 10) % 10;
    b.closest('.wheel').querySelector('.digit').textContent = digits[i];
    play('dial');
  });
  root.querySelector('.lock-pull').addEventListener('click', () => {
    if (digits.join('') === code) {
      play('unlock');
      vibrate(20);
      closeOverlay();
      onOpen();
    } else {
      play('rattle');
      vibrate(15);
      const plate = root.querySelector('.lock-plate');
      plate.classList.remove('shake');
      void plate.offsetWidth;
      plate.classList.add('shake');
      root.querySelector('.lock-sub').textContent = wrongText;
      onWrong();
    }
  });
}
