import { Search } from 'lucide-react';
import { clusters } from '../data/cases';
import { useState } from 'react';

interface ControlsProps {
  onCategoryFilter: (categories: Set<string>) => void;
}

export function Controls({ onCategoryFilter }: ControlsProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const handleCategoryChange = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
    onCategoryFilter(newCategories);
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-xl
      border border-white/20 max-w-xs">
      <div className="flex items-center space-x-2 mb-5">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search cases..."
          className="bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200"
        />
      </div>
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-700">Categories:</div>
        {clusters.map((cluster) => (
          <div key={cluster.name} className="flex items-center group">
            <input
              type="checkbox"
              id={cluster.name}
              checked={selectedCategories.has(cluster.name)}
              onChange={() => handleCategoryChange(cluster.name)}
              className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 
                focus:ring-blue-500 transition-colors duration-200"
            />
            <label
              htmlFor={cluster.name}
              className="text-sm flex items-center cursor-pointer group-hover:opacity-80
                transition-opacity duration-200"
            >
              <span
                className="w-3 h-3 rounded-full inline-block mr-2"
                style={{ backgroundColor: cluster.color }}
              />
              {cluster.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}