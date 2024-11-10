import { Instance, Instances } from "@react-three/drei";
import { useState } from "react";
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
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);

  const visibleCases = cases.filter(
    (c) => filteredCategories.size === 0 || filteredCategories.has(c.category)
  );

  const handleClick = (caseData: LegalCase) => {
    onFocusPoint(caseData.position);
    setHoveredCase(caseData);
  };

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
            scale={hoveredCase?.id === caseData.id ? 2 : 1}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(caseData);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredCase(caseData);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              if (!isTooltipHovered) {
                setHoveredCase(null);
                document.body.style.cursor = 'default';
              }
            }}
          />
        ))}
      </Instances>
      {hoveredCase && (
        <CaseTooltip
          caseData={hoveredCase}
          onTooltipHover={(isHovered) => setIsTooltipHovered(isHovered)}
          onClose={() => {
            setHoveredCase(null);
            setIsTooltipHovered(false);
          }}
        />
      )}
    </>
  );
}
