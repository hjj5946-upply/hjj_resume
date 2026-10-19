# Developer Portfolio — Hong JeongJun

본 프로젝트는 개발자 홍정준(Hong JeongJun) 의 기술 역량과 프로젝트 경험을 소개하기 위한 개인 포트폴리오 사이트입니다.  
가독성과 접근성을 우선으로 한 단일 페이지 구조로 설계되었으며, 반응형 UI와 다크 모드를 지원합니다.

## Overview

- React, Vite, TypeScript 기반의 경량 구조
- TailwindCSS를 활용한 모던 UI 디자인
- 경량 CSS 막대 기반의 Skill Chart 시각화
- 순한맛(일반 이력서) / 매운맛(three.js 3D 우주) 모드 전환 및 상태 저장
- UX 향상을 위한 Scroll-to-Top, 섹션별 포커스 디자인

## Tech Stack

**Frontend**  
- React  
- TypeScript  
- Vite  
- TailwindCSS  

**Visualization**  
- CSS Bar Chart (라이브러리 없음)  
- three.js / React Three Fiber / drei (매운맛 3D 모드, 지연 로딩)  

**Deployment**  
- GitHub Pages  

## Features


### 순한맛 / 매운맛 모드
- 기본은 가벼운 순한맛(라이트) 화면으로 시작
- 헤더 토글로 매운맛(다크 + 3D 우주) 진입, 선택은 localStorage에 저장
- 3D 관련 청크(three, r3f)는 매운맛 진입 시에만 다운로드
- WebGL 미지원/로딩 실패 시 안내 화면과 순한맛 복귀 버튼 제공

### Skill Visualization
- Backend / Frontend / Mobile / DevOps 등 기술 비중을 시각적인 Bar Chart로 표시

### 모듈화된 컴포넌트 구조
- 이력서 내용(프로젝트·경력·스킬)은 `src/data/resume.ts` 한 곳에서 관리
- 섹션 단위 컴포넌트(`src/sections`)와 공용 UI(`src/components`) 분리

## Project Structure

```
src/
├─ App.tsx            # 테마/뷰 전환만 담당하는 셸
├─ data/resume.ts     # 프로젝트·경력·스킬·연락처 데이터
├─ sections/          # Hero, Summary, Skills, Experience, Projects, Contact
├─ components/        # Header, Footer, ProjectCard, SkillChart, ErrorBoundary 등
├─ lib/               # 테마 처리, 공용 스타일 클래스
└─ spicy/             # 매운맛 3D 우주 (지연 로딩)
```
