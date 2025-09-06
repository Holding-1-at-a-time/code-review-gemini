
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { HistoryPanel } from './components/HistoryPanel';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import type { Language, Review } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewHistory, setReviewHistory] = useLocalStorage<Review[]>('code-review-history', []);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback('');

    let fullFeedback = '';
    try {
      const stream = await reviewCode(code, language.id);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullFeedback += chunkText;
        setFeedback(fullFeedback); // Update with the full string to avoid potential race conditions
      }

      // Once the stream is complete, add the review to history
      const newReview: Review = {
        id: `${Date.now()}`,
        code,
        language,
        feedback: fullFeedback,
        timestamp: new Date().toISOString(),
      };
      setReviewHistory(prevHistory => [newReview, ...prevHistory]);

    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language, setReviewHistory]);

  const handleSelectReview = (review: Review) => {
    setCode(review.code);
    setLanguage(review.language);
    setFeedback(review.feedback);
    setError(null);
    setIsHistoryOpen(false);
  };

  const handleClearHistory = () => {
    setReviewHistory([]);
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header onToggleHistory={() => setIsHistoryOpen(true)} />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
        <div className="lg:w-1/2 flex flex-col">
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onReview={handleReview}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <ReviewOutput feedback={feedback} isLoading={isLoading} error={error} />
        </div>
        <HistoryPanel
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          reviews={reviewHistory}
          onSelectReview={handleSelectReview}
          onClearHistory={handleClearHistory}
        />
      </main>
      <footer className="text-center p-4 text-gray-600 text-sm">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
