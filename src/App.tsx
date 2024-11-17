import React, { useState } from 'react';
import { Controls } from './components/Controls';
import { Scene } from './components/Scene';
import { PromptScreen } from './components/PromptScreen';
import { RecommendationsPanel } from './components/RecommendationsPanel';

function App() {
  const [filteredCategories, setFilteredCategories] = useState<Set<string>>(new Set());
  const [isMapRevealed, setIsMapRevealed] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState('');

  const handlePromptSubmit = (prompt: string) => {
    setSearchPrompt(prompt);
    setIsMapRevealed(true);
  };

  if (!isMapRevealed) {
    return <PromptScreen onSubmit={handlePromptSubmit} />;
  }

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <Controls onCategoryFilter={setFilteredCategories} />
      <Scene filteredCategories={filteredCategories} />
      <RecommendationsPanel prompt={searchPrompt} />
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>Use mouse to orbit • Scroll to zoom • Drag to pan</p>
      </div>
    </div>
  );
}

export default App;