import type { AchievementKey } from "../types/achievement";
import { ACHIEVEMENTS } from "../types/achievement";

function getBrowserStorage(): Storage | null {
  try {
    const s = globalThis?.window?.localStorage;
    if (s && typeof s.getItem === "function") {
      return s;
    }
  } catch {
    // SSR or Node.js 22+ broken localStorage
  }
  return null;
}

export class AchievementStorage {
  private getAchievementKey(key: AchievementKey): string {
    return `achievement-${key}`;
  }

  isUnlocked(key: AchievementKey): boolean {
    const stored = getBrowserStorage()?.getItem(this.getAchievementKey(key));
    return stored === "true";
  }

  unlock(key: AchievementKey): void {
    getBrowserStorage()?.setItem(this.getAchievementKey(key), "true");
  }

  resetAll(): void {
    const s = getBrowserStorage();
    if (!s) {
      return;
    }
    for (const key of Object.keys(ACHIEVEMENTS)) {
      s.removeItem(this.getAchievementKey(key as AchievementKey));
    }
  }

  getUnlockedAchievements(): AchievementKey[] {
    return Object.keys(ACHIEVEMENTS).filter((key) =>
      this.isUnlocked(key as AchievementKey)
    ) as AchievementKey[];
  }
}
