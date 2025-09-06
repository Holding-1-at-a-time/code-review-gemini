
import React from 'react';

const RobotIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2zM8 10h8v8H8v-8zm2 2v4h4v-4h-4z" />
    <circle cx="9" cy="14" r="1" />
    <circle cx="15" cy="14" r="1" />
  </svg>
);

interface HeaderProps {
  onToggleHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <RobotIcon className="w-8 h-8 text-accent-blue" />
          <h1 className="ml-3 text-2xl font-bold text-gray-100 tracking-tight">
            Gemini Code Reviewer
          </h1>
        </div>
        <button
          onClick={onToggleHistory}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
          aria-label="View review history"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </button>
      </div>
    </header>
  );
};
