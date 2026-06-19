import type { AchievementStorage } from "../storage/achievement-storage";
import type { AchievementKey } from "../types/achievement";
import type { AchievementTrigger } from "./achievement-triggers";

export interface TriggerCondition {
  check(progress: number, storage: AchievementStorage): boolean;
  getAchievementKey(): AchievementKey;
}

export class TriggerRegistry {
  private readonly triggers: Map<string, AchievementTrigger> = new Map();
  private readonly scrollTriggers: Set<string> = new Set();
  private readonly timeTriggers: Set<string> = new Set();

  register(
    name: string,
    trigger: AchievementTrigger,
    type: "scroll" | "time" = "scroll"
  ): void {
    this.triggers.set(name, trigger);
    if (type === "scroll") {
      this.scrollTriggers.add(name);
    } else if (type === "time") {
      this.timeTriggers.add(name);
    }
  }

  unregister(name: string): void {
    this.triggers.delete(name);
    this.scrollTriggers.delete(name);
    this.timeTriggers.delete(name);
  }

  checkScrollTriggers(
    percent: number,
    storage: AchievementStorage
  ): AchievementKey[] {
    const unlockedAchievements: AchievementKey[] = [];

    for (const triggerName of this.scrollTriggers) {
      const trigger = this.triggers.get(triggerName);
      if (trigger) {
        const achievementKey = trigger.check(percent, storage);
        if (achievementKey) {
          unlockedAchievements.push(achievementKey);
        }
      }
    }

    return unlockedAchievements;
  }

  checkTimeTriggers(
    seconds: number,
    storage: AchievementStorage
  ): AchievementKey[] {
    const unlockedAchievements: AchievementKey[] = [];

    for (const triggerName of this.timeTriggers) {
      const trigger = this.triggers.get(triggerName);
      if (trigger) {
        const achievementKey = trigger.check(seconds, storage);
        if (achievementKey) {
          unlockedAchievements.push(achievementKey);
        }
      }
    }

    return unlockedAchievements;
  }

  checkAll(progress: number, storage: AchievementStorage): AchievementKey[] {
    const unlockedAchievements: AchievementKey[] = [];

    for (const trigger of this.triggers.values()) {
      const achievementKey = trigger.check(progress, storage);
      if (achievementKey) {
        unlockedAchievements.push(achievementKey);
      }
    }

    return unlockedAchievements;
  }

  getTrigger(name: string): AchievementTrigger | undefined {
    return this.triggers.get(name);
  }

  getAllTriggers(): AchievementTrigger[] {
    return Array.from(this.triggers.values());
  }
}

export const triggerRegistry = new TriggerRegistry();
