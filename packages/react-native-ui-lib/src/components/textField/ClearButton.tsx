import React, {useContext, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {useDidUpdate} from '../../hooks';
import Assets from '../../assets';
import {Colors} from '../../style';
import View from '../view';
import Button from '../button';
import FieldContext from './FieldContext';
import {ClearButtonProps} from './types';

const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};
const NON_VISIBLE_POSITION = 18;
const VISIBLE_POSITION = 0;
const TIMING_CONFIG = {
  duration: 200,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};

const ClearButton = ({testID, onClear, onChangeText, clearButtonStyle}: ClearButtonProps) => {
  const {hasValue} = useContext(FieldContext);
  const animatedValue = useSharedValue(hasValue ? VISIBLE_POSITION : NON_VISIBLE_POSITION);
  const animatedOpacity = useSharedValue(hasValue ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animatedValue.value}, {translateX: 0}],
      opacity: animatedOpacity.value
    };
  });

  const style = useMemo(() => [clearButtonStyle, animatedStyle], [clearButtonStyle, animatedStyle]);

  const animate = useCallback(() => {
    const toValue = hasValue ? VISIBLE_POSITION : NON_VISIBLE_POSITION;
    animatedValue.value = withTiming(toValue, TIMING_CONFIG);
    animatedOpacity.value = withTiming(hasValue ? 1 : 0, TIMING_CONFIG);
  },
  [animatedValue, animatedOpacity, hasValue]);

  useDidUpdate(() => {
    animate();
  }, [hasValue, animate]);

  const clear = () => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View reanimated style={style} testID={`${testID}.container`}>
      <Button
        link
        iconSource={Assets.internal.icons.xFlat}
        iconStyle={styles.clearIcon}
        onPress={clear}
        hitSlop={hitSlop}
        accessible={hasValue}
        accessibilityLabel={'clear'}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  clearIcon: {
    tintColor: Colors.$textNeutralLight
  }
});

export default ClearButton;
