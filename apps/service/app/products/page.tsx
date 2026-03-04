import { AnimatedActionButton } from '@/ui/animated-action-button';

export default function ProductsPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      <h1 className="mb-2 font-bold text-[2rem] tracking-tight text-neutral-900 sm:text-4xl">
        프로덕트
      </h1>
      <p className="mb-12 text-[15px] text-neutral-400">
        직접 만들고 운영하는 프로덕트를 소개합니다.
      </p>

      <section className="flex flex-col items-center rounded-2xl border border-neutral-100 px-6 py-16 text-center">
        <p className="mb-1 font-semibold text-[15px] text-neutral-900">
          준비 중입니다
        </p>
        <p className="mb-8 text-[13px] leading-relaxed text-neutral-400">
          새로운 프로덕트를 준비하고 있습니다.
        </p>
        <AnimatedActionButton href="/projects">
          프로젝트 보러가기
        </AnimatedActionButton>
      </section>
    </main>
  );
}
