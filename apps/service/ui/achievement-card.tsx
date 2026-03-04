import { Lock, Check } from 'lucide-react';
import type React from 'react';

interface AchievementCardProps {
  name: string;
  description: string;
  isUnlocked: boolean;
  bgColor?: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}

export function AchievementCard({
  name,
  description,
  isUnlocked,
  IconComponent,
}: AchievementCardProps) {
  return (
    <article
      className={`group rounded-2xl border p-5 transition-all ${
        isUnlocked
          ? 'border-emerald-200 bg-emerald-50/50'
          : 'border-neutral-100 bg-white'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
          {IconComponent ? (
            <IconComponent className="h-4 w-4 text-neutral-500" />
          ) : (
            <Lock className="h-4 w-4 text-neutral-400" />
          )}
        </div>
        {isUnlocked ? (
          <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
            <Check className="h-3 w-3" />
            달성
          </span>
        ) : (
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-400">
            미달성
          </span>
        )}
      </div>

      <h3
        className={`mb-1 font-semibold text-[14px] ${isUnlocked ? 'text-neutral-900' : 'text-neutral-400'}`}
      >
        {isUnlocked ? name : '???'}
      </h3>
      <p
        className={`text-[12px] leading-relaxed ${isUnlocked ? 'text-neutral-500' : 'text-neutral-300'}`}
      >
        {isUnlocked ? description : '아직 달성하지 못한 도전 과제입니다.'}
      </p>
    </article>
  );
}

export default AchievementCard;
