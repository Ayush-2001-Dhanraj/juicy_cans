import { MotionPathControls, useMotion, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const generateCirclePoints = (numPoints = 100, radius = 50) => {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = 0;
    const z = radius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z)); // ✅ Fixed
  }
  return points;
};

function ScrollMoveObject() {
  const motion = useMotion();
  const scroll = useScroll();

  useFrame((state, delta) => {
    motion.current = scroll.offset;
  });
}
function AutoMoveObject() {
  const motion = useMotion();

  useFrame((state, delta) => {
    motion.current += delta * 0.1;
  });
}

function MainScene() {
  const boxRef = useRef();

  const { curve, straightLine } = useMemo(() => {
    const start = new THREE.Vector3(-1, 1.7, 0);
    const mid = new THREE.Vector3(0.2, -0.5, 1.5);
    const mid2 = new THREE.Vector3(0.2, -0.8, 2);
    const mid3 = new THREE.Vector3(0.4, -1.1, 1.5);
    const end = new THREE.Vector3(0.8, -1.4, 1);

    const straightLine = new THREE.CatmullRomCurve3(
      [start, mid, mid2, mid3, end],
      false
    );

    const curvePoints = generateCirclePoints(15, 2);
    const curve = new THREE.CatmullRomCurve3(curvePoints, true);

    return { curve, straightLine };
  }, []);

  return (
    <>
      <MotionPathControls curves={[straightLine]} object={boxRef}>
        <ScrollMoveObject />
      </MotionPathControls>

      <MotionPathControls curves={[curve]} focus={boxRef}>
        <AutoMoveObject />
      </MotionPathControls>

      <group ref={boxRef}>
        <mesh>
          <coneGeometry args={[0.5, 1, 6]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </>
  );
}

export default MainScene;
