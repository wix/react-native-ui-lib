import _ from 'lodash';
import React, {useState, useRef, useEffect, useCallback, useContext} from 'react';
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
import tinycolor from 'tinycolor2';
import ColorContext, {ColorContextProvider} from './ColorContext';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated';

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

const KEYBOARD_HEIGHT = 216;

const MODAL_PROPS = {
  supportedOrientations: ['portrait', 'landscape', 'landscape-left', 'landscape-right'] // iOS only
} as ModalProps;

type DialogHeaderProps = Pick<
  ColorPickerDialogProps,
  'onDismiss' | 'doneButtonColor' | 'accessibilityLabels' | 'testID'
> & {
  valid: boolean;
  onDonePressed: () => void;
};

type DialogPreviewProps = Pick<Props, 'accessibilityLabels' | 'previewInputStyle' | 'testID'> & {
  setFocus: (event: any) => void;
  textInput: React.RefObject<TextInput>;
  onChangeText: (value: string) => void;
  onFocus: () => void;
};

const DialogHeader = (props: DialogHeaderProps) => {
  const {doneButtonColor, accessibilityLabels, testID, onDismiss, valid, onDonePressed} = props;

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

function getTextColor(color: string) {
  return Colors.isDark(color) ? Colors.white : Colors.grey10;
}

const DialogPreview = (props: DialogPreviewProps) => {
  const {accessibilityLabels, previewInputStyle, testID, setFocus, textInput, onChangeText, onFocus} = props;
  const colorContext = useContext(ColorContext);
  const textColor = getTextColor(colorContext.hexValue.value);
  const fontScale = PixelRatio.getFontScale();
  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: '#'.concat(colorContext.hexValue.value)
    };
  }, []);

  return (
    <View reanimated style={[styles.preview, backgroundColor]}>
      <TouchableOpacity center onPress={setFocus} activeOpacity={1} accessible={false}>
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
            value={colorContext.hexValue.value}
            maxLength={6}
            numberOfLines={1}
            onChangeText={onChangeText}
            style={[
              styles.input,
              {
                color: textColor,
                width: colorContext.hexValue.value
                  ? (colorContext.hexValue.value.length + 1) * 16.5 * fontScale
                  : undefined
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
  onSliderValueChange: (color: string) => void;
};

const Sliders = (props: SlidersProps) => {
  const {migrate, keyboardHeight, onSliderValueChange} = props;
  const colorContext = useContext(ColorContext);
  // const colorValue = color.a === 0 ? Colors.$backgroundInverted : Colors.getHexString(color);
  return (
    <ColorSliderGroup
      initialColor={colorContext.hexValue.value}
      containerStyle={[styles.sliderGroup, {height: keyboardHeight}]}
      sliderContainerStyle={styles.slider}
      showLabels
      labelsStyle={styles.label}
      onValueChange={onSliderValueChange}
      accessible={false}
      migrate={migrate}
      animatedValue={colorContext}
    />
  );
};

function getValidColorString(text?: string) {
  if (text) {
    const hex = getHexColor(text);

    if (Colors.isValidHex(hex)) {
      return {hex, valid: true};
    }
  }
  return {undefined, valid: false};
}

/**
 * @description: A color picker dialog component
 * @extends: Dialog
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 */
const ColorPickerDialog = (props: Props) => {
  const {
    initialColor = Colors.$backgroundNeutralLight,
    visible,
    dialogProps,
    testID,
    doneButtonColor,
    accessibilityLabels
  } = props;

  const [keyboardHeight, setKeyboardHeight] = useState(KEYBOARD_HEIGHT);
  const [valid, setValid] = useState(getValidColorString(initialColor).valid);
  const colorContext = useContext(ColorContext);
  const textInput = useRef<TextInput>();

  const keyboardDidShow = useCallback((e: any) => {
    setKeyboardHeight(prevKeyboardHeight => {
      if (Constants.isIOS && prevKeyboardHeight !== e.endCoordinates.height) {
        return e.endCoordinates.height;
      }
      if (Constants.isAndroid && prevKeyboardHeight !== 0) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return 0;
      }
      return prevKeyboardHeight;
    });
  },
  [setKeyboardHeight]);

  const keyboardDidHide = useCallback(() => {
    setKeyboardHeight(KEYBOARD_HEIGHT);
  }, [setKeyboardHeight]);

  const changeHeight = useCallback((height: number) => {
    setKeyboardHeight(prevKeyboardHeight => {
      if (Constants.isAndroid && prevKeyboardHeight !== height) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return height;
      }
      return prevKeyboardHeight;
    });
  },
  [setKeyboardHeight]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardDidShow, keyboardDidHide]);

  const resetValues = useCallback(() => {
    const color = Colors.getHSL(initialColor);
    colorContext.hue.value = color.h;
    colorContext.lightness.value = color.l;
    colorContext.saturation.value = color.s;
    setValid(getValidColorString(colorContext.hexValue.value).valid);
  }, [initialColor, colorContext, setValid]);

  const onDismiss = useCallback(() => {
    const {onDismiss} = props;
    resetValues();
    onDismiss?.();
  }, [resetValues, props.onDismiss]);

  const onDonePressed = useCallback(() => {
    const {onSubmit} = props;
    const {hexValue} = colorContext;
    const hex = hexValue.value;
    if (hex) {
      onSubmit?.(hex, getTextColor(hex));
      onDismiss();
    }
  }, [props.onSubmit, colorContext, props.onDismiss]);

  const setFocus = useCallback(() => {
    textInput?.current?.focus();
  }, [textInput]);

  const applyColor = useCallback((text: string) => {
    const {hex, valid} = getValidColorString(text);
    if (hex) {
      const hsl = Colors.getHSL(hex);
      colorContext.hue.value = hsl.h;
      colorContext.lightness.value = hsl.l;
      colorContext.saturation.value = hsl.s;
      setValid(valid);
    }
  },
  [colorContext, setValid]);




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
      <DialogHeader
        doneButtonColor={doneButtonColor}
        accessibilityLabels={accessibilityLabels}
        testID={testID}
        valid={valid}
        onDismiss={onDismiss}
        onDonePressed={onDonePressed}
      />
      <ColorContextProvider initialColor={initialColor}>
        <DialogPreview
          // WE NEED TO CHANGE THE COLOR TO AN ANIMATED COLOR AND ADD THE FUNCTIONALITY TO THE SLIDER
          // SLIDER SHOULD HAVE ANIMATED VALUE TO CHANGE ACCORDINGLY.
          setFocus={setFocus}
          textInput={textInput as React.RefObject<TextInput>}
          onChangeText={applyColor.bind(this)}
          onFocus={changeHeight.bind(this, 0)}
        />
        <Sliders migrate keyboardHeight={keyboardHeight}/>
      </ColorContextProvider>
    </Dialog>
  );
};
  
  
  
};

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
