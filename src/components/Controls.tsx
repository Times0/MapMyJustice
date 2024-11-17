import { Search } from "lucide-react";
import { clusters } from "../data/cases";
import { useState } from "react";

interface ControlsProps {
  onCategoryFilter: (categories: Set<string>) => void;
}

export function Controls({ onCategoryFilter }: ControlsProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

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
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search cases..."
          className="bg-white/50 border border-gray-200 rounded-md px-3 py-1.5 text-sm"
        />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Categories:</div>
        {clusters.map((cluster) => (
          <div key={cluster.name} className="flex items-center">
            <input
              type="checkbox"
              id={cluster.name}
              checked={selectedCategories.has(cluster.name)}
              onChange={() => handleCategoryChange(cluster.name)}
              className="mr-2"
            />
            <label htmlFor={cluster.name} className="text-sm flex items-center">
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
