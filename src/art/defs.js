// 모든 장면이 같이 쓰는 SVG defs (무늬, 필터, 그라데이션). 문서에 한 번만 넣는다.

const defs = /* svg */ `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
  <!-- 2026 흰 실크: 세로 미세 줄 -->
  <pattern id="p2026" width="6" height="40" patternUnits="userSpaceOnUse">
    <rect width="6" height="40" fill="#d4d2ca"/>
    <rect x="0" width="1" height="40" fill="#bdbbb3" opacity=".45"/>
    <rect x="3" width=".6" height="40" fill="#e6e4dc" opacity=".6"/>
  </pattern>

  <!-- 2014 꽃무늬 합지 -->
  <pattern id="p2014" width="34" height="34" patternUnits="userSpaceOnUse">
    <rect width="34" height="34" fill="#8fb0bf"/>
    <g fill="#e9eef0" opacity=".85">
      <circle cx="8" cy="5" r="2.6"/><circle cx="12" cy="8" r="2.6"/><circle cx="10.5" cy="12.5" r="2.6"/><circle cx="5.5" cy="12.5" r="2.6"/><circle cx="4" cy="8" r="2.6"/>
    </g>
    <circle cx="8" cy="9" r="1.7" fill="#c99a9a"/>
    <g transform="translate(17 17)">
      <g fill="#e9eef0" opacity=".7">
        <circle cx="8" cy="5" r="2"/><circle cx="11" cy="7.5" r="2"/><circle cx="10" cy="11" r="2"/><circle cx="6" cy="11" r="2"/><circle cx="5" cy="7.5" r="2"/>
      </g>
      <circle cx="8" cy="8.5" r="1.3" fill="#c99a9a"/>
    </g>
  </pattern>

  <!-- 1995 체크 비닐: 이중선 -->
  <pattern id="p1995" width="26" height="26" patternUnits="userSpaceOnUse">
    <rect width="26" height="26" fill="#7a5a3c"/>
    <g fill="#9b7a55">
      <rect y="0" width="26" height="1.4"/><rect y="4" width="26" height="1.4"/>
      <rect x="0" width="1.4" height="26"/><rect x="4" width="1.4" height="26"/>
    </g>
    <rect width="26" height="26" fill="#fff" opacity=".04"/>
  </pattern>

  <!-- 1974 종이 꽃벽지 -->
  <pattern id="p1974" width="30" height="36" patternUnits="userSpaceOnUse">
    <rect width="30" height="36" fill="#d8c9a3"/>
    <path d="M9 14 v12" stroke="#5f7a4a" stroke-width="1.2"/>
    <g fill="#b4544a"><circle cx="9" cy="8" r="2.4"/><circle cx="12.5" cy="10.5" r="2.4"/><circle cx="11" cy="14" r="2.4"/><circle cx="7" cy="14" r="2.4"/><circle cx="5.5" cy="10.5" r="2.4"/></g>
    <circle cx="9" cy="11.5" r="1.4" fill="#d9b443"/>
    <circle cx="24" cy="28" r="1.3" fill="#b4544a" opacity=".6"/>
  </pattern>

  <!-- 신문지 초배 -->
  <pattern id="pNews" width="44" height="30" patternUnits="userSpaceOnUse">
    <rect width="44" height="30" fill="#cfc4a6"/>
    <g fill="#6d6655" opacity=".45">
      <rect x="2" y="3" width="18" height="1.2"/><rect x="2" y="7" width="16" height="1.2"/><rect x="2" y="11" width="19" height="1.2"/><rect x="2" y="15" width="12" height="1.2"/>
      <rect x="24" y="3" width="18" height="1.2"/><rect x="24" y="7" width="18" height="1.2"/><rect x="24" y="11" width="10" height="1.2"/>
      <rect x="2" y="21" width="40" height="3" opacity=".8"/>
    </g>
  </pattern>

  <!-- 맨 벽 시멘트 -->
  <pattern id="pBare" width="80" height="80" patternUnits="userSpaceOnUse">
    <rect width="80" height="80" fill="#8a8883"/>
    <rect width="80" height="80" filter="url(#speck)" opacity=".5"/>
  </pattern>

  <!-- 장판 -->
  <pattern id="pFloor" width="78" height="78" patternUnits="userSpaceOnUse">
    <rect width="78" height="78" fill="#6f5c3b"/>
    <path d="M0 .5H78M.5 0V78" stroke="#000" stroke-opacity=".18"/>
    <circle cx="30" cy="40" r="10" fill="#7b6744" opacity=".35"/>
  </pattern>

  <linearGradient id="floorShade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".3"/>
    <stop offset=".3" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".35"/>
  </linearGradient>
  <linearGradient id="ceilShade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".38"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="cornerR" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".5"/>
  </linearGradient>
  <linearGradient id="cornerL" x1="1" y1="0" x2="0" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".5"/>
  </linearGradient>
  <radialGradient id="vignette" cx=".5" cy=".42" r=".75">
    <stop offset=".5" stop-color="#0a1716" stop-opacity="0"/>
    <stop offset=".85" stop-color="#0a1716" stop-opacity=".3"/>
    <stop offset="1" stop-color="#0a1716" stop-opacity=".62"/>
  </radialGradient>
  <!-- 흔들리는 알전구의 빛 웅덩이와 그 바깥 어둠 (fx 층) -->
  <radialGradient id="lampPool" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffe2a0" stop-opacity=".2"/>
    <stop offset=".45" stop-color="#ffe2a0" stop-opacity=".06"/>
    <stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="lampDark" cx=".5" cy=".5" r=".5">
    <stop offset=".32" stop-color="#081413" stop-opacity="0"/>
    <stop offset=".75" stop-color="#081413" stop-opacity=".22"/>
    <stop offset="1" stop-color="#081413" stop-opacity=".45"/>
  </radialGradient>
  <radialGradient id="bulbGlow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#fff4d0" stop-opacity=".9"/>
    <stop offset=".3" stop-color="#ffd98a" stop-opacity=".35"/>
    <stop offset="1" stop-color="#ffd98a" stop-opacity="0"/>
  </radialGradient>
  <!-- 천장 형광등 한 점에서 퍼지는 빛 -->
  <radialGradient id="bulb" cx=".5" cy=".12" r=".75">
    <stop offset="0" stop-color="#fbf6e6" stop-opacity=".16"/>
    <stop offset=".55" stop-color="#fbf6e6" stop-opacity=".05"/>
    <stop offset="1" stop-color="#fbf6e6" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#3f4b45"/>
    <stop offset=".5" stop-color="#55635b"/>
    <stop offset="1" stop-color="#3a453f"/>
  </linearGradient>
  <linearGradient id="enamel" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#b9b5a9"/>
    <stop offset=".35" stop-color="#d6d2c6"/>
    <stop offset="1" stop-color="#a29e92"/>
  </linearGradient>
  <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#86735a"/>
    <stop offset="1" stop-color="#6b5b46"/>
  </linearGradient>
  <linearGradient id="nightGlass" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1a2224"/>
    <stop offset="1" stop-color="#0b1012"/>
  </linearGradient>
  <linearGradient id="rust" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#5a4128" stop-opacity=".7"/>
    <stop offset="1" stop-color="#5a4128" stop-opacity="0"/>
  </linearGradient>
  <pattern id="pTile" width="18" height="18" patternUnits="userSpaceOnUse">
    <rect width="18" height="18" fill="#7d8079"/>
    <rect x="1" y="1" width="16" height="16" fill="#cdcbc2"/>
  </pattern>
  <pattern id="pEntry" width="40" height="40" patternUnits="userSpaceOnUse">
    <rect width="40" height="40" fill="#3c3a36"/>
    <rect x="1" y="1" width="38" height="38" fill="#5a5750"/>
  </pattern>
  <pattern id="pBrick" width="36" height="18" patternUnits="userSpaceOnUse">
    <rect width="36" height="18" fill="#2a2524"/>
    <path d="M0 .5H36M0 9.5H36M.5 0V9M18.5 9V18" stroke="#121010" stroke-width="1"/>
  </pattern>
  <linearGradient id="rot" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2b1f14" stop-opacity="0"/>
    <stop offset=".45" stop-color="#2b1f14" stop-opacity=".75"/>
    <stop offset="1" stop-color="#1a120b" stop-opacity=".95"/>
  </linearGradient>
  <linearGradient id="drip" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3f2219" stop-opacity=".85"/>
    <stop offset="1" stop-color="#3f2219" stop-opacity=".25"/>
  </linearGradient>
  <linearGradient id="flapBack" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ece8de"/>
    <stop offset=".6" stop-color="#cfcabe"/>
    <stop offset="1" stop-color="#8f8b82"/>
  </linearGradient>

  <!-- 오래 묵은 벽의 얼룩덜룩한 때 -->
  <filter id="grime" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".011 .018" numOctaves="4" seed="9"/>
    <feColorMatrix values="0 0 0 0 .30  0 0 0 0 .27  0 0 0 0 .19  3.2 0 0 0 -1.45"/>
  </filter>
  <filter id="grime2" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".035 .06" numOctaves="3" seed="27"/>
    <feColorMatrix values="0 0 0 0 .22  0 0 0 0 .24  0 0 0 0 .2  3 0 0 0 -1.6"/>
  </filter>
  <linearGradient id="scuff" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4a3f2e" stop-opacity="0"/>
    <stop offset="1" stop-color="#4a3f2e" stop-opacity=".38"/>
  </linearGradient>
  <linearGradient id="mattressTop" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#958e7e"/>
    <stop offset="1" stop-color="#7c7566"/>
  </linearGradient>
  <!-- 원근 방 (room.js) -->
  <linearGradient id="sideL" x1="1" y1="0" x2="0" y2="0">
    <stop offset="0" stop-color="#0a1312" stop-opacity=".38"/>
    <stop offset="1" stop-color="#0a1312" stop-opacity=".7"/>
  </linearGradient>
  <linearGradient id="sideR" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0a1312" stop-opacity=".38"/>
    <stop offset="1" stop-color="#0a1312" stop-opacity=".7"/>
  </linearGradient>
  <linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1b1c1a"/>
    <stop offset="1" stop-color="#3b3a35"/>
  </linearGradient>
  <linearGradient id="floorDepth" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0a0806" stop-opacity=".55"/>
    <stop offset=".12" stop-color="#0a0806" stop-opacity=".1"/>
    <stop offset=".55" stop-color="#0a0806" stop-opacity=".05"/>
    <stop offset="1" stop-color="#0a0806" stop-opacity=".7"/>
  </linearGradient>
  <radialGradient id="floorPool" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffe2a0" stop-opacity=".22"/>
    <stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="sideFace" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".45"/>
    <stop offset="1" stop-color="#000" stop-opacity=".6"/>
  </linearGradient>
  <!-- 손전등 (torch.js): 가면에서 검정 = 빛이 닿는 곳 -->
  <radialGradient id="torchHole" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#000"/>
    <stop offset=".55" stop-color="#000"/>
    <stop offset=".8" stop-color="#555"/>
    <stop offset="1" stop-color="#fff"/>
  </radialGradient>
  <radialGradient id="torchGlow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffe7b0" stop-opacity=".14"/>
    <stop offset=".7" stop-color="#ffe7b0" stop-opacity=".04"/>
    <stop offset="1" stop-color="#ffe7b0" stop-opacity="0"/>
  </radialGradient>
  <!-- 필름 입자 -->
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.4 0 0 0 -1"/>
  </filter>
  <filter id="speck" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" seed="3" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 .2  0 0 0 0 .2  0 0 0 0 .2  1.6 0 0 0 -.7"/>
  </filter>
  <!-- 곰팡이·물자국 가장자리 일그러뜨리기 -->
  <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="11" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="mold" x="-30%" y="-30%" width="160%" height="160%">
    <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="4" seed="5" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="1.2"/>
  </filter>
  <!-- 벽지 뒤에서 밀어 올린 자국: 모양을 높이로 보고 왼쪽 위 빛으로 음영만 낸다 -->
  <filter id="bulge" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3.2" result="h"/>
    <feDiffuseLighting in="h" surfaceScale="4" diffuseConstant="1" lighting-color="#fff" result="lit">
      <feDistantLight azimuth="225" elevation="50"/>
    </feDiffuseLighting>
    <feColorMatrix in="lit" result="sh" values="0 0 0 0 .2  0 0 0 0 .19  0 0 0 0 .16  -1.6 0 0 0 1.23"/>
    <feColorMatrix in="lit" result="hi" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 .96  2.4 0 0 0 -1.84"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="hi"/></feMerge>
  </filter>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="soft1" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.1"/></filter>
  <!-- 아래 층에 드리우는 안쪽 그림자 -->
  <filter id="inset" x="-10%" y="-10%" width="120%" height="120%">
    <feComponentTransfer in="SourceAlpha" result="inv"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>
    <feGaussianBlur in="inv" stdDeviation="2.6"/>
    <feOffset dx="-2" dy="3" result="s"/>
    <feFlood flood-color="#000" flood-opacity=".8"/>
    <feComposite in2="s" operator="in"/>
    <feComposite in2="SourceAlpha" operator="in" result="shadow"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shadow"/></feMerge>
  </filter>
</defs>
</svg>`;

export function installDefs() {
  if (document.getElementById('geop-defs')) return;
  const wrap = document.createElement('div');
  wrap.id = 'geop-defs';
  wrap.innerHTML = defs;
  document.body.prepend(wrap);
}
