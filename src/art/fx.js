// 움직이는 층: 그림 위에 따로 얹는 가벼운 SVG (무거운 필터 없음).
// 정지 그림은 한 번만 그리고, 여기 것만 계속 움직여서 폰에서도 부드럽다.
import { W, H, rng } from './common.js';

// 천장에 매달려 흔들리는 알전구. 빛 웅덩이와 바깥 어둠이 같이 흔들린다
export function lamp({ off = false, x = 195 } = {}) {
  if (off) return '';
  return `
  <g class="fx-swing" style="transform-origin:${x}px -70px">
    <circle cx="${x}" cy="62" r="340" fill="url(#lampPool)"/>
    <circle cx="${x}" cy="62" r="760" fill="url(#lampDark)"/>
    <path d="M${x} -70V48" stroke="#1a1714" stroke-width="1.4"/>
    <rect x="${x - 4}" y="44" width="8" height="9" rx="1.5" fill="#2a2622"/>
    <circle cx="${x}" cy="62" r="26" fill="url(#bulbGlow)"/>
    <ellipse cx="${x}" cy="61" rx="6.5" ry="8" fill="#fff1c8"/>
    <path d="M${x - 2} 58q2 4 4 0" stroke="#c98a2c" stroke-width=".8" fill="none"/>
  </g>
  <rect class="fx-flicker" width="${W}" height="${H}" fill="#06100f"/>`;
}

// 빛 속을 떠다니는 먼지
export function motes(seed, cx = 195, cy = 110) {
  const r = rng(seed);
  let s = '';
  for (let i = 0; i < 7; i++) {
    const x = cx + (r() - 0.5) * 160;
    const y = cy + (r() - 0.5) * 120;
    const dx = (r() - 0.5) * 30;
    const dy = 10 + r() * 30;
    const dur = 9 + r() * 8;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6 + r() * 0.8).toFixed(1)}" fill="#fff6dc">
      <animateTransform attributeName="transform" type="translate" values="0 0;${dx.toFixed(1)} ${dy.toFixed(1)};0 0" dur="${dur.toFixed(1)}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;.7;.2;.6;0" dur="${(dur * 0.8).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`;
  }
  return `<g>${s}</g>`;
}

// 벽을 기어다니다 멈췄다 하는 파리
export function fly(path, dur = 16, begin = 0) {
  return `<g>
    <g>
      <ellipse cx="1.2" cy="1.6" rx="3.6" ry="2.2" fill="#000" opacity=".22"/>
      <path d="M-2 -1l-2 -2.5M0 -1.4l0 -3M2 -1l2 -2.5M-2 1l-2 2.5M0 1.4l0 3M2 1l2 2.5" stroke="#111" stroke-width=".5"/>
      <ellipse cx="-.8" cy="-1.6" rx="3" ry="1.3" fill="#c9d4d6" opacity=".55" transform="rotate(-18 -.8 -1.6)"/>
      <ellipse cx="-.8" cy="1.6" rx="3" ry="1.3" fill="#c9d4d6" opacity=".55" transform="rotate(18 -.8 1.6)"/>
      <ellipse cx="0" cy="0" rx="3.3" ry="2" fill="#151515"/>
      <circle cx="3.2" cy="0" r="1.5" fill="#2a1a16"/>
      <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" rotate="auto"
        keyPoints="0;.18;.18;.42;.42;.7;.7;1" keyTimes="0;.12;.3;.42;.55;.68;.85;1" calcMode="linear" path="${path}"/>
    </g>
  </g>`;
}

// 맺혔다 떨어지는 물방울
export function drip(x, y, fall, { dur = 4, begin = 0, color = '#a6b9bb' } = {}) {
  const k = '0;.7;.84;.85;1';
  return `<g>
    <ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.2" fill="${color}" opacity=".85">
      <animate attributeName="cy" values="${y};${y + 1.5};${y + fall};${y + fall};${y}" keyTimes="${k}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <animate attributeName="ry" values=".4;2.6;2.4;0;.4" keyTimes="${k}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <animate attributeName="rx" values=".4;1.7;1.4;0;.4" keyTimes="${k}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="${x}" cy="${y + fall}" rx="5" ry="1.4" fill="none" stroke="${color}" stroke-width=".8" opacity="0">
      <animate attributeName="opacity" values="0;0;.8;0" keyTimes="0;.84;.86;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </ellipse>
  </g>`;
}

// 현관 문틈 불빛. 그 속의 두 그림자가 이따금 움직이고, 사라졌다 돌아온다
export function doorFeet() {
  const dur = 23;
  const k = '0;.4;.43;.6;.62;.8;.83;1';
  return `<g>
    <rect x="152" y="471" width="96" height="3" fill="#e8c97a" opacity=".85"/>
    <ellipse cx="200" cy="482" rx="56" ry="6" fill="#e8c97a" opacity=".1"/>
    <g fill="#16140f">
      <rect y="470.5" width="12" height="4">
        <animate attributeName="x" values="179;179;175;175;175;175;179;179" keyTimes="${k}" dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;1;1;1;0;0;1;1" keyTimes="${k}" dur="${dur}s" repeatCount="indefinite"/>
      </rect>
      <rect y="470.5" width="12" height="4">
        <animate attributeName="x" values="207;207;206;206;206;206;207;207" keyTimes="${k}" dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;1;1;1;0;0;1;1" keyTimes="${k}" dur="${dur}s" repeatCount="indefinite"/>
      </rect>
    </g>
  </g>`;
}

// 숨 쉬듯 밝아졌다 어두워지는 기포
export function breathe(x, y, rx, ry, dur = 5) {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity="0">
    <animate attributeName="opacity" values="0;.22;0" dur="${dur}s" repeatCount="indefinite"/>
  </ellipse>`;
}

// 얼룩 자국을 따라 아주 천천히 내려오는 검붉은 방울
export function creep(path, dur = 26) {
  return `<ellipse rx="2.2" ry="3" fill="#3f2219">
    <animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}"/>
    <animate attributeName="opacity" values="0;.9;.9;0" keyTimes="0;.1;.85;1" dur="${dur}s" repeatCount="indefinite"/>
  </ellipse>`;
}

// 이웃집 창에 잠깐 켜졌다 꺼지는 불
export function neighborLight(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e3c27a" opacity="0">
    <animate attributeName="opacity" values="0;0;.55;.55;0;0" keyTimes="0;.62;.63;.72;.73;1" dur="19s" repeatCount="indefinite"/>
  </rect>`;
}
