// "이 물건에 이 아이템을 쓰면" 규칙표. 위에서부터 처음 맞는 규칙 하나만 쓴다.
//   era      시대
//   target   핫스팟 id
//   use      쓰는 아이템 id. 없으면(null) 조사(그냥 탭)
//   requires 모두 켜져 있어야 하는 플래그
//   forbids  모두 꺼져 있어야 하는 플래그
//   gives    얻는 아이템   takes 잃는 아이템   sets 켜는 플래그
//   text     text.js lines 키
//   then     이어서 일어날 이벤트 (main.js events)
//   solve    푼 퍼즐 번호 (통계: 처음 푼 시각)

const era = (e, rules) => rules.map((r) => ({ era: e, use: null, requires: [], forbids: [], gives: [], takes: [], sets: [], ...r }));

export const actions = [
  ...era('2026', [
    // 현관
    { target: 'door', text: 'door' },
    { target: 'mailbox', forbids: ['gotMail'], gives: ['postcard', 'notice'], sets: ['gotMail'], text: 'mailbox_get' },
    { target: 'mailbox', text: 'mailbox_empty' },
    { target: 'shoes', forbids: ['gotCutter'], gives: ['cutter'], sets: ['gotCutter'], text: 'shoes_get' },
    { target: 'shoes', text: 'shoes_after' },
    { target: 'bag', forbids: ['gotBag'], gives: ['bag'], sets: ['gotBag'], text: 'bag_get' },

    // 귀퉁이
    { target: 'box', use: 'cutter', forbids: ['boxOpen'], gives: ['flashlight'], sets: ['boxOpen'], text: 'box_open', then: 'blackout', solve: 'P1' },
    { target: 'box', forbids: ['boxOpen'], text: 'box_look' },
    { target: 'box', text: 'box_empty' },
    { target: 'corner', use: 'cutter', forbids: ['cornerWet'], text: 'wont_budge' },
    { target: 'corner', use: 'spray', requires: ['blackout'], forbids: ['cornerWet'], sets: ['cornerWet'], text: 'corner_wet', then: 'spray' },
    { target: 'corner', use: 'cutter', requires: ['cornerWet'], forbids: ['peelReady'], text: 'corner_lift', then: 'peel' },
    { target: 'corner', requires: ['cornerWet'], text: 'corner_wet_look' },
    { target: 'corner', requires: ['blackout'], text: 'corner_look_dark' },
    { target: 'corner', text: 'corner_look' },

    // 창문
    { target: 'window', text: 'window' },
    { target: 'mattress', forbids: ['mattressMoved'], sets: ['mattressMoved'], text: 'mattress_push' },
    { target: 'mattress', text: 'mattress_after' },
    { target: 'floor', forbids: ['gotRing'], gives: ['ring'], sets: ['gotRing'], text: 'floor_ring' },
    { target: 'floor', text: 'floor_after' },

    // 부엌
    { target: 'fridge', text: 'fridge' },
    { target: 'sink', use: 'flashlight', requires: ['blackout'], forbids: ['gotSpray'], gives: ['spray'], sets: ['gotSpray'], text: 'sink_spray', then: 'fillWater', solve: 'P2' },
    { target: 'sink', requires: ['gotSpray'], text: 'sink_after' },
    { target: 'sink', requires: ['blackout'], text: 'sink_dark2' },
    { target: 'sink', text: 'sink_dark' },
  ]),
];
