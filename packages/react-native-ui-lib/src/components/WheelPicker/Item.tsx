import React, {useCallback, useMemo, memo, useRef} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import {Colors, Spacings} from '../../style';
import {useThemeProps} from '../../hooks';
import Text, {TextProps} from '../text';
import TouchableOpacity from '../touchableOpacity';
import {WheelPickerAlign, WheelPickerItemValue} from './types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export interface WheelPickerItemProps<T = WheelPickerItemValue> {
  label: string;
  value: T;
  align?: WheelPickerAlign;
  disableRTL?: boolean;
}

interface InternalProps<T> extends WheelPickerItemProps<T> {
  index: number;
  offset: Animated.SharedValue<number>;
  itemHeight: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: TextStyle;
  onSelect: (index: number) => void;
  onPress?: () => void;
  centerH?: boolean;
  fakeLabel?: string;
  fakeLabelStyle?: TextStyle;
  fakeLabelProps?: TextProps;
  testID?: string;
}

const WheelPickerItem = <T extends WheelPickerItemValue = number>(props: InternalProps<T>) => {
  const themeProps = useThemeProps(props, 'WheelPickerItem');
  const {
    index,
    label,
    fakeLabel,
    fakeLabelStyle,
    fakeLabelProps,
    itemHeight,
    onSelect,
    onPress,
    offset,
    activeColor = Colors.$textPrimary,
    inactiveColor = Colors.$textNeutralHeavy,
    style,
    testID,
    centerH = true,
    align,
    disableRTL
  } = themeProps;
  
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

  const _onPress = useCallback(() => {
    selectItem();
    onPress?.();
  }, [onPress, selectItem]);

  const _fakeLabelStyle = useMemo(() => StyleSheet.flatten([fakeLabelStyle, styles.hidden]), [fakeLabelStyle]);
  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={containerStyle}
      key={index}
      centerV
      centerH={align ? align === WheelPickerAlign.CENTER : centerH}
      right={align ? align === WheelPickerAlign.RIGHT : !centerH}
      left={align === WheelPickerAlign.LEFT}
      onPress={_onPress}
      // @ts-ignore reanimated2
      index={index}
      testID={testID}
      row
    >
      <AnimatedText text60R testID={`${testID}.text`} numberOfLines={1} style={textStyle} recorderTag={'unmask'}>
        {label}
      </AnimatedText>
      {fakeLabel && (
        <Text text80M $textDefaultLight {...fakeLabelProps} style={_fakeLabelStyle}>
          {fakeLabel}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

export default memo(WheelPickerItem);

const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10
  },
  textPadding: {
    paddingHorizontal: Spacings.s5
  },
  disableRTL: {
    flexDirection: 'row-reverse'
  },
  hidden: {
    opacity: 0
  }
});
