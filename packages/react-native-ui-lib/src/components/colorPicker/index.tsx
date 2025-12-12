import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import Assets from '../../assets';
import {Colors} from '../../style';
import View from '../view';
import Button from '../button';
import ColorPalette, {ColorPaletteProps} from '../colorPalette';
import {SWATCH_MARGIN, SWATCH_SIZE} from '../colorSwatch';
import ColorPickerDialog, {ColorPickerDialogProps} from './ColorPickerDialog';
import type {ComponentStatics} from '../../typings/common';

interface Props extends ColorPickerDialogProps, Pick<ColorPaletteProps, 'onValueChange'> {
  /**
   * Array of colors for the picker's color palette (hex values)
   */
  colors: string[];
  /**
   * The value of the selected swatch // TODO: rename prop 'selectedValue'
   */
  value?: string;
  /**
   * The index of the item to animate at first render (default is last)
   */
  animatedIndex?: number;
  /**
   * Accessibility labels as an object of strings, ex.
   * {
   *  addButton: 'add custom color using hex code',
   *  dismissButton: 'dismiss',
   *  doneButton: 'done',
   *  input: 'custom hex color code'
   * }
   */
  accessibilityLabels?: {
    addButton?: string;
    dismissButton?: string;
    doneButton?: string;
    input?: string;
  };
  testID?: string;
  /**
   * The ColorPicker's background color
   */
  backgroundColor?: string;
}
export type ColorPickerProps = Props;

const ACCESSIBILITY_LABELS = {
  addButton: 'add custom color using hex code',
  dismissButton: 'dismiss',
  doneButton: 'done',
  input: 'custom hex color code'
};

/**
 * @description: A color picker component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/src/screens/componentScreens/ColorPickerScreen.tsx
 * @notes: This is a screen width component
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/packages/unicorn-demo-app/showcase/ColorPicker/ColorPicker.gif?raw=true
 */
const ColorPicker = (props: Props) => {
  const {
    accessibilityLabels = ACCESSIBILITY_LABELS,
    backgroundColor = Colors.$backgroundDefault,
    initialColor,
    colors,
    value,
    testID,
    onValueChange,
    animatedIndex
  } = props;
  const [show, setShow] = useState(false);

  const showDialog = useCallback(() => setShow(true), []);

  const hideDialog = useCallback(() => setShow(false), []);

  return (
    <View row testID={testID} style={{backgroundColor}}>
      <ColorPalette
        value={value}
        colors={colors}
        style={styles.palette}
        usePagination={false}
        animatedIndex={animatedIndex ?? colors.length - 1}
        onValueChange={onValueChange}
        testID={`${testID}-palette`}
        backgroundColor={backgroundColor}
      />
      <View style={[styles.buttonContainer, {backgroundColor}]}>
        <Button
          color={Colors.$textDefault}
          outlineColor={Colors.$textDefault}
          style={styles.button}
          round
          outline
          iconSource={Assets.internal.icons.plusSmall}
          onPress={showDialog}
          testID={`${testID}-button`}
          accessibilityLabel={accessibilityLabels?.addButton}
        />
      </View>
      <ColorPickerDialog
        {...props}
        key={initialColor}
        visible={show}
        onDismiss={hideDialog}
        accessibilityLabels={{
          dismissButton: accessibilityLabels?.dismissButton,
          doneButton: accessibilityLabels?.doneButton,
          input: accessibilityLabels?.input
        }}
        migrate
      />
    </View>
  );
};

ColorPicker.displayName = 'ColorPicker';
ColorPicker.Dialog = ColorPickerDialog;

export default asBaseComponent<Props, ComponentStatics<typeof ColorPicker>>(ColorPicker);

const plusButtonContainerWidth = SWATCH_SIZE + 20 + 12;
const plusButtonContainerHeight = 92 - 2 * SWATCH_MARGIN;

const styles = StyleSheet.create({
  palette: {
    paddingLeft: plusButtonContainerWidth
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    width: plusButtonContainerWidth,
    height: plusButtonContainerHeight,
    marginTop: SWATCH_MARGIN,
    marginBottom: SWATCH_MARGIN,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 1
  },
  button: {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    marginRight: 12
  }
});
