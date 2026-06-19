"use client";

import { ArrowUpRight, ChevronDown, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import {
  AWARDS,
  DOMAINS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
  STATUS_CONFIG,
} from "@/lib/home/constants";
import { AnimatedActionButton } from "@/ui/animated-action-button";
import { GitHubIcon, LinkedInIcon } from "@/ui/social-icons";

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const visibleExperiences = showAllExperiences
    ? EXPERIENCES
    : EXPERIENCES.slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      {/* ── Hero ── */}
      <section className="mb-20">
        <h1 className="mb-3 font-bold text-[2.75rem] text-neutral-900 leading-[1.1] tracking-tight sm:text-6xl">
          손지민
        </h1>
        <p className="mb-5 text-lg text-neutral-500 sm:text-xl">
          Product Builder <span className="text-neutral-300">·</span> FE
          Specialist, 풀스택
        </p>

        <p className="mb-8 max-w-lg text-[15px] text-neutral-600 leading-relaxed">
          어떤 도메인이든 본질만을 고민하며, 결국 성과를 만들어 냅니다.
          <br />
          본질을 위해 끊임없이 질문하고, 끝내 만들어 냅니다.
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-neutral-400">
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-neutral-900"
            href="mailto:sam@nullk.us"
          >
            <Mail className="h-3.5 w-3.5" />
            sam@nullk.us
          </a>
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-neutral-900"
            href="https://github.com/safethecode"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-neutral-900"
            href="https://linkedin.com/in/safethecode"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            인천, 대한민국
          </span>
        </div>

        <AnimatedActionButton href="/coffee-chat">
          커피챗 신청하기
        </AnimatedActionButton>
      </section>

      {/* ── About ── */}
      <section className="mb-20">
        <SectionHeader>소개</SectionHeader>
        <div className="space-y-6">
          {[
            {
              quote: "경쟁사가 가장 무서워 할 무기입니다.",
              body: "어떤 도메인이든 본질만을 고민하며, 결국 성과를 만들어 냅니다.",
            },
            {
              quote: "어떤 조직에서도 분위기 메이커입니다.",
              body: "억지 공감, 억지 대화는 하지 않습니다. 팀원 모두가 진짜로 웃을 수 있는 자리를 만듭니다.",
            },
            {
              quote: "경험으로 싸우는 사람입니다.",
              body: "AI 시대, 사람의 무기는 경험입니다. 걸어보지 못한 길도 동료들과 함께 부딪히며 헤쳐나갑니다.",
            },
          ].map((item) => (
            <div
              className="border-neutral-200 border-l-2 pl-5 transition-colors hover:border-neutral-900"
              key={item.quote}
            >
              <p className="mb-1 font-semibold text-[15px] text-neutral-900">
                {item.quote}
              </p>
              <p className="text-[13px] text-neutral-400 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mb-20">
        <SectionHeader>경력</SectionHeader>
        <div className="space-y-3">
          {visibleExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                className="group rounded-2xl border border-neutral-100 bg-white transition-all hover:border-neutral-200 hover:shadow-sm"
                key={exp.id}
              >
                <button
                  className="flex w-full items-start gap-4 px-5 py-4 text-left sm:items-center sm:px-6"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  type="button"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-50 font-bold text-[11px] text-neutral-400 transition-colors group-hover:bg-neutral-100">
                    {exp.company.replace(/[()주]/g, "").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h3 className="font-semibold text-[15px] text-neutral-900">
                        {exp.company}
                      </h3>
                      <span className="text-[13px] text-neutral-400">
                        {exp.role}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-neutral-500">
                      {exp.summary}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="hidden text-[12px] text-neutral-400 sm:block">
                      {exp.period}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-300 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-neutral-50 border-t px-5 pt-4 pb-5 sm:px-6">
                    <p className="mb-3 text-[12px] text-neutral-400 sm:hidden">
                      {exp.period}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li
                          className="flex gap-2 text-[13px] text-neutral-600 leading-relaxed"
                          key={h}
                        >
                          <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    {exp.stack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            className="rounded-md bg-neutral-50 px-2 py-0.5 font-medium text-[11px] text-neutral-500"
                            key={tech}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showAllExperiences && EXPERIENCES.length > 6 && (
          <button
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 border-dashed py-3 font-medium text-[13px] text-neutral-400 transition-colors hover:border-neutral-300 hover:text-neutral-600"
            onClick={() => setShowAllExperiences(true)}
            type="button"
          >
            나머지 {EXPERIENCES.length - 6}개 경력 더 보기
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* ── Projects ── */}
      <section className="mb-20">
        <SectionHeader>프로젝트</SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => {
            const status = STATUS_CONFIG[project.status];
            return (
              <div
                className="group flex flex-col rounded-2xl border border-neutral-100 p-5 transition-all hover:border-neutral-200 hover:shadow-sm"
                key={project.title}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[15px] text-neutral-900 transition-colors group-hover:text-neutral-700">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-neutral-400">
                      {project.subtitle}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full border px-2 py-0.5 font-medium text-[11px] ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>
                <p className="mb-3 flex-1 text-[13px] text-neutral-500 leading-relaxed">
                  {project.description}
                </p>
                <div className="mb-3 space-y-1">
                  {project.highlights.map((h) => (
                    <p
                      className="flex gap-1.5 text-[12px] text-neutral-400"
                      key={h}
                    >
                      <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-200" />
                      {h}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-neutral-300">
                    {project.period}
                  </span>
                  {project.link && (
                    <a
                      className="flex items-center gap-0.5 font-medium text-[12px] text-neutral-400 transition-colors hover:text-neutral-900"
                      href={project.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      보기
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mb-20">
        <SectionHeader>기술 스택</SectionHeader>
        <div className="space-y-5">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 font-medium text-[12px] text-neutral-400 uppercase tracking-wider">
                {category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    className="rounded-lg border border-neutral-100 bg-white px-3 py-1.5 font-medium text-[13px] text-neutral-700 transition-colors hover:border-neutral-200 hover:bg-neutral-50"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className="mb-2 font-medium text-[12px] text-neutral-400 uppercase tracking-wider">
              산업 지식
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DOMAINS.map((d) => (
                <span
                  className="rounded-lg border border-neutral-100 bg-white px-3 py-1.5 text-[13px] text-neutral-500"
                  key={d}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="mb-20">
        <SectionHeader>수상 및 활동</SectionHeader>
        <div className="grid gap-2 sm:grid-cols-2">
          {AWARDS.map((award) => (
            <div
              className="flex items-start gap-3 rounded-xl border border-neutral-100 px-4 py-3 transition-shadow hover:shadow-sm"
              key={award.title}
            >
              <span className="mt-0.5 flex-shrink-0 font-medium text-[12px] text-neutral-300">
                {award.year}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-[13px] text-neutral-800 leading-snug">
                  {award.title}
                </p>
                {(award.org || award.note) && (
                  <p className="mt-0.5 text-[12px] text-neutral-400">
                    {[award.org, award.note].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education & Activities ── */}
      <section className="mb-20">
        <SectionHeader>학력 및 활동</SectionHeader>
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">
                  선린인터넷고등학교
                </h3>
                <p className="text-[13px] text-neutral-500">
                  IT경영 · 멀티미디어
                </p>
              </div>
              <span className="text-[12px] text-neutral-400">
                2019.03 ~ 2022.02
              </span>
            </div>
            <ul className="mt-3 space-y-1">
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                2021 서울시 지방기능경기대회 웹 디자인/개발 부문 교내 대표 출전
              </li>
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                졸업 시 공로상 수상
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">
                  AI / SW엔지니어 트랙 프로젝트 코치
                </h3>
                <p className="text-[13px] text-neutral-500">
                  엘리스 KDT 프로그램 · SW 엔지니어 트랙 1기 최우수 코치 (평점
                  5.0)
                </p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-neutral-400">
                2021.11 ~ 2023.01
              </span>
            </div>
            <ul className="mt-3 space-y-1">
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                SW 엔지니어 트랙 1기·6기·8기, AI 엔지니어 트랙 2기·3기 코칭
              </li>
              <li className="flex gap-2 text-[13px] text-neutral-500">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300" />
                소프트웨어 마에스트로 수강생 320명 대상 웹 기초 사전학습 및
                커리어 코칭
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[15px] text-neutral-900">
                  Quiet, AI Agent · Unnoticed
                </h3>
                <p className="text-[13px] text-neutral-500">
                  AI-Agent를 가장 티 안 나게 쓰는 커뮤니티
                </p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-neutral-400">
                2026.01 ~ 진행 중
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Companies ── */}
      <section>
        <SectionHeader>함께한 곳들</SectionHeader>
        <div className="flex flex-wrap gap-2">
          {[
            "라스커",
            "센드버드",
            "리플에이아이",
            "플라스크",
            "오늘의꽃",
            "스카이랩스",
            "러너스컴퍼니",
            "로랩스",
            "라틀라스",
            "비긴메이트",
          ].map((name) => (
            <span
              className="rounded-lg border border-neutral-100 px-3 py-1.5 font-medium text-[13px] text-neutral-500 transition-colors hover:border-neutral-200 hover:text-neutral-700"
              key={name}
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-bold text-lg text-neutral-900 tracking-tight">
      {children}
    </h2>
  );
}
