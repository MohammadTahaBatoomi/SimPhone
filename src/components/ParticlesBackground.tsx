"use client";

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setIsReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: true,
      background: {
        color: {
          value: "#0b0f17",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: false, mode: "push" },
          resize: { enable: true },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 120, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#64b5f6" },
        links: {
          color: "#64b5f6",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 60 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }) as const,
    []
  );

  if (!isReady) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Particles id="tsparticles" options={options} />
    </div>
  );
}


