export const spring = {
  // Gentle spring (smooth, natural)
  gentle: {
    damping: 30,
    stiffness: 200,
    mass: 1,
  },
  
  // Bouncy spring (playful)
  bouncy: {
    damping: 15,
    stiffness: 300,
    mass: 1,
  },
  
  // Snappy spring (quick response)
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8,
  },
  
  // Wobbly spring (exaggerated)
  wobbly: {
    damping: 10,
    stiffness: 200,
    mass: 1,
  },
} as const;
