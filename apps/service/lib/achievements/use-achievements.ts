'use client';

import { useEffect, useState } from 'react';
import { achievementManager } from './manager';
import type { Achievement, AchievementKey } from './types';

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    AchievementKey[]
  >([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setUnlockedAchievements(achievementManager.getUnlockedAchievements());
    setAllAchievements(achievementManager.getAllAchievements());

    const unsubscribe = achievementManager.addListener(() => {
      setUnlockedAchievements(achievementManager.getUnlockedAchievements());
    });

    return unsubscribe;
  }, []);

  const unlockAchievement = (key: AchievementKey) => {
    achievementManager.unlockAchievement(key);
  };

  const isUnlocked = (key: AchievementKey) => {
    return achievementManager.isAchievementUnlocked(key);
  };

  const resetAll = () => {
    achievementManager.resetAll();
  };

  const forceUnlock = (key: AchievementKey) => {
    achievementManager.forceUnlock(key);
  };

  return {
    unlockedAchievements,
    allAchievements,
    unlockAchievement,
    isUnlocked,
    resetAll,
    forceUnlock,
  };
}

export function useAchievement(key: AchievementKey) {
  const { isUnlocked, unlockAchievement } = useAchievements();

  return {
    isUnlocked: isUnlocked(key),
    unlock: () => unlockAchievement(key),
  };
}
