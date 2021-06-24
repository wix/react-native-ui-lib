import React, {useCallback, useMemo, memo} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {Colors, Spacings} from '../../../src/style';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export interface ItemProps {
  label: string;
  value: string | number;
}

interface InternalProps extends ItemProps {
  index: number;
  offset: Animated.SharedValue<number>;
  itemHeight: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: TextStyle;
  onSelect: (index: number) => void;
  testID?: string;
  centerH?: boolean;
}

export default memo(({
  index,
  label,
  itemHeight,
  onSelect,
  offset,
  activeColor = Colors.primary,
  inactiveColor = Colors.grey20,
  style,
  testID,
  centerH = true
}: InternalProps) => {
  const selectItem = useCallback(() => onSelect(index), [index]);
  const itemOffset = index * itemHeight;

  const animatedColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(offset.value,
      [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
      [inactiveColor, activeColor, inactiveColor]);
    return {color};
  }, [itemHeight]);

  const containerStyle = useMemo(() => {
    return [{height: itemHeight}, styles.container];
  }, [itemHeight]);

  console.warn('lidor - index', index);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={containerStyle}
      key={index}
      centerV
      centerH={centerH}
      right={!centerH}
      onPress={selectItem}
      // @ts-ignore reanimated2
      index={index}
      testID={testID}
    >
      <AnimatedText text60R style={[animatedColorStyle, style]}>
        {label}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10
  }
});
