
import React from 'react';
import type { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onReview: () => void;
  isLoading: boolean;
}

const LanguageSelector: React.FC<{
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}> = ({ selectedLanguage, onSelectLanguage }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const langId = event.target.value;
    const newLang = SUPPORTED_LANGUAGES.find(l => l.id === langId);
    if (newLang) {
      onSelectLanguage(newLang);
    }
  };

  return (
    <select
      value={selectedLanguage.id}
      onChange={handleSelect}
      className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accent-blue focus:outline-none"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  isLoading,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 flex flex-col h-full shadow-lg">
      <div className="flex justify-between items-center p-3 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${language.name} code here...`}
          className="w-full h-full bg-transparent text-gray-300 font-mono resize-none focus:outline-none p-3 leading-relaxed"
          style={{ minHeight: '400px' }}
          spellCheck="false"
        />
      </div>
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full bg-accent-blue hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Reviewing...
            </>
          ) : (
            'Review Code'
          )}
        </button>
      </div>
    </div>
  );
};
