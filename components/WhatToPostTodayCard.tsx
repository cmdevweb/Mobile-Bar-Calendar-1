import React, { useState } from 'react';
import { Copy, Info, Check } from 'lucide-react';
import { MonthData, RevenueTrackerState } from '../types';

interface Props {
  currentMonth: MonthData;
  trackerState?: RevenueTrackerState;
}

const getDayInfo = (): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return `${today} has high engagement on this platform`;
};

export const WhatToPostTodayCard: React.FC<Props> = ({ currentMonth, trackerState }) => {
  const [copied, setCopied] = useState(false);

  // Determine best platform based on day of week + top channel
  const getSuggestedPlatform = (): 'Instagram' | 'TikTok' | 'LinkedIn' => {
    const dayOfWeek = new Date().getDay();
    const topChannel = trackerState?.results?.topChannel?.name.toLowerCase();

    // Monday (1) = Instagram engagement boost
    if (dayOfWeek === 1) return 'Instagram';
    
    // Thursday (4) = LinkedIn professional
    if (dayOfWeek === 4) return 'LinkedIn';
    
    // Use top channel if available
    if (topChannel?.includes('instagram')) return 'Instagram';
    if (topChannel?.includes('linkedin')) return 'LinkedIn';
    if (topChannel?.includes('tiktok')) return 'TikTok';
    
    // Default
    return 'Instagram';
  };

  const platform = getSuggestedPlatform();
  const post = currentMonth.socialPosts.find(p => p.platform === platform) || currentMonth.socialPosts[0];

  const handleCopy = async () => {
    if (post) {
      await navigator.clipboard.writeText(post.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📝</span>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">What Should I Post Today?</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
             Recommended: 
            <span className="font-semibold text-purple-700 dark:text-purple-300">
                {platform === 'Instagram' && '📱 Instagram'}
                {platform === 'TikTok' && '🎬 TikTok'}
                {platform === 'LinkedIn' && '💼 LinkedIn'}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-zinc-700 relative overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed italic">
          "{post.text}"
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Post'}
        </button>
        <div
          className="px-4 py-2 bg-white/50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-300 rounded-lg border border-purple-100 dark:border-zinc-700 flex items-center justify-center cursor-help"
          title={`Best on ${platform} because: ${getDayInfo()}`}
        >
          <Info className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};