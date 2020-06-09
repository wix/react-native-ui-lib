
export function registerScreens(registrar) {

  registrar('unicorn.common.AsScrollEnabledScreen', () => require('./AsScrollEnabledScreen').default);
}

