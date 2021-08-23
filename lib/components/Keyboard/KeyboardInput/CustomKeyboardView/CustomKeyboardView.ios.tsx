import TextInputKeyboardManager from './../TextInputKeyboardManager/TextInputKeyboardManager.ios';
import KeyboardRegistry from './../KeyboardRegistry';
import CustomKeyboardViewBase, {CustomKeyboardViewBaseProps} from './../CustomKeyboardViewBase';

export type CustomKeyboardViewProps = CustomKeyboardViewBaseProps & {
  /**
   * The reference to the actual text input (or the keyboard may not reset when instructed to, etc.)
   */
  inputRef?: any;
  useSafeArea?: boolean;
};

export default class CustomKeyboardView extends CustomKeyboardViewBase<CustomKeyboardViewProps> {
  static displayName = 'IGNORE';

  static defaultProps = {
    initialProps: {},
    useSafeArea: true
  };

  registeredRequestShowKeyboard: boolean;
  keyboardExpandedToggle: [any];

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
