"use client";

import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const inView = { once: true, margin: "0px 0px -12% 0px" } as const;

// Honours the visitor's "reduce motion" setting for everything below it.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Hairline at the very top of the page that fills as the visitor scrolls.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-glow"
    />
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Content rises into place and sharpens the first time it enters the viewport.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={inView}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Headline whose words slide up one after another from behind a mask.
export function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <motion.span
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// The hero drifts up and fades as the visitor scrolls past it.
export function HeroDrift({ children, className }: RevealProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -90]);
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <motion.div className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

const rule = (position: "top" | "bottom") => ({
  backgroundImage: "linear-gradient(var(--line), var(--line))",
  backgroundRepeat: "no-repeat",
  backgroundPosition: position === "top" ? "0 0" : "0 100%",
});

const drawRule = {
  hidden: { backgroundSize: "0% 1px" },
  show: { backgroundSize: "100% 1px", transition: { duration: 1.1, ease } },
};

// Specification table: rows appear in sequence, each ruled by a line that draws itself.
export function SpecList({ children, className }: RevealProps) {
  return (
    <motion.dl
      className={className}
      style={rule("top")}
      variants={drawRule}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
    >
      {children}
    </motion.dl>
  );
}

export function SpecRow({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={rule("bottom")}
      variants={{
        hidden: { opacity: 0, y: 12, ...drawRule.hidden },
        show: {
          opacity: 1,
          y: 0,
          backgroundSize: drawRule.show.backgroundSize,
          transition: { duration: 0.9, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// A dark rule that draws itself from the left when it enters the viewport.
export function DrawnRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="block h-px origin-left bg-foreground"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: 1.2, ease, delay }}
    />
  );
}
