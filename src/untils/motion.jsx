export const slideInFromLeft = (delay = 0) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export const slideInFromRight = (delay = 0) => ({
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
};

export const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
