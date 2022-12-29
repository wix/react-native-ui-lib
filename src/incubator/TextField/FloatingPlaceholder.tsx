import React, {useContext, useRef, useCallback, useState, useMemo} from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, Platform} from 'react-native';
import {useDidUpdate} from 'hooks';
import {FloatingPlaceholderProps, ValidationMessagePosition} from './types';
import {getColorByState, shouldPlaceholderFloat} from './Presenter';
import {Colors} from '../../style';
import {Constants} from '../../commons/new';
import View from '../../components/view';
import Text from '../../components/text';
import FieldContext from './FieldContext';

const FLOATING_PLACEHOLDER_SCALE = 0.875;

const FloatingPlaceholder = (props: FloatingPlaceholderProps) => {
  const {
    placeholder,
    floatingPlaceholderColor = Colors.$textNeutralLight,
    floatingPlaceholderStyle,
    validationMessagePosition,
    extraOffset = 0,
    testID
  } = props;
  const context = useContext(FieldContext);
  const [placeholderOffset, setPlaceholderOffset] = useState({
    top: 0,
    left: 0
  });

  const shouldFloat = shouldPlaceholderFloat(props, context.isFocused, context.hasValue, context.value);
  const animation = useRef(new Animated.Value(Number(shouldFloat))).current;
  const hidePlaceholder = !context.isValid && validationMessagePosition === ValidationMessagePosition.TOP;

  useDidUpdate(() => {
    Animated.timing(animation, {
      toValue: Number(shouldFloat),
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [shouldFloat]);

  const animatedStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: interpolateValue(animation, [1, FLOATING_PLACEHOLDER_SCALE])
        },
        {
          translateX: interpolateValue(animation, [
            0,
            -placeholderOffset.left - extraOffset / FLOATING_PLACEHOLDER_SCALE
          ])
        },
        {
          translateY: interpolateValue(animation, [0, -placeholderOffset.top])
        }
      ]
    };
  }, [placeholderOffset, extraOffset]);

  const style = useMemo(() => [styles.placeholder, floatingPlaceholderStyle, animatedStyle],
    [floatingPlaceholderStyle, animatedStyle]);

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
    <View absF style={hidePlaceholder && styles.hidden} pointerEvents={'none'}>
      <Text
        animated
        color={getColorByState(floatingPlaceholderColor, context)}
        style={style}
        onLayout={onPlaceholderLayout}
        testID={testID}
      >
        {placeholder}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    ...Platform.select({
      android: {textAlignVertical: 'center', flexShrink: 1}
    })
  },
  hidden: {
    opacity: 0
  }
});

function interpolateValue(animatedValue: Animated.Value, outputRange: number[]) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  });
}

FloatingPlaceholder.displayName = 'Incubator.TextField';
export default FloatingPlaceholder;
