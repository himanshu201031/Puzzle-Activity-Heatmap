import dayjs from 'dayjs';
import { DailyActivity } from '../storage/indexedDB';

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
}

export function calculateStreaks(activities: DailyActivity[]): StreakStats {
  if (activities.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const solvedDates = new Set(
    activities.filter((a) => a.solved).map((a) => a.date)
  );

  const sortedDates = Array.from(solvedDates).sort((a, b) => 
    dayjs(b).unix() - dayjs(a).unix()
  );

  // Current streak
  let currentStreak = 0;
  let checkDate = dayjs().startOf('day');
  
  // If not solved today, check yesterday
  if (!solvedDates.has(checkDate.format('YYYY-MM-DD'))) {
    checkDate = checkDate.subtract(1, 'day');
  }

  while (solvedDates.has(checkDate.format('YYYY-MM-DD'))) {
    currentStreak++;
    checkDate = checkDate.subtract(1, 'day');
  }

  // Longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Sort ascending for longest streak calculation
  const ascDates = Array.from(solvedDates).sort((a, b) => 
    dayjs(a).unix() - dayjs(b).unix()
  );

  for (let i = 0; i < ascDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const prevDate = dayjs(ascDates[i - 1]);
      const currDate = dayjs(ascDates[i]);
      
      if (currDate.diff(prevDate, 'day') === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return { currentStreak, longestStreak };
}
