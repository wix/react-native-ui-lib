export function registerScreens(registrar) {
  registrar('unicorn.animations.CardAnimationsScreen',
    () => require('./CardAnimationsScreen').default);
  registrar('unicorn.animations.ListAnimationsScreen',
    () => require('./ListAnimationsScreen').default);
}
