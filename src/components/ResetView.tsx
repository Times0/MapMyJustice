import { RotateCcw } from 'lucide-react';

interface ResetViewProps {
  onReset: () => void;
  disabled: boolean;
}

export function ResetView({ onReset, disabled }: ResetViewProps) {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className={`absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg 
        hover:bg-white/100 transition-all duration-200 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title="Reset view"
    >
      <RotateCcw className="w-5 h-5 text-gray-700" />
    </button>
  );
}