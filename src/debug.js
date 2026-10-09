// ?debug=1 일 때만: 시대 이동, 아이템 얻기, 플래그·통계 보기, 저장 초기화
import { state, ERAS, WALLS, reset, addItem, unlockEra, goEra, save } from './state.js';
import { items, ui } from './data/text.js';
import { allItemIds } from './art/items.js';
import { setDebugHotspots } from './scene.js';

export function initDebug(api) {
  if (new URLSearchParams(location.search).get('debug') !== '1') return;

  const stage = document.getElementById('stage');
  const gear = document.createElement('button');
  gear.id = 'dbg-gear';
  gear.textContent = '⚙';
  gear.setAttribute('aria-label', '디버그');
  const panel = document.createElement('div');
  panel.id = 'dbg';
  panel.hidden = true;
  stage.append(gear, panel);

  let showHs = false;
  const btn = (label, fn) => {
    const b = document.createElement('button');
    b.textContent = label;
    b.addEventListener('click', () => {
      fn();
      save();
      api.refresh();
      draw();
    });
    return b;
  };
  const section = (title, ...children) => {
    const h = document.createElement('h3');
    h.textContent = title;
    const row = document.createElement('div');
    row.className = 'row';
    row.append(...children);
    panel.append(h, row);
  };
  const pre = (obj) => {
    const p = document.createElement('pre');
    p.textContent = JSON.stringify(obj, null, 1);
    return p;
  };

  function draw() {
    panel.replaceChildren();
    section('시대 바로 이동', ...ERAS.map((e) => btn(ui.eraNames[e] + (state.era === e ? ' ●' : ''), () => { unlockEra(e); goEra(e); })),
      btn('모든 시대 해금', () => ERAS.forEach(unlockEra)));
    section('벽', ...WALLS.map((w) => btn(w + (state.wall === w ? ' ●' : ''), () => (state.wall = w))));
    section('아이템 바로 얻기', ...allItemIds.map((id) => btn(items[id]?.name || id, () => addItem(id))),
      btn('소지품 비우기', () => (state.inventory = [])));
    section('2026 상태',
      btn(`정전 ${state.flags.blackout ? '끄기' : '켜기'}`, () => (state.flags.blackout ? (delete state.flags.blackout) : Object.assign(state.flags, { blackout: true, boxOpen: true, breathed: true }))),
      btn('뜯기 준비', () => {
        Object.assign(state.flags, { blackout: true, torchOn: true, boxOpen: true, breathed: true, cornerWet: true, peelReady: true });
        state.era = '2026';
        state.wall = 'B';
      }));
    section('보기', btn(`핫스팟 ${showHs ? '숨기기' : '보이기'}`, () => setDebugHotspots((showHs = !showHs))));
    section('엔딩 바로 보기', btn('엔딩 A', () => api.ending('A')), btn('엔딩 B', () => api.ending('B')));
    section('플래그', pre({ unlockedEras: state.unlockedEras, flags: state.flags, placed: state.placed }));
    section('통계', pre(state.stats), btn('통계 복사', copyStats));
    section('저장', btn('저장 초기화', () => { reset(); location.reload(); }));
  }

  function copyStats() {
    const text = JSON.stringify(state.stats, null, 2);
    navigator.clipboard?.writeText(text).then(
      () => api.say('통계를 복사했다.'),
      () => api.say('복사 실패. 패널의 글자를 길게 눌러 복사하세요.'),
    );
  }

  gear.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) draw();
  });
}
