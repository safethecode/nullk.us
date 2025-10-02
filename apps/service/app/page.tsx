'use client';

import { AnimatedActionButton } from '@/ui/animated-action-button';
import { BrandLogoCard } from '@/ui/brand-logo-card';
import { Quote, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;

          if (currentScroll >= maxScroll) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // 첫 번째 카드의 너비 + gap을 계산하여 스크롤
            const firstCard = scrollContainer.firstElementChild as HTMLElement;
            const cardWidth = firstCard?.offsetWidth || 336;
            const gap = 16; // Tailwind gap-4
            scrollContainer.scrollBy({
              left: cardWidth + gap,
              behavior: 'smooth',
            });
          }
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    startAutoScroll();

    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
      scrollContainer.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col gap-18 px-8">
      <section className="flex flex-col gap-6 lg:h-full lg:flex-row">
        <div className="group relative min-h-[300px] flex-1 overflow-hidden rounded-3xl bg-neutral-100 sm:min-h-[350px] lg:min-h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source
              src="/assets/videos/hero-background-video.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/95 via-black/80 to-black/70" />
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-white sm:p-8 lg:p-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-xs backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                Open to Work
              </div>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold text-3xl text-transparent leading-tight sm:text-4xl lg:text-6xl">
                프론트엔드 엔지니어
              </h1>
              <p className="max-w-lg font-medium text-gray-300 text-lg leading-relaxed sm:text-xl lg:text-2xl">
                찾을 수 없는 곳에서 보석을 찾는,
                <br />
                FE 엔지니어, 손지민입니다.
              </p>
            </div>
            <div className="mt-6 flex justify-start lg:absolute lg:bottom-0 lg:left-0">
              <div className="lg:rounded-tr-[20px] lg:bg-white lg:pt-[19px] lg:pr-[30px] lg:pb-[21px] lg:pl-[30px]">
                <AnimatedActionButton
                  href="/coffee-chat"
                  className="detail-button-container px-6 py-3 sm:px-8 sm:py-4 lg:px-10"
                >
                  자세히 보기
                </AnimatedActionButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-80 lg:flex-col">
          <article className="flex h-32 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-40 sm:p-5 lg:h-48 lg:p-6">
            <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
            <div>
              <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                항상 꼼꼼하고 책임감 있게 업무를 처리하시는 모습이 인상
                깊었습니다.
              </p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">
                김철수 · 백엔드 개발자
              </p>
            </div>
          </article>

          <article className="flex h-32 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-40 sm:p-5 lg:h-48 lg:p-6">
            <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
            <div>
              <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                함께 일하면서 많은 것을 배울 수 있었습니다. 항상 긍정적인 태도로
                좋은 영향을 주셨습니다.
              </p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">
                박영희 · 디자이너
              </p>
            </div>
          </article>

          <article className="flex h-32 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-40 sm:p-5 lg:h-48 lg:p-6">
            <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
            <div>
              <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                빠른 문제 해결 능력과 커뮤니케이션 능력이 탁월하십니다.
              </p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">
                이민준 · 프로덕트 매니저
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-3xl text-neutral-900 sm:text-4xl lg:text-5xl">
          <Image
            src="/assets/icons/handshake-no-skin-tone-light-skin-tone.png"
            alt="동료들의 소중한 리뷰"
            width={48}
            height={48}
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          소중한 리뷰
        </p>
        <div className="relative mx-auto w-full max-w-[336px] sm:max-w-[1200px]">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth sm:gap-6"
          >
            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  항상 꼼꼼하고 책임감 있게 업무를 처리하시는 모습이 인상
                  깊었습니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  김철수 · 백엔드 개발자
                </p>
              </div>
            </article>

            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  함께 일하면서 많은 것을 배울 수 있었습니다. 항상 긍정적인
                  태도로 좋은 영향을 주셨습니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  박영희 · 디자이너
                </p>
              </div>
            </article>

            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  빠른 문제 해결 능력과 커뮤니케이션 능력이 탁월하십니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  이민준 · 프로덕트 매니저
                </p>
              </div>
            </article>

            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  뛰어난 기술력과 문제 해결 능력을 가지고 계십니다. 언제나 배울
                  점이 많은 동료입니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  정수아 · 프론트엔드 개발자
                </p>
              </div>
            </article>

            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  프로젝트 일정을 맞추면서도 코드 품질을 절대 타협하지 않는
                  모습이 인상적이었습니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  최민호 · CTO
                </p>
              </div>
            </article>

            <article className="flex h-48 w-80 flex-shrink-0 flex-col justify-between rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-4 sm:h-52 sm:w-96 sm:p-5 lg:h-56 lg:p-6">
              <Quote className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
              <div>
                <p className="mb-2 text-gray-700 text-xs leading-relaxed sm:text-sm">
                  세심한 피드백과 함께 팀원들의 성장을 돕는 리더십이
                  돋보였습니다.
                </p>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                  강지은 · 주니어 개발자
                </p>
              </div>
            </article>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-3xl text-neutral-900 sm:text-4xl lg:text-5xl">
          <Image
            src="/assets/icons/compass.png"
            alt="삼손에 대한 가장 궁금하신 것들"
            width={48}
            height={48}
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          가장 궁금하신 것들
        </p>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-100 to-white p-6 transition-all duration-500 sm:p-8">
            <Image
              src="/assets/icons/clipboard.png"
              alt="최신 이력서"
              width={48}
              height={48}
              className="mb-4 sm:mb-6 sm:h-16 sm:w-16"
            />
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-2xl text-neutral-900 leading-tight sm:text-3xl">
                최신 이력서
              </h3>
              <p className="mb-3 text-base text-neutral-600 leading-relaxed sm:mb-4 sm:text-lg">
                2025년 9월 18일 기준 <strong>최신 이력서</strong>
                <br />
                프론트엔드 엔지니어부터 사업 경험까지 있어요
              </p>

              <div className="flex items-center">
                <AnimatedActionButton href="/resume">
                  바로가기
                </AnimatedActionButton>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-100 to-white p-6 transition-all duration-500 sm:p-8">
            <Image
              src="/assets/icons/technologist-light-skin-tone.png"
              alt="경력 사항"
              width={48}
              height={48}
              className="mb-4 sm:mb-6 sm:h-16 sm:w-16"
            />
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-2xl text-neutral-900 leading-tight sm:text-3xl">
                경력 사항
              </h3>
              <p className="mb-3 text-base text-neutral-600 leading-relaxed sm:mb-4 sm:text-lg">
                2019년 ⎯ 2025년 현재까지
                <br />
                그동안 경험했던 것들을 자세히 기록했어요
              </p>

              <div className="flex items-center">
                <AnimatedActionButton href="/experience">
                  바로가기
                </AnimatedActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-3xl text-neutral-900 sm:text-4xl lg:text-5xl">
          <Image
            src="/assets/icons/technologist-light-skin-tone.png"
            alt="최근 진행 중인 프로젝트"
            width={48}
            height={48}
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          최근 진행 중인 프로젝트
        </p>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-6 transition-all duration-500 sm:p-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-2xl text-neutral-900 leading-tight sm:text-3xl">
                프로젝트 이름
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed sm:text-lg">
                프로젝트에 대한 간단한 설명이 들어갑니다.
                <br />
                주요 기술 스택과 역할을 소개합니다.
              </p>
              <div className="flex items-center">
                <AnimatedActionButton href="/projects">
                  자세히 보기
                </AnimatedActionButton>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-6 transition-all duration-500 sm:p-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-2xl text-neutral-900 leading-tight sm:text-3xl">
                또 다른 프로젝트
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed sm:text-lg">
                진행 중인 다른 프로젝트에 대한 설명입니다.
                <br />
                혁신적인 기술과 접근 방식을 사용했습니다.
              </p>
              <div className="flex items-center">
                <AnimatedActionButton href="/projects">
                  자세히 보기
                </AnimatedActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-3xl text-neutral-900 sm:text-4xl lg:text-5xl">
          <Image
            src="/assets/icons/heart-with-ribbon.png"
            alt="함께해주신 분들"
            width={48}
            height={48}
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          함께해 주신 분들
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            // TODO: 브랜드 로고 추가
            <BrandLogoCard
              key={index}
              src="/assets/logos/corp/sendbird-logo.svg"
              alt="Sendbird"
              width={248}
              height={64}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
