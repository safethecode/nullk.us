"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import type React from "react";
import { toastQueue } from "@/lib/achievements/toast-queue";

interface AchievementSonnerToastProps {
  bgColor?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  subtitle?: string;
  title?: string;
}

export default function AchievementSonnerToast({
  title,
  subtitle,
  icon,
  iconColor,
  bgColor,
}: AchievementSonnerToastProps) {
  return (
    <div className="group relative flex h-20 w-80 items-center gap-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 transition-all duration-300">
      <div className="flex-1 space-y-1 overflow-hidden">
        <h3 className="truncate font-semibold text-gray-900 text-lg leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <span className="truncate text-gray-700 text-sm">{subtitle}</span>
          <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-gray-700" />
        </div>
      </div>
      <div className="flex-shrink-0">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}
        >
          {icon || <MapPin className={`h-6 w-6 ${iconColor}`} />}
        </div>
      </div>
    </div>
  );
}

export const showAchievementToast = {
  custom: (
    title: string,
    subtitle: string,
    icon?: React.ReactNode,
    iconColor?: string,
    bgColor?: string
  ) => {
    toastQueue.addToast({
      title,
      subtitle,
      icon,
      iconColor,
      bgColor,
    });
  },
};
