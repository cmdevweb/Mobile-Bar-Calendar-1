import React, { useState, useRef, useEffect } from 'react';
import { DollarSign, AlertCircle, BarChart3 } from 'lucide-react';
import { HelpTooltip } from './HelpTooltip';
import { RevenueTrackerState } from '../types';

interface ChannelInput {
  id: keyof RevenueTrackerState['inputs'];
  name: string;
}

const CHANNEL_CONFIG: ChannelInput[] = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'google', name: 'Google (Ads/SEO)' },
  { id: 'referrals', name: 'Referrals' },
  { id: 'directWebsite', name: 'Direct Website' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'eventAppearances', name: 'Event Apps' },
  { id: 'other', name: 'Other' },
];

const REVENUE_PER_BOOKING = 2000;

interface RevenueTrackerProps {
  state: RevenueTrackerState;
  onStateChange: (newState: RevenueTrackerState) => void;
}

export const RevenueTracker: React.FC<RevenueTrackerProps> = ({ state, onStateChange }) => {
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculated, setIsCalculated] = useState(!!state.results);

  useEffect(() => {
    setIsCalculated(!!state.results);
  }, [state.results]);

  const handleInputChange = (id: keyof RevenueTrackerState['inputs'], val: string) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 99) num = 99;

    onStateChange({
      ...state,
      inputs: {
        ...state.inputs,
        [id]: num
      },
      results: undefined // clear results on input change
    });
    
    if (isCalculated) setIsCalculated(false);
  };

  const generateBudgetTip = (
    topChannel: any, 
    sortedData: any[]
  ): string => {
    const topPct = topChannel.percentage;
    const top3 = sortedData.slice(0, 3);
    const top3Sum = top3.reduce((acc, c) => acc + c.percentage, 0);
    const referralChannel = sortedData.find(c => c.id === 'referrals');
    const tiktokChannel = sortedData.find(c => c.id === 'tiktok');
    const unusedChannels = sortedData.filter(c => c.value === 0);

    // Rule 1: Dominant (>50%)
    if (topPct > 50) {
      let tip = `${topChannel.name} is your powerhouse at ${Math.round(topPct)}% of bookings. Allocate 60% of budget here. Why? Proven high ROI—you're converting at a higher rate on ${topChannel.name}.`;
      if (unusedChannels.length > 0) {
        const suggestion = unusedChannels[0];
        let reason = "to explore untapped potential";
        if (suggestion.id === 'linkedin') reason = "to reach corporate planners";
        if (suggestion.id === 'google') reason = "for high-intent searches";
        tip += ` But test ${suggestion.name} with 10-15% ${reason}.`;
      }
      return tip;
    }

    // Rule 2: Strong (40-50%)
    if (topPct >= 40) {
      return `${topChannel.name} dominates at ${Math.round(topPct)}% of bookings. Allocate 50% of budget here. Why? Higher ROI—you're spending less per booking on ${topChannel.name}. Double down there.`;
    }

    // Rule 3: Referrals Top 3 (>20%)
    if (referralChannel && referralChannel.percentage > 20 && top3.some(c => c.id === 'referrals')) {
      return `Referrals are your #${sortedData.findIndex(c => c.id === 'referrals') + 1} channel at ${Math.round(referralChannel.percentage)}% of bookings. Allocate 10% of budget here but prioritize asking happy clients to refer next time. Why? $0 ad spend, same conversions.`;
    }

    // Rule 7: Top 3 Concentration (80%+)
    if (top3Sum >= 80) {
      return `Your top 3 channels (${top3.map(c => c.name).join(', ')}) represent ${Math.round(top3Sum)}% of bookings. Focus 70% of budget here. Why? Proven winners. Maintain 30% for testing.`;
    }

    // Rule 5: Balanced
    if (topPct < 30 && top3Sum >= 60) {
      return `You're diversified. Allocate 25-30% to each top performer. Why? Reduces risk and tests each channel's potential. This is sustainable growth.`;
    }

    // Rule 4 Add-on
    if (tiktokChannel && tiktokChannel.value > 0 && topChannel.id !== 'tiktok') {
        return `TikTok is generating bookings (${Math.round(tiktokChannel.percentage)}%). This is underutilized in mobile bar space. Allocate more budget to grow this channel—less competition than Instagram.`;
    }

    return `You have a balanced channel mix. Maintain even budget split (20-25% per top channel) to systematically reveal which scales best.`;
  };

  const handleCalculate = () => {
    const totalBookings = Object.values(state.inputs).reduce((acc: number, val: number) => acc + val, 0);

    if (totalBookings === 0) {
      setError("Please enter at least one booking to analyze.");
      return;
    }

    setError(null);

    const sortedChannels = CHANNEL_CONFIG
      .map(c => {
        const val = state.inputs[c.id] || 0;
        return {
          id: c.id,
          name: c.name,
          value: val,
          percentage: (val / totalBookings) * 100,
          revenue: val * REVENUE_PER_BOOKING
        };
      })
      .filter(c => c.value > 0)
      .sort((a, b) => b.value - a.value);

    const topChannel = sortedChannels[0];
    const budgetTip = generateBudgetTip(topChannel, sortedChannels);

    const newResults = {
        totalBookings,
        totalRevenue: totalBookings * REVENUE_PER_BOOKING,
        topChannel: {
            name: topChannel.name,
            bookings: topChannel.value,
            percentage: topChannel.percentage,
            revenue: topChannel.revenue,
            id: topChannel.id
        },
        sortedChannels,
        budgetTip
    };

    onStateChange({
      ...state,
      results: newResults
    });

    setIsCalculated(true);
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Revenue by Lead Source</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track which channels book the most.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-6">
        {CHANNEL_CONFIG.map((channel) => (
            <div key={channel.id} className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50 rounded-lg px-3 py-2 border border-transparent focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all">
                <label htmlFor={`input-${channel.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 flex-1 cursor-pointer">
                    {channel.name}
                </label>
                <input
                    id={`input-${channel.id}`}
                    type="number"
                    min="0"
                    max="99"
                    value={state.inputs[channel.id] === 0 ? '' : state.inputs[channel.id]}
                    placeholder="0"
                    onChange={(e) => handleInputChange(channel.id, e.target.value)}
                    className="w-12 text-center bg-transparent border-b border-gray-300 dark:border-zinc-600 focus:border-brand-blue outline-none text-gray-900 dark:text-white font-bold"
                />
            </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
        </div>
      )}

      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mb-2"
      >
        <BarChart3 className="w-4 h-4" />
        Calculate & Analyze
      </button>

      {isCalculated && state.results && (
        <div 
            ref={resultsRef}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 animate-fade-in"
        >
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Revenue</span>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${state.results.totalRevenue.toLocaleString()}
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Bookings</span>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {state.results.totalBookings}
                    </div>
                </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-green-800 dark:text-green-300 uppercase tracking-wider">🏆 Top Channel</span>
                    <span className="text-xs font-bold text-green-800 dark:text-green-300">{Math.round(state.results.topChannel.percentage)}%</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                    {state.results.topChannel.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    {state.results.topChannel.bookings} bookings • ${state.results.topChannel.revenue.toLocaleString()}
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2 text-yellow-800 dark:text-yellow-500 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" /> Budget Tip
                </div>
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    {state.results.budgetTip}
                </p>
            </div>

            <div className="flex gap-3 justify-end pt-2">
                 <HelpTooltip 
                    label="Learn More"
                    desktopText="How to use: Enter your bookings per channel, click calculate, and use the budget tip to guide your ad spend for next month."
                    mobileTitle="How to Use This Tool"
                    mobileText="1. Enter bookings. 2. Click Calculate. 3. Use the tips to allocate your budget."
                    className="text-xs font-bold text-brand-blue hover:underline"
                />
            </div>
        </div>
      )}
    </div>
  );
};