const createBaseComponentClass = usePure => require('./baseComponent').default(usePure);

let BaseComponentClass;
let PureBaseComponentClass;

module.exports = {
  get BaseComponent() {
    return (BaseComponentClass = BaseComponentClass || createBaseComponentClass(false));
  },
  get PureBaseComponent() {
    return (PureBaseComponentClass = PureBaseComponentClass || createBaseComponentClass(true));
  },
  get SelectableComponent() {
    return require('./SelectableComponent').default;
  },
  get UIComponent() {
    return require('./UIComponent').default;
  },
  get asBaseComponent() {
    return require('./asBaseComponent').default;
  },
  get forwardRef() {
    return require('./forwardRef').default;
  }
};
