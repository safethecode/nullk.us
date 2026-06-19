"use client";

import { Clock, MapPin, Scroll, Star, Target, Trophy } from "lucide-react";
import { useAchievements } from "@/lib/achievements/use-achievements";
import AchievementCard from "@/ui/achievement-card";

const ACHIEVEMENT_ICONS = {
  "profile-visit": Trophy,
  "resume-view": Star,
  "career-view": Target,
  "page-scroll-50": Scroll,
  "page-scroll-100": Scroll,
  "time-spent-30s": Clock,
  "time-spent-1m": Clock,
  "time-spent-5m": Clock,
} as const;

export default function Achievement() {
  const { unlockedAchievements, allAchievements } = useAchievements();

  const unlockedCount = unlockedAchievements.length;
  const totalCount = allAchievements.length;

  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      <div className="mb-2 flex items-baseline gap-3">
        <h1 className="font-bold text-[2rem] text-neutral-900 tracking-tight sm:text-4xl">
          도전 과제
        </h1>
        <span className="font-medium text-[15px] text-neutral-300">
          {unlockedCount}/{totalCount}
        </span>
      </div>
      <p className="mb-12 text-[15px] text-neutral-400">
        사이트를 돌아다니며 도전 과제를 달성해보세요.
      </p>

      <div className="mb-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allAchievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.key);
          const IconComponent = ACHIEVEMENT_ICONS[achievement.key] || MapPin;

          return (
            <AchievementCard
              description={achievement.description}
              IconComponent={IconComponent}
              isUnlocked={isUnlocked}
              key={achievement.key}
              name={achievement.name}
            />
          );
        })}
      </div>
    </main>
  );
}
