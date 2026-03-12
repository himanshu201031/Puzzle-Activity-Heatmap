'use client';

import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { HeatmapCell } from './HeatmapCell';
import { DailyActivity } from '../../storage/indexedDB';

interface HeatmapGridProps {
  activities: DailyActivity[];
  year?: number;
}

export function HeatmapGrid({ activities, year = dayjs().year() }: HeatmapGridProps) {
  const activityMap = useMemo(() => {
    const map = new Map<string, DailyActivity>();
    activities.forEach((a) => map.set(a.date, a));
    return map;
  }, [activities]);

  const weeks = useMemo(() => {
    const startOfYear = dayjs(`${year}-01-01`).startOf('week');
    const endOfYear = dayjs(`${year}-12-31`).endOf('week');
    
    const weeksArr: string[][] = [];
    let currentDay = startOfYear;
    
    while (currentDay.isBefore(endOfYear)) {
      const week: string[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDay.format('YYYY-MM-DD'));
        currentDay = currentDay.add(1, 'day');
      }
      weeksArr.push(week);
    }
    return weeksArr;
  }, [year]);

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className="flex gap-1 overflow-x-auto pb-4 max-w-full">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          {week.map((date) => {
            const activity = activityMap.get(date);
            const intensity = activity ? Math.min(activity.difficulty, 4) : 0;
            return (
              <HeatmapCell
                key={date}
                date={date}
                intensity={intensity}
                isToday={date === today}
                score={activity?.score}
                timeTaken={activity?.timeTaken}
                difficulty={activity?.difficulty}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
