import React from 'react';
import { MonthData } from '../types';
import { AlertCircle, TrendingUp, DollarSign, Calendar, ChevronDown } from 'lucide-react';

interface MonthCardProps {
  data: MonthData;
  onClick: () => void;
  isExpanded: boolean;
}

const getQuarterColor = (quarter: string) => {
  switch (quarter) {
    case 'Q1': return 'bg-blue-500/20 text-blue-100 border-blue-500/30';
    case 'Q2': return 'bg-green-500/20 text-green-100 border-green-500/30';
    case 'Q3': return 'bg-orange-500/20 text-orange-100 border-orange-500/30';
    case 'Q4': return 'bg-red-500/20 text-red-100 border-red-500/30';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getQuarterBadge = (quarter: string) => {
    switch (quarter) {
      case 'Q1': return 'bg-brand-blue text-white';
      case 'Q2': return 'bg-brand-green text-white';
      case 'Q3': return 'bg-brand-orange text-white';
      case 'Q4': return 'bg-brand-red text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

export const MonthCard: React.FC<MonthCardProps> = ({ data, onClick, isExpanded }) => {
  const isCurrentMonth = new Date().toLocaleString('default', { month: 'long' }) === data.month;

  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer transition-all duration-300 ease-out 
        bg-[#002C4B] rounded-xl overflow-hidden
        border-2 
        ${data.isCritical ? 'border-brand-gold shadow-brand-gold/20' : 'border-transparent hover:border-white/20'}
        shadow-sm hover:shadow-xl hover:-translate-y-1
        ${isExpanded ? 'ring-2 ring-brand-blue' : ''}
      `}
    >
      {/* Header Stripe */}
      <div className={`h-2 w-full ${getQuarterBadge(data.quarter)}`}></div>

      {/* Critical Badge */}
      {data.isCritical && (
        <div className="absolute top-4 right-4 animate-pulse">
            <AlertCircle className="w-5 h-5 text-brand-gold fill-brand-gold/20" />
        </div>
      )}

      {/* Current Month Badge */}
      {isCurrentMonth && (
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/10">
            Current
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-2xl font-serif font-bold text-white">{data.month}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${getQuarterColor(data.quarter)}`}>
                {data.quarter}
            </span>
        </div>
        
        <p className="text-sm text-blue-200 font-medium uppercase tracking-wide mb-4">{data.season}</p>

        <div className="space-y-3">
            {/* Activity Level */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                    <TrendingUp className="w-4 h-4 mr-2 opacity-70" />
                    <span>Activity</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                            key={level} 
                            className={`h-2 w-4 rounded-full ${level <= data.activityLevel ? getQuarterBadge(data.quarter) : 'bg-white/10'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Budget */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-300">
                    <DollarSign className="w-4 h-4 mr-2 opacity-70" />
                    <span>Budget</span>
                </div>
                <div className="w-24 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                        className={`h-full ${getQuarterBadge(data.quarter)}`} 
                        style={{ width: `${(data.marketingBudgetPct / 15) * 100}%` }}
                    ></div>
                </div>
            </div>

             {/* Key Highlight */}
             <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-start text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{data.bookingPriority}</span>
                </div>
             </div>
        </div>

        <div className="mt-4 flex items-center justify-center text-xs font-semibold text-blue-300 group-hover:text-white transition-colors">
            Click to expand <ChevronDown className="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  );
};