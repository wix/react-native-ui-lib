import ReactNative, {NativeModules, LayoutAnimation} from 'react-native';

const CustomInputControllerTemp = NativeModules.CustomInputControllerTemp;

export default class TextInputKeyboardManager {
  static setInputComponent = (textInputRef: any,
    {component, initialProps, useSafeArea}: {component?: string; initialProps: any; useSafeArea?: boolean}) => {
    if (!textInputRef || !CustomInputControllerTemp) {
      return;
    }
    const reactTag = findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputControllerTemp.presentCustomInputComponent(reactTag, {component, initialProps, useSafeArea});
    }
  };

  static removeInputComponent = (textInputRef: any) => {
    if (!textInputRef || !CustomInputControllerTemp) {
      return;
    }
    const reactTag = findNodeHandle(textInputRef);
    if (reactTag) {
      CustomInputControllerTemp.resetInput(reactTag);
    }
  };

  static dismissKeyboard = () => {
    CustomInputControllerTemp.dismissKeyboard();
  };

  static toggleExpandKeyboard = (textInputRef: any, expand: boolean, performLayoutAnimation = false) => {
    if (textInputRef) {
      if (performLayoutAnimation) {
        LayoutAnimation.configureNext(springAnimation);
      }
      const reactTag = findNodeHandle(textInputRef);
      if (expand) {
        CustomInputControllerTemp.expandFullScreenForInput(reactTag);
      } else {
        CustomInputControllerTemp.resetSizeForInput(reactTag);
      }
    }
  };
}

function findNodeHandle(ref: any) {
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
