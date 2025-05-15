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
