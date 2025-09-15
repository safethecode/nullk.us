import type { AchievementKey } from '../types';
import { ACHIEVEMENTS } from '../types';

export class AchievementStorage {
  private getAchievementKey(key: AchievementKey): string {
    return `achievement-${key}`;
  }

  isUnlocked(key: AchievementKey): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    const stored = localStorage.getItem(this.getAchievementKey(key));
    return stored === 'true';
  }

  unlock(key: AchievementKey): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.getAchievementKey(key), 'true');
    }
  }

  resetAll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    for (const key of Object.keys(ACHIEVEMENTS)) {
      localStorage.removeItem(this.getAchievementKey(key as AchievementKey));
    }
  }

  getUnlockedAchievements(): AchievementKey[] {
    return Object.keys(ACHIEVEMENTS).filter((key) =>
      this.isUnlocked(key as AchievementKey)
    ) as AchievementKey[];
  }
}
