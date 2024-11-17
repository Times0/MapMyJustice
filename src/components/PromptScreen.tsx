import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface PromptScreenProps {
  onSubmit: (prompt: string) => void;
}

export function PromptScreen({ onSubmit }: PromptScreenProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onSubmit(prompt);
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">
          Explore Legal Cases Visualization
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the legal cases you're interested in exploring..."
              className="w-full h-32 bg-gray-800 text-white rounded-lg p-4 pr-12 resize-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className={`absolute bottom-4 right-4 text-white p-2 rounded-lg 
                ${prompt.trim() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 cursor-not-allowed'
                } transition-colors duration-200`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Enter your query to reveal the interactive visualization of legal cases
          </p>
        </form>
      </div>
    </div>
  );
}