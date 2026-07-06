import { useRef, useState } from "react";

// Math.random() 등 impure한 값을 "최초 1회만" 계산해 이후 useFrame 등에서
// 명령형으로 자유롭게 mutate할 ref로 넘겨주기 위한 헬퍼.
// useState의 lazy initializer로 순수성 규칙을 지키면서, 반환값은 ref라 리렌더를 유발하지 않는다.
export function useLazyRef<T>(init: () => T) {
  const [initial] = useState(init);
  return useRef(initial);
}
