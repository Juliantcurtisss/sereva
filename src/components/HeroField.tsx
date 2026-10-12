"use client";

import { useEffect, useRef } from "react";

type Ripple = { x: number; y: number; born: number };

const GAP = 26;
const REACH = 150;
const RIPPLE_SPEED = 460;
const RIPPLE_LIFE = 1.8;
const RIPPLE_WIDTH = 46;

// Field of dots behind the hero that behaves like the surface of water.
// The dots swell and part around the cursor or a finger, and every click or
// tap sends a ring travelling outwards. It listens on its parent, so the
// content above it stays clickable and the page still scrolls on a phone.
// `intensity` tones the reaction down where body text sits on top of it.
export default function HeroField({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, strength: 0, target: 0 };
    let ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const draw = (now: number) => {
      const time = now / 1000;
      pointer.strength += (pointer.target - pointer.strength) * 0.12;
      ripples = ripples.filter((ripple) => time - ripple.born < RIPPLE_LIFE);

      ctx.clearRect(0, 0, width, height);

      if (pointer.strength > 0.01) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          REACH * 2.2,
        );
        glow.addColorStop(0, `rgba(125, 180, 255, ${0.3 * pointer.strength * intensity})`);
        glow.addColorStop(1, "rgba(125, 180, 255, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.fillStyle = "#ffffff";
      const offsetX = (width % GAP) / 2;
      const offsetY = (height % GAP) / 2;

      for (let gx = offsetX; gx <= width; gx += GAP) {
        for (let gy = offsetY; gy <= height; gy += GAP) {
          let x = gx;
          let y = gy;

          // A slow swell keeps the surface alive when nobody is touching it.
          const swell = still
            ? 0
            : Math.sin(gx * 0.012 + gy * 0.017 + time * 0.7) * 0.5 + 0.5;
          let lift = 0;

          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const near =
            Math.exp(-(distance * distance) / (2 * REACH * REACH)) *
            pointer.strength;
          x += (dx / distance) * near * 10;
          y += (dy / distance) * near * 10;
          lift += near;

          for (const ripple of ripples) {
            const age = time - ripple.born;
            const rx = gx - ripple.x;
            const ry = gy - ripple.y;
            const fromCentre = Math.hypot(rx, ry) || 1;
            const offset = (fromCentre - age * RIPPLE_SPEED) / RIPPLE_WIDTH;
            const wave = Math.exp(-offset * offset) * (1 - age / RIPPLE_LIFE);
            x += (rx / fromCentre) * wave * 12;
            y += (ry / fromCentre) * wave * 12;
            lift += wave;
          }

          ctx.globalAlpha = Math.min(1, 0.14 + swell * 0.1 + lift * 0.75 * intensity);
          ctx.beginPath();
          ctx.arc(x, y, 1.1 + Math.min(lift, 1.4) * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (still) draw(0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    if (still) return () => observer.disconnect();

    const place = (clientX: number, clientY: number) => {
      const box = host.getBoundingClientRect();
      pointer.x = clientX - box.left;
      pointer.y = clientY - box.top;
      pointer.target = 1;
    };
    const splash = () => {
      ripples.push({ x: pointer.x, y: pointer.y, born: performance.now() / 1000 });
      if (ripples.length > 6) ripples.shift();
    };
    const release = () => {
      pointer.target = 0;
    };

    // Mouse and pen come through pointer events. Touch uses touch events
    // instead, because they keep firing while the page is being scrolled.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") place(event.clientX, event.clientY);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      place(event.clientX, event.clientY);
      splash();
    };
    const onTouchStart = (event: TouchEvent) => {
      place(event.touches[0].clientX, event.touches[0].clientY);
      splash();
    };
    const onTouchMove = (event: TouchEvent) => {
      place(event.touches[0].clientX, event.touches[0].clientY);
    };

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointerleave", release);
    host.addEventListener("touchstart", onTouchStart, { passive: true });
    host.addEventListener("touchmove", onTouchMove, { passive: true });
    host.addEventListener("touchend", release);
    host.addEventListener("touchcancel", release);

    // Stop drawing once the hero has scrolled out of view.
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(draw);
    });
    watcher.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      watcher.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerleave", release);
      host.removeEventListener("touchstart", onTouchStart);
      host.removeEventListener("touchmove", onTouchMove);
      host.removeEventListener("touchend", release);
      host.removeEventListener("touchcancel", release);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
