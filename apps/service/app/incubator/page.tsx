import type { Metadata } from "next";
import Image from "next/image";
import { IncubatorGrid } from "./incubator-grid";

export const metadata: Metadata = {
  title: "Incubator - nullk.us",
  description: "삼손의 새로운 아이디어가 자라는 공간입니다.",
  alternates: {
    canonical: "/incubator",
  },
};

export default function IncubatorPage() {
  return (
    <main
      className="fixed inset-0 z-[100] flex w-full flex-col gap-6 overflow-hidden bg-white p-4 sm:p-6"
      data-page-shell="standalone"
    >
      <h1 className="shrink-0">
        <span className="sr-only">삼손 인큐베이터</span>
        <Image
          alt=""
          height={24}
          priority
          src="/assets/logos/sam-son/samson-full-logo.svg"
          width={72}
        />
      </h1>

      <IncubatorGrid />
    </main>
  );
}
