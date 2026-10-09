// 확대 화면: 장면 위에 반투명 검정을 깔고 가운데에 퍼즐을 띄운다. 오른쪽 위 닫기 버튼.
const box = document.getElementById('puzzle');
let onClose = null;
let openedAt = 0;

export function openOverlay(html, { cls = '', closed } = {}) {
  box.className = `overlay ${cls}`;
  box.innerHTML = `<div class="pz-box"><button class="close" aria-label="닫기">✕</button>${html}</div>`;
  box.hidden = false;
  openedAt = performance.now();
  onClose = closed || null;
  return box.querySelector('.pz-box');
}

export function closeOverlay() {
  if (box.hidden) return;
  box.hidden = true;
  box.innerHTML = '';
  const f = onClose;
  onClose = null;
  f?.();
}

box.addEventListener('click', (e) => {
  // 열게 만든 그 탭이 떼어지며 바깥 배경을 눌러 바로 닫히지 않게
  if (performance.now() - openedAt < 400) return;
  if (e.target === box || e.target.closest('.close')) closeOverlay();
});
