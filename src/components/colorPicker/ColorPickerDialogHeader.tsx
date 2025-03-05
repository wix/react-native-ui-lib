import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';

import View from '../view';
import Button from '../button';
import Assets from '../../assets';
import {Colors} from '../../style';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {BORDER_RADIUS} from './ColorPickerPresenter';

type HeaderProps = Pick<
  ColorPickerDialogProps,
  'doneButtonColor' | 'accessibilityLabels' | 'testID' | 'colorPickerHeaderProps'
> & {
  valid: boolean;
  onDismiss: () => void;
  onDonePressed: () => void;
};

const ColorPickerDialogHeader = (props: HeaderProps) => {
  const {onDismiss, accessibilityLabels, testID, doneButtonColor, valid, onDonePressed, colorPickerHeaderProps} = props;
  const {
    doneButtonProps,
    dismissButtonProps,
    doneButtonColor: doneButtonHeaderColorProp
  } = colorPickerHeaderProps || {};

  return (
    <View row spread bg-$backgroundDefault paddingH-20 style={styles.header}>
      <Button
        link
        iconSource={Assets.icons.x}
        iconStyle={{tintColor: Colors.$iconDefault}}
        onPress={onDismiss}
        accessibilityLabel={_.get(accessibilityLabels, 'dismissButton')}
        testID={`${testID}.dialog.cancel`}
        {...dismissButtonProps}
      />
      <Button
        color={doneButtonColor || doneButtonHeaderColorProp}
        disabled={!valid}
        link
        iconSource={Assets.icons.check}
        onPress={onDonePressed}
        accessibilityLabel={_.get(accessibilityLabels, 'doneButton')}
        testID={`${testID}.dialog.done`}
        {...doneButtonProps}
      />
    </View>
  );
};

export default ColorPickerDialogHeader;

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  }
});
