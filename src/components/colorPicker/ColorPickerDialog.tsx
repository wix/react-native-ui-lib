import _ from 'lodash';
import React, {PureComponent, useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Keyboard,
  TextInput,
  PixelRatio,
  I18nManager,
  StyleProp,
  ViewStyle,
  EmitterSubscription
} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import Assets from '../../assets';
import {Colors, Typography} from '../../style';
import {ModalProps} from '../../components/modal';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableOpacity';
import Dialog, {DialogProps} from '../../incubator/Dialog';
import Button from '../button';
import ColorSliderGroup from '../slider/ColorSliderGroup';

interface Props extends DialogProps {
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
export type ColorPickerDialogProps = Props;

interface State {
  keyboardHeight: number;
  color: any;
  text?: string;
  valid: boolean;
}

const KEYBOARD_HEIGHT = 216;
const MODAL_PROPS = {
  supportedOrientations: ['portrait', 'landscape', 'landscape-left', 'landscape-right'] // iOS only
} as ModalProps;

function getColorValue(color?: string) {
  if (!color) {
    return;
  }
  return color.replace('#', '');
}
function getHexColor(text: string) {
  if (!Colors.isTransparent(text)) {
    const trimmed = text.replace(/\s+/g, '');
    const hex = `#${trimmed}`;
    return hex;
  }
  return text;
}

function getValidColorString(text?: string) {
  if (text) {
    const hex = getHexColor(text);

    if (Colors.isValidHex(hex)) {
      return {hex, valid: true};
    }
  }
  return {undefined, valid: false};
}

type HeaderProps = Pick<Props, 'doneButtonColor' | 'accessibilityLabels' | 'testID'> & {
  valid: boolean;
  onDismiss: () => void;
  onDonePressed: () => void;
};

const Header = (props: HeaderProps) => {
  const {onDismiss, accessibilityLabels, testID, doneButtonColor, valid, onDonePressed} = props;

  return (
    <View row spread bg-white paddingH-20 style={styles.header}>
      <Button
        link
        iconSource={Assets.icons.x}
        iconStyle={{tintColor: Colors.$iconDefault}}
        onPress={onDismiss}
        accessibilityLabel={_.get(accessibilityLabels, 'dismissButton')}
        testID={`${testID}.dialog.cancel`}
      />
      <Button
        color={doneButtonColor}
        disabled={!valid}
        link
        iconSource={Assets.icons.check}
        onPress={onDonePressed}
        accessibilityLabel={_.get(accessibilityLabels, 'doneButton')}
        testID={`${testID}.dialog.done`}
      />
    </View>
  );
};

type HSLColor = ReturnType<typeof Colors.getHSL>;

function getHexString(color: HSLColor) {
  return _.toUpper(Colors.getHexString(color));
}
function getTextColor(color: string) {
  return Colors.isDark(color) ? Colors.white : Colors.grey10;
}

type PreviewProps = Pick<Props, 'accessibilityLabels' | 'previewInputStyle' | 'testID'> & {
  color: HSLColor;
  text: ReturnType<typeof getColorValue>;
  valid: boolean;
  onChangeText: (value: string) => void;
  onFocus: () => void;
};
const Preview = (props: PreviewProps) => {
  const {color, text, onChangeText, previewInputStyle, onFocus, accessibilityLabels, testID} = props;
  const textInput = useRef<TextInput>(null);

  const hex = getHexString(color);
  const textColor = getTextColor(hex);
  const fontScale = PixelRatio.getFontScale();
  const value = Colors.isTransparent(text) ? '000000' : text;

  return (
    <View style={[styles.preview, {backgroundColor: hex}]}>
      <TouchableOpacity center onPress={textInput.current?.focus} activeOpacity={1} accessible={false}>
        <View style={styles.inputContainer}>
          <Text
            text60
            white
            marginL-13
            marginR-5={Constants.isIOS}
            style={{
              color: textColor,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
            }}
            accessible={false}
            recorderTag={'unmask'}
          >
            #
          </Text>
          <TextInput
            ref={textInput}
            value={value}
            maxLength={6}
            numberOfLines={1}
            onChangeText={onChangeText}
            style={[
              styles.input,
              {
                color: textColor,
                width: value ? (value.length + 1) * 16.5 * fontScale : undefined
              },
              Constants.isAndroid && {padding: 0},
              previewInputStyle
            ]}
            selectionColor={textColor}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoComplete={'off'}
            autoCapitalize={'characters'}
            // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
            returnKeyType={'done'}
            enablesReturnKeyAutomatically
            onFocus={onFocus}
            accessibilityLabel={accessibilityLabels?.input}
            testID={`${testID}.dialog.textInput`}
          />
        </View>
        <View style={[{backgroundColor: textColor}, styles.underline]}/>
      </TouchableOpacity>
    </View>
  );
};

type SlidersProps = Pick<Props, 'migrate'> & {
  keyboardHeight: number;
  color: HSLColor;
  onSliderValueChange: (value: string) => void;
};

const Sliders = (props: SlidersProps) => {
  const {keyboardHeight, color, migrate, ...others} = props;
  const colorValue = color.a === 0 ? Colors.$backgroundInverted : Colors.getHexString(color);
  return (
    <ColorSliderGroup
      initialColor={colorValue}
      containerStyle={[styles.sliderGroup, {height: keyboardHeight}]}
      sliderContainerStyle={styles.slider}
      showLabels
      labelsStyle={styles.label}
      accessible={false}
      migrate={migrate}
      {...others}
    />
  );
};

/**
 * @description: A color picker dialog component
 * @extends: Dialog
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 */
const ColorPickerDialog = (props: Props) => {
  const {
    initialColor = Colors.$backgroundNeutralLight,
    dialogProps,
    testID,
    visible,
    accessibilityLabels,
    doneButtonColor,
    previewInputStyle
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
        setKeyboardHeight(e.endCoordinates.height);
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

  const updateColor = (hex: string) => {
    const text = getColorValue(hex);
    setColor(Colors.getHSL(hex));
    setText(text);
    setValid(true);
  };

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
      <Header
        accessibilityLabels={accessibilityLabels}
        valid={valid}
        onDonePressed={onDonePressed}
        testID={testID}
        doneButtonColor={doneButtonColor}
        onDismiss={onDismiss}
      />
      <Preview
        color={color}
        text={text}
        valid={valid}
        accessibilityLabels={accessibilityLabels}
        previewInputStyle={previewInputStyle}
        testID={testID}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
      <Sliders keyboardHeight={keyboardHeight} color={color} onSliderValueChange={updateColor}/>
    </Dialog>
  );
};

export default asBaseComponent<Props>(ColorPickerDialog);

const BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.$backgroundDefault,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  preview: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: Colors.$backgroundDefault
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: Constants.isAndroid ? 5 : 8,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  input: {
    ...Typography.text60,
    letterSpacing: 3,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  underline: {
    height: 1.5,
    width: Constants.isAndroid ? 119 : 134,
    marginRight: Constants.isAndroid ? 13 : 8
  },
  sliderGroup: {
    paddingTop: 12,
    marginHorizontal: 20
  },
  slider: {
    marginBottom: 15,
    height: 26
  },
  label: {
    marginBottom: 3
  }
});
