import React, {useCallback} from 'react';
import Animated from 'react-native-reanimated';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {TextStyle} from 'react-native';
import {Typography, Colors} from '../../../src/style';

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
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default ({
  index,
  text,
  textStyle,
  // value,
  itemHeight,
  onSelect,
  activeIndex
}: InternalProps) => {
  
  const isActive = activeIndex === index;

  const selectItem = useCallback(() => onSelect(index), [index]);

  const color = isActive ? Colors.primary : Colors.grey20;
  const font = isActive ? Typography.text60BO : Typography.text60R;

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
      <AnimatedText text60 style={[{color, ...font}, textStyle]}>
        {text}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
};
