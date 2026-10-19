import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = { hasError: boolean };

// 매운맛(three.js) 청크 로딩 실패나 WebGL 컨텍스트 생성 실패 시
// 페이지 전체가 흰 화면이 되지 않도록 해당 영역만 대체 UI로 바꾼다.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
