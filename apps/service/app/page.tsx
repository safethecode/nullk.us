'use client';

import { AnimatedActionButton } from '@/ui/animated-action-button';
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const experiences = [
  {
    id: 'lasker',
    company: '(주)라스커',
    role: '프로덕트 리드 · 프로덕트B팀',
    period: '2025.10 ~ 2026.02',
    summary: '영상 편집 AI 에이전트 제품 개발 및 CES 2025 부스 운영',
    highlights: [
      'Adobe UXP/CEP 기반 "AI 영상 편집 구간 Summarize 도구" 설계 및 MVP 개발',
      '"영상 분석부터 편집까지, 대화로 완성하는 AI 에이전트" 제품 방향성 수립',
      'Electron 기반 로컬 앱 개발 (컷편집, 타임라인 트랙, AI 채팅 등)',
      'Golang, FFmpeg 기반 인코딩 서버 구축 · SQS 메시징',
      'CES 2025 라스베가스 대전관 제품 부스 운영 및 해외 네트워크 구축',
      '라스커 스튜디오 BI/CI 브랜딩 총괄 → Prepix 서비스명 채택',
    ],
    stack: ['React', 'Next.js', 'Golang', 'NestJS', 'Electron', 'TypeScript'],
  },
  {
    id: 'church',
    company: '순복음인천교회',
    role: 'FOH 엔지니어 · 방송팀',
    period: '2024.07 ~ 2026.01',
    summary: '대성전 음향 시스템 관리 및 대규모 행사 음향 총괄',
    highlights: [
      '인천순복음교회 대성전 음향 시스템 관리 및 라이브 오퍼레이팅 전담',
      '성탄 칸타타·부활절 칸타타·성령대망회 등 대규모 행사 음향 총괄',
      'PTZ 카메라 운용·스위칭 허브 교체 등 방송 장비 구축 및 유지보수',
    ],
  },
  {
    id: 'lawlabs',
    company: '(주)로랩스',
    role: 'Frontend Engineer · 프리랜서',
    period: '2024.02 ~ 2024.03',
    summary: '에어서플라이 서비스 개발 및 운영 효율화',
    highlights: [
      '에어서플라이 서비스·백오피스·홈페이지 개발 및 유지보수',
      '운영팀 배송 크롬 익스텐션 개발 → 오배송률 78.3% 개선',
      'Doppler(SecretOps) 도입으로 비공개 환경 변수 관리 체계 구축',
      '프론트엔드 커밋·PR 컨벤션 정의 등 DX 개선 주도',
    ],
  },
  {
    id: 'latlus',
    company: '(주)라틀라스',
    role: 'Frontend Engineer · 프리랜서',
    period: '2023.11 ~ 2024.01',
    summary: '유일한 FE 엔지니어로서 제품 전담 개발 및 성능 최적화',
    highlights: [
      '유일한 프론트엔드 엔지니어로서 제품 신규 개발 및 유지보수',
      '렌더링 성능 최적화 → Lighthouse 퍼포먼스 스코어 47점 → 97점',
      '상태관리 구조 개선 및 대용량 에셋·중복 API 호출 등 병목 전면 해소',
    ],
  },
  {
    id: 'donotfail',
    company: '두낫페일팩토리',
    role: 'CEO',
    period: '2023.02 ~ 2025.06',
    summary: '스타트업 창업 · 다수의 프로덕트 기획/개발/출시/운영',
    highlights: [
      '개발자·PO 등 4인 팀 DRI 기반 운영, 프론트엔드·백엔드·디자인 총괄',
      '투자사 콜드메일·미팅·세일즈까지 비즈니스 전 과정 직접 수행',
      '프라이머, 한국투자액셀러레이터, 블루포인트파트너스 등 VC 미팅',
      '2023 서울대학교 예비창업패키지 선정 (사업비 약 4,000만원)',
      '80개 프로덕트 구상 및 실험, 뉴스레터 "핏짜" 출시 (구독자 740명)',
      '월 2-3천만원 매출, 정규 직원 3명 운영',
    ],
    stack: ['React', 'Next.js', 'Supabase', 'NestJS', 'TypeScript'],
  },
  {
    id: 'skylabs',
    company: '(주)스카이랩스',
    role: 'Frontend Engineer · 프리랜서',
    period: '2023.06 ~ 2023.07',
    summary: '심박 측정 기기 데이터 리포트·CMS·WMS 3개 제품 동시 담당',
    highlights: [
      '심박 측정 기기 데이터 기반 리포트 시스템 개발 (ApexCharts 커스텀)',
      '협력 병원용 CMS 개발 — Bluetooth API 기반 환자 데이터 실시간 조회',
      '생산팀 WMS 개발 — 수기·엑셀 기반 물류 프로세스를 전사 시스템으로 전환',
    ],
  },
  {
    id: 'learners',
    company: '(주)러너스컴퍼니',
    role: 'Frontend Engineer · 프리랜서',
    period: '2023.03 ~ 2023.06',
    summary: '한 주 단위 PMF 검증 사이클 · 5개 프로덕트 빌드',
    highlights: [
      '한 주 단위 PMF 검증 사이클 — 기획·디자인·개발 전 과정 수행',
      'AI 아바타 생성 스튜디오 등 5개 프로덕트 빌드 및 출시',
      'Amplitude·GA·Sentry 기반 로깅·퍼널 분석·에러 모니터링 체계 구축',
    ],
  },
  {
    id: 'sendbird',
    company: '(주)센드버드코리아',
    role: 'Software Engineer · Technical Writing',
    period: '2022.11 ~ 2022.12',
    summary: 'Developer Portal·SDK Docs UX/DX 개선 및 기술 문서 작성',
    highlights: [
      'Developer Portal·SDK Docs UX/DX 개선 — 언어 스위칭·코드 색인 등 PoC',
      'SDK Docs V1 유지보수, Technical Writing·디자인 팀 협업',
      '링크 체크 자동화 기능 기획 — 버전 변경·링크 누락으로 인한 UX 저하 해소',
    ],
  },
  {
    id: 'repleai',
    company: '(주)리플에이아이',
    role: '프론트엔드 개발자 · 개발팀',
    period: '2021.09 ~ 2022.06',
    summary: '레거시 React 마이그레이션 · 영상 분석 솔루션 개발',
    highlights: [
      '기존 레거시 프로덕트(리플하우스, 클리퍼, 파도) React 마이그레이션 전담',
      '영상 분석 솔루션 클리퍼 랜딩페이지 및 핵심 기능 개발',
      '아프리카TV 오토 라벨링 솔루션, ML OpenAPI, PADO 랜딩페이지 개발',
      'AWS 인프라(S3·EC2·Fargate) 운영 관리',
    ],
  },
  {
    id: 'plask',
    company: '(주)플라스크',
    role: '프론트엔드 개발자 · 데스크탑팀',
    period: '2020.12 ~ 2021.09',
    summary: 'AI 포즈 인식 3D 애니메이팅 데스크탑 앱 개발',
    highlights: [
      'AI 포즈 인식 애니메이팅 데스크탑 웹/앱 프로덕트 개발 (WebGL → Babylon)',
      'Three.js 기반 3D 모델 컨트롤 패널 설계 및 개발',
      '홈페이지 UX/UI 개선 — 콘텐츠 배치·시선 흐름 재설계로 점유율 상승',
      '초기 MVP 백엔드 개발 (웰컴 메일·유저 인증·그룹)',
    ],
  },
  {
    id: 'todaysflower',
    company: '(주)오늘의꽃',
    role: '프론트엔드 개발자 · 개발팀',
    period: '2020.07 ~ 2020.12',
    summary: '첫 프론트엔드 엔지니어로 합류 · 개발 체계 전반 구축',
    highlights: [
      '첫 프론트엔드 엔지니어로 합류, 개발 체계 전반 구축',
      'Design Token 기반 디자인 시스템 설계·개발 (Rollup)',
      '오늘의꽃 2.0 웹 서비스 클라이언트 UX 기획',
      'IR 기획·디자인·피칭 직접 수행 (네오플라이, 상상이비즈 등)',
      '전 직군 채용 프로세스 확립, 채용 브랜딩·HR 체계 도입',
    ],
  },
  {
    id: 'beginmate',
    company: '(주)비긴메이트',
    role: '프론트엔드 개발자(인턴) · 플랫폼사업본부',
    period: '2019.08 ~ 2019.11',
    summary: 'Vue → React 마이그레이션 및 디자인 토큰 체계 수립',
    highlights: [
      'Vue 기반 기존 플랫폼 React 마이그레이션',
      'Design Token 체계 수립 및 확장성 중심 컴포넌트 아키텍처 설계',
    ],
  },
];

const projects = [
  {
    title: 'Orc',
    subtitle: 'Terminal-based AI Agent Orchestration System',
    period: '2026.02 ~ 진행 중',
    description:
      '단일 프롬프트를 하위 태스크로 자동 분해하고, 모델 선택·병렬 실행·결과 검증까지 자동화한 터미널 기반 AI 오케스트레이션 시스템',
    link: 'https://github.com/safethecode/orc',
    highlights: ['앤트로픽 테이크 홈 기준 2,147 사이클 돌파', '추가 개입 없이 AI가 자동으로 판단·실행'],
    status: 'ongoing' as const,
  },
  {
    title: '두쫀쿠 종합지수',
    subtitle: '밈 트렌드 수치화 프로젝트',
    period: '2026.01',
    description: '포화된 두쫀쿠 유행 속 수치화를 위한 종합지수',
    link: 'https://djjk-web.vercel.app/',
    highlights: ['네이버 검색 API 및 인스타 데이터 활용', 'Cron 기반 카페별 주가 트레이딩'],
    status: 'completed' as const,
  },
  {
    title: '핏짜',
    subtitle: '개발자를 위한 뉴스레터',
    period: '2023.09 ~ 2024.12',
    description: 'IT 직군 종사자를 위해 매주 월요일 IT 이슈·스타트업 소식을 전하는 뉴스레터',
    link: 'https://tzza.xyz',
    highlights: ['구독자 657명 달성', '콘텐츠 큐레이션 및 발행 운영'],
    status: 'completed' as const,
  },
  {
    title: '디자인코리아 2023',
    subtitle: '산업통상자원부 주최 컨퍼런스',
    period: '2023.09 ~ 2023.10',
    description: '한국디자인진흥원 주관 컨퍼런스 웹 프론트엔드 개발',
    link: 'https://designkorea.kidp.or.kr/',
    highlights: ['레거시 코드 리팩토링 및 신규 개발'],
    status: 'completed' as const,
  },
  {
    title: '홍익대학교 판화과 졸업전시회',
    subtitle: '인터랙티브 웹 경험',
    period: '2021.09 ~ 2021.11',
    description: '물리엔진과 3D 기술을 활용한 인터랙티브 졸업전시회 웹페이지',
    highlights: [
      'Matter.js 물리엔진 적용 인터랙티브 섹션',
      'Three.js 기반 판화 도구 3D 체험 게임',
    ],
    status: 'completed' as const,
  },
];

const skills = {
  Frontend: ['React', 'React Native', 'TypeScript', 'Next.js', 'Sass', 'Styled-Components'],
  Backend: ['NestJS', 'Golang', 'MongoDB', 'MariaDB', 'Supabase'],
  'State & Tools': ['Redux', 'Redux Saga', 'Recoil', 'Electron'],
  Infra: ['AWS (S3·EC2·Fargate)', 'FFmpeg', 'Docker'],
};

const domains = ['이커머스', '금융', 'SaaS', 'B2B', '방송·엔터테인먼트', 'AI·ML'];

const awards = [
  { title: '2023 서울대학교 예비창업패키지 선정', org: '서울대학교', year: '2023', note: '사업비 약 4,000만원' },
  { title: '컴업 2023 아카데미 리그 선발', org: 'COMEUP', year: '2023' },
  { title: '제12회 청년기업가대회 본선 진출', org: '', year: '2023', note: '유일한 예비창업자' },
  { title: '제주 스마트관광 빅데이터 해커톤 공학교육혁신센터장상', org: '제주대학교', year: '2022' },
  { title: '제20회 앱잼(APPJAM) 생활 부문 우수상', org: '중소벤처기업부 / SK플래닛', year: '2021' },
  { title: '제2회 한국공항공사 고교생 창업 경진대회 최우수상', org: '한국공항공사', year: '2021', note: '118개 팀 중 최고상' },
  { title: '제7회 부산 창업 아이디어 경진대회 한국남부발전사장상', org: '한국남부발전', year: '2021' },
  { title: 'JunctionX Global Hackathon Track Winner (2nd)', org: 'JunctionX', year: '2020' },
  { title: '제10회 e-ICON 세계대회 스마트교육학회장상', org: '스마트교육학회', year: '2020' },
  { title: '제4회 정부혁신제안 끝장개발대회 정부혁신전략추진단상', org: '행정안전부', year: '2020' },
  { title: '제7회 선린 해커톤 금상', org: '선린인터넷고등학교', year: '2021' },
  { title: '2018년 제주 블록체인 해커톤 우수상', org: '제주창조경제혁신센터', year: '2018' },
];

const statusConfig = {
  ongoing: { label: '진행 중', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  completed: { label: '완료', className: 'bg-neutral-50 text-neutral-600 border-neutral-200' },
};

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const visibleExperiences = showAllExperiences ? experiences : experiences.slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      {/* ── Hero ── */}
      <section className="mb-20">
        <h1 className="mb-3 font-bold text-[2.75rem] leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
          손지민
        </h1>
        <p className="mb-5 text-lg text-neutral-500 sm:text-xl">
          Product Builder{' '}
          <span className="text-neutral-300">·</span>{' '}
          FE Specialist, 풀스택
        </p>

        <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-neutral-600">
          어떤 도메인이든 본질만을 고민하며, 결국 성과를 만들어 냅니다.
          <br />
          본질을 위해 끊임없이 질문하고, 끝내 만들어 냅니다.
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-neutral-400">
          <a href="mailto:sam@nullk.us" className="flex items-center gap-1.5 transition-colors hover:text-neutral-900">
            <Mail className="h-3.5 w-3.5" />
            sam@nullk.us
          </a>
          <a
            href="https://github.com/safethecode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-neutral-900"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/safethecode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-neutral-900"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            인천, 대한민국
          </span>
        </div>

        <AnimatedActionButton href="/coffee-chat">
          커피챗 신청하기
        </AnimatedActionButton>
      </section>

      {/* ── About ── */}
      <section className="mb-20">
        <SectionHeader>소개</SectionHeader>
        <div className="space-y-6">
          {[
            {
              quote: '경쟁사가 가장 무서워 할 무기입니다.',
              body: '어떤 도메인이든 본질만을 고민하며, 결국 성과를 만들어 냅니다.',
            },
            {
              quote: '어떤 조직에서도 분위기 메이커입니다.',
              body: '억지 공감, 억지 대화는 하지 않습니다. 팀원 모두가 진짜로 웃을 수 있는 자리를 만듭니다.',
            },
            {
              quote: '경험으로 싸우는 사람입니다.',
              body: 'AI 시대, 사람의 무기는 경험입니다. 걸어보지 못한 길도 동료들과 함께 부딪히며 헤쳐나갑니다.',
            },
          ].map((item) => (
            <div key={item.quote} className="border-l-2 border-neutral-200 pl-5 transition-colors hover:border-neutral-900">
              <p className="mb-1 font-semibold text-[15px] text-neutral-900">{item.quote}</p>
              <p className="text-[13px] leading-relaxed text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mb-20">
        <SectionHeader>경력</SectionHeader>
        <div className="space-y-3">
          {visibleExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="group rounded-2xl border border-neutral-100 bg-white transition-all hover:border-neutral-200 hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left sm:items-center sm:px-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-50 text-[11px] font-bold text-neutral-400 transition-colors group-hover:bg-neutral-100">
                    {exp.company.replace(/[()주]/g, '').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h3 className="font-semibold text-[15px] text-neutral-900">{exp.company}</h3>
                      <span className="text-[13px] text-neutral-400">{exp.role}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-neutral-500">{exp.summary}</p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="hidden text-[12px] text-neutral-400 sm:block">{exp.period}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-300 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-neutral-50 px-5 pb-5 pt-4 sm:px-6">
                    <p className="mb-3 text-[12px] text-neutral-400 sm:hidden">{exp.period}</p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-neutral-600">
                          <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    {exp.stack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showAllExperiences && experiences.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllExperiences(true)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-200 py-3 text-[13px] font-medium text-neutral-400 transition-colors hover:border-neutral-300 hover:text-neutral-600"
          >
            나머지 {experiences.length - 6}개 경력 더 보기
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* ── Projects ── */}
      <section className="mb-20">
        <SectionHeader>프로젝트</SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <div
                key={project.title}
                className="group flex flex-col rounded-2xl border border-neutral-100 p-5 transition-all hover:border-neutral-200 hover:shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[15px] text-neutral-900 transition-colors group-hover:text-neutral-700">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-neutral-400">{project.subtitle}</p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <p className="mb-3 flex-1 text-[13px] leading-relaxed text-neutral-500">
                  {project.description}
                </p>
                <div className="mb-3 space-y-1">
                  {project.highlights.map((h, i) => (
                    <p key={i} className="flex gap-1.5 text-[12px] text-neutral-400">
                      <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-200" />
                      {h}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-neutral-300">{project.period}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-0.5 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-900"
                    >
                      보기
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mb-20">
        <SectionHeader>기술 스택</SectionHeader>
        <div className="space-y-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-neutral-400">
                {category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-neutral-100 bg-white px-3 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:border-neutral-200 hover:bg-neutral-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-neutral-400">
              산업 지식
            </p>
            <div className="flex flex-wrap gap-1.5">
              {domains.map((d) => (
                <span
                  key={d}
                  className="rounded-lg border border-neutral-100 bg-white px-3 py-1.5 text-[13px] text-neutral-500"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="mb-20">
        <SectionHeader>수상 및 활동</SectionHeader>
        <div className="grid gap-2 sm:grid-cols-2">
          {awards.map((award) => (
            <div
              key={award.title}
              className="flex items-start gap-3 rounded-xl border border-neutral-100 px-4 py-3 transition-shadow hover:shadow-sm"
            >
              <span className="mt-0.5 flex-shrink-0 text-[12px] font-medium text-neutral-300">
                {award.year}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-snug text-neutral-800">{award.title}</p>
                {(award.org || award.note) && (
                  <p className="mt-0.5 text-[12px] text-neutral-400">
                    {[award.org, award.note].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education & Activities ── */}
      <section className="mb-20">
        <SectionHeader>학력 및 활동</SectionHeader>
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">선린인터넷고등학교</h3>
                <p className="text-[13px] text-neutral-500">IT경영 · 멀티미디어</p>
              </div>
              <span className="text-[12px] text-neutral-400">2019.03 ~ 2022.02</span>
            </div>
            <ul className="mt-3 space-y-1">
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                2021 서울시 지방기능경기대회 웹 디자인/개발 부문 교내 대표 출전
              </li>
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                졸업 시 공로상 수상
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">AI / SW엔지니어 트랙 프로젝트 코치</h3>
                <p className="text-[13px] text-neutral-500">엘리스 KDT 프로그램 · SW 엔지니어 트랙 1기 최우수 코치 (평점 5.0)</p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-neutral-400">2021.11 ~ 2023.01</span>
            </div>
            <ul className="mt-3 space-y-1">
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                SW 엔지니어 트랙 1기·6기·8기, AI 엔지니어 트랙 2기·3기 코칭
              </li>
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                소프트웨어 마에스트로 수강생 320명 대상 웹 기초 사전학습 및 커리어 코칭
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">Quiet, AI Agent · Unnoticed</h3>
                <p className="text-[13px] text-neutral-500">
                  AI-Agent를 가장 티 안 나게 쓰는 커뮤니티
                </p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-neutral-400">2026.01 ~ 진행 중</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Companies ── */}
      <section>
        <SectionHeader>함께한 곳들</SectionHeader>
        <div className="flex flex-wrap gap-2">
          {[
            '라스커', '센드버드', '리플에이아이', '플라스크', '오늘의꽃',
            '스카이랩스', '러너스컴퍼니', '로랩스', '라틀라스', '비긴메이트',
          ].map((name) => (
            <span
              key={name}
              className="rounded-lg border border-neutral-100 px-3 py-1.5 text-[13px] font-medium text-neutral-500 transition-colors hover:border-neutral-200 hover:text-neutral-700"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-bold text-lg text-neutral-900 tracking-tight">
      {children}
    </h2>
  );
}
