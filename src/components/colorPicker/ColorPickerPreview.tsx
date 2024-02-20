import React, {useContext, useState, useRef, useEffect} from 'react';
import {StyleSheet, TextInput, PixelRatio, I18nManager, TextInputProps} from 'react-native';

import {Colors, Typography} from '../../style';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {BORDER_RADIUS, isValidHex} from './ColorPickerPresenter';
import {ColorPickerContext} from './context/ColorPickerContext';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import {Constants} from '../../commons/new';
import Animated, {useAnimatedStyle, useAnimatedProps, useDerivedValue} from 'react-native-reanimated';
import tinycolor from 'tinycolor2';

type PreviewProps = Pick<ColorPickerDialogProps, 'accessibilityLabels' | 'previewInputStyle' | 'testID'> & {
  onChangeText: (value: string) => void;
  onFocus: () => void;
};

Animated.addWhitelistedNativeProps({text: true, selectionColor: true});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Preview = (props: PreviewProps) => {
  const {previewInputStyle, onFocus, accessibilityLabels, testID} = props;
  const colorPickerContext = useContext(ColorPickerContext);
  const {grey10, white} = Colors;
  const fontScale = PixelRatio.getFontScale();
  const [isFocused, setIsFocused] = useState(false);
  const [hex, setHex] = useState<string>(colorPickerContext?.hex.value || '#');

  const previewBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: colorPickerContext?.hex.value || '#ffffff'
    };
  }, [colorPickerContext]);

  const textColor = useDerivedValue(() => {
    const l = colorPickerContext?.value.value.l;
    return l && l > 0.45 ? grey10 : white;
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: textColor.value,
      width: 10 * 16.5 * fontScale
    };
  });

  const underlineStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: textColor.value
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: colorPickerContext?.hex.value
      // selectionColor: textColor.value
    } as any;
  }, [colorPickerContext]);

  const _onFocus = () => {
    setIsFocused(true);
    setHex(colorPickerContext?.hex.value || '#');
  };
  const _onChangeText = (value: string) => {
    if (isFocused) {
      setHex(value || '#');
    }
  };

  const onBlur = () => {
    if (!isValidHex(hex)) {
      return;
    }
    if (colorPickerContext) {
      colorPickerContext.setColor(tinycolor(hex).toHsl());
    }
    setIsFocused(false);
    setHex('#');
  };

  // const TextInputRenderFunction = (props: {focusedProps: Partial<TextInputProps>; notFocusedProps: Partial<TextInputProps>}) => {
  //   const {focusedProps, notFocusedProps} = props;
  //   if (!isFocused) {
  //     return (
  //       <TouchableOpacity
  //         center
  //         bg-red10
  //         onPress={() => {
  //           _onFocus();
  //         }}
  //         activeOpacity={1}
  //         accessible={false}
  //       >
  //         <AnimatedTextInput
  //           value={colorPickerContext?.hex.value}
  //           maxLength={7}
  //           numberOfLines={1}
  //           style={[styles.input, textStyle, Constants.isAndroid && {padding: 0}, previewInputStyle]}
  //           underlineColorAndroid="transparent"
  //           autoCorrect={false}
  //           autoComplete={'off'}
  //           autoCapitalize={'characters'}
  //           // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
  //           returnKeyType={'done'}
  //           enablesReturnKeyAutomatically
  //           accessibilityLabel={accessibilityLabels?.input}
  //           testID={`${testID}.dialog.textInput`}
  //           editable={false}
  //           // {...{animatedProps}}
  //           {...notFocusedProps}
  //         />
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return (
  //       <AnimatedTextInput
  //         ref={textInput}
  //         value={hex}
  //         maxLength={7}
  //         numberOfLines={1}
  //         onChangeText={_onChangeText}
  //         style={[styles.input, textStyle, Constants.isAndroid && {padding: 0}, previewInputStyle]}
  //         underlineColorAndroid="transparent"
  //         autoCorrect={false}
  //         autoComplete={'off'}
  //         autoCapitalize={'characters'}
  //         // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
  //         returnKeyType={'done'}
  //         enablesReturnKeyAutomatically
  //         accessibilityLabel={accessibilityLabels?.input}
  //         testID={`${testID}.dialog.textInput`}
  //         onBlur={onBlur}
  //         {...focusedProps}
  //       />
  //     );
  //   }
  // };

  console.log(`Nitzan - isFocused`, isFocused);
  return (
    <Animated.View style={[styles.preview, previewBackgroundColor]}>
      <View style={styles.inputContainer}>
        {!isFocused ? (
          <TouchableOpacity
            bg-red10
            center
            onPress={() => {
              _onFocus();
            }}
            activeOpacity={1}
            accessible={false}
          >
            <AnimatedTextInput
              value={colorPickerContext?.hex.value}
              maxLength={7}
              numberOfLines={1}
              // onChangeText={_onChangeText}
              style={[styles.input, textStyle, Constants.isAndroid && {padding: 0}, previewInputStyle]}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoComplete={'off'}
              autoCapitalize={'characters'}
              // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
              returnKeyType={'done'}
              enablesReturnKeyAutomatically
              accessibilityLabel={accessibilityLabels?.input}
              testID={`${testID}.dialog.textInput`}
              editable={false}
              pointerEvents={'none'}
              {...{animatedProps}}
            />
          </TouchableOpacity>
        ) : (
          <AnimatedTextInput
            value={hex}
            maxLength={7}
            numberOfLines={1}
            onChangeText={_onChangeText}
            style={[styles.input, textStyle, Constants.isAndroid && {padding: 0}, previewInputStyle]}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoComplete={'off'}
            autoCapitalize={'characters'}
            // keyboardType={'numbers-and-punctuation'} // doesn't work with `autoCapitalize`
            returnKeyType={'done'}
            enablesReturnKeyAutomatically
            accessibilityLabel={accessibilityLabels?.input}
            testID={`${testID}.dialog.textInput`}
            onBlur={onBlur}
            onFocus={onFocus}
            autoFocus
          />
        )}
      </View>
      <Animated.View style={[underlineStyle, styles.underline]}/>
    </Animated.View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: Colors.$backgroundDefault
  },
  preview: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.$outlineDisabled,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.$outlineDisabled
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
  }
});
