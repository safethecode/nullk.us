import { AnimatedActionButton } from '@/ui/animated-action-button';

export default function BlogsPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      <h1 className="mb-2 font-bold text-[2rem] tracking-tight text-neutral-900 sm:text-4xl">
        블로그
      </h1>
      <p className="mb-12 text-[15px] text-neutral-400">
        개발 경험과 인사이트를 공유합니다.
      </p>

      <section className="flex flex-col items-center rounded-2xl border border-neutral-100 px-6 py-16 text-center">
        <p className="mb-1 font-semibold text-[15px] text-neutral-900">
          곧 찾아뵙겠습니다
        </p>
        <p className="mb-8 text-[13px] leading-relaxed text-neutral-400">
          더 나은 콘텐츠로 준비 중입니다.
        </p>
        <AnimatedActionButton href="/">
          홈으로 돌아가기
        </AnimatedActionButton>
      </section>
    </main>
  );
}
