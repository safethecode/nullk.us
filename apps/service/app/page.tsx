'use client';

import { AnimatedActionButton } from '@/ui/animated-action-button';
import { BrandLogoCard } from '@/ui/brand-logo-card';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
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
        <div className="flex flex-col gap-4 lg:w-64 lg:flex-col">
          <div className="flex h-32 items-center justify-center rounded-3xl bg-neutral-100 p-4 sm:h-40 sm:p-6 lg:h-48">
            <div className="text-center text-black">
              <h3 className="mb-1 font-bold text-base sm:mb-2 sm:text-lg">
                5 Years
              </h3>
              <p className="text-xs opacity-90 sm:text-sm">
                첫 번째 카드입니다
              </p>
            </div>
          </div>
          <div className="flex h-32 items-center justify-center rounded-3xl bg-neutral-100 p-4 sm:h-40 sm:p-6 lg:h-48">
            <div className="text-center text-black">
              <h3 className="mb-1 font-bold text-base sm:mb-2 sm:text-lg">
                카드 2
              </h3>
              <p className="text-xs opacity-90 sm:text-sm">
                두 번째 카드입니다
              </p>
            </div>
          </div>
          <div className="flex h-32 items-center justify-center rounded-3xl bg-neutral-100 p-4 sm:h-40 sm:p-6 lg:h-48">
            <div className="text-center text-black">
              <h3 className="mb-1 font-bold text-base sm:mb-2 sm:text-lg">
                카드 3
              </h3>
              <p className="text-xs opacity-90 sm:text-sm">
                세 번째 카드입니다
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-3xl text-neutral-900 sm:text-4xl lg:text-5xl">
          <Image
            src="/assets/icons/handshake-no-skin-tone-light-skin-tone.png"
            alt="삼손에 대한 소중한 리뷰"
            width={48}
            height={48}
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          소중한 리뷰
        </p>
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
