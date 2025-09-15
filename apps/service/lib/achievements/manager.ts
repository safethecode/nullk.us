'use client';
import { showAchievementToast } from '@/ui/achievement-sonner-toast';
import { AchievementStorage } from './storage';
import { ScrollTracker, TimeTracker } from './trackers';
import {
  type AchievementTrigger,
  createScrollTrigger,
  createTimeTrigger,
  triggerRegistry,
} from './triggers';
import type { Achievement, AchievementKey } from './types';
import { ACHIEVEMENTS } from './types';

class AchievementManager {
  private static instance: AchievementManager;
  private listeners: Set<() => void> = new Set();
  private storage: AchievementStorage;
  private scrollTracker: ScrollTracker;
  private timeTracker: TimeTracker;

  private constructor() {
    this.storage = new AchievementStorage();
    this.scrollTracker = new ScrollTracker(this.handleScrollProgress);
    this.timeTracker = new TimeTracker(this.handleTimeUpdate);
    this.initializeTracking();
    this.registerDefaultTriggers();
  }

  private registerDefaultTriggers(): void {
    const scrollTrigger = createScrollTrigger();
    const timeTrigger = createTimeTrigger();

    triggerRegistry.register('scroll', scrollTrigger, 'scroll');
    triggerRegistry.register('time', timeTrigger, 'time');
  }

  static getInstance(): AchievementManager {
    if (!AchievementManager.instance) {
      AchievementManager.instance = new AchievementManager();
    }
    return AchievementManager.instance;
  }

  private initializeTracking(): void {
    this.scrollTracker.start();
    this.timeTracker.start();
  }

  private handleScrollProgress = (percent: number): void => {
    const unlockedAchievements = triggerRegistry.checkScrollTriggers(
      percent,
      this.storage
    );
    for (const achievementKey of unlockedAchievements) {
      this.unlockAchievement(achievementKey);
    }
  };

  private handleTimeUpdate = (seconds: number): void => {
    const unlockedAchievements = triggerRegistry.checkTimeTriggers(
      seconds,
      this.storage
    );
    for (const achievementKey of unlockedAchievements) {
      this.unlockAchievement(achievementKey);
    }
  };

  isAchievementUnlocked(key: AchievementKey): boolean {
    return this.storage.isUnlocked(key);
  }

  unlockAchievement(key: AchievementKey): void {
    if (this.isAchievementUnlocked(key)) {
      return;
    }

    this.storage.unlock(key);

    const achievement = ACHIEVEMENTS[key];
    if (achievement) {
      showAchievementToast.custom(
        achievement.name,
        achievement.description,
        achievement.icon,
        achievement.iconColor,
        achievement.bgColor
      );
    }

    for (const listener of this.listeners) {
      listener();
    }
  }

  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  destroy(): void {
    this.scrollTracker.destroy();
    this.timeTracker.destroy();
    this.listeners.clear();
  }

  forceUnlock(key: AchievementKey): void {
    this.unlockAchievement(key);
  }

  resetAll(): void {
    this.storage.resetAll();
    for (const listener of this.listeners) {
      listener();
    }
  }

  getUnlockedAchievements(): AchievementKey[] {
    return this.storage.getUnlockedAchievements();
  }

  getAllAchievements(): Achievement[] {
    return Object.values(ACHIEVEMENTS);
  }

  registerTrigger(
    name: string,
    trigger: AchievementTrigger,
    type: 'scroll' | 'time' = 'scroll'
  ): void {
    triggerRegistry.register(name, trigger, type);
  }

  unregisterTrigger(name: string): void {
    triggerRegistry.unregister(name);
  }

  getTrigger(name: string): AchievementTrigger | undefined {
    return triggerRegistry.getTrigger(name);
  }

  getAllTriggers(): AchievementTrigger[] {
    return triggerRegistry.getAllTriggers();
  }
}

export const achievementManager = AchievementManager.getInstance();
