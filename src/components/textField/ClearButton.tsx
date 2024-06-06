import React, {useContext, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {useDidUpdate} from '../../hooks';
import Assets from '../../assets';
import {Spacings, Colors} from '../../style';
import View from '../view';
import Button from '../button';
import FieldContext from './FieldContext';
import {TextFieldProps} from './types';

const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};
const NON_VISIBLE_POSITION = 100;
const VISIBLE_POSITION = 0;
const SPRING_ANIMATION_CONFIG = {velocity: 300, damping: 20, stiffness: 300, mass: 0.8};

const ClearButton = ({testID, onClear, onChangeText}: Pick<TextFieldProps, 'onClear' | 'testID' | 'onChangeText'>) => {
  const {hasValue} = useContext(FieldContext);
  const animatedValue = useSharedValue(hasValue ? VISIBLE_POSITION : NON_VISIBLE_POSITION);

  // @ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedValue.value}, {translateY: 0}]
    };
  });

  const style = useMemo(() => [styles.container, animatedStyle], [animatedStyle]);

  const animate = useCallback(() => {
    const toValue = hasValue ? VISIBLE_POSITION : NON_VISIBLE_POSITION;
    animatedValue.value = withSpring(toValue, SPRING_ANIMATION_CONFIG);
  },
  [animatedValue, hasValue]);

  useDidUpdate(() => {
    animate();
  }, [hasValue, animate]);

  const clear = () => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    //@ts-expect-error should be fixed in version 3.5 (https://github.com/software-mansion/react-native-reanimated/pull/4881)
    <View reanimated style={style} testID={testID}>
      <Button
        link
        iconSource={Assets.icons.xFlat}
        iconStyle={styles.clearIcon}
        onPress={clear}
        hitSlop={hitSlop}
        accessible={hasValue}
        accessibilityLabel={'clear'}
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

ClearButton.displayName = 'IGNORE';
export default ClearButton;
