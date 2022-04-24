// TODO: this file should replace commons/index.js
export {default as UIComponent} from './UIComponent';
export {default as asBaseComponent, BaseComponentInjectedProps} from './asBaseComponent';
export {default as forwardRef, ForwardRefInjectedProps} from './forwardRef';
export {default as withScrollEnabler, WithScrollEnablerProps} from './withScrollEnabler';
export {default as withScrollReached, WithScrollReachedProps} from './withScrollReached';
export {default as Constants} from './Constants';
export {default as Config} from './Config';

export {
  ContainerModifiers,
  AlignmentModifiers,
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BackgroundColorModifier
} from './modifiers';
