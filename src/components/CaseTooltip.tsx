import { Html } from '@react-three/drei';
import { LegalCase } from '../types';

interface CaseTooltipProps {
  caseData: LegalCase;
  onTooltipHover: (isHovered: boolean) => void;
  onClose: () => void;
}

export function CaseTooltip({ caseData, onTooltipHover, onClose }: CaseTooltipProps) {
  return (
    <Html position={caseData.position} distanceFactor={30}>
      <div
        className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl w-72 relative border border-white/20
          transform transition-transform duration-200 hover:scale-105"
        onMouseEnter={() => onTooltipHover(true)}
        onMouseLeave={() => onTooltipHover(false)}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center
            rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          ×
        </button>
        <h3 className="font-bold text-lg pr-6 text-gray-800">{caseData.title}</h3>
        <p className="text-sm text-gray-600 font-medium">{caseData.year}</p>
        <p className="text-sm mt-2 text-gray-700 leading-relaxed">{caseData.summary}</p>
        <div className="mt-2 flex items-center">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${caseData.color}20`,
              color: caseData.color,
            }}
          >
            {caseData.category}
          </span>
        </div>
      </div>
    </Html>
  );
}