import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X, Info } from 'lucide-react';

interface HelpTooltipProps {
  label: string; // The visible label next to the icon (optional, or we wrap it)
  desktopText: string;
  mobileTitle: string;
  mobileText: React.ReactNode;
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  label,
  desktopText,
  mobileTitle,
  mobileText,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // For desktop click-to-lock
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Detect mobile & handle resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update position for desktop tooltip
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2)
      });
    }
  };

  useEffect(() => {
    if (isOpen && !isMobile) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, isMobile]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Desktop: Close if clicked outside trigger and tooltip
      if (!isMobile && isOpen) {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsLocked(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile, isLocked]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      updatePosition();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isLocked) {
      setIsOpen(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMobile) {
      setIsOpen(true);
    } else {
      const newLocked = !isLocked;
      setIsLocked(newLocked);
      setIsOpen(true); // Always open if we click
      if (newLocked) updatePosition();
    }
  };

  const closeMobile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  // 1. Desktop Tooltip (Portal)
  const renderDesktopTooltip = () => {
    if (isMobile || !isOpen) return null;
    return createPortal(
      <div 
        ref={tooltipRef}
        className="absolute z-[9999] w-64 p-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 text-xs leading-relaxed rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 animate-fade-in"
        style={{ 
            top: coords.top, 
            left: coords.left,
            transform: 'translateX(-50%)' 
        }}
        role="tooltip"
      >
        {/* Arrow */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-800 border-t border-l border-gray-200 dark:border-zinc-700 rotate-45 transform"></div>
        <div className="relative z-10">{desktopText}</div>
      </div>,
      document.body
    );
  };

  // 2. Mobile Popover (Portal)
  const renderMobilePopover = () => {
    if (!isMobile || !isOpen) return null;
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
         {/* Backdrop */}
         <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobile}
         />
         
         {/* Modal Card */}
         <div 
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-xl p-6 shadow-2xl animate-slide-up sm:animate-scale-in m-0 sm:m-4 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
         >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                    {mobileTitle}
                </h3>
                <button 
                    onClick={closeMobile}
                    className="p-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    aria-label="Close help"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
                {mobileText}
            </div>
         </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div 
        className={`inline-flex items-center ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="mr-1.5">{label}</span>
        <button
            ref={triggerRef}
            type="button"
            onClick={handleClick}
            className={`
                flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/50
                ${isOpen || isLocked ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-400 dark:text-gray-500 hover:text-brand-blue dark:hover:text-brand-blue'}
            `}
            aria-label={`Learn more about ${label}`}
            aria-expanded={isOpen}
        >
            <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>
      {renderDesktopTooltip()}
      {renderMobilePopover()}
    </>
  );
};
