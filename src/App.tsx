import { useState } from "react";
import { Controls } from "./components/Controls";
import { Scene } from "./components/Scene";

function App() {
  const [filteredCategories, setFilteredCategories] = useState<Set<string>>(
    new Set()
  );

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <Controls onCategoryFilter={setFilteredCategories} />
      <Scene filteredCategories={filteredCategories} />
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>Use mouse to orbit • Scroll to zoom • Drag to pan</p>
      </div>
    </div>
  );
}

export default App;
