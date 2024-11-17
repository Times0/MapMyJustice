import { Instance, Instances } from "@react-three/drei";
import { useState, useEffect } from "react";
import { LegalCase } from "../types";
import { CaseTooltip } from "./CaseTooltip";

interface CaseNodesProps {
  cases: LegalCase[];
  filteredCategories: Set<string>;
  onFocusPoint: (position: [number, number, number]) => void;
}

export function CaseNodes({
  cases,
  filteredCategories,
  onFocusPoint,
}: CaseNodesProps) {
  const [hoveredCase, setHoveredCase] = useState<LegalCase | null>(null);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);

  const visibleCases = cases.filter(
    (c) => filteredCategories.size === 0 || filteredCategories.has(c.category)
  );

  const handleClick = (e: any, caseData: LegalCase) => {
    e.stopPropagation();
    if (selectedCase?.id === caseData.id) {
      // If clicking the same case, do nothing
      return;
    }
    onFocusPoint(caseData.position);
    setSelectedCase(caseData);
    setHoveredCase(caseData);
  };

  // Add click handler to clear selection when clicking on empty space
  const handleCanvasClick = (e: any) => {
    if (e.target.nodeName === 'CANVAS') {
      setSelectedCase(null);
      setHoveredCase(null);
      setIsTooltipHovered(false);
    }
  };

  // Add effect to bind/unbind click handler
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', handleCanvasClick);
      return () => canvas.removeEventListener('click', handleCanvasClick);
    }
  }, []);

  return (
    <>
      <Instances>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          roughness={0.4}
          metalness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
        {visibleCases.map((caseData) => (
          <Instance
            key={caseData.id}
            position={caseData.position}
            color={caseData.color}
            scale={
              hoveredCase?.id === caseData.id || selectedCase?.id === caseData.id ? 2 : 1
            }
            onClick={(e) => handleClick(e, caseData)}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredCase(caseData);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              if (!isTooltipHovered) {
                setHoveredCase(selectedCase);
                document.body.style.cursor = 'default';
              }
            }}
          />
        ))}
      </Instances>
      {(hoveredCase || selectedCase) && (
        <CaseTooltip
          caseData={hoveredCase || selectedCase}
          onTooltipHover={(isHovered) => setIsTooltipHovered(isHovered)}
          onClose={() => {
            setSelectedCase(null);
            setHoveredCase(null);
            setIsTooltipHovered(false);
          }}
        />
      )}
    </>
  );
}