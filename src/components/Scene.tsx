import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { legalCases } from "../data/cases";
import { CaseNodes } from "./CaseNodes";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";
import { ResetView } from "./ResetView";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  filteredCategories: Set<string>;
}

const DEFAULT_CAMERA_POSITION = [0, 0, 80] as const;
const DEFAULT_TARGET = [0, 0, 0] as const;
const FOCUS_DISTANCE = 2;

const STARS_CONFIG = {
  radius: 300,
  depth: 50,
  count: 5000,
  factor: 6,
  saturation: 0.9,
  fade: true,
  speed: 0.5,
};

export function Scene({ filteredCategories }: SceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const visibleCases = legalCases.filter(
    (c) => filteredCategories.size === 0 || filteredCategories.has(c.category)
  );

  const animateCamera = (
    targetPos: Vector3,
    targetLookAt: Vector3,
    duration: number = 1500
  ) => {
    if (!controlsRef.current) return;

    setIsTransitioning(true);
    const controls = controlsRef.current;
    const startPosition = controls.object.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();

    function animate() {
      const progress = Math.min((performance.now() - startTime) / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      controls.target.lerpVectors(startTarget, targetLookAt, eased);
      controls.object.position.lerpVectors(startPosition, targetPos, eased);
      controls.object.lookAt(controls.target);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
      }
    }

    requestAnimationFrame(animate);
  };

  const focusOnPoint = (point: Vector3, distance: number) => {
    if (!controlsRef.current || isTransitioning) return;

    const direction = point.clone().sub(controlsRef.current.target).normalize();
    const newCameraPos = point.clone().add(direction.multiplyScalar(distance));

    animateCamera(newCameraPos, point);
  };

  const handleFocusPoint = (position: [number, number, number]) => {
    focusOnPoint(new Vector3(...position), FOCUS_DISTANCE);
  };

  const handleReset = () => {
    if (!controlsRef.current || isTransitioning) return;
    animateCamera(
      new Vector3(...DEFAULT_CAMERA_POSITION),
      new Vector3(...DEFAULT_TARGET)
    );
  };

  return (
    <>
      <Canvas>
        <color attach="background" args={["#000B1E"]} />
        <PerspectiveCamera makeDefault position={DEFAULT_CAMERA_POSITION} />
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={20}
          maxDistance={150}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />

        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <hemisphereLight intensity={1} groundColor="#ff0f00" />

        <Suspense fallback={null}>
          <Stars {...STARS_CONFIG} />
          <CaseNodes
            cases={visibleCases}
            filteredCategories={filteredCategories}
            onFocusPoint={handleFocusPoint}
          />
        </Suspense>
      </Canvas>

      <ResetView onReset={handleReset} disabled={isTransitioning} />
    </>
  );
}
