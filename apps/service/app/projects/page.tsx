import { ArrowUpRight } from "lucide-react";

type ProjectStatus = "ongoing" | "completed" | "archived";

interface Project {
  description: string;
  id: string;
  link?: string;
  period: string;
  status: ProjectStatus;
  subtitle: string;
  tags?: string[];
  title: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    status: "ongoing",
    title: "Orc",
    subtitle: "Terminal-based AI Agent Orchestration System",
    description:
      "단일 프롬프트를 하위 태스크로 자동 분해하고, 모델 선택·병렬 실행·결과 검증까지 자동화한 터미널 기반 AI 오케스트레이션 시스템. 앤트로픽 테이크 홈 기준 2,147 사이클 돌파.",
    period: "2026.02 ~ 진행 중",
    link: "https://github.com/safethecode/orc",
    tags: ["TypeScript", "AI", "CLI"],
  },
  {
    id: "2",
    status: "completed",
    title: "두쫀쿠 종합지수",
    subtitle: "밈 트렌드 수치화 프로젝트",
    description:
      "포화된 두쫀쿠 유행 속 수치화를 위한 종합지수. 네이버 검색 API 및 인스타 데이터를 활용한 검색 수치 개발.",
    period: "2026.01",
    link: "https://djjk-web.vercel.app/",
    tags: ["Next.js", "Cron", "Data"],
  },
  {
    id: "3",
    status: "completed",
    title: "핏짜",
    subtitle: "개발자를 위한 뉴스레터",
    description:
      "IT 직군 종사자를 위해 매주 월요일 IT 이슈·스타트업 소식을 전하는 뉴스레터. 구독자 657명 달성.",
    period: "2023.09 ~ 2024.12",
    link: "https://tzza.xyz",
    tags: ["Newsletter", "Curation"],
  },
  {
    id: "4",
    status: "completed",
    title: "디자인코리아 2023",
    subtitle: "산업통상자원부 주최 컨퍼런스 웹사이트",
    description:
      "한국디자인진흥원 주관 컨퍼런스 웹 프론트엔드 개발. 레거시 코드 리팩토링 및 신규 개발.",
    period: "2023.09 ~ 2023.10",
    link: "https://designkorea.kidp.or.kr/",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "5",
    status: "completed",
    title: "홍익대학교 판화과 졸업전시회",
    subtitle: "인터랙티브 웹 경험",
    description:
      "Matter.js 물리엔진 적용 인터랙티브 섹션, Three.js 기반 판화 도구 3D 체험 게임 섹션 개발.",
    period: "2021.09 ~ 2021.11",
    tags: ["React", "Three.js", "Matter.js"],
  },
  {
    id: "6",
    status: "ongoing",
    title: "nullk.us",
    subtitle: "개인 포트폴리오 웹사이트",
    description:
      "Next.js 15와 Tailwind CSS를 사용하여 제작한 개인 포트폴리오. 도전과제 시스템, 커피챗 기능 등 포함.",
    period: "2024.09 ~ 현재",
    link: "https://nullk.us",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

const STATUS_CONFIG: Record<ProjectStatus, { label: string }> = {
  ongoing: {
    label: "진행 중",
  },
  completed: {
    label: "완료",
  },
  archived: {
    label: "아카이브",
  },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-[calc(100svh-4rem)] w-full max-w-208 px-6 py-10 sm:px-8 lg:py-14">
      <section>
        <div className="mb-7 px-1 sm:px-4">
          <h1 className="font-medium text-lg text-neutral-600 leading-tight">
            Projects
          </h1>
          <p className="mt-1 text-sm text-neutral-300 leading-tight">
            지금까지 진행했던 작업들
          </p>
        </div>

        <div className="overflow-hidden border-neutral-50 border-y">
          {PROJECTS.map((project) => {
            const status = STATUS_CONFIG[project.status];
            const content = (
              <>
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <h2 className="truncate text-base text-neutral-500 leading-tight transition-colors group-hover:text-neutral-900">
                      {project.title}
                    </h2>
                    {project.link && (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-200 transition-colors group-hover:text-neutral-500" />
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-neutral-300 leading-tight">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-neutral-400 leading-relaxed sm:line-clamp-1">
                    {project.description}
                  </p>
                  {project.tags && (
                    <p className="mt-2 truncate text-xs text-neutral-300 leading-tight">
                      {project.tags.join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-row items-center gap-2 text-sm text-neutral-300 leading-tight sm:flex-col sm:items-end sm:gap-1">
                  <span>{project.period}</span>
                  <span>{status.label}</span>
                </div>
              </>
            );

            const className =
              "group grid min-h-4 grid-cols-[minmax(0,1fr)] gap-3 border-neutral-50 border-b px-1 py-4 transition-colors last:border-b-0 hover:bg-neutral-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-4";

            if (project.link) {
              return (
                <a
                  className={className}
                  href={project.link}
                  key={project.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content}
                </a>
              );
            }

            return (
              <article className={className} key={project.id}>
                {content}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
