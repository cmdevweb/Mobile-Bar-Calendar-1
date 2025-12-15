import React from 'react';
import { MonthData, Region } from '../types';
import { X, Calendar, Users, MessageCircle, Mail, PieChart, Lightbulb, AlertTriangle } from 'lucide-react';
import { ActionChecklist } from './ActionChecklist';
import { CopyToClipboard } from './CopyToClipboard';
import { HelpTooltip } from './HelpTooltip';
import { exportMonthToPDF } from '../utils/pdfExport';

interface MonthDetailModalProps {
  data: MonthData | null;
  onClose: () => void;
  region: Region;
  checklistProgress: boolean[];
  trackerResults?: any;
}

export const MonthDetailModal: React.FC<MonthDetailModalProps> = ({ data, onClose, region, checklistProgress, trackerResults }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
            <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    {data.month}
                    <span className="text-sm font-sans font-normal px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-400 capitalize">
                        {region} • {data.season}
                    </span>
                </h2>
                <p className="text-sm text-brand-blue font-medium mt-1">{data.bookingPriority}</p>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-500"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#365679] dark:bg-gradient-to-br dark:from-brand-dark dark:to-black text-white p-6 rounded-xl shadow-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="mb-1 text-blue-100/70 text-xs font-semibold uppercase tracking-wider">
                                    <HelpTooltip 
                                        label="Activity" 
                                        desktopText="Shows how busy this month typically is."
                                        mobileTitle="Activity Level"
                                        mobileText="1 = Slow, 5 = Peak."
                                        className="text-white"
                                    />
                                </div>
                                <div className="text-2xl font-bold flex gap-1">
                                    {[1, 2, 3, 4, 5].map(l => (
                                        <div key={l} className={`h-2 w-full rounded-full ${l <= data.activityLevel ? 'bg-white' : 'bg-black/20'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 text-blue-100/70 text-xs font-semibold uppercase tracking-wider">
                                     <HelpTooltip 
                                        label="Budget %" 
                                        desktopText="Recommended % of annual marketing budget."
                                        mobileTitle="Budget %"
                                        mobileText="Spend more when demand is high."
                                        className="text-white"
                                    />
                                </div>
                                <div className="text-2xl font-bold text-brand-green">{data.marketingBudgetPct}%</div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <div className="mb-2 text-blue-100/70 text-xs font-semibold uppercase tracking-wider">Key Events</div>
                            <ul className="space-y-1">
                                {data.keyEvents.map((event, i) => (
                                    <li key={i} className="flex items-center text-sm font-medium">
                                        <Calendar className="w-3.5 h-3.5 mr-2 text-brand-orange" />
                                        {event}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <ActionChecklist monthId={data.id} actions={data.marketingActions} />

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                         <h4 className="font-bold text-amber-800 dark:text-amber-500 flex items-center mb-3">
                            <AlertTriangle className="w-4 h-4 mr-2" /> Critical Notes
                        </h4>
                        <ul className="space-y-2">
                            {data.criticalNotes.map((note, i) => (
                                <li key={i} className="text-sm text-amber-900 dark:text-amber-100 flex items-start">
                                    <span className="mr-2">•</span> {note}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => exportMonthToPDF(data, region, checklistProgress, trackerResults)}
                        className="flex-1 bg-brand-blue hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                      >
                        <span>⬇️</span> Download PDF
                      </button>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl border border-gray-100 dark:border-zinc-700">
                             <h4 className="font-bold text-gray-900 dark:text-white flex items-center mb-3">
                                <Users className="w-4 h-4 mr-2 text-brand-blue" /> Target Audience
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data.targetAudience.map((aud, i) => (
                                    <span key={i} className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-full">
                                        {aud}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl border border-gray-100 dark:border-zinc-700">
                             <h4 className="font-bold text-gray-900 dark:text-white flex items-center mb-3">
                                <MessageCircle className="w-4 h-4 mr-2 text-brand-orange" /> Content Themes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data.contentThemes.map((theme, i) => (
                                    <span key={i} className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full">
                                        {theme}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#79C7FE] p-4 rounded-xl text-[#002C4B] shadow-lg flex items-start">
                        <Lightbulb className="w-6 h-6 mr-3 flex-shrink-0 text-[#002C4B] fill-white/50" />
                        <div>
                            <span className="font-bold text-[#002C4B]/70 uppercase tracking-wider text-xs block mb-1">Pro Tip of the Month</span>
                            <p className="font-medium text-sm md:text-base">{data.proTip}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
                            <h4 className="font-bold text-gray-900 dark:text-white">Social Media Templates</h4>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.socialPosts.map((post, i) => (
                                <CopyToClipboard 
                                    key={i} 
                                    text={post.text} 
                                    label={post.platform} 
                                    multiline 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
                            <h4 className="font-bold text-gray-900 dark:text-white flex items-center mb-4">
                                <Mail className="w-4 h-4 mr-2 text-brand-red" /> Email Template
                            </h4>
                            <div className="space-y-4">
                                <CopyToClipboard text={data.emailSubject} label="Subject Line" />
                                <CopyToClipboard text={data.emailBody} label="Body Copy" multiline />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700 flex flex-col">
                             <h4 className="font-bold text-gray-900 dark:text-white flex items-center mb-4">
                                <PieChart className="w-4 h-4 mr-2 text-brand-green" /> 
                                <HelpTooltip 
                                    label="Budget Allocation" 
                                    desktopText="Suggested breakdown of where to spend your marketing budget."
                                    mobileTitle="Budget Allocation"
                                    mobileText="Balanced spending across channels = better results."
                                    className="text-gray-900 dark:text-white"
                                />
                            </h4>
                            <div className="flex-1 space-y-4">
                                {Object.entries(data.budgetBreakdown).map(([key, val]) => {
                                    const value = val as number;
                                    return (
                                    <div key={key}>
                                        <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="font-bold">{value}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-brand-green" 
                                                style={{ width: `${value}%`, opacity: 0.5 + (value/100) }}
                                            ></div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-bold rounded-lg transition-colors"
            >
                Close View
            </button>
        </div>
      </div>
    </div>
  );
};