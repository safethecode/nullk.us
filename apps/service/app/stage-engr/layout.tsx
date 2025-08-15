'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function StageEngrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
        {/* Header */}
        <header className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <Link href="/">
            <Image
              src="/nullk-logo.svg"
              alt="널케이 | 무대예술전문인 자격 시험 문제집 | 음향 엔지니어"
              width={90}
              height={20}
              className="sm:h-[24px] sm:w-[110px]"
            />
          </Link>
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2.5 py-0.5 font-medium text-white text-xs">
            음향
          </span>
          <p className="text-neutral-300 text-sm">|</p>
          <div className="flex items-center gap-4">
            <Link
              className="text-neutral-400! text-sm transition-colors hover:text-neutral-800!"
              href="/qna"
            >
              질문/답변
            </Link>
            <Link
              className="text-neutral-400! text-sm transition-colors hover:text-neutral-800!"
              href="/ask-me"
            >
              문의
            </Link>
          </div>
        </header>
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-6 border-neutral-200 border-t bg-white/50 backdrop-blur-sm sm:mt-8">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 text-center sm:space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500 text-xs sm:text-sm">
                Sponsored by
              </span>
            </div>
            <div className="flex items-center">
              <Image
                src="/damascuse-media-logo.svg"
                alt="Damascuse Media"
                width={100}
                height={40}
                className="sm:h-[51px] sm:w-[128px]"
              />
            </div>
            <p className="text-neutral-400 text-xs">
              © 2025 널케이. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
