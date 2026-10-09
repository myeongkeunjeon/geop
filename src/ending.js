// 계약서(시작), 엔딩 두 가지. 본 엔딩은 저장을 지워도 남는다.
import { play, vibrate } from './audio.js';
import { esc } from './art/bare.js';

const ENDINGS_KEY = 'geop.endings.v1';

export function seenEndings() {
  try {
    return JSON.parse(localStorage.getItem(ENDINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function recordEnding(which) {
  const seen = seenEndings();
  if (!seen.includes(which)) seen.push(which);
  try {
    localStorage.setItem(ENDINGS_KEY, JSON.stringify(seen));
  } catch {
    /* 저장이 막혀도 엔딩은 본다 */
  }
}

/* ---------------- 임대차 계약서 ---------------- */

export function openContract({ t, onSigned }) {
  const box = document.getElementById('contract');
  const seen = seenEndings();
  box.innerHTML = `<div class="contract-paper">
    <h2>${t.title}</h2>
    <table>
      <tr><th>소재지</th><td>${t.address}</td></tr>
      <tr><th>보증금</th><td>${t.deposit}</td></tr>
      <tr><th>임대인</th><td>${t.landlord}</td></tr>
    </table>
    <p class="special"><b>특약</b> ${t.special}</p>
    <label class="sign">임차인 <input maxlength="8" placeholder="${t.placeholder}" autocomplete="off" enterkeyhint="done"/> <span>(서명)</span></label>
    <button class="sign-btn">${t.sign}</button>
    ${seen.length ? `<p class="seen">${t.seen} ${seen.map((e) => (e === 'A' ? 'A' : 'B')).join(' · ')}</p>` : ''}
  </div>`;
  box.hidden = false;
  const input = box.querySelector('input');
  const submit = () => {
    const name = input.value.trim().slice(0, 8) || t.placeholder;
    input.blur();
    box.classList.add('closing');
    play('stamp');
    setTimeout(() => {
      box.hidden = true;
      box.classList.remove('closing');
      onSigned(name);
    }, 700);
  };
  box.querySelector('.sign-btn').addEventListener('click', submit);
  input.addEventListener('keydown', (e) => e.key === 'Enter' && submit());
}

/* ---------------- 엔딩 ---------------- */

// 엔딩 그림: A는 새로 바른 벽 속 희미한 사람 모양, B는 열린 현관문과 아침 햇빛
const art = {
  A: `<svg viewBox="0 0 300 220" class="end-art">
    <rect width="300" height="220" fill="url(#p2026)"/>
    <rect width="300" height="220" fill="#fff" opacity=".12"/>
    <g opacity=".16" filter="url(#soft)"><ellipse cx="150" cy="70" rx="16" ry="20" fill="#5a5650"/><path d="M118 210q4 -100 32 -116q28 16 32 116z" fill="#5a5650"/></g>
    <rect y="200" width="300" height="20" fill="#6f5c3b"/>
    <rect x="22" y="150" width="60" height="50" fill="#8a6a44"/><rect x="22" y="150" width="60" height="6" fill="#a3825a"/>
    <text x="52" y="182" text-anchor="middle" font-family="Gowun Batang, serif" font-size="9" fill="#2a1f13">새 짐</text>
  </svg>`,
  B: `<svg viewBox="0 0 300 220" class="end-art">
    <rect width="300" height="220" fill="#8a8883"/>
    <polygon points="110,30 190,30 190,200 110,200" fill="#fff6d8"/>
    <polygon points="110,200 190,200 300,220 0,220" fill="#fff1c4" opacity=".55"/>
    <polygon points="190,30 214,20 214,206 190,200" fill="#5a5753"/>
    <g fill="#c9c1a8" opacity=".8"><rect x="20" y="40" width="40" height="16" transform="rotate(30 40 48)"/><rect x="240" y="80" width="30" height="12" transform="rotate(-40 255 86)"/><rect x="60" y="150" width="24" height="10" transform="rotate(70 72 155)"/><rect x="230" y="160" width="36" height="12" transform="rotate(12 248 166)"/></g>
  </svg>`,
};

export function playEnding(which, { lines, player, onRestart }) {
  recordEnding(which);
  const box = document.getElementById('ending');
  const seq = lines[`ending${which}`].map((l) => l.replace('{name}', esc(player)));
  box.className = `ending end-${which}`;
  box.innerHTML = `${art[which]}<div class="end-lines"></div>
    <div class="end-title">${lines[`ending${which}_title`]}</div>
    <button class="end-restart">${lines.restart}</button>`;
  box.hidden = false;
  play(which === 'A' ? 'brush' : 'fall');
  vibrate(which === 'A' ? 30 : [40, 60, 40]);
  const holder = box.querySelector('.end-lines');
  seq.forEach((l, i) =>
    setTimeout(() => {
      const p = document.createElement('p');
      p.innerHTML = l;
      holder.append(p);
      if (i === seq.length - 1) setTimeout(() => box.classList.add('done'), 1600);
    }, 900 + i * 2200),
  );
  box.querySelector('.end-restart').addEventListener('click', onRestart);
}
