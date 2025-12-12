export function registerScreens(registrar) {
  registrar('unicorn.examples.AppleMusic', () => require('./AppleMusic').default);
  registrar('unicorn.examples.Pinterest', () => require('./Pinterest').default);
  registrar('unicorn.examples.ListActionsScreen', () => require('./ListActions/ListActionsScreen').default);
  registrar('unicorn.examples.ProductPage', () => require('./ProductPage').default);
  registrar('unicorn.examples.Twitter', () => require('./Twitter').default);
}
