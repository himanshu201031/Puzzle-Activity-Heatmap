'use client';

import React from 'react';
import { Tooltip, cn } from '../ui/Tooltip';
import dayjs from 'dayjs';

interface HeatmapCellProps {
  date: string;
  intensity: number; // 0 to 4
  isToday: boolean;
  score?: number;
  timeTaken?: number;
  difficulty?: number;
}

const intensityColors = [
  'bg-activity-empty',
  'bg-activity-low',
  'bg-activity-medium',
  'bg-activity-high',
  'bg-activity-intense',
];

export const HeatmapCell = React.memo(function HeatmapCell({
  date,
  intensity,
  isToday,
  score,
  timeTaken,
  difficulty,
}: HeatmapCellProps) {
  const formattedDate = dayjs(date).format('MMM D, YYYY');
  
  const tooltipContent = (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <span className="font-bold">{formattedDate}</span>
      {intensity > 0 ? (
        <>
          <span>Score: {score}</span>
          <span>Time: {timeTaken}s</span>
          <span>Diff: {difficulty}</span>
        </>
      ) : (
        <span>No activity</span>
      )}
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={cn(
          "w-3 h-3 rounded-cell cursor-pointer transition-transform hover:scale-125",
          intensityColors[intensity],
          isToday && "border-2 border-orange-500"
        )}
      />
    </Tooltip>
  );
});
