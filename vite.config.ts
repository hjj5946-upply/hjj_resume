import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/hjj_resume/",
  build: {
    // three.js 코어(≈700KB)는 매운맛 진입 시에만 지연 로딩되므로 경고 기준을 그에 맞춘다.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // 3D 청크를 three 코어 / r3f·drei 로 나눠 병렬 다운로드하고,
        // 앱 코드만 바뀐 배포에서는 큰 라이브러리 청크가 브라우저 캐시에 그대로 남도록 한다.
        // (Vite는 Windows에서도 모듈 id를 / 구분자로 정규화한다)
        // react와 Vite/Rollup 내부 헬퍼(\0로 시작하는 가상 모듈: preload-helper 등)는 반드시
        // 메인과 함께 로드되는 vendor 청크로 빼야 한다. 안 그러면 r3f 청크에 흡수되어
        // 메인 화면이 그걸 얻으려고 3D 청크 전체를 정적으로 import(=즉시 다운로드)하게 된다.
        manualChunks(id) {
          if (id.startsWith("\0")) return "vendor";
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "vendor";
          if (id.includes("/node_modules/three/")) return "three";
          if (id.includes("/node_modules/@react-three/")) return "r3f";
        },
      },
    },
  },
});
