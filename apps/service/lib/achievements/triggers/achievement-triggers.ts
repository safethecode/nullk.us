import type { AchievementStorage } from "../storage/achievement-storage";
import type { AchievementKey } from "../types/achievement";

export interface AchievementTrigger {
  check(progress: number, storage: AchievementStorage): AchievementKey | null;
}

export class ScrollAchievementTrigger implements AchievementTrigger {
  check(percent: number, storage: AchievementStorage): AchievementKey | null {
    if (percent >= 50 && !storage.isUnlocked("page-scroll-50")) {
      return "page-scroll-50";
    }

    if (percent >= 100 && !storage.isUnlocked("page-scroll-100")) {
      return "page-scroll-100";
    }

    return null;
  }
}

export class TimeAchievementTrigger implements AchievementTrigger {
  check(seconds: number, storage: AchievementStorage): AchievementKey | null {
    if (seconds >= 30 && !storage.isUnlocked("time-spent-30s")) {
      return "time-spent-30s";
    }

    if (seconds >= 60 && !storage.isUnlocked("time-spent-1m")) {
      return "time-spent-1m";
    }

    if (seconds >= 300 && !storage.isUnlocked("time-spent-5m")) {
      return "time-spent-5m";
    }

    return null;
  }
}

export const createScrollTrigger = (): ScrollAchievementTrigger =>
  new ScrollAchievementTrigger();

export const createTimeTrigger = (): TimeAchievementTrigger =>
  new TimeAchievementTrigger();
