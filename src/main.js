import { state, save, turn, flag, setFlag } from './state.js';
import { ui, lines, items } from './data/text.js';
import { installDefs } from './art/defs.js';
import { itemIcon } from './art/items.js';
import { renderScene, bindScene, hotspotEl, pulse } from './scene.js';
import { act } from './interact.js';
import { unlockAudio, play } from './audio.js';
import { initDebug } from './debug.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage');
const slotsEl = $('slots');
const caption = $('caption');
const card = $('card');

let selected = null; // 선택된 소지품 id (저장하지 않음)

/* ---------- 화면 맞추기: 390×844를 안전 영역 안에 비율 유지로 ---------- */
function fit() {
  const frame = $('frame');
  const cs = getComputedStyle(frame);
  const w = frame.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const h = frame.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  stage.style.setProperty('--scale', Math.min(w / 390, h / 844));
}
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 200));

/* ---------- 상단, 자막 ---------- */
function renderTop() {
  $('clock').textContent = flag('blackout') ? ui.clockBlackout : ui.clockBefore;
  $('place').textContent = `${ui.place} · ${ui.eraNames[state.era]}`;
}

function say(text) {
  caption.textContent = text || '';
  caption.classList.remove('show');
  void caption.offsetWidth;
  if (text) caption.classList.add('show');
}

/* ---------- 소지품 ---------- */
function renderBag(hidden = []) {
  const n = Math.max(6, state.inventory.length);
  slotsEl.replaceChildren();
  for (let i = 0; i < n; i++) {
    const id = state.inventory[i];
    const b = document.createElement('button');
    b.className = 'slot';
    if (id) {
      b.dataset.item = id;
      b.innerHTML = itemIcon(id);
      b.setAttribute('aria-label', items[id]?.name || id);
      if (id === selected) b.classList.add('selected');
      if (hidden.includes(id)) b.style.opacity = '0';
    }
    slotsEl.append(b);
  }
  const name = $('item-name');
  name.innerHTML = selected ? `<b>${items[selected]?.name || selected}</b>${ui.moreLook}` : '';
}

slotsEl.addEventListener('click', (e) => {
  const b = e.target.closest('.slot');
  if (!b) return;
  const id = b.dataset.item;
  play('tap');
  if (!id) selected = null;
  else if (selected === id) return openCard(id);
  else selected = id;
  renderBag();
});

/* ---------- 확대 카드 ---------- */
function cardPage(id) {
  const it = items[id];
  if (!Array.isArray(it.card)) return { text: it.card, more: '' };
  const opened = flag(it.openFlag);
  return { text: it.card[opened ? 1 : 0], more: opened ? '' : ui.tapToOpen };
}

function openCard(id) {
  const it = items[id];
  card.dataset.item = id;
  card.querySelector('.card-art').innerHTML = itemIcon(id);
  card.querySelector('.card-title').textContent = it.name;
  const page = cardPage(id);
  card.querySelector('.card-text').textContent = page.text;
  card.querySelector('.card-more').textContent = page.more;
  card.hidden = false;
}

function closeCard() {
  card.hidden = true;
  selected = null;
  renderBag();
}

card.addEventListener('click', (e) => {
  if (e.target === card || e.target.closest('.close')) return closeCard();
  const id = card.dataset.item;
  const it = items[id];
  if (Array.isArray(it.card) && !flag(it.openFlag)) {
    setFlag(it.openFlag);
    save();
    openCard(id);
  }
});

/* ---------- 얻은 물건이 소지품으로 날아감 ---------- */
function flyToBag(hotspotId, gained) {
  renderBag(gained);
  const from = hotspotEl(hotspotId)?.getBoundingClientRect();
  gained.forEach((id, i) => {
    const slot = slotsEl.querySelector(`[data-item="${id}"]`);
    if (!slot) return;
    slot.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const to = slot.getBoundingClientRect();
    const start = from || to;
    const fly = document.createElement('div');
    fly.className = 'fly';
    fly.innerHTML = itemIcon(id);
    const size = to.width;
    Object.assign(fly.style, {
      left: `${start.left + start.width / 2 - size / 2}px`,
      top: `${start.top + start.height / 2 - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: 'scale(1.6)',
    });
    document.body.append(fly);
    setTimeout(() => {
      fly.style.transform = `translate(${to.left - parseFloat(fly.style.left)}px, ${to.top - parseFloat(fly.style.top)}px) scale(1)`;
    }, 40 + i * 140);
    setTimeout(() => {
      fly.remove();
      slot.style.opacity = '';
      slot.classList.add('new');
    }, 640 + i * 140);
  });
  play('pickup');
}

/* ---------- 이벤트 (actions.js의 then) ---------- */
const events = {
  blackout() {
    setTimeout(() => {
      setFlag('blackout');
      save();
      renderTop();
      renderScene('fade');
      say(lines.blackout);
    }, 1400);
  },
  peel() {
    // 2단계: 귀퉁이를 손가락으로 끌어 뜯는 연출
    setTimeout(() => say(lines.peel_stub), 1200);
  },
};

/* ---------- 장면 조작 ---------- */
function onHotspot(id) {
  pulse(id);
  const use = selected;
  const res = act(id, use);
  if (use) selected = null;
  say(res.text ? lines[res.text] : '');
  save();
  if (res.gained.length) {
    renderScene();
    flyToBag(id, res.gained);
  } else {
    renderScene();
    renderBag();
  }
  if (res.then) events[res.then]?.();
}

bindScene({
  onHotspot,
  onEmpty() {
    if (selected) {
      selected = null;
      renderBag();
    }
  },
  onTurn(dir) {
    turn(dir);
    save();
    renderScene(dir > 0 ? 'next' : 'prev');
  },
});

// 첫 탭에 소리 잠금 해제, 핀치 확대 막기
addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('gesturestart', (e) => e.preventDefault());

/* ---------- 시작 ---------- */
function refresh() {
  renderTop();
  renderScene();
  renderBag();
}

installDefs();
fit();
refresh();

initDebug({
  refresh,
  say,
  ending(which) {
    say(`(엔딩 ${which}는 6단계에서 만든다.)`);
  },
});

// 홈 화면 웹앱: 오프라인에서도 열리도록
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
