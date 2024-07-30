import React, {useContext, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {useDidUpdate} from '../../hooks';
import Assets from '../../assets';
import {Spacings, Colors} from '../../style';
import View from '../view';
import Button from '../button';
import FieldContext from './FieldContext';
import {TextFieldProps} from './types';

const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};
const NON_VISIBLE_POSITION = 18;
const VISIBLE_POSITION = 0;
const TIMING_CONFIG = {
  duration: 200,
  easing: Easing.bezier(0.33, 1, 0.68, 1)
};

const ClearButton = ({testID, onClear, onChangeText}: Pick<TextFieldProps, 'onClear' | 'testID' | 'onChangeText'>) => {
  const {hasValue} = useContext(FieldContext);
  const animatedValue = useSharedValue(hasValue ? VISIBLE_POSITION : NON_VISIBLE_POSITION);
  const animatedOpacity = useSharedValue(hasValue ? 1 : 0);

  // @ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animatedValue.value}, {translateX: 0}],
      opacity: animatedOpacity.value
    };
  });

  const style = useMemo(() => [styles.container, animatedStyle], [animatedStyle]);

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
    //@ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
    <View reanimated style={style} testID={`${testID}.container`}>
      <Button
        link
        iconSource={Assets.icons.xFlat}
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
  container: {
    marginHorizontal: Spacings.s3
  },
  clearIcon: {
    tintColor: Colors.$textNeutralLight
  }
});

export default ClearButton;
