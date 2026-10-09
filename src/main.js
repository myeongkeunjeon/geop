import { state, save, turn, flag, setFlag, unlockEra, goEra, addItem } from './state.js';
import { ui, lines, items } from './data/text.js';
import { installDefs } from './art/defs.js';
import { itemIcon } from './art/items.js';
import { renderScene, bindScene, hotspotEl } from './scene.js';
import { act } from './interact.js';
import { unlockAudio, play } from './audio.js';
import { aimTorchAt, switchOn } from './torch.js';
import { initPeel } from './peel.js';
import { peelArt2026 } from './art/2026.js';
import { peelArt2014 } from './art/2014.js';
import { openStrip } from './strip.js';
import { openRadio, openLock, openClock } from './puzzles/dial.js';
import { openCrane } from './puzzles/crane.js';
import { openScore } from './puzzles/score.js';
import { peelArt1995 } from './art/1995.js';
import { peelArt1974 } from './art/1974.js';
import { openSpools, openNews } from './puzzles/spools.js';
import { initDebug } from './debug.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage');
const slotsEl = $('slots');
const caption = $('caption');
const card = $('card');

let selected = null; // 선택된 소지품 id (저장하지 않음)

/* ---------- 화면 맞추기 ----------
   폭 390 기준으로 안전 영역(노치·홈 표시줄 제외)을 꽉 채운다. 아이폰 15(393×759)면 장면이 약 555.
   장면 그림은 390×600을 가운데 기준으로 채우고(위아래 조금 잘림), 장면이 너무 낮아지거나 높아지면
   그때만 좌우·위아래에 여백을 둔다. */
const FIXED = 50 + 44 + 104; // 상단 + 자막 + 소지품
const SCENE_MIN = 520;
const SCENE_MAX = 640;
function fit() {
  const frame = $('frame');
  const cs = getComputedStyle(frame);
  const w = frame.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const h = frame.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  let scale = w / 390;
  if (h / scale < FIXED + SCENE_MIN) scale = h / (FIXED + SCENE_MIN);
  const stageH = Math.min(h / scale, FIXED + SCENE_MAX);
  stage.style.setProperty('--scale', scale);
  stage.style.setProperty('--h', `${stageH}px`);
}
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 200));

/* ---------- 상단, 자막 ---------- */
function renderTop() {
  // 2026은 정전 전후로, 아래 시대들은 늘 2시 13분
  $('clock').textContent = state.era !== '2026' || flag('blackout') ? ui.clockBlackout : ui.clockBefore;
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
  // 정전: 불이 꺼지고 손전등 빛만. 빛이 귀퉁이를 비추면, 귀퉁이가 한 번 숨 쉰다
  // 정전: 완전히 깜깜해진다. 손전등을 켜야 보인다
  blackout() {
    setTimeout(() => {
      setFlag('blackout');
      save();
      play('blackout');
      renderTop();
      renderScene('fade');
      say(lines.blackout);
      setTimeout(() => !flag('torchOn') && say(lines.blackout_hint), 2600);
    }, 1400);
  },
  fillWater() {
    play('water');
  },
  spray() {
    play('spray');
  },
  // 귀퉁이를 들었다: 이제 손가락으로 끌어 뜯을 수 있다
  peel() {
    setFlag(`peel_${state.era}`);
    save();
    renderScene();
    setTimeout(() => say(lines[`peel_ready_${state.era}`] || lines.peel_ready), 900);
  },
  // 시대 이동 띠
  strip() {
    openStrip(travel);
  },
  // 2014 라디오: 91.7에 맞추면 사연
  radio() {
    openRadio({
      target: 91.7,
      story: lines.radio_story,
      staticText: lines.radio_static,
      nearText: lines.radio_near,
      onHeard() {
        if (!flag('radioHeard')) {
          setFlag('radioHeard');
          state.stats.solved.P4 ??= Date.now();
          save();
        }
        say(lines.radio_done);
      },
    });
  },
  // 2014 책상 서랍: 0519
  lock() {
    openLock({
      code: '0519',
      wrongText: lines.lock_wrong,
      onWrong() {
        state.stats.wrong.drawer = (state.stats.wrong.drawer || 0) + 1;
        save();
      },
      onOpen() {
        setFlag('drawerOpen');
        state.stats.solved.P5 ??= Date.now();
        const gained = ['hera', 'diary'].filter((id) => !state.inventory.includes(id));
        gained.forEach(addItem);
        save();
        renderScene();
        flyToBag('desk', gained);
        say(lines.lock_open);
      },
    });
  },
  // 엔딩 B 물건을 너무 일찍 두려 했다 (발견율 참고용 통계)
  early() {
    state.stats.earlyPlace++;
    save();
  },
  placed() {},
  // 1995 벽시계: 2시 13분 → 자개장 열쇠
  clock() {
    openClock({
      target: [2, 13],
      onSolved() {
        setFlag('gotKey');
        state.stats.solved.P7 ??= Date.now();
        addItem('key');
        save();
        renderScene();
        flyToBag('clock', ['key']);
        say(lines.clock_open);
      },
    });
  },
  // 1995 자개장 학 문양 → 밀가루, 성냥, 숨은 귀퉁이
  crane() {
    openCrane({
      onSolved() {
        setFlag('cabinetOpen');
        state.stats.solved.P8 ??= Date.now();
        const gained = ['flour', 'matches'].filter((id) => !state.inventory.includes(id));
        gained.forEach(addItem);
        save();
        play('drop');
        renderScene();
        flyToBag('cabinet', gained);
        say(lines.cabinet_open);
      },
    });
  },
  // 1974 연탄불, 풀 쑤기
  fire() {
    play('fire');
  },
  stir() {
    play('stir');
  },
  // 1974 실꽂이: 빨강·노랑·초록 → 은하의 그림
  spools() {
    openSpools({
      order: ['red', 'yellow', 'green'],
      wrongText: lines.spools_wrong,
      onWrong() {
        state.stats.wrong.spools = (state.stats.wrong.spools || 0) + 1;
        save();
      },
      onSolved() {
        setFlag('spoolsDone');
        state.stats.solved.P11 ??= Date.now();
        state.inventory = state.inventory.filter((id) => id !== 'spools');
        if (!state.inventory.includes('drawing')) addItem('drawing');
        save();
        renderScene();
        flyToBag('machine', ['drawing']);
        say(lines.spools_open);
      },
    });
  },
  // 1974 신문 기사를 읽고 나면 뜯을 수 있다
  news() {
    openNews({
      lines: lines.news,
      onClose() {
        events.peel();
      },
    });
  },
  // 1995 비닐 칼집
  score() {
    openScore({
      onDone() {
        setFlag('scored');
        save();
        renderScene();
        say(lines.scored);
      },
    });
  },
};

const NEXT = { 2026: '2014', 2014: '1995', 1995: '1974', 1974: 'bare' };
const SOLVE = { 2026: 'P3', 2014: 'P6', 1995: 'P9', 1974: 'P12' };

// 한 겹을 다 뜯었다 → 아래 시대로
function onPeeled(era) {
  setFlag(`peel_${era}`, false);
  setFlag(`peeled_${era}`);
  state.stats.solved[SOLVE[era]] ??= Date.now();
  const next = NEXT[era];
  unlockEra(next);
  goEra(next);
  save();
  renderTop();
  renderScene('fade');
  say(lines[`arrive${next}`] || '');
}

// 띠에서 고른 시대로 이동
function travel(era) {
  goEra(era);
  selected = null;
  save();
  renderTop();
  renderBag();
  renderScene('fade');
  say(lines[`arrive${era}b`] || lines[`arrive${era}`] || '');
}

const peelCfg = {
  2026: { r0: 112, speed: 1.1, curl: 'url(#flapBack)', sound: 'tear', ...peelArt2026 },
  2014: peelArt2014,
  1995: peelArt1995,
  1974: peelArt1974,
};
initPeel({
  current: () => (state.wall === 'B' && flag(`peel_${state.era}`) && peelCfg[state.era] ? { era: state.era, ...peelCfg[state.era] } : null),
  onDone: onPeeled,
});

/* ---------- 장면 조작 ---------- */
const isDark = () => state.era === '2026' && flag('blackout') && !flag('torchOn');

// 손전등 켜기: 손전등을 고르고 화면을 탭하면 그 자리에서 딸깍
function turnOnTorch(e) {
  selected = null;
  setFlag('torchOn');
  save();
  play('click');
  renderScene();
  renderBag();
  switchOn(e.clientX, e.clientY);
  say(lines.torch_on);
  setTimeout(maybeBreathe, 1300);
}

// 빛이 처음 벽 B에 닿으면, 귀퉁이가 한 번 숨 쉰다
function maybeBreathe() {
  if (state.era !== '2026' || state.wall !== 'B' || !flag('torchOn') || flag('breathed')) return;
  aimTorchAt(43 + 0.78 * 330, 58 + 0.78 * 160);
  setTimeout(() => {
    document.querySelector('.layer:not(.leaving) .corner-breath')?.classList.add('go');
    play('inhale');
    setTimeout(() => say(lines.corner_breath), 900);
    setTimeout(() => {
      setFlag('breathed');
      save();
    }, 2800);
  }, 1100);
}

// 아이템을 쓰는 모션: 소지품 칸에서 대상 물건으로 날아가 닿는다
function useFly(itemId, hotspotId, done) {
  const slot = slotsEl.querySelector(`[data-item="${itemId}"]`)?.getBoundingClientRect();
  const to = hotspotEl(hotspotId)?.getBoundingClientRect();
  if (!slot || !to) return done();
  const fly = document.createElement('div');
  fly.className = 'fly use';
  fly.innerHTML = itemIcon(itemId);
  Object.assign(fly.style, { left: `${slot.left}px`, top: `${slot.top}px`, width: `${slot.width}px`, height: `${slot.height}px` });
  document.body.append(fly);
  const dx = to.left + to.width / 2 - (slot.left + slot.width / 2);
  const dy = to.top + to.height / 2 - (slot.top + slot.height / 2);
  requestAnimationFrame(() => {
    fly.style.transform = `translate(${dx}px, ${dy}px) scale(1.25) rotate(-12deg)`;
  });
  setTimeout(() => {
    fly.style.opacity = '0';
    done();
  }, 420);
  setTimeout(() => fly.remove(), 800);
}

function onHotspot(id, e) {
  const use = selected;
  if (use === 'flashlight' && isDark()) return turnOnTorch(e);
  if (isDark()) {
    say(lines.too_dark);
    return;
  }
  const res = act(id, use);
  save();
  const show = () => {
    say(res.text ? lines[res.text] : '');
    if (res.gained.length) {
      renderScene();
      flyToBag(id, res.gained);
    } else {
      renderScene();
      renderBag();
    }
    if (res.then) events[res.then]?.();
  };
  if (use) {
    selected = null;
    useFly(use, id, show);
  } else show();
}

bindScene({
  onHotspot,
  onEmpty(e) {
    if (selected === 'flashlight' && isDark()) return turnOnTorch(e);
    if (selected) {
      selected = null;
      renderBag();
    }
  },
  onTurn(dir) {
    turn(dir);
    save();
    renderScene(dir > 0 ? 'next' : 'prev');
    setTimeout(maybeBreathe, 600);
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
