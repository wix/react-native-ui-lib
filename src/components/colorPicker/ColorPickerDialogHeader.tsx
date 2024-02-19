import _ from 'lodash';
import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';

import View from '../view';
import Button from '../button';
import Assets from '../../assets';
import {Colors} from '../../style';
import {ColorPickerDialogProps} from './ColorPickerDialog';
import {BORDER_RADIUS} from './ColorPickerPresenter';
import {ColorPickerContext} from './context/ColorPickerContext';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';

type HeaderProps = Pick<ColorPickerDialogProps, 'doneButtonColor' | 'accessibilityLabels' | 'testID'> & {
  onDismiss: () => void;
  onDonePressed: (hex: string) => void;
};

const Header = (props: HeaderProps) => {
  const {onDismiss, accessibilityLabels, testID, doneButtonColor, onDonePressed} = props;
  const [valid, setValid] = useState(false);
  const colorPickerContext = useContext(ColorPickerContext);

  useAnimatedReaction(() => {
    return colorPickerContext?.isValid.value;
  },
  (currentValidity, prevValidity) => {
    if (currentValidity !== prevValidity) {
      runOnJS(setValid)(!!currentValidity);
    }
  });

  return (
    <View row spread bg-$backgroundDefault paddingH-20 style={styles.header}>
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

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  }
});
