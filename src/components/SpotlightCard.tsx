"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

const light = (size: number, colour: string) =>
  `radial-gradient(${size}px circle at var(--x) var(--y), ${colour}, transparent 70%)`;

// Card lit from wherever the cursor or a finger is: the edge picks up the
// accent colour and a soft wash follows underneath the content.
export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const track = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - box.left}px`);
    card.style.setProperty("--y", `${event.clientY - box.top}px`);
    card.dataset.lit = "true";
  };
  const dim = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.dataset.lit = "false";
  };

  return (
    <div
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={dim}
      onPointerCancel={dim}
      className="group relative h-full overflow-hidden rounded-2xl bg-line p-px transition-transform duration-500 ease-out hover:-translate-y-1"
    >
      <div
        aria-hidden="true"
        style={{ background: light(280, "var(--accent)") }}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[lit=true]:opacity-100"
      />
      <div className="relative h-full overflow-hidden rounded-[15px] bg-background">
        <div
          aria-hidden="true"
          style={{
            background: light(
              380,
              "color-mix(in srgb, var(--accent) 12%, transparent)",
            ),
          }}
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[lit=true]:opacity-100"
        />
        <div className={`relative ${className ?? ""}`}>{children}</div>
      </div>
    </div>
  );
}
