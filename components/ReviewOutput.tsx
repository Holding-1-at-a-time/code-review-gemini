import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReviewOutputProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
     <svg className="animate-spin h-10 w-10 text-accent-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
     </svg>
     <p className="font-semibold text-lg">Analyzing your code...</p>
     <p className="text-sm">Gemini is thinking. This may take a moment.</p>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <div className="bg-gray-800 p-4 rounded-full mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        </div>
        <p className="font-semibold text-lg">Awaiting Your Code</p>
        <p className="text-sm">Paste your code on the left and click "Review Code" to get started.</p>
    </div>
);

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ feedback, isLoading, error }) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 flex flex-col h-full shadow-lg">
      <div className="p-3 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-200">AI Feedback</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto" style={{ minHeight: '400px' }}>
        {isLoading && <Loader />}
        {!isLoading && error && (
          <div className="text-red-400 bg-red-900/20 border border-red-700 p-4 rounded-md">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && !feedback && <InitialState />}
        {!isLoading && !error && feedback && (
          <article className="prose prose-invert prose-sm md:prose-base max-w-none">
            <ReactMarkdown
              children={feedback}
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ children }) => (
                  <pre className="bg-gray-800 border border-gray-700 rounded-md p-4 overflow-x-auto font-mono text-sm">
                    {children}
                  </pre>
                ),
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="bg-gray-700 text-accent-blue rounded px-1.5 py-1 mx-0.5 font-mono text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </article>
        )}
      </div>
    </div>
  );
};