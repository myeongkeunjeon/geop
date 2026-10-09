// 벽지 뜯기 연출 — 이 게임의 손맛.
// 귀퉁이를 손가락으로 끌면 벽지가 손가락을 따라 말려 올라가며 아래 층이 드러난다.
// 끈 거리만큼 찢는 소리, 일정 거리마다 짧은 진동. 중간에 놓으면 조금 되돌아간다.
// 끝까지 끌면 조각이 떨어지고(진동 40ms) 화면이 0.3초 하얗게 → 새 시대.
// 드래그가 어려우면 같은 자리를 3번 탭해도 된다 (탭마다 1/3).
import { W, H, rng } from './art/common.js';
import { backTransform } from './art/room.js';
import { play, vibrate } from './audio.js';
import { aimTorch, widenTorch } from './torch.js';

const C = [392, 156]; // 뜯기는 중심: 벽 B 오른쪽 모서리의 찢긴 자리 (벽 좌표)
let R0 = 112; // 처음 구멍 크기 (재질마다 다름)
const RF = 505; // 벽 전체가 드러나는 크기
const N = 120;
const jit = (() => {
  const r = rng(77);
  const a = [];
  for (let i = 0; i < N; i++) a.push(r() - 0.5);
  // 이웃끼리 섞어 손으로 뜯은 듯한 굴곡
  return a.map((v, i) => (v + a[(i + 1) % N] * 0.6 + a[(i + N - 1) % N] * 0.6) / 2.2);
})();

// opts: { current() → 지금 뜯을 수 있는 벽의 설정 또는 null, onDone(era) }
// 설정: { era, under(), front(), speed, curl, sound, r0 }
let opts = null;
let cfg = null;
let r = R0;
let el = null;
let busy = false;

function ring(radius, amp) {
  let d = '';
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const rr = radius + jit[i] * amp;
    d += `${i ? 'L' : 'M'}${(C[0] + Math.cos(a) * rr).toFixed(1)} ${(C[1] + Math.sin(a) * rr).toFixed(1)}`;
  }
  return `${d}Z`;
}

function draw() {
  if (!el) return;
  const amp = 6 + r * 0.03;
  const w = 7 + (r - R0) * 0.07; // 말린 종이가 두꺼워진다
  el.querySelector('.p-hole').setAttribute('d', ring(r, amp));
  el.querySelector('.p-curl').setAttribute('d', `${ring(r + w, amp)} ${ring(r - 1, amp)}`);
  el.querySelector('.p-shadow').setAttribute('d', ring(r + w + 3, amp));
  let fib = '';
  for (let i = 0; i < N; i += 2) {
    const a = (i / N) * Math.PI * 2 + jit[(i + 7) % N];
    const rr = r + jit[i] * amp;
    const x = C[0] + Math.cos((i / N) * Math.PI * 2) * rr;
    const y = C[1] + Math.sin((i / N) * Math.PI * 2) * rr;
    fib += `M${x.toFixed(1)} ${y.toFixed(1)}l${(Math.cos(a) * 4).toFixed(1)} ${(Math.sin(a) * 4).toFixed(1)}`;
  }
  el.querySelector('.p-fiber').setAttribute('d', fib);
}

// 장면 층에 뜯기 그림을 붙인다 (뜯기 준비가 된 벽 B에서만)
export function mountPeel(layer) {
  cfg = opts?.current();
  if (!cfg) return;
  if (R0 !== cfg.r0) r = R0 = cfg.r0;
  const art = layer.querySelector(':scope > .art');
  if (!art || layer.querySelector(':scope > .peel')) return;
  const t = document.createElement('div');
  t.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" class="peel"><g transform="${backTransform}">
    <defs>
      <clipPath id="peelHole"><path class="p-hole"/></clipPath>
      <clipPath id="peelWall"><rect width="${W}" height="462"/></clipPath>
    </defs>
    <g clip-path="url(#peelWall)">
      <g clip-path="url(#peelHole)">${cfg.under()}</g>
      <path class="p-shadow" fill="none" stroke="#000" stroke-opacity=".32" stroke-width="8"/>
      <path class="p-curl" fill="${cfg.curl}" fill-rule="evenodd"/>
      <path class="p-fiber" stroke="#f6f3ec" stroke-width=".8" stroke-linecap="round"/>
    </g>
    ${cfg.front()}
  </g></svg>`;
  el = t.firstElementChild;
  art.after(el);
  draw();
}

function local(e) {
  const m = el?.querySelector('g')?.getScreenCTM();
  if (!m) return null;
  return new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
}

let lastSound = r;
let lastBuzz = r;
function setR(v) {
  r = Math.min(Math.max(v, R0), RF + 140);
  if (r - lastSound > 9) {
    play(cfg?.sound || 'tear');
    lastSound = r;
  } else if (r < lastSound) lastSound = r;
  if (r - lastBuzz > 34) {
    vibrate(10);
    lastBuzz = r;
  } else if (r < lastBuzz) lastBuzz = r;
  draw();
}

function animateTo(to, ms, then) {
  const from = r;
  const t0 = performance.now();
  busy = true;
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / ms);
    const e = 1 - (1 - k) ** 3;
    setR(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(tick);
    else {
      busy = false;
      then?.();
    }
  };
  requestAnimationFrame(tick);
}

function finish() {
  busy = true;
  animateTo(RF + 140, 240, () => {
    busy = true;
    vibrate(40);
    play('drop');
    const flash = document.getElementById('flash');
    flash.classList.remove('on');
    void flash.offsetWidth;
    flash.classList.add('on');
    widenTorch(false);
    setTimeout(() => {
      el = null;
      r = R0;
      busy = false;
      opts.onDone(cfg.era);
    }, 300);
  });
}

// scene.js가 pointerdown마다 묻는다: 이 손가락을 뜯기가 가져갈까?
export function capturePeel(e) {
  if (!el || busy || !opts?.current()) return false;
  if (!e.target.closest?.('[data-hs="corner"]')) {
    const p = local(e);
    if (!p || Math.hypot(p.x - C[0], p.y - C[1]) > r + 40) return false;
  }
  const start = local(e);
  const baseR = r;
  let moved = 0;
  const move = (ev) => {
    const p = local(ev);
    if (!p) return;
    moved = Math.max(moved, Math.hypot(p.x - start.x, p.y - start.y));
    setR(Math.max(r, baseR + moved * (cfg?.speed || 1.1)));
    aimTorch(ev.clientX, ev.clientY);
    if (r >= RF) {
      end();
      finish();
    }
  };
  const up = () => {
    end();
    setTimeout(() => !busy && widenTorch(false), 1200);
    if (busy) return;
    if (moved < 10) {
      // 탭: 1/3씩
      const to = Math.min(RF, r + (RF - R0) / 3 + 2);
      animateTo(to, 320, () => {
        if (r >= RF - 1) finish();
      });
    } else {
      // 놓으면 조금 되돌아간다 (완전히는 아님)
      animateTo(R0 + (r - R0) * 0.72, 280);
    }
  };
  const end = () => {
    removeEventListener('pointermove', move);
    removeEventListener('pointerup', up);
    removeEventListener('pointercancel', up);
  };
  addEventListener('pointermove', move);
  addEventListener('pointerup', up);
  addEventListener('pointercancel', up);
  aimTorch(e.clientX, e.clientY);
  widenTorch(true);
  el.closest('.layer')?.classList.add('peeling');
  return true;
}

export function initPeel(o) {
  opts = o;
}
