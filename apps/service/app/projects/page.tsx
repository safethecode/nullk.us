import { ArrowUpRight } from 'lucide-react';

type ProjectStatus = 'ongoing' | 'completed' | 'archived';

interface Project {
  id: string;
  status: ProjectStatus;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  link?: string;
  tags?: string[];
}

const PROJECTS: Project[] = [
  {
    id: '1',
    status: 'ongoing',
    title: 'Orc',
    subtitle: 'Terminal-based AI Agent Orchestration System',
    description:
      '단일 프롬프트를 하위 태스크로 자동 분해하고, 모델 선택·병렬 실행·결과 검증까지 자동화한 터미널 기반 AI 오케스트레이션 시스템. 앤트로픽 테이크 홈 기준 2,147 사이클 돌파.',
    period: '2026.02 ~ 진행 중',
    link: 'https://github.com/safethecode/orc',
    tags: ['TypeScript', 'AI', 'CLI'],
  },
  {
    id: '2',
    status: 'completed',
    title: '두쫀쿠 종합지수',
    subtitle: '밈 트렌드 수치화 프로젝트',
    description:
      '포화된 두쫀쿠 유행 속 수치화를 위한 종합지수. 네이버 검색 API 및 인스타 데이터를 활용한 검색 수치 개발.',
    period: '2026.01',
    link: 'https://djjk-web.vercel.app/',
    tags: ['Next.js', 'Cron', 'Data'],
  },
  {
    id: '3',
    status: 'completed',
    title: '핏짜',
    subtitle: '개발자를 위한 뉴스레터',
    description:
      'IT 직군 종사자를 위해 매주 월요일 IT 이슈·스타트업 소식을 전하는 뉴스레터. 구독자 657명 달성.',
    period: '2023.09 ~ 2024.12',
    link: 'https://tzza.xyz',
    tags: ['Newsletter', 'Curation'],
  },
  {
    id: '4',
    status: 'completed',
    title: '디자인코리아 2023',
    subtitle: '산업통상자원부 주최 컨퍼런스 웹사이트',
    description:
      '한국디자인진흥원 주관 컨퍼런스 웹 프론트엔드 개발. 레거시 코드 리팩토링 및 신규 개발.',
    period: '2023.09 ~ 2023.10',
    link: 'https://designkorea.kidp.or.kr/',
    tags: ['Next.js', 'TypeScript'],
  },
  {
    id: '5',
    status: 'completed',
    title: '홍익대학교 판화과 졸업전시회',
    subtitle: '인터랙티브 웹 경험',
    description:
      'Matter.js 물리엔진 적용 인터랙티브 섹션, Three.js 기반 판화 도구 3D 체험 게임 섹션 개발.',
    period: '2021.09 ~ 2021.11',
    tags: ['React', 'Three.js', 'Matter.js'],
  },
  {
    id: '6',
    status: 'ongoing',
    title: 'nullk.us',
    subtitle: '개인 포트폴리오 웹사이트',
    description:
      'Next.js 15와 Tailwind CSS를 사용하여 제작한 개인 포트폴리오. 도전과제 시스템, 커피챗 기능 등 포함.',
    period: '2024.09 ~ 현재',
    link: 'https://nullk.us',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
];

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
  ongoing: { label: '진행 중', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  completed: { label: '완료', className: 'bg-neutral-50 text-neutral-500 border-neutral-200' },
  archived: { label: '아카이브', className: 'bg-neutral-50 text-neutral-400 border-neutral-200' },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      <h1 className="mb-2 font-bold text-[2rem] tracking-tight text-neutral-900 sm:text-4xl">
        프로젝트
      </h1>
      <p className="mb-12 text-[15px] text-neutral-400">
        지금까지 진행했던 프로젝트들을 소개합니다.
      </p>

      <div className="space-y-4">
        {PROJECTS.map((project) => {
          const status = STATUS_CONFIG[project.status];
          return (
            <article
              key={project.id}
              className="group rounded-2xl border border-neutral-100 p-5 transition-all hover:border-neutral-200 hover:shadow-sm sm:p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-[15px] text-neutral-900">
                    {project.title}
                  </h2>
                  <p className="text-[12px] text-neutral-400">{project.subtitle}</p>
                </div>
                <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${status.className}`}>
                  {status.label}
                </span>
              </div>

              <p className="mb-3 text-[13px] leading-relaxed text-neutral-500">
                {project.description}
              </p>

              {project.tags && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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
            </article>
          );
        })}
      </div>
    </main>
  );
}
