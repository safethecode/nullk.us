# nullk.us

> 찾을 수 없는 곳에서 보석을 찾는, FE 엔지니어 손지민의 포트폴리오

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)

## ∴ 소개

프론트엔드 개발자의 여정과 경험을 담은 인터랙티브 포트폴리오 웹사이트입니다.  

단순히 정보를 나열하는 것을 넘어, 방문자가 직접 경험하고 즐길 수 있는 공간을 만들었습니다.

**→ Live Demo**: [nullk.us](https://nullk.us)

## § 주요 기능

### ⌘ 완벽한 반응형 디자인
- 모바일부터 데스크톱까지 모든 디바이스 최적화
- 부드러운 애니메이션과 인터랙션
- 직관적인 네비게이션과 UX

### ※ 도전 과제 시스템
- 방문자 인게이지먼트를 위한 게임화 요소
- 실시간 진행도 추적
- 로컬 스토리지를 활용한 상태 저장

### ◆ 인터랙티브 리뷰 섹션
- 동료들의 피드백과 추천사
- 스와이프 가능한 캐러셀 UI
- 세련된 그라데이션 효과

### ⌗ 커피챗 요청 시스템
- 간편한 폼 제출
- 이메일 알림 (Resend API)
- 성공 시 컨페티 애니메이션

## ⚙ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion, canvas-confetti

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Email**: Resend

### Code Quality
- **Linting**: Biome
- **Type Checking**: TypeScript
- **Formatting**: Biome

## ▸ 프로젝트 구조

```
nullk.us/
├── apps/
│   └── service/          # 메인 Next.js 애플리케이션
│       ├── app/          # 페이지 라우트
│       ├── lib/          # 비즈니스 로직
│       ├── ui/           # UI 컴포넌트
│       └── styles/       # 글로벌 스타일
├── packages/
│   ├── design-system/    # 공유 UI 컴포넌트
│   ├── eslint-config/    # ESLint 설정
│   └── typescript-config/# TypeScript 설정
└── turbo.json           # Turborepo 설정
```

## ∷ 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 메인 랜딩 페이지 |
| 인사말 | `/greetings` | 자기소개 및 철학 |
| 프로젝트 | `/projects` | 진행한 프로젝트 소개 |
| 블로그 | `/blogs` | 개발 경험 공유 (준비중) |
| 도전과제 | `/achievement` | 인터랙티브 도전 과제 |
| 커피챗 | `/coffee-chat` | 커피챗 신청 폼 |

---

<div align="center">
  <sub>Built with ♥ by Sam Son</sub>
</div>
