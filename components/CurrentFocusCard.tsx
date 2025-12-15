import React from 'react';
import { MonthData } from '../types';

interface Props {
  currentMonth: MonthData;
}

export const CurrentFocusCard: React.FC<Props> = ({ currentMonth }) => {
  const statusEmoji: Record<string, string> = {
    critical: '🎯',
    focus: '⭐',
    maintain: '✅',
    none: '•'
  };

  const statusColor: Record<string, string> = {
    critical: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    focus: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    maintain: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    none: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
  };

  const statusLabel: Record<string, string> = {
    critical: 'CRITICAL',
    focus: 'FOCUS',
    maintain: 'MAINTAIN',
    none: 'TRACK'
  };

  const status = currentMonth.isCritical ? 'critical' : currentMonth.activityLevel > 3 ? 'focus' : 'maintain';

  return (
    <div className={`rounded-xl shadow-sm border p-6 transition-all h-full ${statusColor[status] || statusColor.maintain}`}>
      <div className="flex items-start gap-4 h-full">
        <div className="text-5xl flex-shrink-0">{statusEmoji[status] || '•'}</div>
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            CURRENT FOCUS
          </h3>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {currentMonth.month}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-3">
            {currentMonth.bookingPriority}
          </p>
          <div className="inline-block bg-white dark:bg-zinc-800 rounded-full px-3 py-1 self-start shadow-sm border border-gray-100 dark:border-zinc-700">
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {statusLabel[status] || 'TRACK'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};