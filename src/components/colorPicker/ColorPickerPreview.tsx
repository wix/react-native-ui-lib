import React, {useContext, useState, useRef} from 'react';
import {StyleSheet, TextInput, PixelRatio, I18nManager} from 'react-native';

import {Colors, Typography} from '../../style';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {BORDER_RADIUS} from './ColorPickerPresenter';
import {ColorPickerContext} from './context/ColorPickerContext';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import {Constants} from '../../commons/new';
import Animated, {useAnimatedStyle, useAnimatedProps, useAnimatedRef, useDerivedValue} from 'react-native-reanimated';
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
  const [hex, setHex] = useState<string | undefined>(colorPickerContext?.hex.value);

  const previewBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: colorPickerContext?.hex.value || '#ffffff'
    };
  });

  const textColor = useDerivedValue(() => {
    const l = colorPickerContext?.value.value.l;
    return l && l > 0.45 ? grey10 : white;
  });

  const textStyle = useAnimatedStyle(() => {
    const value = colorPickerContext?.hex.value;
    return {
      color: textColor.value,
      width: value ? value.length * 16.5 * fontScale : undefined
    };
  });

  const underlineStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: textColor.value
    };
  });
  const textInput = useRef<TextInput>();

  const animatedProps = useAnimatedProps(() => {
    return {
      text: colorPickerContext?.hex.value
      // selectionColor: textColor.value
    } as any;
  }, [colorPickerContext]);

  const _onFocus = () => {
    setIsFocused(true);
    setHex(colorPickerContext?.hex.value);
    // onFocus();
    console.log(`Nitzan - textInput.current?.focus()`, textInput.current?.focus);
    textInput.current?.focus();
  };
  const _onChangeText = (value: string) => {
    if (isFocused) {
      setHex(value || '#');
    }
  };

  const _onBlur = () => {
    console.log(`Nitzan - bbb`);
    if (colorPickerContext?.value) {
      colorPickerContext.setColor(tinycolor(hex).toHsl());
    }
    setIsFocused(false);
    setHex(undefined);
  };

  const TextInputRenderFunction = () => {
    if (!isFocused) {
      return (
        <AnimatedTextInput
          // // @ts-expect-error
          // ref={textInput}
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
          {...{animatedProps}}
        />
      );
    } else {
      return (
        <AnimatedTextInput
          // @ts-expect-error
          ref={textInput}
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
          onBlur={_onBlur}
        />
      );
    }
  };

  console.log(`Nitzan - isFocused`, isFocused);
  return (
    <Animated.View style={[styles.preview, previewBackgroundColor]}>
      <View style={styles.inputContainer}>
        {!isFocused ? (
          <TouchableOpacity
            center
            bg-red10
            onPress={() => {
              _onFocus();
            }}
            activeOpacity={1}
            accessible={false}
          >
            <AnimatedTextInput
              // @ts-expect-error
              // ref={textInput}
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
            // @ts-expect-error
            ref={textInput}
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
            onBlur={_onBlur}
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
