import { Html } from '@react-three/drei';
import { LegalCase } from '../types';

interface CaseTooltipProps {
  caseData: LegalCase;
  onTooltipHover: (isHovered: boolean) => void;
  onClose: () => void;
}

export function CaseTooltip({ caseData, onTooltipHover, onClose }: CaseTooltipProps) {
  return (
    <Html position={caseData.position} distanceFactor={20 }>
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-64 relative"
        onMouseEnter={() => onTooltipHover(true)}
        onMouseLeave={() => onTooltipHover(false)}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h3 className="font-bold text-lg pr-4">{caseData.title}</h3>
        <p className="text-sm text-gray-600">{caseData.year}</p>
        <p className="text-sm mt-2">{caseData.summary}</p>
        <p className="text-xs text-blue-600 mt-1">{caseData.category}</p>
      </div>
    </Html>
  );
}