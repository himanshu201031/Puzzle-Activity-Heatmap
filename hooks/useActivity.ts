import { useState, useEffect, useCallback } from 'react';
import { getAllActivity, saveActivity, DailyActivity } from '../storage/indexedDB';
import { calculateStreaks, StreakStats } from '../utils/streak';

export function useActivity() {
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [streaks, setStreaks] = useState<StreakStats>({ currentStreak: 0, longestStreak: 0 });
  const [loading, setLoading] = useState(true);

  const refreshActivity = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllActivity();
      setActivities(data);
      setStreaks(calculateStreaks(data));
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addActivity = async (activity: Omit<DailyActivity, 'synced'>) => {
    const newActivity = { ...activity, synced: false };
    await saveActivity(newActivity);
    await refreshActivity();
  };

  useEffect(() => {
    refreshActivity();
  }, [refreshActivity]);

  return {
    activities,
    streaks,
    loading,
    addActivity,
    refreshActivity,
  };
}
