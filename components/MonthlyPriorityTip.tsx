import React from 'react';
import { MonthData } from '../types';

interface Props {
  currentMonth: MonthData;
}

export const MonthlyPriorityTip: React.FC<Props> = ({ currentMonth }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800 p-6 h-full">
      <div className="flex items-start gap-4 h-full">
        <div className="text-4xl flex-shrink-0">💡</div>
        <div className="flex-grow">
          <h3 className="text-xs font-bold text-yellow-700 dark:text-yellow-300 uppercase tracking-wider mb-2">
            MONTHLY TIP
          </h3>
          <p className="text-sm text-yellow-900 dark:text-yellow-100 leading-relaxed font-medium">
            {currentMonth.proTip}
          </p>
        </div>
      </div>
    </div>
  );
};