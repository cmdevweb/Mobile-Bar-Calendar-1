import React, { useState, useEffect } from 'react';
import { MonthCard } from './components/MonthCard';
import { MonthDetailModal } from './components/MonthDetailModal';
import { RevenueTracker } from './components/RevenueTracker';
import { RegionSelector } from './components/RegionSelector';
import { CurrentFocusCard } from './components/CurrentFocusCard';
import { MonthlyPriorityTip } from './components/MonthlyPriorityTip';
import { WhatToPostTodayCard } from './components/WhatToPostTodayCard';
import { MonthData, Region, RevenueTrackerState } from './types';
import { CALENDAR_DATA_BY_REGION } from './constants/regionalData';
import { Moon, Sun, Search, Calendar as CalendarIcon, Filter, Bell, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filterQuarter, setFilterQuarter] = useState<string>('All');
  
  // Region State
  const [selectedRegion, setSelectedRegion] = useState<Region>('midwest');
  const [showRegionOnboarding, setShowRegionOnboarding] = useState(true);

  // Revenue Tracker State (Lifted)
  const [revenueTrackerState, setRevenueTrackerState] = useState<RevenueTrackerState>({
    inputs: {
      instagram: 0, facebook: 0, tiktok: 0, google: 0,
      referrals: 0, directWebsite: 0, linkedin: 0,
      eventAppearances: 0, other: 0
    }
  });

  // Heatmap State
  const [heatmapLeads, setHeatmapLeads] = useState<number[]>(Array(12).fill(10));
  const [selectedHeatmapMonth, setSelectedHeatmapMonth] = useState<number>(0);

  const baseIntensities = [2,2,4,3,4,5,4,3,4,5,3,5];
  const monthNamesShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const heatmapColors = ["#e0efff","#b6d6ff","#8bbcff","#5f9fff","#3b82f6"];

  const getHeatmapColor = (intensity: number) => {
      return heatmapColors[Math.max(0, Math.min(heatmapColors.length - 1, intensity - 1))];
  };

  // Derived Data
  const calendarData = CALENDAR_DATA_BY_REGION[selectedRegion].months;
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = calendarData[currentMonthIndex];
  const daysInMonth = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0).getDate();
  const daysLeft = daysInMonth - new Date().getDate();

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const filteredData = calendarData.filter(month => {
    const matchesSearch = 
        month.month.toLowerCase().includes(searchTerm.toLowerCase()) || 
        month.keyEvents.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
        month.bookingPriority.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuarter = filterQuarter === 'All' || month.quarter === filterQuarter;

    return matchesSearch && matchesQuarter;
  });

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      
      {/* Onboarding Modal */}
      {showRegionOnboarding && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Mobile Bar Marketing Calendar v2.1
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We've updated our strategy engine. Let's customize your data based on your specific region:
            </p>
            <div className="mb-6">
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Your Region</label>
               <div className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
               </div>
            </div>
            <button
              onClick={() => setShowRegionOnboarding(false)}
              className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Get Started →
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#79C7FE] dark:bg-zinc-900 border-b border-[#6ab3e6] dark:border-zinc-800 sticky top-0 z-40 shadow-sm/50 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-dark dark:bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-lg">
                    <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg md:text-2xl font-serif font-bold text-gray-900 dark:text-white leading-none">
                        Mobile Bar Calendar
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-white/50 dark:bg-zinc-800 rounded-full px-4 py-2 border border-transparent focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                    <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search month" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm ml-2 w-32 md:w-48 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
                    <button 
                        onClick={toggleDarkMode}
                        className="p-2 text-gray-800 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* New Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-in-up">
            <CurrentFocusCard currentMonth={currentMonth} />
            <MonthlyPriorityTip currentMonth={currentMonth} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
             {/* Column 1: What To Post Today (Spans 2 cols on large) */}
             <div className="lg:col-span-2">
                 <WhatToPostTodayCard currentMonth={currentMonth} trackerState={revenueTrackerState} />
             </div>
             
             {/* Column 2: Countdown */}
             <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center gap-4 relative overflow-hidden group h-full">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bell className="w-24 h-24 text-brand-orange" />
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-brand-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time Check</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {daysLeft} days left in {currentMonth.month}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Stay on track!</p>
                </div>
             </div>
        </div>

        {/* Tools Grid: Revenue Tracker & Heatmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <RevenueTracker state={revenueTrackerState} onStateChange={setRevenueTrackerState} />
            
            {/* Heatmap */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden h-full">
                <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-brand-blue" />
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity Heatmap</h3>
                </div>
                
                <div className="flex flex-col gap-3 mb-3 text-sm">
                    <div className="flex flex-col">
                        <label htmlFor="heatmap-month-select" className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-semibold">Adjust month:</label>
                        <select 
                            id="heatmap-month-select" 
                            value={selectedHeatmapMonth} 
                            onChange={(e) => setSelectedHeatmapMonth(Number(e.target.value))}
                            className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded p-1.5 text-xs text-gray-900 dark:text-gray-200"
                        >
                            {monthNamesShort.map((m, i) => (
                                <option key={i} value={i}>{calendarData[i]?.month || m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="heatmap-leads-range" className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Expected leads this month:</label>
                            <span id="heatmap-leads-value" className="text-xs font-bold text-brand-blue">{heatmapLeads[selectedHeatmapMonth]} leads</span>
                        </div>
                        <input 
                            type="range" 
                            id="heatmap-leads-range" 
                            min="0" 
                            max="50" 
                            value={heatmapLeads[selectedHeatmapMonth]}
                            onChange={(e) => {
                                const newVal = Number(e.target.value);
                                const newLeads = [...heatmapLeads];
                                newLeads[selectedHeatmapMonth] = newVal;
                                setHeatmapLeads(newLeads);
                            }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-brand-blue"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-3">
                    {heatmapLeads.map((leads, index) => {
                        const baseScore = baseIntensities[index];
                        const adjustedScore = Math.min(5, Math.max(1, baseScore + Math.floor(leads / 15)));
                        const color = getHeatmapColor(adjustedScore);
                        
                        return (
                            <div 
                                key={index} 
                                className="p-2 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedHeatmapMonth(index)}
                            >
                                <span className="block text-[10px] font-bold text-slate-900 mb-0.5">{monthNamesShort[index]}</span>
                                <span className="block text-[9px] text-slate-800 opacity-90">{leads} leads</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2025–2026 Action Calendar</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Region: <span className="font-bold text-brand-blue capitalize">{selectedRegion.replace('-', ' ')}</span>
                </p>
            </div>
            
            <div className="flex items-center gap-2 p-1 bg-gray-200 dark:bg-zinc-800 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
                {['All', 'Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                    <button
                        key={q}
                        onClick={() => setFilterQuarter(q)}
                        className={`
                            px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap
                            ${filterQuarter === q 
                                ? 'bg-white dark:bg-zinc-600 text-brand-dark dark:text-white shadow-sm' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-zinc-700'}
                        `}
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((month) => (
                <MonthCard 
                    key={month.id} 
                    data={month} 
                    onClick={() => setSelectedMonth(month)}
                    isExpanded={selectedMonth?.id === month.id}
                />
            ))}
        </div>

        {filteredData.length === 0 && (
            <div className="text-center py-20">
                <Filter className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No months found</h3>
                <p className="text-gray-500">Try adjusting your search or filter.</p>
            </div>
        )}

      </main>

      {/* Detail Modal */}
      {selectedMonth && (
        <MonthDetailModal 
            data={selectedMonth} 
            onClose={() => setSelectedMonth(null)} 
            region={selectedRegion}
            checklistProgress={[]} // In a real app, this would be loaded from local storage based on ID
            trackerResults={revenueTrackerState.results}
        />
      )}

    </div>
  );
};

export default App;