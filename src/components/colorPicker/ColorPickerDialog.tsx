import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {LayoutAnimation, StyleSheet, Keyboard, StyleProp, ViewStyle} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import {Colors} from '../../style';
import {ModalProps} from '../../components/modal';
import Dialog, {DialogProps} from '../../incubator/dialog';
import {getColorValue, getValidColorString, getTextColor, BORDER_RADIUS, HSLColor} from './ColorPickerPresenter';
import ColorPickerDialogHeader from './ColorPickerDialogHeader';
import ColorPickerPreview from './ColorPickerPreview';
import ColorPickerDialogSliders from './ColorPickerDialogSliders';

export interface ColorPickerDialogProps extends DialogProps {
  /**
   * The initial color to pass the picker dialog
   */
  initialColor?: string;
  /**
   * onSubmit callback for the picker dialog color change
   */
  onSubmit?: (color: string, textColor: string) => void;
  /**
   * Props to pass the Dialog component // TODO: deprecate 'dialogProps' prop
   */
  dialogProps?: object;
  /**
   * Additional styling for the color preview text.
   */
  previewInputStyle?: StyleProp<ViewStyle>;
  /**
   * Accessibility labels as an object of strings, ex. {addButton: 'add custom color using hex code', dismissButton: 'dismiss', doneButton: 'done', input: 'custom hex color code'}
   */
  /**
   * Ok (v) button color
   */
  doneButtonColor?: string;
  accessibilityLabels?: {
    dismissButton?: string;
    doneButton?: string;
    input?: string;
  };
  /**
   * Whether to use the new Slider implementation using Reanimated
   */
  migrate?: boolean;
}

const KEYBOARD_HEIGHT = 216;
const MODAL_PROPS = {
  supportedOrientations: ['portrait', 'landscape', 'landscape-left', 'landscape-right'] // iOS only
} as ModalProps;

/**
 * @description: A color picker dialog component
 * @extends: Dialog
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 */
const ColorPickerDialog = (props: ColorPickerDialogProps) => {
  const {
    initialColor = Colors.$backgroundNeutralLight,
    dialogProps,
    testID,
    visible,
    accessibilityLabels,
    doneButtonColor,
    previewInputStyle,
    migrate
  } = props;

  const [keyboardHeight, setKeyboardHeight] = useState(KEYBOARD_HEIGHT);
  const [color, setColor] = useState(Colors.getHSL(initialColor));
  const [text, setText] = useState(getColorValue(initialColor));
  const [valid, setValid] = useState(getValidColorString(text).valid);

  const changeHeight = (height: number) => {
    setKeyboardHeight(prevKeyboardHeight => {
      if (Constants.isAndroid && prevKeyboardHeight !== height) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return height;
      }
      return prevKeyboardHeight;
    });
  };

  const keyboardDidShow = useCallback((e: any) => {
    setKeyboardHeight(prevKeyboardHeight => {
      if (Constants.isIOS && prevKeyboardHeight !== e.endCoordinates.height) {
        return e.endCoordinates.height;
      }
      return prevKeyboardHeight;
    });
    // For down arrow button in Android keyboard
    changeHeight(0);
  }, []);

  const keyboardDidHide = useCallback(() => {
    changeHeight(KEYBOARD_HEIGHT);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardDidShow, keyboardDidHide]);

  const resetValues = () => {
    const color = Colors.getHSL(initialColor);
    const text = getColorValue(initialColor);
    const {valid} = getValidColorString(text);

    setColor(color);
    setText(text);
    setValid(valid);
  };

  const onDismiss = () => {
    resetValues();
    props.onDismiss?.();
  };

  const onDonePressed = () => {
    const {hex} = getValidColorString(text);

    if (hex) {
      props.onSubmit?.(hex, getTextColor(hex));
      onDismiss();
    }
  };
  const onFocus = () => {
    changeHeight(0);
  };

  const onChangeText = (value: string) => {
    applyColor(value);
  };

  const applyColor = (text: string) => {
    const {hex, valid} = getValidColorString(text);

    if (hex) {
      setColor(Colors.getHSL(hex));
    }
    setText(text);
    setValid(valid);
  };

  const updateColor = useCallback((value: HSLColor) => {
    setColor(value);
    const hex = Colors.getHexString(value);
    setText(_.toUpper(getColorValue(hex)));
    setValid(true);
  }, []);
  return (
    <Dialog
      visible={visible} //TODO: pass all Dialog props instead
      width="100%"
      bottom
      centerH
      onDismiss={onDismiss}
      containerStyle={styles.dialog}
      testID={`${testID}.dialog`}
      modalProps={MODAL_PROPS}
      {...dialogProps}
    >
      <ColorPickerDialogHeader
        accessibilityLabels={accessibilityLabels}
        valid={valid}
        onDonePressed={onDonePressed}
        testID={testID}
        doneButtonColor={doneButtonColor}
        onDismiss={onDismiss}
      />
      <ColorPickerPreview
        color={color}
        text={text}
        valid={valid}
        accessibilityLabels={accessibilityLabels}
        previewInputStyle={previewInputStyle}
        testID={testID}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
      <ColorPickerDialogSliders
        keyboardHeight={keyboardHeight}
        color={color}
        onSliderValueChange={updateColor}
        migrate={migrate}
      />
    </Dialog>
  );
};

ColorPickerDialog.displayName = 'ColorPickerDialog';

export default asBaseComponent<ColorPickerDialogProps>(ColorPickerDialog);

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.$backgroundDefault,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  }
});
