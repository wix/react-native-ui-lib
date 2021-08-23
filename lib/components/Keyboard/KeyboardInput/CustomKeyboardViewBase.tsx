import React, {Component} from 'react';
import KeyboardRegistry from './KeyboardRegistry';
import {EventSubscription} from 'react-native';

export type CustomKeyboardViewBaseProps = {
  inputRef?: any;
  initialProps?: any;
  component?: string;
  onItemSelected?: (component?: string, args?: any) => void;
  onRequestShowKeyboard?: (keyboardId: string) => void;
  children?: React.ReactChild | React.ReactChild[];
};

export default class CustomKeyboardViewBase<T extends CustomKeyboardViewBaseProps> extends Component<T> {
  static defaultProps = {
    initialProps: {}
  };

  registeredRequestShowKeyboard = false;
  keyboardExpandedToggle: any;
  keyboardEventListeners: EventSubscription[] = [];

  constructor(props: T) {
    super(props);

    const {component, onItemSelected} = props;
    if (component) {
      this.addOnItemSelectListener(onItemSelected, component);
    }

    this.keyboardExpandedToggle = {};
  }

  shouldComponentUpdate(nextProps: T) {
    return nextProps.component !== this.props.component;
  }

  componentWillUnmount() {
    const {component} = this.props;
    KeyboardRegistry.removeListeners('onRequestShowKeyboard');

    if (this.keyboardEventListeners) {
      this.keyboardEventListeners.forEach((eventListener: EventSubscription) => eventListener.remove());
    }

    if (component) {
      KeyboardRegistry.removeListeners(`${component}.onItemSelected`);
    }
  }

  addOnItemSelectListener(onItemSelected: CustomKeyboardViewBaseProps['onItemSelected'],
    component: CustomKeyboardViewBaseProps['component']) {
    if (onItemSelected) {
      KeyboardRegistry.addListener(`${component}.onItemSelected`, (args: any) => {
        onItemSelected(component, args);
      });
    }
  }

  componentDidUpdate(prevProps: T) {
    const {onRequestShowKeyboard} = this.props;

    if (onRequestShowKeyboard && !this.registeredRequestShowKeyboard) {
      this.registeredRequestShowKeyboard = true;
      KeyboardRegistry.addListener('onRequestShowKeyboard', (args: any) => {
        onRequestShowKeyboard(args.keyboardId);
      });
    }

    this.registerListener(prevProps, this.props);
  }

  registerListener(props: T, nextProps: T) {
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
