import {Component} from 'react';
import PropTypes from 'prop-types';
import KeyboardRegistry from './KeyboardRegistry';

export default class CustomKeyboardViewBase extends Component {
  static propTypes = {
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func
  };

  static defaultProps = {
    initialProps: {}
  };

  constructor(props) {
    super(props);

    const {component, onItemSelected} = props;
    if (component) {
      this.addOnItemSelectListener(onItemSelected, component);

      this.registeredRequestShowKeyboard = false;
    }

    this.keyboardExpandedToggle = {};
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.component !== this.props.component;
  }

  componentWillUnmount() {
    const {component} = this.props;
    KeyboardRegistry.removeListeners('onRequestShowKeyboard');

    if (this.keyboardEventListeners) {
      this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
    }

    if (component) {
      KeyboardRegistry.removeListeners(`${component}.onItemSelected`);
    }
  }

  addOnItemSelectListener(onItemSelected, component) {
    if (onItemSelected) {
      KeyboardRegistry.addListener(`${component}.onItemSelected`, args => {
        onItemSelected(component, args);
      });
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const {onRequestShowKeyboard} = nextProps;

    if (onRequestShowKeyboard && !this.registeredRequestShowKeyboard) {
      this.registeredRequestShowKeyboard = true;
      KeyboardRegistry.addListener('onRequestShowKeyboard', args => {
        onRequestShowKeyboard(args.keyboardId);
      });
    }

    this.registerListener(this.props, nextProps);
  }

  registerListener(props, nextProps) {
    const {component, onItemSelected} = nextProps;
    if (component && props.component !== component) {
      if (props.component) {
        KeyboardRegistry.removeListeners(`${props.component}.onItemSelected`);
      }
      KeyboardRegistry.removeListeners(`${component}.onItemSelected`);
      this.addOnItemSelectListener(onItemSelected, component);
    }
  }
}
