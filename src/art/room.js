// 원근 방: 뒷벽(각 시대의 벽 그림)을 가운데 두고, 천장·양옆 벽·바닥이 소실점으로 모인다.
// 벽 그림은 390×600 벽 좌표로 그리고 BACK 변환으로 화면에 놓는다.
import { W, H, FLOOR_Y, eraWall } from './common.js';

export const BACK = { x: 43, y: 58, s: 0.78 };
export const backTransform = `translate(${BACK.x} ${BACK.y}) scale(${BACK.s})`;

const VPX = 195;
const VPY = BACK.y + BACK.s * 295; // 화면 위 소실점 (눈높이)
const L = BACK.x;
const R = W - BACK.x;
const T = BACK.y;
const B = BACK.y + BACK.s * FLOOR_Y; // 뒷벽 바닥선

// 소실점에서 (x, y)를 지나 화면 끝 x=edge까지 뻗은 점
const toEdgeX = (x, y, edge) => [edge, VPY + ((y - VPY) * (edge - VPX)) / (x - VPX)];
// 소실점에서 (x, y)를 지나 화면 높이 y=edge까지 뻗은 점
const toEdgeY = (x, y, edge) => [VPX + ((x - VPX) * (edge - VPY)) / (y - VPY), edge];

const p = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

export function roomShell(era) {
  const ceilL = toEdgeY(L, T, 0);
  const ceilR = toEdgeY(R, T, 0);
  const floorL = toEdgeX(L, B, 0);
  const floorR = toEdgeX(R, B, W);
  const base = BACK.s * 14;
  const baseL = toEdgeX(L, B - base, 0);
  const baseR = toEdgeX(R, B - base, W);

  // 장판 이음매: 소실점에서 퍼지는 세로줄과 앞으로 올수록 벌어지는 가로줄
  let seams = '';
  for (let i = -6; i <= 14; i++) {
    const x = L + (i * (R - L)) / 8;
    const [bx] = toEdgeY(x, B, H);
    seams += `M${x.toFixed(1)} ${B.toFixed(1)}L${bx.toFixed(1)} ${H}`;
  }
  for (const d of [0.06, 0.15, 0.28, 0.46, 0.72]) {
    const y = B + (H - B) * d;
    seams += `M0 ${y.toFixed(1)}H${W}`;
  }

  return `
  <!-- 천장 -->
  <polygon points="${p([[0, 0], [W, 0], ceilR, [R, T], [L, T], ceilL])}" fill="url(#ceil)"/>
  <!-- 옆벽 -->
  <polygon points="${p([[0, 0], ceilL, [L, T], [L, B], floorL])}" fill="url(#${eraWall[era]})"/>
  <polygon points="${p([[W, 0], ceilR, [R, T], [R, B], floorR])}" fill="url(#${eraWall[era]})"/>
  <polygon points="${p([[0, 0], ceilL, [L, T], [L, B], floorL])}" fill="url(#sideL)"/>
  <polygon points="${p([[W, 0], ceilR, [R, T], [R, B], floorR])}" fill="url(#sideR)"/>
  <polygon points="${p([baseL, [L, B - base], [L, B], floorL])}" fill="#3d372f"/>
  <polygon points="${p([baseR, [R, B - base], [R, B], floorR])}" fill="#3d372f"/>
  <!-- 바닥 -->
  <polygon points="${p([floorL, [L, B], [R, B], floorR, [W, H], [0, H]])}" fill="#6a573a"/>
  <path d="${seams}" stroke="#000" stroke-opacity=".2" stroke-width="1"/>
  <ellipse cx="${VPX}" cy="${B + 70}" rx="190" ry="60" fill="url(#floorPool)"/>
  <polygon points="${p([floorL, [L, B], [R, B], floorR, [W, H], [0, H]])}" fill="url(#floorDepth)"/>
  <!-- 모서리 그늘 -->
  <path d="M${L} ${T}V${B}M${R} ${T}V${B}" stroke="#000" stroke-opacity=".55" stroke-width="2"/>
  <path d="M${p([ceilL, [L, T], [R, T], ceilR]).replace(/ /g, 'L')}" stroke="#000" stroke-opacity=".5" stroke-width="2" fill="none"/>`;
}

// 앞쪽(카메라 가까이)이 어둡게 가라앉는 층 + 필름 입자. 벽 그림 위에 얹는다
export function roomFront() {
  return `
  <rect y="${H - 120}" width="${W}" height="120" fill="url(#ceilShade)" transform="rotate(180 ${W / 2} ${H - 60})"/>
  <rect width="${W}" height="${H}" fill="#1c3532" opacity=".12"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity=".2"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}
