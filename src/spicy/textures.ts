import * as THREE from "three";

let glowTextureCache: THREE.CanvasTexture | null = null;

// 코로나/성운/은하/초신성 등에서 공용으로 쓰는 부드러운 원형 발광 텍스처.
// 색은 각 사용처에서 material.color로 tint하므로 흑백 그라디언트 하나만 캐싱한다.
export function getGlowTexture(): THREE.CanvasTexture {
  if (glowTextureCache) return glowTextureCache;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.6)");
  gradient.addColorStop(0.6, "rgba(255,255,255,0.15)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  glowTextureCache = new THREE.CanvasTexture(canvas);
  glowTextureCache.needsUpdate = true;
  return glowTextureCache;
}

// seed 기반의 결정적 PRNG(LCG) - 같은 seed면 항상 같은 무늬가 나오도록 해서
// 매 프레임/리렌더마다 행성 표면이 바뀌지 않게 한다.
function createSeededRandom(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function drawHexagon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

// 사이버틱한 발광 육각 그리드 + 회로 노드 + 스캔라인 표면 텍스처.
// seed가 같으면 항상 같은 무늬가 나오는 결정적 PRNG를 써서 리렌더 시 무늬가 안 바뀐다.
export function createCyberSurfaceTexture(
  baseColor: string,
  glowColor: string,
  seed: number
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = createSeededRandom(seed);

  // 짙은 베이스 + 행성 고유색을 은은하게 섞기
  ctx.fillStyle = "#0a0e16";
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = 1;

  // 발광하는 육각 그리드 라인
  const hexSize = 16;
  const hexHeight = hexSize * Math.sqrt(3);
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 1;
  for (let row = -1; row * hexHeight < size + hexHeight; row++) {
    for (let col = -1; col * hexSize * 1.5 < size + hexSize * 1.5; col++) {
      const cx = col * hexSize * 1.5;
      const cy = row * hexHeight + (col % 2 !== 0 ? hexHeight / 2 : 0);
      ctx.globalAlpha = 0.1 + rand() * 0.18;
      drawHexagon(ctx, cx, cy, hexSize);
    }
  }

  // 밝은 회로 노드
  for (let i = 0; i < 10; i++) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.globalAlpha = 0.5 + rand() * 0.4;
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + rand() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 스캔라인
  ctx.fillStyle = "#ffffff";
  for (let y = 0; y < size; y += 6) {
    ctx.globalAlpha = 0.04;
    ctx.fillRect(0, y, size, 1);
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
