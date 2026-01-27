export function registerScreens(registrar) {
  registrar('unicorn.motion.MotionMainScreen', () => require('./MotionMainScreen').default);
  registrar('unicorn.motion.MotionCardFlipScreen', () => require('./MotionCardFlipScreen').default);
  registrar('unicorn.motion.MotionPinsPlayScreen', () => require('./MotionPinsPlayScreen').default);
  registrar('unicorn.motion.MotionPlaygroundScreen', () => require('./MotionPlaygroundScreen').default);
  registrar('unicorn.motion.MotionComposeScreen', () => require('./MotionComposeScreen').default);
  registrar('unicorn.motion.BehaviorsScreen', () => require('./BehaviorsScreen').default);
}
