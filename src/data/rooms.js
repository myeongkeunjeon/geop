// 시대×벽별 물건 배치와 핫스팟. 좌표는 장면 390×600 기준
//   벽 0~470, 걸레받이, 장판 바닥 470~600
//   showIf / hideIf: 플래그에 따라 보이고 숨김

export const rooms = {
  2026: {
    A: {
      hotspots: [
        { id: 'door', label: '현관문', x: 150, y: 110, w: 100, h: 366 },
        { id: 'mailbox', label: '우편함', x: 268, y: 206, w: 84, h: 64 },
        { id: 'shoes', label: '신발장', x: 22, y: 296, w: 110, h: 182 },
        { id: 'bag', label: '도배 가방', x: 268, y: 436, w: 104, h: 84, hideIf: 'gotBag' },
      ],
    },
    B: {
      art: true, // 시안 그림 (art/2026.js)
      hotspots: [
        { id: 'corner', label: '귀퉁이', x: 278, y: 44, w: 112, h: 236 },
        { id: 'box', label: '이삿짐 상자', x: 42, y: 348, w: 172, h: 156 },
      ],
    },
    C: {
      hotspots: [
        { id: 'window', label: '창문', x: 110, y: 70, w: 170, h: 170 },
        { id: 'mattress', label: '매트리스', x: 30, y: 432, w: 300, h: 112, hideIf: 'mattressMoved' },
        { id: 'mattress', label: '매트리스', x: 18, y: 196, w: 96, h: 290, showIf: 'mattressMoved' },
        { id: 'floor', label: '들뜬 장판', x: 200, y: 500, w: 140, h: 76, showIf: 'mattressMoved' },
      ],
    },
    D: {
      hotspots: [
        { id: 'sink', label: '싱크대 아래', x: 30, y: 300, w: 190, h: 176 },
        { id: 'fridge', label: '냉장고', x: 252, y: 140, w: 116, h: 340 },
      ],
    },
  },
};

export function hotspotsFor(era, wall, flags) {
  const room = rooms[era]?.[wall];
  if (!room) return [];
  return room.hotspots.filter((h) => (!h.showIf || flags[h.showIf]) && (!h.hideIf || !flags[h.hideIf]));
}
