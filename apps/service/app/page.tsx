'use client';

import { AnimatedActionButton } from '@/ui/animated-action-button';
import { BrandLogoCard } from '@/ui/brand-logo-card';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col gap-18 px-8">
      <section className="flex h-full gap-6">
        <div className="group relative flex-1 overflow-hidden rounded-3xl bg-neutral-100">
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
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-12 text-white">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Open to Work
              </div>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold text-6xl text-transparent leading-tight">
                프론트엔드 엔지니어
              </h1>
              <p className="max-w-lg font-medium text-2xl text-gray-300 leading-relaxed">
                찾을 수 없는 곳에서 보석을 찾는,
                <br />
                FE 엔지니어, 손지민입니다.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 mt-6 rounded-tr-[20px] bg-white pt-[19px] pr-[30px] pb-[21px] pl-[30px]">
              <AnimatedActionButton
                href="/coffee-chat"
                className="detail-button-container px-10 py-4"
              >
                자세히 보기
              </AnimatedActionButton>
            </div>
          </div>
        </div>
        <div className="flex w-64 flex-col gap-4">
          <div className="flex h-48 items-center justify-center rounded-3xl bg-neutral-100 p-6">
            <div className="text-center text-black">
              <h3 className="mb-2 font-bold text-lg">5 Years</h3>
              <p className="text-sm opacity-90">첫 번째 카드입니다</p>
            </div>
          </div>
          <div className="flex h-48 items-center justify-center rounded-3xl bg-neutral-100 p-6">
            <div className="text-center text-black">
              <h3 className="mb-2 font-bold text-lg">카드 2</h3>
              <p className="text-sm opacity-90">두 번째 카드입니다</p>
            </div>
          </div>
          <div className="flex h-48 items-center justify-center rounded-3xl bg-neutral-100 p-6">
            <div className="text-center text-black">
              <h3 className="mb-2 font-bold text-lg">카드 3</h3>
              <p className="text-sm opacity-90">세 번째 카드입니다</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-5xl text-neutral-900">
          <Image
            src="/assets/icons/handshake-no-skin-tone-light-skin-tone.png"
            alt="삼손에 대한 소중한 리뷰"
            width={64}
            height={64}
          />
          소중한 리뷰
        </p>
      </section>
      <section className="flex h-full flex-col gap-6">
        <p className="flex items-center gap-2 text-5xl text-neutral-900">
          <Image
            src="/assets/icons/compass.png"
            alt="삼손에 대한 가장 궁금하신 것들"
            width={64}
            height={64}
          />
          가장 궁금하신 것들
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-100 to-white p-8 transition-all duration-500">
            <Image
              src="/assets/icons/clipboard.png"
              alt="최신 이력서"
              width={64}
              height={64}
              className="mb-6"
            />
            <div className="space-y-4">
              <h3 className="font-bold text-3xl text-neutral-900 leading-tight">
                최신 이력서
              </h3>
              <p className="mb-4 text-lg text-neutral-600 leading-relaxed">
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
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-100 to-white p-8 transition-all duration-500">
            <Image
              src="/assets/icons/technologist-light-skin-tone.png"
              alt="경력 사항"
              width={64}
              height={64}
              className="mb-6"
            />
            <div className="space-y-4">
              <h3 className="font-bold text-3xl text-neutral-900 leading-tight">
                경력 사항
              </h3>
              <p className="mb-4 text-lg text-neutral-600 leading-relaxed">
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
        <p className="flex items-center gap-2 text-5xl text-neutral-900">
          <Image
            src="/assets/icons/heart-with-ribbon.png"
            alt="함께해주신 분들"
            width={64}
            height={64}
          />
          함께해 주셔서 감사합니다
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
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
