export function registerScreens(registrar) {
  registrar('unicorn.motion.MotionMainScreen', () => require('./MotionMainScreen').default);
  registrar('unicorn.motion.MotionCardFlipScreen', () => require('./MotionCardFlipScreen').default);
  registrar('unicorn.motion.MotionPinsPlayScreen', () => require('./MotionPinsPlayScreen').default);
  registrar('unicorn.motion.MotionInterpolationPlayScreen', () => require('./MotionInterpolationPlayScreen').default);
  registrar('unicorn.motion.MotionComposeScreen', () => require('./MotionComposeScreen').default);
  registrar('unicorn.motion.MotionExploreScreen', () => require('./MotionsExploreScreen').default);
}
