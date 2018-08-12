import baseComponent from './baseComponent';
import SelectableComponent from './SelectableComponent';

const BaseComponent = baseComponent(false);
const PureBaseComponent = baseComponent(true);

export {
  BaseComponent,
  PureBaseComponent,
  SelectableComponent,
};
