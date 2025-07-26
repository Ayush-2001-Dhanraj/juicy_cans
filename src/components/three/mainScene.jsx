import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MainScene() {
  const can1Ref = useRef();
  const initialPosition = [0, 0, 0];
  const initialRotation = [0, 0, 0];

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });

    timeline
      .to(can1Ref.current.position, {
        x: 0.5,
        y: 0,
        z: 3,
      })
      .to(can1Ref.current.position, {
        x: 0,
        y: 0,
        z: 0,
      })
      .to(
        can1Ref.current.rotation,
        {
          y: Math.PI / 2,
          duration: 2,
        },
        0
      )
      .to(
        can1Ref.current.position,
        {
          x: -0.5,
          y: 0,
          z: 3,
        },
        1
      )
      .to(can1Ref.current.position, {
        x: 0,
        y: 0,
        z: 0,
      })
      .to(
        can1Ref.current.rotation,
        {
          x: Math.PI,
        },
        0
      )
      .to(can1Ref.current.rotation, {
        x: 0,
      });
  }, []);

  return (
    <>
      <group
        ref={can1Ref}
        position={initialPosition}
        rotation={initialRotation}
      >
        <mesh>
          <coneGeometry args={[1, 2, 6]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </>
  );
}

export default MainScene;
