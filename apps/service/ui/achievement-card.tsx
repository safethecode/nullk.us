import { ArrowRight, Sparkles } from 'lucide-react';
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
  bgColor = 'from-black/95 via-black/80 to-black/70',
  IconComponent = Sparkles,
}: AchievementCardProps) {
  return (
    <section className="flex h-full gap-6">
      <div className="group relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${bgColor}`}
        />
        <div className="relative z-10 flex h-full w-full flex-col justify-between pt-10 pr-10 pb-10 pl-6 text-white">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-sm backdrop-blur-sm">
              <IconComponent className="h-4 w-4" />
              {isUnlocked ? '달성 완료' : '달성 전'}
            </div>
            <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold text-2xl text-transparent leading-tight">
              {name}
            </h1>
            <p className="max-w-lg font-medium text-lg text-white leading-relaxed">
              {description}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 rounded-tl-[24px] bg-white p-3">
            <button
              type="button"
              className="detail-button-container-right inline-flex cursor-pointer items-center gap-3 rounded-full bg-black px-4 py-4 font-medium text-lg text-white transition-all"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AchievementCard;
