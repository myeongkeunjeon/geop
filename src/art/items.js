// 소지품 아이콘 (viewBox 0 0 48 48)
const s = (body) => `<svg viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;

const icons = {
  postcard: s(`<rect x="6" y="12" width="36" height="24" rx="1.5" fill="#d8cfb8"/><rect x="32" y="15" width="7" height="8" fill="#b4544a"/><path d="M10 20h16M10 25h18M10 30h12" stroke="#6d6655" stroke-width="1.4"/>`),
  notice: s(`<rect x="6" y="12" width="36" height="25" rx="1.5" fill="#e3ddd0"/><path d="M6 13l18 13l18 -13" fill="none" stroke="#a69d8b" stroke-width="1.4"/><circle cx="35" cy="31" r="3.4" fill="#8e3b33"/>`),
  cutter: s(`<rect x="8" y="22" width="26" height="8" rx="2" fill="#c5a33a" transform="rotate(-30 24 26)"/><polygon points="33,15 42,9 38,19" fill="#9aa0a4" transform="rotate(0)"/><rect x="12" y="25" width="4" height="2" fill="#6a5a24" transform="rotate(-30 24 26)"/>`),
  bag: s(`<path d="M10 18h28l-3 22H13z" fill="#5c5a4e"/><path d="M18 18v-5a6 6 0 0 1 12 0v5" fill="none" stroke="#3a3830" stroke-width="2.4"/><rect x="21" y="22" width="12" height="12" fill="#d4d2ca"/><path d="M14 23v12" stroke="#a37b4c" stroke-width="3"/>`),
  flashlight: s(`<rect x="10" y="20" width="22" height="9" rx="2" fill="#4a4d52"/><path d="M32 18h7l3 -3v19l-3 -3h-7z" fill="#6b6f75"/><rect x="16" y="22" width="5" height="5" rx="1" fill="#b9a77a"/>`),
  spray: s(`<rect x="14" y="20" width="16" height="20" rx="3" fill="#7fa6b8" opacity=".9"/><path d="M18 20v-6h10l6 3v3h-8v0" fill="#e0ddd5"/><rect x="18" y="26" width="8" height="10" fill="#fff" opacity=".25"/>`),
  ring: s(`<circle cx="24" cy="26" r="10" fill="none" stroke="#c9ccd1" stroke-width="3.4"/><circle cx="24" cy="26" r="10" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="4 30" opacity=".8"/>`),
  hera: s(`<path d="M12 30l18 -14l8 4l-14 16z" fill="#b6b9bc"/><rect x="6" y="30" width="12" height="6" rx="2" fill="#7b5a37" transform="rotate(-38 12 33)"/>`),
  diary: s(`<rect x="12" y="8" width="24" height="32" rx="2" fill="#8fb0bf"/><rect x="12" y="8" width="4" height="32" fill="#6a8897"/><path d="M20 16h12M20 21h10" stroke="#e9eef0" stroke-width="1.4"/>`),
  key: s(`<circle cx="16" cy="24" r="6" fill="none" stroke="#c9a54a" stroke-width="3"/><path d="M22 24h18M34 24v5M38 24v4" stroke="#c9a54a" stroke-width="3"/>`),
  flour: s(`<path d="M14 14h20l2 26H12z" fill="#cdb98f"/><path d="M14 14l3 -4h14l3 4" fill="#b9a476"/><text x="24" y="32" text-anchor="middle" font-size="9" fill="#6d5a36">밀</text>`),
  matches: s(`<rect x="10" y="18" width="28" height="16" rx="1" fill="#b4544a"/><rect x="10" y="18" width="28" height="4" fill="#3a2a1c"/><path d="M16 26h16" stroke="#e7d3a8" stroke-width="2"/>`),
  paste: s(`<path d="M10 22h28l-3 16H13z" fill="#3a3a3a"/><ellipse cx="24" cy="22" rx="14" ry="4" fill="#e8e1cf"/>`),
  spools: s(`<g><rect x="7" y="16" width="10" height="18" fill="#5f7a4a"/><rect x="19" y="16" width="10" height="18" fill="#b4544a"/><rect x="31" y="16" width="10" height="18" fill="#d9b443"/><path d="M6 15h12M6 35h12M18 15h12M18 35h12M30 15h12M30 35h12" stroke="#8b6b45" stroke-width="2"/></g>`),
  drawing: s(`<rect x="8" y="10" width="32" height="28" fill="#efe7d3"/><path d="M14 32l6 -10l5 6l4 -4l6 8" stroke="#b4544a" stroke-width="2" fill="none"/><circle cx="31" cy="17" r="3" fill="#d9b443"/>`),
};

export function itemIcon(id) {
  return icons[id] || s(`<rect x="10" y="10" width="28" height="28" fill="#555"/>`);
}

export const allItemIds = Object.keys(icons);
