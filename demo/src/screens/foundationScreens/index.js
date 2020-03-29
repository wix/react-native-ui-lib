export function registerScreens(registrar) {  
  registrar('unicorn.style.BorderRadiusesScreen', () => require('./BorderRadiusesScreen').default);
  registrar('unicorn.style.ColorsScreen', () => require('./ColorsScreen').default);
  registrar('unicorn.style.TypographyScreen', () => require('./TypographyScreen').default);
  registrar('unicorn.style.ShadowsScreen', () => require('./ShadowsScreen').default);
  registrar('unicorn.style.SpacingsScreen', () => require('./SpacingsScreen').default);
}
