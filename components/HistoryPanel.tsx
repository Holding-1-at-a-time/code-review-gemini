
import React from 'react';
import type { Review } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  onSelectReview: (review: Review) => void;
  onClearHistory: () => void;
}

const HistoryItem: React.FC<{ review: Review; onSelect: (review: Review) => void }> = ({ review, onSelect }) => {
  return (
    <li
      className="p-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
      onClick={() => onSelect(review)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(review)}
    >
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-accent-blue">{review.language.name}</span>
        <span className="text-gray-500">
          {new Date(review.timestamp).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-400 text-sm mt-1 truncate font-mono">
        {review.code.split('\n')[0] || '[Empty code snippet]'}
      </p>
    </li>
  );
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  onClose,
  reviews,
  onSelectReview,
  onClearHistory,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900 border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-panel-title"
        hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
            <h2 id="history-panel-title" className="text-xl font-bold text-gray-100">
              Review History
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-700 hover:text-gray-200"
              aria-label="Close history panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex-grow p-2 overflow-y-auto">
            {reviews.length > 0 ? (
              <ul aria-label="List of past reviews">
                {reviews.map(review => (
                  <HistoryItem key={review.id} review={review} onSelect={onSelectReview} />
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 p-8 flex flex-col items-center justify-center h-full">
                <p className="font-semibold">No review history found.</p>
                <p className="text-sm mt-1">Complete a code review to see it here.</p>
              </div>
            )}
          </div>
          
          {reviews.length > 0 && (
            <footer className="p-4 border-t border-gray-800 flex-shrink-0">
              <button
                onClick={onClearHistory}
                className="w-full bg-red-800 hover:bg-red-700 disabled:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors"
              >
                Clear All History
              </button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
};
