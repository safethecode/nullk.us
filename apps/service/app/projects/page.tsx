import { AnimatedActionButton } from '@/ui/animated-action-button';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

type ProjectStatus = 'ongoing' | 'completed' | 'archived';

interface Project {
  id: string;
  status: ProjectStatus;
  logo: string;
  title: string;
  description: string;
  period: string;
  link?: string;
  tags?: string[];
}

const PROJECTS: Project[] = [
  {
    id: '1',
    status: 'ongoing',
    logo: '/assets/logos/corp/sendbird-logo.svg',
    title: 'nullk.us',
    description:
      '개인 포트폴리오 웹사이트입니다. Next.js 14와 Tailwind CSS를 사용하여 제작했습니다.',
    period: '2024.09 - 현재',
    link: 'https://nullk.us',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: '2',
    status: 'completed',
    logo: '/assets/logos/corp/sendbird-logo.svg',
    title: '프로젝트 이름',
    description:
      '프로젝트에 대한 간단한 설명입니다. 어떤 기술을 사용했고, 무엇을 구현했는지 설명합니다.',
    period: '2024.01 - 2024.08',
    link: 'https://example.com',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '3',
    status: 'completed',
    logo: '/assets/logos/corp/sendbird-logo.svg',
    title: '또 다른 프로젝트',
    description:
      '완료된 프로젝트의 설명입니다. 프로젝트의 주요 특징과 성과를 간단히 소개합니다.',
    period: '2023.06 - 2023.12',
    tags: ['Vue.js', 'Express', 'PostgreSQL'],
  },
];

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; colorClass: string }
> = {
  ongoing: {
    label: '진행중',
    colorClass: 'bg-green-100 text-green-700',
  },
  completed: {
    label: '완료',
    colorClass: 'bg-blue-100 text-blue-700',
  },
  archived: {
    label: '아카이브',
    colorClass: 'bg-gray-100 text-gray-700',
  },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-left">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">프로젝트</h1>
        <p className="text-gray-600 text-lg">
          지금까지 진행했던 프로젝트들을 소개합니다.
        </p>
      </div>
      <div className="space-y-6">
        {PROJECTS.map((project) => {
          const statusConfig = STATUS_CONFIG[project.status];
          return (
            <article
              key={project.id}
              className="group rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-6 transition-all duration-300 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 sm:h-24 sm:w-24">
                    <Image
                      src={project.logo}
                      alt={`${project.title} 로고`}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-2xl text-gray-900 sm:text-3xl">
                        {project.title}
                      </h2>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-xs ${statusConfig.colorClass}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed sm:text-lg">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{project.period}</span>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-white px-3 py-1 text-gray-700 text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <div className="mt-2">
                      <AnimatedActionButton
                        href={project.link}
                        className="inline-flex items-center gap-2"
                      >
                        자세히 보기
                      </AnimatedActionButton>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
