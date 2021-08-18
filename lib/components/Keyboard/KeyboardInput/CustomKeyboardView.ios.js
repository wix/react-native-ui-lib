import PropTypes from 'prop-types';
import TextInputKeyboardManager from './TextInputKeyboardManager';
import KeyboardRegistry from './KeyboardRegistry';
import CustomKeyboardViewBase from './CustomKeyboardViewBase';

export default class CustomKeyboardView extends CustomKeyboardViewBase {
  static displayName = 'IGNORE';
  static propTypes = {
    /**
     * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.)
     */
    inputRef: PropTypes.object,
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func,
    useSafeArea: PropTypes.bool
  };

  static defaultProps = {
    useSafeArea: true
  };

  constructor(props) {
    super(props);

    const {component} = props;
    if (component) {
      this.registeredRequestShowKeyboard = false;
    }

    KeyboardRegistry.addListener('onToggleExpandedKeyboard', args => {
      const {inputRef, initialProps} = this.props;
      if (inputRef) {
        if (this.keyboardExpandedToggle[args.keyboardId] === undefined) {
          this.keyboardExpandedToggle[args.keyboardId] = false;
        }
        this.keyboardExpandedToggle[args.keyboardId] = !this.keyboardExpandedToggle[args.keyboardId];
        TextInputKeyboardManager.toggleExpandKeyboard(inputRef,
          this.keyboardExpandedToggle[args.keyboardId],
          initialProps.expandWithLayoutAnimation);
      }
    });
  }

  componentWillUnmount() {
    KeyboardRegistry.removeListeners('onToggleExpandedKeyboard');
    super.componentWillUnmount();
  }

  componentDidUpdate(prevProps) {
    const {inputRef: nextInputRef, component: nextComponent, initialProps: nextInitialProps, useSafeArea} = this.props;
    const {component} = prevProps;

    if (nextInputRef && nextComponent !== component) {
      if (nextComponent) {
        TextInputKeyboardManager.setInputComponent(nextInputRef, {
          component: nextComponent,
          initialProps: nextInitialProps,
          useSafeArea
        });
      } else {
        TextInputKeyboardManager.removeInputComponent(nextInputRef);
      }
    }

    super.componentDidUpdate(prevProps);
  }

  render() {
    return null;
  }
}
