import React from "react";
import { DoubleSide } from "three";

function SkyScene() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[15, 32, 16]} />
        <meshStandardMaterial color={"skyblue"} side={DoubleSide} />
      </mesh>
    </>
  );
}

export default SkyScene;
