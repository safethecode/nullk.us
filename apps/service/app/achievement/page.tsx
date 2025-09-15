'use client';

import { useAchievements } from '@/lib/achievements';
import AchievementCard from '@/ui/achievement-card';
import { Clock, MapPin, Scroll, Star, Target, Trophy } from 'lucide-react';

const ACHIEVEMENT_ICONS = {
  'profile-visit': Trophy,
  'resume-view': Star,
  'career-view': Target,
  'page-scroll-50': Scroll,
  'page-scroll-100': Scroll,
  'time-spent-30s': Clock,
  'time-spent-1m': Clock,
  'time-spent-5m': Clock,
} as const;

export default function Achievement() {
  const { unlockedAchievements, allAchievements } = useAchievements();

  return (
    <div className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-left">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">도전 과제</h1>
        <p className="text-gray-600 text-lg">
          삼손 프로필을 돌아다니며, 하나씩 달성해보세요!
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {allAchievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.key);
          const IconComponent = ACHIEVEMENT_ICONS[achievement.key] || MapPin;

          return (
            <AchievementCard
              key={achievement.key}
              name={achievement.name}
              description={achievement.description}
              isUnlocked={isUnlocked}
              bgColor={
                isUnlocked
                  ? achievement.bgColor
                  : 'from-black/95 via-black/80 to-black/70'
              }
              IconComponent={IconComponent}
            />
          );
        })}
      </div>
    </div>
  );
}
