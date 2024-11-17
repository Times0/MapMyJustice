import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptScreenProps {
  onSubmit: (prompt: string) => void;
}

export function PromptScreen({ onSubmit }: PromptScreenProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onSubmit(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-gray-900 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-2xl font-bold mb-8 text-center"
        >
          Explore Legal Cases Visualization
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the legal cases you're interested in exploring..."
              className="w-full h-32 bg-gray-800 text-white rounded-lg p-4 pr-12 resize-none"
              disabled={isLoading}
            />
            <AnimatePresence>
              {prompt.trim() && !isLoading && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="absolute bottom-4 right-4 text-white p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute bottom-4 right-4 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            )}
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm text-center"
          >
            Enter your query to reveal the interactive visualization of legal cases
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
}