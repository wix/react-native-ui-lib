import React, {useCallback, useMemo} from 'react';
import Animated, {interpolateColors} from 'react-native-reanimated';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {TextStyle} from 'react-native';
import {Colors} from '../../../src/style';

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
  selectedColor?: string;
  unselectedColor?: string;
  style?: TextStyle;
  onSelect: (index: number) => void;
}

export default ({
  index,
  text,
  itemHeight,
  onSelect,
  offset,
  selectedColor = Colors.primary,
  unselectedColor = Colors.grey20,
  style
}: InternalProps) => {
  
  const selectItem = useCallback(() => onSelect(index), [index]);
  const itemOffset = index * itemHeight;

  const color = useMemo(() => {
    return interpolateColors(offset, {
      inputRange: [
        itemOffset - itemHeight,
        itemOffset,
        itemOffset + itemHeight
      ],
      outputColorRange: [unselectedColor, selectedColor, unselectedColor]
    });
  }, [itemHeight]);
  
  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={{
        height: itemHeight
      }}
      key={index}
      center
      onPress={selectItem}
      index={index}
    >
      <AnimatedText text60R style={{color, ...style}}>
        {text}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
};
