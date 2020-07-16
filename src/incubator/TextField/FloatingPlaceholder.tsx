import React, {useContext, useEffect, useRef} from 'react';
import View from '../../components/view';
import Text from '../../components/text';
import FieldContext from './FieldContext';
import {Animated} from 'react-native';

interface FloatingPlaceholderProps {
  placeholder?: string;
}

export default ({placeholder}: FloatingPlaceholderProps) => {
  const context = useContext(FieldContext);
  const animation = useRef(new Animated.Value(Number(context.isFocused)))
    .current;
  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20]
        })
      }
    ]
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: Number(context.isFocused),
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [context.isFocused]);

  return (
    <View absF>
      <Text animated grey40 style={animatedStyle}>
        {placeholder}
      </Text>
    </View>
  );
};
