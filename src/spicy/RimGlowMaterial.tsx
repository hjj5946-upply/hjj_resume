import { extend, type ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// 시야각에 따라 가장자리만 은은하게 빛나는 Fresnel 림 라이트 셰이더.
// 행성보다 살짝 큰 구체에 FrontSide + 가산 블렌딩으로 씌워 "에너지 필드" 느낌을 낸다.
const RimGlowMaterialImpl = shaderMaterial(
  { glowColor: new THREE.Color("#f5ba3b"), power: 2.2, opacity: 0.55 },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    uniform vec3 glowColor;
    uniform float power;
    uniform float opacity;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), power);
      gl_FragColor = vec4(glowColor, fresnel * opacity);
    }
  `
);

extend({ RimGlowMaterial: RimGlowMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    rimGlowMaterial: ThreeElement<typeof RimGlowMaterialImpl>;
  }
}

export { RimGlowMaterialImpl };
