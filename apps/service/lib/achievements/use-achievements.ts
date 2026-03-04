'use client';

import { useEffect, useState } from 'react';
import { getAchievementManager } from './manager';
import type { Achievement, AchievementKey } from './types';

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    AchievementKey[]
  >([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const manager = getAchievementManager();

    setUnlockedAchievements(manager.getUnlockedAchievements());
    setAllAchievements(manager.getAllAchievements());

    const unsubscribe = manager.addListener(() => {
      setUnlockedAchievements(manager.getUnlockedAchievements());
    });

    return unsubscribe;
  }, []);

  const unlockAchievement = (key: AchievementKey) => {
    getAchievementManager().unlockAchievement(key);
  };

  const isUnlocked = (key: AchievementKey) => {
    return getAchievementManager().isAchievementUnlocked(key);
  };

  const resetAll = () => {
    getAchievementManager().resetAll();
  };

  const forceUnlock = (key: AchievementKey) => {
    getAchievementManager().forceUnlock(key);
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
