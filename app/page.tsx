'use client';

import { Heatmap } from '@/components/heatmap/Heatmap';
import { useActivity } from '@/hooks/useActivity';
import dayjs from 'dayjs';

export default function Home() {
  const { activities, streaks, addActivity, loading } = useActivity();

  const handleSimulateSolve = async () => {
    const today = dayjs().format('YYYY-MM-DD');
    await addActivity({
      date: today,
      solved: true,
      score: Math.floor(Math.random() * 100) + 50,
      timeTaken: Math.floor(Math.random() * 60) + 30,
      difficulty: Math.floor(Math.random() * 4) + 1,
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl animate-pulse">Loading Activity...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-50 dark:bg-gray-900">
      <div className="z-10 max-w-5xl w-full flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Puzzle Activity</h1>
            <p className="text-gray-500 mt-2">Visualizing your daily progress</p>
          </div>
          <button
            onClick={handleSimulateSolve}
            className="px-6 py-2 bg-activity-intense text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Solve Today's Puzzle
          </button>
        </div>
        
        <Heatmap activities={activities} streaks={streaks} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Achievements</h3>
            <p className="mt-2 text-gray-400 italic">Coming soon: Earn badges for your streaks!</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Statistics</h3>
            <p className="mt-2 text-gray-400 italic">Coming soon: Deep dive into your solve times.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Weekly Goal</h3>
            <p className="mt-2 text-gray-400 italic">Coming soon: Set and track your weekly targets.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

