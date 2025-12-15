import React from 'react';
import { Region } from '../types';

interface Props {
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
}

const REGION_OPTIONS: Array<{ value: Region; label: string; emoji: string }> = [
  { value: 'midwest', label: 'Midwest', emoji: '🌾' },
  { value: 'southwest', label: 'Southwest', emoji: '🌞' },
  { value: 'south', label: 'South', emoji: '🏖️' },
  { value: 'northeast', label: 'Northeast', emoji: '🏙️' },
  { value: 'pacific-nw', label: 'Pacific Northwest', emoji: '🏔️' },
  { value: 'california', label: 'California', emoji: '☀️' },
  { value: 'colorado', label: 'Colorado', emoji: '⛰️' },
];

export const RegionSelector: React.FC<Props> = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">🌎</span>
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value as Region)}
        className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
      >
        {REGION_OPTIONS.map(region => (
          <option key={region.value} value={region.value}>
            {region.emoji} {region.label}
          </option>
        ))}
      </select>
    </div>
  );
};