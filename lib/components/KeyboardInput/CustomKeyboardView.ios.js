import PropTypes from 'prop-types';
import TextInputKeyboardManagerIOS from './TextInputKeyboardMangerIOS';
import KeyboardRegistry from './KeyboardsRegistry';
import CustomKeyboardViewBase from './CustomKeyboardViewBase';

export default class CustomKeyboardView extends CustomKeyboardViewBase {
  static propTypes = {
    /**
     * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.)
     */
    inputRef: PropTypes.object,
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func
  };

  constructor(props) {
    super(props);

    const {component} = props;
    if (component) {
      this.registeredRequestShowKeyboard = false;
    }

    KeyboardRegistry.addListener('onToggleExpandedKeyboard', args => {
      if (this.props.inputRef) {
        if (this.keyboardExpandedToggle[args.keyboardId] === undefined) {
          this.keyboardExpandedToggle[args.keyboardId] = false;
        }
        this.keyboardExpandedToggle[args.keyboardId] = !this.keyboardExpandedToggle[args.keyboardId];
        TextInputKeyboardManagerIOS.toggleExpandKeyboard(this.props.inputRef,
          this.keyboardExpandedToggle[args.keyboardId],
          this.props.initialProps.expandWithLayoutAnimation);
      }
    });
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const {inputRef, component, initialProps} = nextProps;

    if (inputRef && component !== this.props.component) {
      if (component) {
        TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
      } else {
        TextInputKeyboardManagerIOS.removeInputComponent(inputRef);
      }
    }

    await super.UNSAFE_componentWillReceiveProps(nextProps);
  }

  render() {
    return null;
  }
}
