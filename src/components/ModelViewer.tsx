"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { createElement, useEffect, useRef } from "react";

type ModelViewerProps = {
  name: string;
  src?: string;
};

const orbit = (theta: number) => `${theta.toFixed(1)}deg 75deg 105%`;

// Interactive 3D model of a machine. Without a `src` it renders a reserved
// placeholder slot, so models can be added one at a time.
// The panel settles into place as it enters the viewport, and the machine
// turns with the scroll so the visitor sees it from every side on the way past.
export default function ModelViewer({ name, src }: ModelViewerProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: panel,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const theta = useTransform(scrollYProgress, [0, 1], [-110, 110]);

  useEffect(() => {
    if (src) import("@google/model-viewer");
  }, [src]);

  useMotionValueEvent(theta, "change", (value) => {
    if (reduceMotion) return;
    panel.current
      ?.querySelector("model-viewer")
      ?.setAttribute("camera-orbit", orbit(value));
  });

  return (
    <motion.div
      ref={panel}
      style={reduceMotion ? undefined : { scale, opacity, y }}
      className="aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface"
    >
      {src ? (
        createElement("model-viewer", {
          src,
          alt: `3D model of the ${name}`,
          "camera-controls": "",
          "camera-orbit": orbit(reduceMotion ? 0 : -110),
          "disable-zoom": "",
          "touch-action": "pan-y",
          "shadow-intensity": "0.6",
          "interaction-prompt": "none",
          style: {
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          },
        })
      ) : (
        <div
          role="img"
          aria-label={`3D model of the ${name} (coming soon)`}
          className="flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-12 w-12 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          >
            <path d="M24 5 41 14.5v19L24 43 7 33.5v-19L24 5Z" />
            <path d="M7 14.5 24 24l17-9.5M24 24v19" />
          </svg>
          <span className="font-mono text-xs tracking-wide text-muted uppercase">
            3D model · {name}
          </span>
        </div>
      )}
    </motion.div>
  );
}
