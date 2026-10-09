// 장면 그리기, 벽 회전, 시대 전환, 핫스팟
import { state } from './state.js';
import { ui } from './data/text.js';
import { hotspotsFor } from './data/rooms.js';
import { draw2026 } from './art/2026.js';
import { W, H, shell, wallTag } from './art/common.js';
import { lamp, motes } from './art/fx.js';
import { roomShell, roomFront, backTransform } from './art/room.js';

const drawers = { 2026: draw2026 };

const layers = document.getElementById('layers');
const sceneEl = document.getElementById('scene');

// 층 순서: 방(천장·옆벽·바닥) → 뒷벽 그림 → 앞쪽 어둠·입자 → 움직이는 층과 핫스팟
function svgFor(era, wall) {
  const draw = drawers[era];
  const { art, fx = '', after = '', dark = false } = draw
    ? draw(wall, state)
    : { art: `${shell(era)}${wallTag(`${ui.eraNames[era]} · 벽 ${wall} (준비 중)`)}` };
  const hs = hotspotsFor(era, wall, state.flags)
    .map((h) => `<rect class="hs" data-hs="${h.id}" x="${h.x}" y="${h.y}" width="${h.w}" height="${h.h}"/>`)
    .join('');
  const open = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"`;
  // 정전: 2단계에서 손전등 원형 마스크로 바뀐다
  const top = dark
    ? `<rect width="${W}" height="${H}" fill="#000" opacity=".82"/>`
    : `${lamp()}${motes(wall.charCodeAt(0))}`;
  return `${open} class="art">${roomShell(era)}<g transform="${backTransform}">${art}</g>${roomFront()}</svg>`
    + `${open} class="fx"><g transform="${backTransform}">${fx}</g>${top}<g transform="${backTransform}">${after}${hs}</g></svg>`;
}

// anim: 'next' | 'prev' | 'fade' | undefined(즉시)
export function renderScene(anim) {
  const old = [...layers.querySelectorAll('.layer:not(.leaving)')];
  const el = document.createElement('div');
  el.className = 'layer';
  el.innerHTML = svgFor(state.era, state.wall);

  if (!anim || !old.length) {
    layers.replaceChildren(el);
    return;
  }
  const inCls = { next: 'in-from-right', prev: 'in-from-left', fade: 'fade-in' }[anim];
  const outCls = { next: 'out-to-left', prev: 'out-to-right' }[anim];
  for (const o of old) {
    o.classList.add('leaving');
    if (outCls) o.classList.add(outCls);
  }
  el.classList.add(inCls);
  layers.append(el);
  el.addEventListener('animationend', () => old.forEach((o) => o.remove()), { once: true });
}

export function hotspotEl(id) {
  return layers.querySelector(`.layer:not(.leaving) [data-hs="${id}"]`);
}

export function pulse(id) {
  const el = hotspotEl(id);
  if (!el) return;
  el.classList.remove('pulse');
  void el.getBoundingClientRect();
  el.classList.add('pulse');
}

// 탭과 스와이프 구분. 화살표 버튼은 따로 처리
export function bindScene({ onHotspot, onEmpty, onTurn }) {
  let start = null;

  sceneEl.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.turn')) return;
    start = { x: e.clientX, y: e.clientY, target: e.target, id: e.pointerId };
  });

  sceneEl.addEventListener('pointerup', (e) => {
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const target = start.target;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      onTurn(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.hypot(dx, dy) > 14) return;
    const hs = target.closest?.('[data-hs]');
    if (hs) onHotspot(hs.dataset.hs, e);
    else onEmpty(e);
  });

  sceneEl.addEventListener('pointercancel', () => (start = null));

  for (const btn of sceneEl.querySelectorAll('.turn')) {
    btn.addEventListener('click', () => onTurn(Number(btn.dataset.dir)));
  }
}

export function setDebugHotspots(on) {
  sceneEl.classList.toggle('show-hs', on);
}
