import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MainScene() {
  const can1Ref = useRef();
  const can1SpinRef = useRef();
  const initialPosition = [0, 0, 0];

  return (
    <>
      <group ref={can1Ref} position={initialPosition}>
        <group ref={can1SpinRef}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default MainScene;
