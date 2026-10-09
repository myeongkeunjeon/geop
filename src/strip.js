// 시대 이동 띠: 벽 B 귀퉁이를 탭하면 지금까지 연 층들이 겹겹이 펼쳐진다. 원하는 층을 탭하면 그 시대로.
import { state, ERAS } from './state.js';
import { ui } from './data/text.js';
import { eraWall } from './art/common.js';
import { openOverlay, closeOverlay } from './overlay.js';

export function openStrip(onPick) {
  const eras = ERAS.filter((e) => state.unlockedEras.includes(e));
  const bands = eras
    .map(
      (e, i) => `<button class="band${e === state.era ? ' now' : ''}" data-era="${e}" style="--i:${i}">
        <svg aria-hidden="true"><rect width="100%" height="100%" fill="url(#${eraWall[e]})"/></svg>
        <span class="band-year">${ui.eraNames[e]}</span>
        <span class="band-paper">${ui.eraPaper[e]}${e === state.era ? ` · ${ui.stripNow}` : ''}</span>
      </button>`,
    )
    .join('');
  const root = openOverlay(`<div class="strip"><h2>${ui.stripTitle}</h2><div class="bands">${bands}</div></div>`, { cls: 'pz-strip' });
  root.querySelector('.bands').addEventListener('click', (e) => {
    const b = e.target.closest('.band');
    if (!b) return;
    closeOverlay();
    if (b.dataset.era !== state.era) onPick(b.dataset.era);
  });
}
