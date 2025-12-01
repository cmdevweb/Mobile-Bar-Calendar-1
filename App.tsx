import React, { useState, useEffect } from 'react';
import { CALENDAR_DATA } from './constants';
import { MonthCard } from './components/MonthCard';
import { MonthDetailModal } from './components/MonthDetailModal';
import { MonthData } from './types';
import { Moon, Sun, Search, LayoutGrid, Calendar as CalendarIcon, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filterQuarter, setFilterQuarter] = useState<string>('All');

  // Load dark mode preference (Default to Day/Light mode)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Only enable dark mode if explicitly saved as 'dark'
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

  const filteredData = CALENDAR_DATA.filter(month => {
    const matchesSearch = 
        month.month.toLowerCase().includes(searchTerm.toLowerCase()) || 
        month.keyEvents.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
        month.bookingPriority.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuarter = filterQuarter === 'All' || month.quarter === filterQuarter;

    return matchesSearch && matchesQuarter;
  });

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <header className="bg-[#79C7FE] dark:bg-zinc-900 border-b border-[#6ab3e6] dark:border-zinc-800 sticky top-0 z-40 shadow-sm/50 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-dark dark:bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-lg">
                    <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white leading-none">
                        Mobile Bar Marketing Calendar
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
                        className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden lg:block">
                        Switch Theme
                    </span>
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
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2025–2026 Action Calendar</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Turn your ideas into a concrete marketing, outreach, and operations plan. Use this calendar whenever you need direction or fresh momentum.
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

        {/* Grid */}
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
        />
      )}

    </div>
  );
};

export default App;