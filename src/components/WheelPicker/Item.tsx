import React, {useCallback, useMemo, memo, useRef} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import Text, {TextProps} from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {Colors, Spacings} from '../../../src/style';
import {asBaseComponent} from '../../commons/new';
import {WheelPickerAlign} from './types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export interface ItemProps {
  label: string;
  value: string | number;
  align?: WheelPickerAlign;
  disableRTL?: boolean;
}

interface InternalProps extends ItemProps {
  index: number;
  offset: Animated.SharedValue<number>;
  itemHeight: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: TextStyle;
  onSelect: (index: number) => void;
  centerH?: boolean;
  fakeLabel?: string;
  fakeLabelStyle?: TextStyle;
  fakeLabelProps?: TextProps;
  testID?: string;
}

const WheelPickerItem = memo(({
  index,
  label,
  fakeLabel,
  fakeLabelStyle,
  fakeLabelProps,
  itemHeight,
  onSelect,
  offset,
  activeColor = Colors.$textPrimary,
  inactiveColor = Colors.$textNeutralHeavy,
  style,
  testID,
  centerH = true,
  align,
  disableRTL
}: InternalProps) => {
  const selectItem = useCallback(() => onSelect(index), [index]);
  const itemOffset = index * itemHeight;
  const _activeColor = useRef(activeColor.toString());
  const _inactiveColor = useRef(inactiveColor.toString());

  const animatedColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(offset.value,
      [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
      [_inactiveColor.current, _activeColor.current, _inactiveColor.current]);
    return {color};
  }, [itemHeight]);

  const containerStyle = useMemo(() => {
    return [{height: itemHeight}, styles.container, disableRTL && styles.disableRTL];
  }, [itemHeight, disableRTL]);

  const textWithLabelPaddingStyle = useMemo(() => {
    return disableRTL ? {marginRight: Spacings.s5} : {marginLeft: Spacings.s5};
  }, [disableRTL]);

  const textStyle = useMemo(() => {
    return [animatedColorStyle, style, fakeLabel ? textWithLabelPaddingStyle : styles.textPadding];
  }, [style, fakeLabel, animatedColorStyle, textWithLabelPaddingStyle]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={containerStyle}
      key={index}
      centerV
      centerH={align ? align === WheelPickerAlign.CENTER : centerH}
      right={align ? align === WheelPickerAlign.RIGHT : !centerH}
      left={align === WheelPickerAlign.LEFT}
      onPress={selectItem}
      // @ts-ignore reanimated2
      index={index}
      testID={testID}
      row
    >
      <AnimatedText
        text60R
        testID={`${testID}.text`}
        numberOfLines={1}
        style={textStyle}
        recorderTag={'unmask'}
      >
        {label}
      </AnimatedText>
      {fakeLabel && (
        <Text
          text80M
          $textDefaultLight
          {...fakeLabelProps}
          style={fakeLabelStyle}
        >
          {fakeLabel}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
});

export default asBaseComponent<InternalProps>(WheelPickerItem);

const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10
  },
  textPadding: {
    paddingHorizontal: Spacings.s5
  },
  disableRTL: {
    flexDirection: 'row-reverse'
  }
});
