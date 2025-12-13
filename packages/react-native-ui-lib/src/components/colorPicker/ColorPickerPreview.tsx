import React, {useRef} from 'react';
import {StyleSheet, TextInput, I18nManager} from 'react-native';

import {Colors, Typography} from '../../style';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {BORDER_RADIUS, HSLColor, getColorValue, getHexString, getTextColor} from './ColorPickerPresenter';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import {Constants} from '../../commons/new';

type PreviewProps = Pick<ColorPickerDialogProps, 'accessibilityLabels' | 'previewInputStyle' | 'testID'> & {
  color: HSLColor;
  text: ReturnType<typeof getColorValue>;
  valid: boolean;
  onChangeText: (value: string) => void;
  onFocus: () => void;
};
const ColorPickerPreview = (props: PreviewProps) => {
  const {color, text, onChangeText, previewInputStyle, onFocus, accessibilityLabels, testID} = props;
  const textInput = useRef<TextInput>(null);

  const hex = getHexString(color);
  const textColor = getTextColor(hex);
  const fontScale = Constants.getFontScale();
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

export default ColorPickerPreview;

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
