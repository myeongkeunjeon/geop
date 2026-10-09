// 소리 (Web Audio). 첫 탭 이후에만 켜진다. 실패하면 조용히 무음.
// 지금은 짧은 합성음만. 재질별 뜯기 소리·배경 소음은 7단계에서.
let ctx = null;

export function unlockAudio() {
  if (ctx) return;
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    ctx = null;
  }
}

function tone(freq, dur, gain = 0.05, type = 'sine') {
  if (!ctx) return;
  try {
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* 무음 */
  }
}

export function play(name) {
  if (name === 'pickup') {
    tone(520, 0.12, 0.04);
    setTimeout(() => tone(780, 0.18, 0.03), 70);
  } else if (name === 'tap') {
    tone(180, 0.06, 0.03, 'triangle');
  }
}

export function vibrate(ms) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* 없음 */
  }
}
