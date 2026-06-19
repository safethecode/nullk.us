import type React from "react";

export type AchievementKey =
  | "profile-visit"
  | "resume-view"
  | "career-view"
  | "page-scroll-50"
  | "page-scroll-100"
  | "time-spent-30s"
  | "time-spent-1m"
  | "time-spent-5m";

export interface Achievement {
  bgColor?: string;
  description: string;
  icon?: React.ReactNode;
  iconColor?: string;
  key: AchievementKey;
  name: string;
}

export const ACHIEVEMENTS: Record<AchievementKey, Achievement> = {
  "profile-visit": {
    key: "profile-visit",
    name: "프로필 방문 달성!",
    description: "자세히 보기",
    iconColor: "text-blue-600",
    bgColor: "bg-yellow-400",
  },
  "resume-view": {
    key: "resume-view",
    name: "이력서 확인 달성!",
    description: "바로가기",
    iconColor: "text-green-600",
    bgColor: "bg-green-400",
  },
  "career-view": {
    key: "career-view",
    name: "경력 사항 확인 달성!",
    description: "바로가기",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-400",
  },
  "page-scroll-50": {
    key: "page-scroll-50",
    name: "페이지 탐험가!",
    description: "50% 스크롤 달성",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-400",
  },
  "page-scroll-100": {
    key: "page-scroll-100",
    name: "완전 탐험가!",
    description: "100% 스크롤 달성",
    iconColor: "text-red-600",
    bgColor: "bg-red-400",
  },
  "time-spent-30s": {
    key: "time-spent-30s",
    name: "관심 표현!",
    description: "30초 체류 달성",
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-400",
  },
  "time-spent-1m": {
    key: "time-spent-1m",
    name: "진지한 관심!",
    description: "1분 체류 달성",
    iconColor: "text-pink-600",
    bgColor: "bg-pink-400",
  },
  "time-spent-5m": {
    key: "time-spent-5m",
    name: "열렬한 팬!",
    description: "5분 체류 달성",
    iconColor: "text-teal-600",
    bgColor: "bg-teal-400",
  },
};
