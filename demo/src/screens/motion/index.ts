export function registerScreens(registrar) {
  registrar('unicorn.MotionMainScreen', () => require('./MotionMainScreen').default);
  registrar('unicorn.MotionCardFlipScreen', () => require('./MotionCardFlipScreen').default);
  registrar('unicorn.MotionPinsPlayScreen', () => require('./MotionPinsPlayScreen').default);
  registrar('unicorn.MotionPlaygroundScreen', () => require('./MotionPlaygroundScreen').default);
}
