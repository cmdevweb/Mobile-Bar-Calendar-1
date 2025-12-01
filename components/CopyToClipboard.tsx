import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyToClipboardProps {
  text: string;
  label?: string;
  multiline?: boolean;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, label, multiline = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="relative group">
      {label && <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <div 
        className="relative bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden transition-all hover:border-brand-blue/50"
      >
        {multiline ? (
            <div className="p-3 text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap min-h-[100px] text-xs leading-relaxed">
                {text}
            </div>
        ) : (
            <input 
                readOnly 
                value={text} 
                className="w-full bg-transparent p-3 text-sm text-gray-700 dark:text-gray-300 font-mono outline-none"
            />
        )}
        
        <button
            onClick={handleCopy}
            className={`
                absolute top-2 right-2 p-1.5 rounded-md transition-all duration-200
                ${copied ? 'bg-brand-green text-white' : 'bg-white dark:bg-zinc-800 text-gray-500 hover:text-brand-blue shadow-sm border border-gray-200 dark:border-zinc-700'}
            `}
            title="Copy to clipboard"
        >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {copied && (
        <span className="absolute -top-6 right-0 text-xs font-bold text-brand-green animate-fade-in-up">
            Copied!
        </span>
      )}
    </div>
  );
};
