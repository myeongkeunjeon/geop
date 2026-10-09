// 저장/불러오기, 플래그, 소지품
const KEY = 'geop.save.v1';

export const WALLS = ['A', 'B', 'C', 'D'];
export const ERAS = ['2026', '2014', '1995', '1974', 'bare'];

function fresh() {
  return {
    playerName: '',
    era: '2026',
    wall: 'A',
    unlockedEras: ['2026'],
    inventory: [],
    flags: {},
    placed: {},
    ending: null,
    endingsSeen: [],
    stats: { startedAt: Date.now(), eraMoves: 0, solved: {}, wrong: {}, hints: {}, earlyPlace: 0 },
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // 나중에 필드가 늘어도 옛 저장이 깨지지 않게 기본값 위에 덮는다
    const base = fresh();
    const s = { ...base, ...data, stats: { ...base.stats, ...data.stats } };
    // 옛 플래그 이름 → 새 이름 (뜯기는 시대별로 peel_*, peeled_*)
    const f = s.flags;
    if (f.peelReady) (f.peel_2026 = true), delete f.peelReady;
    if (f.peeled2026) (f.peeled_2026 = true), delete f.peeled2026;
    // 다 쓴 아이템 정리
    if (f.cabinetOpen) s.inventory = s.inventory.filter((id) => id !== 'key');
    if (f.stoveLit) s.inventory = s.inventory.filter((id) => id !== 'matches');
    return s;
  } catch {
    return null;
  }
}

export const state = load() || fresh();

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // 사생활 보호 모드 등: 저장 없이 계속
  }
}

export function reset() {
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, fresh());
  save();
}

export const flag = (name) => !!state.flags[name];

export function setFlag(name, value = true) {
  if (value) state.flags[name] = true;
  else delete state.flags[name];
}

export const hasItem = (id) => state.inventory.includes(id);

export function addItem(id) {
  if (!hasItem(id)) state.inventory.push(id);
}

export function removeItem(id) {
  state.inventory = state.inventory.filter((x) => x !== id);
}

export function unlockEra(era) {
  if (!state.unlockedEras.includes(era)) state.unlockedEras.push(era);
}

export function goEra(era) {
  if (state.era === era) return;
  state.era = era;
  state.stats.eraMoves++;
}

export function turn(dir) {
  const i = WALLS.indexOf(state.wall);
  state.wall = WALLS[(i + dir + WALLS.length) % WALLS.length];
}
