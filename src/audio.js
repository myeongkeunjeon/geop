// 소리 (Web Audio). 첫 탭 이후에만 켜진다. 실패하면 조용히 무음.
// 소리 파일 없이 합성음으로 만든다. 배경 소음은 7단계에서.
let ctx = null;
let noiseBuf = null;

export function unlockAudio() {
  if (ctx) return;
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    ctx = null;
  }
}

function noise() {
  if (!noiseBuf) {
    const len = ctx.sampleRate * 2;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

// 걸러 낸 잡음 한 토막: 찢기, 숨, 분무
function burst({ dur, type = 'bandpass', freq, freqTo, q = 1, gain = 0.2, attack = 0.005, at = 0 }) {
  const t = ctx.currentTime + at;
  const src = ctx.createBufferSource();
  src.buffer = noise();
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  if (freqTo) f.frequency.exponentialRampToValueAtTime(freqTo, t + dur);
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(ctx.destination);
  src.start(t, Math.random() * 1.5, dur + 0.05);
}

function tone(freq, dur, { gain = 0.05, type = 'sine', to, at = 0 } = {}) {
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur);
}

const sounds = {
  tap: () => tone(180, 0.06, { gain: 0.03, type: 'triangle' }),
  pickup: () => {
    tone(520, 0.12, { gain: 0.04 });
    tone(780, 0.18, { gain: 0.03, at: 0.07 });
  },
  // 실크 벽지: 깨끗하게 쫙
  tear: () => burst({ dur: 0.05 + Math.random() * 0.06, type: 'highpass', freq: 2200 + Math.random() * 1800, q: 0.7, gain: 0.22 }),
  // 젖은 합지: 축축하고 느리게
  tearWet: () => burst({ dur: 0.1 + Math.random() * 0.08, type: 'bandpass', freq: 700 + Math.random() * 500, q: 0.6, gain: 0.26, attack: 0.02 }),
  // 자물쇠: 덜컥 / 찰칵
  rattle: () => {
    for (let i = 0; i < 3; i++) burst({ dur: 0.05, type: 'bandpass', freq: 1800, q: 3, gain: 0.25, at: i * 0.06 });
    tone(120, 0.12, { gain: 0.12, type: 'square', at: 0.02 });
  },
  unlock: () => {
    burst({ dur: 0.04, type: 'highpass', freq: 2500, gain: 0.3 });
    tone(900, 0.05, { gain: 0.1, type: 'square', at: 0.05 });
    burst({ dur: 0.18, type: 'lowpass', freq: 500, gain: 0.2, at: 0.12 });
  },
  dial: () => tone(2400, 0.015, { gain: 0.04, type: 'square' }),
  // 신문지: 바스락
  tearPaper: () => {
    for (let i = 0; i < 3; i++) burst({ dur: 0.03 + Math.random() * 0.03, type: 'highpass', freq: 2500 + Math.random() * 2500, gain: 0.18, at: i * 0.025 });
  },
  paper: () => burst({ dur: 0.4, type: 'highpass', freq: 3000, gain: 0.12, attack: 0.05 }),
  // 성냥과 연탄불: 치익, 화르르
  fire: () => {
    burst({ dur: 0.25, type: 'highpass', freq: 3500, gain: 0.22 });
    burst({ dur: 1.2, type: 'lowpass', freq: 600, gain: 0.18, attack: 0.3, at: 0.2 });
  },
  // 풀 젓기: 질척
  stir: () => {
    for (let i = 0; i < 4; i++) burst({ dur: 0.15, type: 'lowpass', freq: 500, gain: 0.2, at: i * 0.22 });
  },
  // 비닐: 칼집 따라 바삭하게
  tearVinyl: () => burst({ dur: 0.06 + Math.random() * 0.05, type: 'highpass', freq: 1400 + Math.random() * 900, q: 1.2, gain: 0.24 }),
  // 커터칼 칼집: 쓱
  cut: () => burst({ dur: 0.22, type: 'bandpass', freq: 2600, freqTo: 4200, q: 2, gain: 0.22, attack: 0.02 }),
  // 시계·학: 맑은 종소리
  chime: () => {
    tone(880, 1.2, { gain: 0.06 });
    tone(1320, 1.4, { gain: 0.04, at: 0.18 });
    tone(660, 1.6, { gain: 0.05, at: 0.36 });
  },
  // 조각이 떨어짐
  drop: () => {
    tone(110, 0.35, { gain: 0.25, to: 38 });
    burst({ dur: 0.4, type: 'lowpass', freq: 900, freqTo: 200, gain: 0.25 });
  },
  // 벽이 숨을 들이쉼
  inhale: () => burst({ dur: 1.9, type: 'bandpass', freq: 380, freqTo: 1100, q: 2, gain: 0.16, attack: 1.1 }),
  // 정전: 툭
  blackout: () => {
    tone(70, 0.18, { gain: 0.3, type: 'square', to: 40 });
    burst({ dur: 0.25, type: 'lowpass', freq: 400, gain: 0.3 });
  },
  // 손전등 스위치: 딸깍
  click: () => {
    tone(1800, 0.02, { gain: 0.12, type: 'square' });
    burst({ dur: 0.03, type: 'highpass', freq: 3000, gain: 0.2 });
  },
  // 수돗물 받는 소리
  water: () => {
    burst({ dur: 1.3, type: 'bandpass', freq: 900, freqTo: 1500, q: 1.5, gain: 0.12, attack: 0.1 });
    for (let i = 0; i < 10; i++) tone(300 + Math.random() * 500, 0.05, { gain: 0.03, at: i * 0.11 + Math.random() * 0.05 });
  },
  // 분무: 칙
  spray: () => burst({ dur: 0.28, type: 'highpass', freq: 4500, gain: 0.18, attack: 0.01 }),
};

// 라디오: 주파수가 맞을수록 잡음이 줄고 노래가 들린다 (signal 0~1)
let radioNodes = null;
export const radioSound = {
  start() {
    if (!ctx || radioNodes) return;
    try {
      const src = ctx.createBufferSource();
      src.buffer = noise();
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = 2200;
      f.Q.value = 0.5;
      const g = ctx.createGain();
      g.gain.value = 0.12;
      src.connect(f).connect(g).connect(ctx.destination);
      src.start();
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = 330;
      og.gain.value = 0;
      o.connect(og).connect(ctx.destination);
      o.start();
      // 오래된 라디오 노래처럼 느리게 오르내리는 음
      const notes = [330, 392, 440, 392, 349, 330, 294, 330];
      let i = 0;
      const timer = setInterval(() => o.frequency.setTargetAtTime(notes[i++ % notes.length], ctx.currentTime, 0.08), 520);
      radioNodes = { src, g, o, og, timer };
    } catch {
      radioNodes = null;
    }
  },
  set(signal) {
    if (!radioNodes) return;
    const t = ctx.currentTime;
    radioNodes.g.gain.setTargetAtTime(0.13 * (1 - signal) + 0.008, t, 0.05);
    radioNodes.og.gain.setTargetAtTime(0.045 * signal, t, 0.05);
  },
  stop() {
    if (!radioNodes) return;
    try {
      clearInterval(radioNodes.timer);
      radioNodes.src.stop();
      radioNodes.o.stop();
    } catch {
      /* 이미 멈춤 */
    }
    radioNodes = null;
  },
};

export function play(name) {
  if (!ctx) return;
  try {
    sounds[name]?.();
  } catch {
    /* 무음 */
  }
}

export function vibrate(ms) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* 없음 */
  }
}
