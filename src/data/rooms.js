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
  2014: {
    A: {
      hotspots: [
        { id: 'door', label: '현관문', x: 150, y: 110, w: 100, h: 356 },
        { id: 'backpack', label: '가방', x: 40, y: 184, w: 62, h: 96 },
        { id: 'flyers', label: '전단', x: 92, y: 496, w: 76, h: 44 },
        { id: 'sneakers', label: '운동화', x: 168, y: 498, w: 74, h: 34 },
      ],
    },
    B: {
      hotspots: [
        { id: 'corner', label: '귀퉁이', x: 278, y: 44, w: 112, h: 236 },
        { id: 'desk', label: '책상', x: 38, y: 330, w: 216, h: 144 },
        { id: 'radio', label: '라디오', x: 60, y: 270, w: 100, h: 62 },
        { id: 'postit', label: '포스트잇', x: 190, y: 220, w: 48, h: 48 },
      ],
    },
    C: {
      hotspots: [
        { id: 'window', label: '창문', x: 110, y: 70, w: 170, h: 170 },
        { id: 'bed', label: '접이식 침대', x: 22, y: 444, w: 326, h: 84 },
      ],
    },
    D: {
      hotspots: [
        { id: 'kettle', label: '전기포트', x: 48, y: 236, w: 54, h: 54 },
        { id: 'noodles', label: '컵라면', x: 104, y: 236, w: 82, h: 54 },
        { id: 'fridge', label: '냉장고', x: 254, y: 302, w: 96, h: 172 },
      ],
    },
  },
  1995: {
    A: {
      hotspots: [
        { id: 'door', label: '현관문', x: 150, y: 110, w: 100, h: 356 },
        { id: 'shoes', label: '신발장', x: 18, y: 250, w: 118, h: 226 },
        { id: 'umbrella', label: '우산꽂이', x: 270, y: 326, w: 64, h: 150 },
      ],
    },
    B: {
      hotspots: [
        // 귀퉁이 윗부분은 자개장 위로 늘 보인다 (시대 이동)
        { id: 'corner', label: '귀퉁이', x: 278, y: 44, w: 112, h: 100 },
        { id: 'clock', label: '벽시계', x: 34, y: 76, w: 88, h: 176 },
        { id: 'cabinet', label: '자개장', x: 208, y: 150, w: 178, h: 326, hideIf: 'cabinetOpen' },
        { id: 'cabinet', label: '자개장', x: 146, y: 150, w: 152, h: 326, showIf: 'cabinetOpen' },
        { id: 'check', label: '드러난 귀퉁이', x: 298, y: 146, w: 92, h: 330, showIf: 'cabinetOpen' },
      ],
    },
    C: {
      hotspots: [
        { id: 'window', label: '창문', x: 110, y: 70, w: 170, h: 170 },
        { id: 'photo', label: '결혼사진', x: 270, y: 260, w: 82, h: 100 },
        { id: 'tv', label: 'TV', x: 50, y: 270, w: 130, h: 130 },
        { id: 'ringbox', label: '반지함', x: 196, y: 366, w: 46, h: 36 },
      ],
    },
    D: {
      hotspots: [
        { id: 'cupboard', label: '찬장', x: 30, y: 110, w: 180, h: 186 },
        { id: 'stove', label: '곤로', x: 244, y: 360, w: 92, h: 116 },
      ],
    },
  },
};

// 아직 그리지 않은 시대: 벽 B 귀퉁이만 있어 시대 이동 띠로 돌아갈 수 있다
for (const era of ['1974', 'bare']) {
  rooms[era] ??= { B: { hotspots: [{ id: 'corner', label: '귀퉁이', x: 278, y: 44, w: 112, h: 236 }] } };
}

export function hotspotsFor(era, wall, flags) {
  const room = rooms[era]?.[wall];
  if (!room) return [];
  return room.hotspots.filter((h) => (!h.showIf || flags[h.showIf]) && (!h.hideIf || !flags[h.hideIf]));
}
