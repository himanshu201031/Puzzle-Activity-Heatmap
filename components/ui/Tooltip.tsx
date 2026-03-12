import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tooltip component to show activity details on hover.
 */
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      <div className={twMerge(
        "absolute bottom-full mb-2 hidden flex-col items-center group-hover:flex z-50",
        className
      )}>
        <div className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-900 shadow-lg rounded">
          {content}
        </div>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-900"></div>
      </div>
    </div>
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
