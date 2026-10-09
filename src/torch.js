// 정전 중 손전등: 화면은 거의 검고, 둥근 빛만 남는다. 탭한 쪽으로 빛이 천천히 따라온다.
import { W, H } from './art/common.js';

let R = 92;
let targetR = 92;
const pos = { x: 195, y: 300 };
const target = { x: 195, y: 300 };
let raf = 0;

// fx 층에 넣는 어둠과 빛 (장면 좌표 390×600)
export function torchSvg() {
  const c = `class="torch-c" cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${R.toFixed(1)}"`;
  return `
  <mask id="torchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#fff"/>
    <circle ${c} fill="url(#torchHole)"/>
  </mask>
  <rect width="${W}" height="${H}" fill="#020304" opacity=".95" mask="url(#torchMask)"/>
  <circle ${c} fill="url(#torchGlow)"/>`;
}

function step() {
  pos.x += (target.x - pos.x) * 0.07;
  pos.y += (target.y - pos.y) * 0.07;
  R += (targetR - R) * 0.06;
  for (const el of document.querySelectorAll('.torch-c')) {
    el.setAttribute('cx', pos.x.toFixed(1));
    el.setAttribute('cy', pos.y.toFixed(1));
    el.setAttribute('r', R.toFixed(1));
  }
  const moving = Math.hypot(target.x - pos.x, target.y - pos.y) > 0.5 || Math.abs(targetR - R) > 0.5;
  raf = moving ? requestAnimationFrame(step) : 0;
}

// 손전등을 켤 때: 손가락 자리에서 몇 번 깜빡이다 켜진다
export function switchOn(clientX, clientY) {
  const svg = document.querySelector('.layer:not(.leaving) .fx');
  const m = svg?.getScreenCTM?.();
  if (m) {
    const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
    pos.x = target.x = p.x;
    pos.y = target.y = p.y;
  }
  const seq = [0, 60, 0, 0, 92, 20, 92];
  seq.forEach((v, i) =>
    setTimeout(() => {
      R = v;
      for (const el of document.querySelectorAll('.torch-c')) {
        el.setAttribute('cx', pos.x.toFixed(1));
        el.setAttribute('cy', pos.y.toFixed(1));
        el.setAttribute('r', v);
      }
    }, i * 75),
  );
}

// 벽지를 뜯는 동안은 빛을 넓게: 손맛이 보이도록
export function widenTorch(on) {
  targetR = on ? 165 : 92;
  if (!raf) raf = requestAnimationFrame(step);
}

// 장면 좌표로 겨누기
export function aimTorchAt(x, y) {
  target.x = x;
  target.y = y;
  if (!raf) raf = requestAnimationFrame(step);
}

// 화면 좌표(손가락)로 겨누기
export function aimTorch(clientX, clientY) {
  const svg = document.querySelector('.layer:not(.leaving) .fx');
  const m = svg?.getScreenCTM?.();
  if (!m) return;
  const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
  aimTorchAt(p.x, p.y);
}
