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
//   places   엔딩 B: 제자리에 둔 물건 (state.placed)

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
    { target: 'corner', use: 'spray', forbids: ['blackout'], text: 'corner_spray_early', then: 'spray' },
    { target: 'corner', use: 'cutter', requires: ['cornerWet'], forbids: ['peel_2026', 'peeled_2026'], text: 'corner_lift', then: 'peel' },
    { target: 'corner', requires: ['peeled_2026'], then: 'strip' },
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
    // 분무기는 정전과 상관없이 얻는다
    { target: 'sink', forbids: ['gotSpray'], gives: ['spray'], sets: ['gotSpray'], text: 'sink_spray', then: 'fillWater', solve: 'P2' },
    { target: 'sink', text: 'sink_after' },
    { target: 'door', use: 'drawing', text: 'drawing_too_early' },
  ]),

  ...era('2014', [
    // 현관
    { target: 'door', use: 'drawing', text: 'drawing_too_early' },
    { target: 'door', text: 'door14' },
    { target: 'backpack', text: 'backpack14' },
    { target: 'flyers', text: 'flyers14' },
    { target: 'sneakers', text: 'sneakers14' },

    // 귀퉁이와 책상
    { target: 'desk', use: 'notice', requires: ['reachedBare'], takes: ['notice'], places: 'notice', text: 'notice_placed', then: 'placed' },
    { target: 'desk', use: 'notice', forbids: ['reachedBare'], sets: ['triedNoticeEarly'], text: 'notice_too_early', then: 'early' },
    { target: 'desk', forbids: ['drawerOpen'], text: 'desk_locked', then: 'lock' },
    { target: 'desk', text: 'desk_open' },
    { target: 'radio', then: 'radio' },
    { target: 'postit', text: 'postit14' },
    { target: 'corner', use: 'hera', forbids: ['w14Wet'], text: 'wont_budge' },
    { target: 'corner', use: 'spray', forbids: ['w14Wet'], sets: ['w14Wet'], text: 'flower_wet', then: 'spray' },
    { target: 'corner', use: 'hera', requires: ['w14Wet'], forbids: ['peel_2014', 'peeled_2014'], text: 'flower_lift', then: 'peel' },
    { target: 'corner', use: 'cutter', text: 'cutter14' },
    { target: 'corner', then: 'strip' },

    // 창문
    { target: 'window', text: 'window14' },
    { target: 'bed', text: 'bed14' },

    // 부엌
    { target: 'kettle', text: 'kettle14' },
    { target: 'noodles', text: 'noodles14' },
    { target: 'fridge', text: 'fridge14' },
  ]),

  ...era('1995', [
    // 현관
    { target: 'door', use: 'drawing', text: 'drawing_too_early' },
    { target: 'door', text: 'door95' },
    { target: 'shoes', text: 'shoes95' },
    { target: 'umbrella', text: 'umbrella95' },

    // 귀퉁이: 벽시계, 자개장, 체크 비닐
    { target: 'clock', forbids: ['gotKey'], text: 'clock95', then: 'clock' },
    { target: 'clock', text: 'clock95_after' },
    { target: 'cabinet', use: 'key', forbids: ['cabinetOpen'], text: 'cabinet_key', then: 'crane' },
    { target: 'cabinet', forbids: ['cabinetOpen'], text: 'cabinet_locked' },
    { target: 'cabinet', text: 'cabinet_after' },
    { target: 'check', use: 'spray', forbids: ['scored'], text: 'beads' },
    { target: 'check', use: 'cutter', forbids: ['scored'], text: 'score_start', then: 'score' },
    { target: 'check', use: 'spray', requires: ['scored'], forbids: ['peel_1995', 'peeled_1995'], sets: ['check95Wet'], text: 'vinyl_wet', then: 'peel' },
    { target: 'check', use: 'hera', text: 'hera95' },
    { target: 'check', requires: ['scored'], text: 'check_scored' },
    { target: 'check', text: 'check_look' },
    { target: 'corner', use: 'spray', text: 'beads' },
    { target: 'corner', use: 'cutter', requires: ['cabinetOpen'], text: 'cutter95_upper' },
    { target: 'corner', use: 'cutter', text: 'cutter95_hidden' },
    { target: 'corner', use: 'hera', text: 'hera95' },
    { target: 'cabinet', use: 'cutter', text: 'cutter95_cabinet' },
    { target: 'corner', then: 'strip' },

    // 창문: 결혼사진, TV, 빈 반지함
    { target: 'ringbox', use: 'ring', requires: ['reachedBare'], takes: ['ring'], places: 'ring', text: 'ring_placed', then: 'placed' },
    { target: 'ringbox', use: 'ring', forbids: ['reachedBare'], sets: ['triedRingEarly'], text: 'ring_too_early', then: 'early' },
    { target: 'ringbox', text: 'ringbox95' },
    { target: 'photo', text: 'photo95' },
    { target: 'tv', text: 'tv95' },
    { target: 'window', text: 'window95' },

    // 부엌
    { target: 'cupboard', text: 'cupboard95' },
    { target: 'stove', text: 'stove95' },
  ]),

  ...era('1974', [
    // 현관
    { target: 'door', use: 'drawing', text: 'drawing_too_early' },
    { target: 'door', text: 'door74' },
    { target: 'hearth', text: 'hearth74' },
    { target: 'briquettes', text: 'briquettes74' },
    { target: 'step', text: 'step74' },

    // 재봉틀과 실꽂이
    { target: 'machine', forbids: ['gotSpools'], gives: ['spools'], sets: ['gotSpools'], text: 'machine_doodle' },
    { target: 'machine', requires: ['spoolsDone'], text: 'machine_open' },
    { target: 'machine', text: 'machine_after' },
    { target: 'spindle', use: 'spools', forbids: ['spoolsDone'], then: 'spools' },
    { target: 'machine', use: 'spools', forbids: ['spoolsDone'], then: 'spools' },
    { target: 'machine', requires: ['gotSpools'], forbids: ['spoolsDone'], text: 'machine_try' },
    { target: 'spindle', requires: ['spoolsDone'], text: 'spindle_done' },
    { target: 'spindle', requires: ['gotSpools'], then: 'spools' },
    { target: 'spindle', text: 'spindle_empty' },
    { target: 'flower', text: 'flower74' },

    // 신문지 초배
    { target: 'corner', use: 'hera', forbids: ['w74Wet'], text: 'wont_budge' },
    { target: 'corner', use: 'spray', forbids: ['w74Wet'], sets: ['w74Wet'], text: 'news_wet', then: 'spray' },
    { target: 'corner', use: 'hera', requires: ['w74Wet'], forbids: ['peel_1974', 'peeled_1974'], text: 'news_lift', then: 'news' },
    { target: 'corner', use: 'cutter', text: 'cutter74' },
    { target: 'corner', then: 'strip' },

    // 창문
    { target: 'window', text: 'window74' },
    { target: 'quilt', text: 'quilt74' },
    { target: 'crayons', text: 'crayons74' },

    // 부엌: 풀 쑤기
    { target: 'stove', use: 'matches', forbids: ['stoveLit'], takes: ['matches'], sets: ['stoveLit'], text: 'stove_lit', then: 'fire' },
    { target: 'stove', requires: ['stoveLit'], text: 'stove_warm' },
    { target: 'stove', text: 'stove_cold' },
    { target: 'pot', use: 'flour', requires: ['stoveLit'], forbids: ['floured'], takes: ['flour'], sets: ['floured'], text: 'pot_flour' },
    { target: 'pot', use: 'flour', text: 'pot_noflame' },
    { target: 'pot', use: 'spray', requires: ['floured'], forbids: ['gotPaste'], gives: ['paste'], sets: ['gotPaste'], text: 'pot_paste', then: 'stir', solve: 'P10' },
    { target: 'pot', use: 'spray', text: 'pot_water' },
    { target: 'pot', requires: ['gotPaste'], text: 'pot_after' },
    { target: 'pot', requires: ['floured'], text: 'pot_floured' },
    { target: 'pot', text: 'pot_empty' },
    { target: 'table', text: 'table74' },
    { target: 'height', text: 'height74' },
  ]),

  // 아직 그리지 않은 시대: 귀퉁이를 누르면 시대 이동 띠
  ...['bare'].flatMap((e) => era(e, [{ target: 'corner', then: 'strip' }])),
];
