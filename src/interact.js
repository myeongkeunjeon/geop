// 조사/아이템 사용 처리 (데이터 기반)
import { state, flag, setFlag, addItem, removeItem, hasItem } from './state.js';
import { actions } from './data/actions.js';

function matches(rule, target, use) {
  return (
    rule.era === state.era &&
    rule.target === target &&
    rule.use === use &&
    rule.requires.every(flag) &&
    !rule.forbids.some(flag)
  );
}

// 규칙을 찾아 상태를 바꾸고, 화면이 할 일을 돌려준다
//   { text, gained: [아이템], then } 또는 맞는 규칙이 없으면 { text: 'use_nothing' }
export function act(target, use = null) {
  const rule = actions.find((r) => matches(r, target, use));
  if (!rule) {
    if (use) state.stats.wrong[target] = (state.stats.wrong[target] || 0) + 1;
    return { text: use ? 'use_nothing' : null, gained: [], then: null };
  }
  if (rule.text === 'wont_budge') state.stats.wrong[target] = (state.stats.wrong[target] || 0) + 1;

  rule.takes.forEach(removeItem);
  const gained = rule.gives.filter((id) => !hasItem(id));
  gained.forEach(addItem);
  rule.sets.forEach((f) => setFlag(f));
  if (rule.solve) state.stats.solved[rule.solve] ??= Date.now();
  if (rule.places) state.placed[rule.places] = true;
  return { text: rule.text, gained, then: rule.then || null };
}
