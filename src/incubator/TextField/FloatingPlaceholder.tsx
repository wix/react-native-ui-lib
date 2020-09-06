import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo
} from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, Platform, TextStyle} from 'react-native';
import {ColorType} from './types';
import {getColorByState} from './Presenter';
import {Colors} from '../../style';
import {Constants} from '../../helpers';
import View from '../../components/view';
import Text from '../../components/text';
import FieldContext from './FieldContext';

export interface FloatingPlaceholderProps {
  /**
   * The placeholder for the field
   */
  placeholder?: string;
  /**
   * The floating placeholder color
   */
  floatingPlaceholderColor?: ColorType;
  /**
   * Custom style to pass to the floating placeholder
   */
  floatingPlaceholderStyle?: TextStyle;
}

const FLOATING_PLACEHOLDER_SCALE = 0.875;

const FloatingPlaceholder = ({placeholder, floatingPlaceholderColor = Colors.grey40, floatingPlaceholderStyle}: FloatingPlaceholderProps) => {
  const context = useContext(FieldContext);
  const [placeholderOffset, setPlaceholderOffset] = useState({
    top: 0,
    left: 0
  });
  const animation = useRef(new Animated.Value(Number(context.isFocused)))
    .current;

  const animatedStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: interpolateValue(animation, [1, FLOATING_PLACEHOLDER_SCALE])
        },
        {
          translateX: interpolateValue(animation, [0, -placeholderOffset.left])
        },
        {
          translateY: interpolateValue(animation, [0, -placeholderOffset.top])
        }
      ]
    };
  }, [placeholderOffset]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: Number(context.isFocused || context.hasValue),
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [context.isFocused, context.hasValue]);

  const onPlaceholderLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    let translate = width / 2 - (width * FLOATING_PLACEHOLDER_SCALE) / 2;
    translate = Constants.isRTL ? -translate : translate;
    setPlaceholderOffset({
      left: translate / FLOATING_PLACEHOLDER_SCALE,
      top: height
    });
  }, []);

  return (
    <View absF>
      <Text
        animated
        color={getColorByState(floatingPlaceholderColor, context)}
        style={[styles.placeholder, floatingPlaceholderStyle, animatedStyle]}
        onLayout={onPlaceholderLayout}
      >
        {placeholder}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    ...Platform.select({
      android: {textAlignVertical: 'center', flex: 1}
    })
  }
});

function interpolateValue(
  animatedValue: Animated.Value,
  outputRange: number[]
) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  });
}

FloatingPlaceholder.displayName = 'Incubator.TextField';
export default FloatingPlaceholder;
