// 장면 그리기, 벽 회전, 시대 전환, 핫스팟
import { state } from './state.js';
import { ui } from './data/text.js';
import { hotspotsFor } from './data/rooms.js';
import { draw2026 } from './art/2026.js';
import { draw2014 } from './art/2014.js';
import { draw1995 } from './art/1995.js';
import { W, H, shell, wallTag } from './art/common.js';
import { lamp, motes } from './art/fx.js';
import { roomShell, roomFront, backTransform } from './art/room.js';
import { torchSvg, aimTorch } from './torch.js';
import { mountPeel, capturePeel } from './peel.js';

const drawers = { 2026: draw2026, 2014: draw2014, 1995: draw1995 };

const layers = document.getElementById('layers');
const sceneEl = document.getElementById('scene');

// 층 순서: 방(천장·옆벽·바닥) → 뒷벽 그림 → 앞쪽 어둠·입자 (art)
//          → 움직이는 층 (fx) → 핫스팟 (hit)
function partsFor(era, wall) {
  const draw = drawers[era];
  const { art, fx = '', after = '', dark = false, torch = false } = draw
    ? draw(wall, state)
    : { art: `${shell(era)}${wallTag(`${ui.eraNames[era]} · 벽 ${wall} (준비 중)`)}` };
  const hs = hotspotsFor(era, wall, state.flags)
    .map((h) => `<rect class="hs" data-hs="${h.id}" x="${h.x}" y="${h.y}" width="${h.w}" height="${h.h}"/>`)
    .join('');
  const open = (cls) => `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" class="${cls}">`;
  // 정전: 손전등을 켜기 전엔 완전히 깜깜하고, 켜면 둥근 빛만 남는다
  const black = `<rect width="${W}" height="${H}" fill="#010203" opacity=".985"/>`;
  const top = dark ? (torch ? torchSvg() : black) : `${lamp()}${motes(wall.charCodeAt(0))}`;
  return {
    art: `${open('art')}${roomShell(era)}<g transform="${backTransform}">${art}</g>${roomFront()}</svg>`,
    fx: `${open('fx')}<g class="wall-fx" transform="${backTransform}">${fx}</g>${top}<g transform="${backTransform}">${after}</g></svg>`,
    hit: `${open('hit')}<g transform="${backTransform}">${hs}</g></svg>`,
  };
}

function toNode(html) {
  const t = document.createElement('div');
  t.innerHTML = html;
  const n = t.firstElementChild;
  n.__src = html;
  return n;
}

// 움직임(SMIL)을 페이지 시계에 맞춘다: 벽을 바꾸거나 다시 그려도 파리·먼지가 처음으로 돌아가지 않는다
function syncClock(svg) {
  try {
    svg.setCurrentTime(performance.now() / 1000);
  } catch {
    /* 지원 안 함 */
  }
}

function buildLayer(parts) {
  const el = document.createElement('div');
  el.className = 'layer';
  for (const k of ['art', 'fx', 'hit']) el.append(toNode(parts[k]));
  syncClock(el.querySelector('.fx'));
  mountPeel(el);
  return el;
}

// anim: 'next' | 'prev' | 'fade' | undefined(제자리 갱신)
export function renderScene(anim) {
  const parts = partsFor(state.era, state.wall);
  const cur = layers.querySelector('.layer:not(.leaving)');

  // 제자리 갱신: 바뀐 층만 갈아 끼워 움직임이 끊기지 않게
  if (!anim && cur) {
    for (const k of ['art', 'fx', 'hit']) {
      const old = cur.querySelector(`:scope > .${k}`);
      if (old.__src === parts[k]) continue;
      const n = toNode(parts[k]);
      old.replaceWith(n);
      if (k === 'fx') syncClock(n);
    }
    mountPeel(cur);
    return;
  }

  const el = buildLayer(parts);
  const old = [...layers.querySelectorAll('.layer:not(.leaving)')];
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

// 탭과 스와이프 구분. 화살표 버튼은 따로 처리
export function bindScene({ onHotspot, onEmpty, onTurn }) {
  let start = null;

  sceneEl.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.turn')) return;
    aimTorch(e.clientX, e.clientY);
    // 벽지 뜯기가 손가락을 가져가면 탭·스와이프로 처리하지 않는다
    if (capturePeel(e)) {
      start = null;
      return;
    }
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
