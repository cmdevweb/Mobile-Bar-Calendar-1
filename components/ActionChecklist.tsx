import React, { useState, useEffect } from 'react';
import { Check, Square, CheckSquare } from 'lucide-react';
import { ActionState } from '../types';

interface ActionChecklistProps {
  monthId: string;
  actions: string[];
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ monthId, actions }) => {
  // Use a unique key for local storage based on the component purpose
  const STORAGE_KEY = 'mobile_bar_marketing_actions';
  
  const [checkedState, setCheckedState] = useState<ActionState>({});
  
  // Load initial state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCheckedState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse actions", e);
      }
    }
  }, []);

  const toggleAction = (index: number) => {
    const key = `${monthId}-${index}`;
    const newState = { ...checkedState, [key]: !checkedState[key] };
    setCheckedState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const getProgress = () => {
    if (actions.length === 0) return 0;
    const completed = actions.filter((_, idx) => checkedState[`${monthId}-${idx}`]).length;
    return Math.round((completed / actions.length) * 100);
  };

  const progress = getProgress();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-700 h-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-brand-blue" />
            Action Checklist
        </h4>
        <span className="text-xs font-mono font-bold bg-brand-blue/10 text-brand-blue px-2 py-1 rounded">
            {progress}% Done
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 dark:bg-zinc-700 h-2 rounded-full mb-6 overflow-hidden">
        <div 
            className="h-full bg-brand-blue transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-3">
        {actions.map((action, idx) => {
          const isChecked = !!checkedState[`${monthId}-${idx}`];
          return (
            <div 
                key={idx}
                onClick={() => toggleAction(idx)}
                className={`
                    flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isChecked 
                        ? 'bg-gray-50 dark:bg-zinc-700/50 text-gray-400 dark:text-gray-500' 
                        : 'bg-gray-50 dark:bg-zinc-700 hover:bg-brand-blue/5 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200'}
                `}
            >
                <div className={`mt-0.5 mr-3 flex-shrink-0 transition-colors ${isChecked ? 'text-brand-green' : 'text-gray-300 dark:text-gray-500'}`}>
                    {isChecked ? <Check className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </div>
                <span className={`text-sm ${isChecked ? 'line-through' : ''}`}>
                    {action}
                </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
