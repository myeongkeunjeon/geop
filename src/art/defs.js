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
    <stop offset="0" stop-color="#000" stop-opacity=".35"/>
    <stop offset=".25" stop-color="#000" stop-opacity=".05"/>
    <stop offset="1" stop-color="#000" stop-opacity=".55"/>
  </linearGradient>
  <linearGradient id="ceilShade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity=".6"/>
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
  <radialGradient id="vignette" cx=".5" cy=".42" r=".72">
    <stop offset=".38" stop-color="#000" stop-opacity="0"/>
    <stop offset=".8" stop-color="#000" stop-opacity=".55"/>
    <stop offset="1" stop-color="#000" stop-opacity=".9"/>
  </radialGradient>
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
