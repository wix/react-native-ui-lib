
export function registerScreens(registrar) {

  registrar('unicorn.common.WithScrollEnablerScreen', () => require('./WithScrollEnablerScreen').default);
}

