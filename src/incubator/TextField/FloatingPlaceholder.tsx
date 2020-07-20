import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react';
import {Animated, LayoutChangeEvent} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import FieldContext from './FieldContext';

interface FloatingPlaceholderProps {
  placeholder?: string;
}

const FLOATING_PLACEHOLDER_SCALE = 0.875;

export default ({placeholder}: FloatingPlaceholderProps) => {
  const context = useContext(FieldContext);
  const [placeholderTransalte, setPlaceholderTranslate] = useState(0);
  const animation = useRef(new Animated.Value(Number(context.isFocused)))
    .current;
  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -placeholderTransalte]
        })
      }
    ]
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: Number(context.isFocused || context.hasValue),
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [context.isFocused, context.hasValue]);

  const onPlaceholderLayout = useCallback((event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    const translate = width / 2 - (width * FLOATING_PLACEHOLDER_SCALE) / 2;
    setPlaceholderTranslate(translate / FLOATING_PLACEHOLDER_SCALE);
  }, []);

  return (
    <View absF>
      <Text
        animated
        grey40
        style={animatedStyle}
        onLayout={onPlaceholderLayout}
      >
        {placeholder}
      </Text>
    </View>
  );
};
