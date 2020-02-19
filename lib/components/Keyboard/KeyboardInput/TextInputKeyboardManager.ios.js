import ReactNative, {NativeModules, LayoutAnimation} from 'react-native';

const CustomInputController = NativeModules.CustomInputController;

export default class TextInputKeyboardManager {
  static setInputComponent = (textInputRef, {component, initialProps}) => {
    if (!textInputRef || !CustomInputController) {
      return;
    }
    const reactTag = findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputController.presentCustomInputComponent(reactTag, {component, initialProps});
    }
  };

  static removeInputComponent = textInputRef => {
    if (!textInputRef || !CustomInputController) {
      return;
    }
    const reactTag = findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputController.resetInput(reactTag);
    }
  };

  static dismissKeyboard = () => {
    CustomInputController.dismissKeyboard();
  };

  static toggleExpandKeyboard = (textInputRef, expand, performLayoutAnimation = false) => {
    if (textInputRef) {
      if (performLayoutAnimation) {
        LayoutAnimation.configureNext(springAnimation);
      }
      const reactTag = findNodeHandle(textInputRef);
      if (expand) {
        CustomInputController.expandFullScreenForInput(reactTag);
      } else {
        CustomInputController.resetSizeForInput(reactTag);
      }
    }
  };
}

function findNodeHandle(ref) {
  return ReactNative.findNodeHandle(ref.current || ref);
}

const springAnimation = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 1.0
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  }
};
