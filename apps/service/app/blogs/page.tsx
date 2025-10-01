import { AnimatedActionButton } from '@/ui/animated-action-button';
import { Sparkles } from 'lucide-react';

export default function BlogsPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-left">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">블로그</h1>
        <p className="text-gray-600 text-lg">
          개발 경험과 인사이트를 공유합니다.
        </p>
      </div>
      <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-12">
        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center sm:space-y-6 sm:py-12">
          <div className="flex bg-gradient-to-brsm:h-20 h-16 w-16 items-center justify-center rounded-full sm:w-20">
            <Sparkles className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-bold text-2xl text-gray-900 sm:text-3xl">
              곧 찾아뵙겠습니다
            </h2>
            <p className="text-base text-gray-600 leading-relaxed sm:text-lg">
              더 나은 콘텐츠로 준비 중입니다.
              <br />
              조금만 기다려 주세요!
            </p>
          </div>
          <div className="pt-2 sm:pt-4">
            <AnimatedActionButton href="/">
              홈으로 돌아가기
            </AnimatedActionButton>
          </div>
        </div>
      </section>
    </main>
  );
}
