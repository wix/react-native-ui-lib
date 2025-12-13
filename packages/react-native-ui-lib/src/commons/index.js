const createBaseComponentClass = usePure => require('./baseComponent').default(usePure);

let BaseComponentClass = createBaseComponentClass(false);
let PureBaseComponentClass = createBaseComponentClass(true);

module.exports = {
  get BaseComponent() {
    return (BaseComponentClass = BaseComponentClass || createBaseComponentClass(false));
  },
  get PureBaseComponent() {
    return (PureBaseComponentClass = PureBaseComponentClass || createBaseComponentClass(true));
  },
  get UIComponent() {
    return require('./UIComponent').default;
  },
  get Constants() {
    return require('./Constants').default;
  },
  get asBaseComponent() {
    return require('./asBaseComponent').default;
  },
  get forwardRef() {
    return require('./forwardRef').default;
  },
  get withScrollEnabler() {
    return require('./withScrollEnabler').default;
  },
  get withScrollReached() {
    return require('./withScrollReached').default;
  },
  get modifiers() {
    return require('./modifiers');
  }
};
