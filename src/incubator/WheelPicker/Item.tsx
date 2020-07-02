import React, {useCallback, useMemo} from 'react';
import Animated, {concat} from 'react-native-reanimated';
import {transformOrigin} from 'react-native-redash';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {TextStyle} from 'react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity
);
const AnimatedText = Animated.createAnimatedComponent(Text);

export interface ItemProps {
  text: string;
  value: string | number;
}

interface InternalProps extends ItemProps {
  index: number;
  offset: any;
  itemHeight: number;
  textStyle?: TextStyle;
  onSelect: (index: number) => void;
}

export default ({
  index,
  text,
  textStyle,
  // value,
  itemHeight,
  onSelect,
  offset
}: InternalProps) => {
  const itemOffset = index * itemHeight;
  const opacity = Animated.interpolate(offset, {
    inputRange: [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
    outputRange: [0.5, 1, 0.5]
  });

  const rotateXValue = useMemo(() => {
    return Animated.interpolate(offset, {
      inputRange: [
        itemOffset - 2.5 * itemHeight,
        itemOffset,
        itemOffset + 2.5 * itemHeight
      ],
      outputRange: [-85, 0, -85]
    });
  }, [itemHeight]);

  const rotateX = concat(rotateXValue, 'deg');

  const scale = useMemo(() => {
    return Animated.interpolate(offset, {
      inputRange: [
        itemOffset - 2 * itemHeight,
        itemOffset,
        itemOffset + 2 * itemHeight
      ],
      outputRange: [0.8, 1, 0.8]
    });
  }, [itemHeight]);

  const selectItem = useCallback(() => onSelect(index), [index]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={{
        height: itemHeight,
        opacity,
        // @ts-ignore
        transform: transformOrigin({x: 125, y: 24}, {rotateX})
      }}
      key={index}
      center
      onPress={selectItem}
      index={index}
    >
      <AnimatedText text60 style={[textStyle, {transform: [{scale}]}]}>
        {text}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
};
