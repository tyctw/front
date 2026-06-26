export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const sectionReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: smoothEase },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: smoothEase },
  },
};

export const springPop = {
  type: "spring",
  stiffness: 420,
  damping: 30,
  mass: 0.8,
} as const;
