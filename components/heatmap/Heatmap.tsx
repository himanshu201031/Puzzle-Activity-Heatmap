'use client';

import React from 'react';
import { HeatmapGrid } from './HeatmapGrid';
import { DailyActivity } from '../../storage/indexedDB';

interface HeatmapProps {
  activities: DailyActivity[];
  streaks: { currentStreak: number; longestStreak: number };
}

export function Heatmap({ activities, streaks }: HeatmapProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Puzzle Activity</h2>
          <p className="text-sm text-gray-500">Your daily contributions to puzzle solving</p>
        </div>
        
        <div className="flex gap-8">
          <div className="text-center">
            <span className="block text-2xl font-bold text-orange-500">🔥 {streaks.currentStreak}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Current Streak</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">{streaks.longestStreak}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Longest Streak</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <HeatmapGrid activities={activities} />
        
        <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2">
          <div className="flex gap-4">
            <span>Total Solved: {activities.filter(a => a.solved).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-cell bg-activity-empty" />
            <div className="w-3 h-3 rounded-cell bg-activity-low" />
            <div className="w-3 h-3 rounded-cell bg-activity-medium" />
            <div className="w-3 h-3 rounded-cell bg-activity-high" />
            <div className="w-3 h-3 rounded-cell bg-activity-intense" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
