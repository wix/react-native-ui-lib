import React, { useContext, useRef, useCallback, useState, useMemo } from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';
import { useDidUpdate } from "../../hooks";
import { ValidationMessagePosition } from "./types";
import { getColorByState, shouldPlaceholderFloat } from "./Presenter";
import { Colors } from "../../style";
import { Constants } from "../../commons/new";
import View from "../view";
import Text from "../text";
import FieldContext from "./FieldContext";
const FLOATING_PLACEHOLDER_SCALE = 0.875;
const FloatingPlaceholder = props => {
  const {
    placeholder,
    floatingPlaceholderColor = Colors.$textNeutralLight,
    floatingPlaceholderStyle,
    validationMessagePosition,
    extraOffset = 0,
    testID,
    showMandatoryIndication
  } = props;
  const context = useContext(FieldContext);
  const [placeholderOffset, setPlaceholderOffset] = useState({
    top: 0,
    left: 0
  });
  const shouldFloat = shouldPlaceholderFloat(props, context.isFocused, context.hasValue, context.value);
  const animation = useRef(new Animated.Value(Number(shouldFloat))).current;
  const hidePlaceholder = !context.isValid && validationMessagePosition === ValidationMessagePosition.TOP;
  const shouldRenderIndication = context.isMandatory && showMandatoryIndication;
  useDidUpdate(() => {
    Animated.timing(animation, {
      toValue: Number(shouldFloat),
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [shouldFloat]);
  const animatedStyle = useMemo(() => {
    const {
      left,
      top
    } = placeholderOffset;
    if (left !== 0 && top !== 0) {
      return {
        transform: [{
          scale: interpolateValue(animation, [1, FLOATING_PLACEHOLDER_SCALE])
        }, {
          translateX: interpolateValue(animation, [0, -placeholderOffset.left - extraOffset / FLOATING_PLACEHOLDER_SCALE])
        }, {
          translateY: interpolateValue(animation, [0, -placeholderOffset.top])
        }]
      };
    }
    return {
      opacity: 0
    };
  }, [placeholderOffset, extraOffset]);
  const style = useMemo(() => [styles.placeholder, floatingPlaceholderStyle, animatedStyle], [floatingPlaceholderStyle, animatedStyle]);
  const onPlaceholderLayout = useCallback(event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    let translate = width / 2 - width * FLOATING_PLACEHOLDER_SCALE / 2;
    translate = Constants.isRTL ? -translate : translate;
    setPlaceholderOffset({
      left: translate / FLOATING_PLACEHOLDER_SCALE,
      top: height
    });
  }, []);
  return <View absF style={hidePlaceholder && styles.hidden} pointerEvents={'none'}>
      <Text animated color={getColorByState(floatingPlaceholderColor, context)} style={style} onLayout={onPlaceholderLayout} testID={testID} recorderTag={'unmask'} numberOfLines={1}>
        {shouldRenderIndication ? placeholder?.concat('*') : placeholder}
      </Text>
    </View>;
};
const styles = StyleSheet.create({
  placeholder: {
    ...Platform.select({
      android: {
        textAlignVertical: 'center',
        flexShrink: 1
      }
    })
  },
  hidden: {
    opacity: 0
  }
});
function interpolateValue(animatedValue, outputRange) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  });
}
FloatingPlaceholder.displayName = 'Incubator.TextField';
export default FloatingPlaceholder;